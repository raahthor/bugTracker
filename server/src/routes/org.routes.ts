import { Router } from "express";
import { verifyCookie } from "../middlewares/verifyCookie";
import createOrganization from "../controllers/createOrganization";

const orgRouter = Router();

orgRouter.post("/api/create-org", verifyCookie, createOrganization);

export default orgRouter;
