import { Router } from "express";
import { verifyCookie } from "../middlewares/verifyCookie";
import createProject from "../controllers/createProject";
import sendProjectData from "../controllers/sendProjectData";
import createBug from "../controllers/createTask";
import assignBug from "../controllers/assignTask";
import closeBug from "../controllers/closeTask";

const projectRouter = Router();

projectRouter.post(
  "/api/project/:handle/create-project",
  verifyCookie,
  createProject
);
projectRouter.get("/api/project/:handle/:slug", verifyCookie, sendProjectData);
projectRouter.post(
  "/api/project/:handle/:slug/create-task",
  verifyCookie,
  createBug
);
projectRouter.patch("/api/project/assign-task", verifyCookie, assignBug);
projectRouter.patch("/api/project/close-task", verifyCookie, closeBug);

export default projectRouter;
