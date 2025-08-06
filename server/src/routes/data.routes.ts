import { Router, Request, Response, NextFunction } from "express";
import sendUserData from "../controllers/sendUserData";
import { verifyCookie } from "../middlewares/verifyCookie";

const dataRouter = Router();

dataRouter.get("/api/user-data", verifyCookie, sendUserData);

export default dataRouter;
