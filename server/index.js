import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import unqDB from './config/db.js';
import counterRoutes from './routes/CounterRoutes.js'
import shopRoutes from './routes/ShopRoutes.js'
import profileRoutes from './routes/ProfileRoutes.js'
// import path from "path";

const app = express();

dotenv.config("./.env");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

unqDB;

// routes
// app.use("/get", getRoutes);

app.use("/counters", counterRoutes);
app.use("/shops", shopRoutes);
app.use("/profile", profileRoutes);


// const __dirname = path.resolve();

// app.use(express.static(path.join(__dirname, '../client')));

// // Serve static files from the 'server/files' directory
// app.use('/files', express.static(path.join(__dirname, 'files')));



app.listen(process.env.SERVER_PORT || 5500, () => {
    console.log("server on port 5500");
});