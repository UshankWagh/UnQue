import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import unqDB from './config/db.js';
import counterRoutes from './routes/counterRoutes.js'
import shopRoutes from './routes/shopRoutes.js'
import profileRoutes from './routes/profileRoutes.js'
import authRoutes from './routes/authRoutes.js'
import { Server } from "socket.io";
import { createServer } from "http";
// import path from "path";

const app = express();

dotenv.config("./.env");

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    },
});


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// socket

unqDB;
io.on("connection", (socket) => {
    console.log("User Connected", socket.id);

    socket.on("join-room", (queueId) => {
        socket.join(queueId);
        console.log(`${socket.id} joined room ${queueId}`);
    });

    socket.on("join-queue", ({ queueCount, lastTicket, queueId }) => {
        socket.to(queueId).emit("joined-queue", { queueId, queueCount, lastTicket });
        console.log(queueId, queueCount, lastTicket);
        console.log("user joined queue:", queueId);
    });

    socket.on("change-counter-status", ({ queueId, status }) => {
        console.log(`O / C ${status}`);
        socket.to(queueId).emit("counter-status-changed", { queueId, status })
    });

    socket.on("cancel-ticket", ({ queueId, queueCount, type, ticket }) => {
        console.log("cancel ticket", queueId, type, ticket);
        socket.to(queueId).emit("cancelled-ticket", { queueId, queueCount, type, ticket })
    });

    socket.on("add-or-delete-counter", ({ queueId, type, counter }) => {
        console.log(queueId, type, counter);
        socket.to(queueId).emit("added-or-deleted-counter", { type, counter })
    });

});

// routes

app.use("/auth", authRoutes);
app.use("/counters", counterRoutes);
app.use("/shops", shopRoutes);
app.use("/profile", profileRoutes);


// const __dirname = path.resolve();

// app.use(express.static(path.join(__dirname, '../client')));

// // Serve static files from the 'server/files' directory
// app.use('/files', express.static(path.join(__dirname, 'files')));



server.listen(process.env.SERVER_PORT || 5500, () => {
    console.log("server on port 5500");
});