import { Router } from "express";
import { verifyCookie } from "../middlewares/verifyCookie";
import createProject from "../controllers/createProject";
import sendProjectData from "../controllers/sendProjectData";
import createBug from "../controllers/createBug";

const projectRouter = Router();

projectRouter.post("/api/:handle/create-project", verifyCookie, createProject);
projectRouter.get("/api/:handle/:slug", verifyCookie, sendProjectData);
projectRouter.post("/api/:handle/:slug/create-bug", verifyCookie, createBug);

export default projectRouter;
