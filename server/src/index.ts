import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes";
import dataRouter from "./routes/data.routes";
import orgRouter from "./routes/org.routes";
import projectRouter from "./routes/project.routes";
import settingsRouter from "./routes/settings.routes";
import { env } from "./utils/env";

const app = express();
const port = Number(env.PORT || 4000);

app.use(cors({ origin: env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", dataRouter);
app.use("/", orgRouter);
app.use("/", projectRouter);
app.use("/", settingsRouter);

app.listen(port, () => {
  env.NODE_ENV !== "production" && console.log("Server running on port:", port);
});
