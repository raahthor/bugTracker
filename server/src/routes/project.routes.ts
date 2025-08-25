import { Router } from "express";
import { verifyCookie } from "../middlewares/verifyCookie";
import createProject from "../controllers/createProject";
import sendProjectData from "../controllers/sendProjectData";
import createBug from "../controllers/createBug";
import assignBug from "../controllers/assignBug";
import closeBug from "../controllers/closeBug";

const projectRouter = Router();

projectRouter.post(
  "/api/project/:handle/create-project",
  verifyCookie,
  createProject
);
projectRouter.get("/api/project/:handle/:slug", verifyCookie, sendProjectData);
projectRouter.post(
  "/api/project/:handle/:slug/create-bug",
  verifyCookie,
  createBug
);
projectRouter.patch("/api/project/assign-bug", verifyCookie, assignBug);
projectRouter.patch("/api/project/close-bug", verifyCookie, closeBug);

export default projectRouter;
