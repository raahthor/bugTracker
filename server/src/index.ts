import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/routes";

const app = express();
const port = Number(process.env.PORT || 400);

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", router);

app.listen(port, () => {
  process.env.NODE_ENV !== "production" &&
    console.log("Server running on port:", port);
});
