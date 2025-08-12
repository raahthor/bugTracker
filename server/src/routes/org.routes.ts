import { Router } from "express";
import { verifyCookie } from "../middlewares/verifyCookie";
import createOrganization from "../controllers/createOrganization";
import sendOrgData from "../controllers/sendOrgData";
import sendOrgsList from "../controllers/sendOrgsList";

const orgRouter = Router();

orgRouter.post("/api/create-org", verifyCookie, createOrganization);
orgRouter.get("/api/org-data/:handle", verifyCookie, sendOrgData);
orgRouter.get("/api/orgs-list", verifyCookie, sendOrgsList);

export default orgRouter;
