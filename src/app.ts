import express, { Application } from "express";
import morgan from "morgan";
import dotenv from "dotenv";

if(!process.env.NODE_ENV)    
    dotenv.config();


import fileRoute from "./routes/file.route";

const app: Application = express();


//settings
app.set("port", process.env.PORT || 4000);

//middlewares
app.use(morgan("dev"));
app.use(express.json({ limit: '10mb' }));

app.use("/api/v1/file", fileRoute);

export default app;