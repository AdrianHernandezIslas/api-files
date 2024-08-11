import express, { Application } from "express";
import { initializeApp } from "firebase/app";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

if (!process.env.NODE_ENV) dotenv.config();

initializeApp({
  apiKey: process.env.API_KEY_STORE,
  authDomain: process.env.AUTH_DOMAIN_STORE,
  projectId: process.env.PROJECT_ID_STORE,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
});

import fileRoute from "./routes/file.route";

const app: Application = express();

//settings
app.set("port", process.env.PORT || 4000);
app.use(cors());
//middlewares
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));

app.use("/api/v1/file", fileRoute);

export default app;
