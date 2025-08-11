import { Router } from "express";
import { verifyCookie } from "../middlewares/verifyCookie";
import createProject from "../controllers/createProject";
import sendProjectData from "../controllers/sendProjectData";

const projectRouter = Router();

projectRouter.post("/api/:handle/create-project", verifyCookie, createProject);
projectRouter.get("/api/:handle/:slug", verifyCookie, sendProjectData);
export default projectRouter;
