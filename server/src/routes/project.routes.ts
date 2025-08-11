import { Router } from "express";
import { verifyCookie } from "../middlewares/verifyCookie";
import createProject from "../controllers/createProject";

const projectRouter = Router();

projectRouter.post("/api/:handle/create-project", verifyCookie, createProject);

export default projectRouter;
