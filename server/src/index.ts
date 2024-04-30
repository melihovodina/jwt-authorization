import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import router from "./router/index";
import { config } from "dotenv";
config({ path: "./other/.env" });

const app = express();
const PORT = process.env.PORT || 3000;
const DB = process.env.DB || "database link is not working";

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);

const startApp = async () => {
    try {
        await mongoose.connect(DB)
        app.listen(PORT, () => {console.log(`listening port ${PORT}`);});
    } catch (error) {
        console.log(error);
    }
}

startApp()