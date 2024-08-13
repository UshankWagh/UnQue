import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config("../.env");

const dbUrl = process.env.MONGODB_URL;

mongoose.connect(dbUrl);

const unqDB = mongoose.connection;
unqDB.on("error", console.error.bind(console, "connection error:"));

unqDB.once("open", () => {
    console.log("Database Connected");
});

export default unqDB;