import { Router, Request, Response, NextFunction } from "express";
import sendUserData from "../controllers/sendUserData";
import { verifyCookie } from "../middlewares/verifyCookie";
import sendDashData from "../controllers/sendDashData";
import sendIssues from "../controllers/sendIssues";

const dataRouter = Router();

dataRouter.get("/api/user-data", verifyCookie, sendUserData);
dataRouter.get("/api/dashboard-data", verifyCookie, sendDashData);
dataRouter.get("/api/get-myissues", verifyCookie, sendIssues);

export default dataRouter;
