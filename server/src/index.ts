import express from "express";
import cors from "cors";

import dotenv from "dotenv";
import openAiRoutes from "./routes/openaiRoutes";

dotenv.config();

const app = express();
const portNum = process.env.PORT || 4000;
const CORS_ORIGIN = "http://localhost:5173";

app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());

app.use("/api", openAiRoutes);

app.listen(portNum, () => console.log("Server running..."));
