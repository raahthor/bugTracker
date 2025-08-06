import { Router, Request, Response, NextFunction } from "express";
import sendUserData from "../controllers/sendUserData";
import { verifyCookie } from "../middlewares/verifyCookie";
import sendDashData from "../controllers/sendDashData";

const dataRouter = Router();

dataRouter.get("/api/user-data", verifyCookie, sendUserData);
dataRouter.get("/api/dashboard-data",verifyCookie,sendDashData);

export default dataRouter;
