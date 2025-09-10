import { Router } from "express";
import { verifyCookie } from "../middlewares/verifyCookie";
import createOrganization from "../controllers/createOrganization";
import sendOrgData from "../controllers/sendOrgData";
import sendOrgsList from "../controllers/sendOrgsList";
import sendSearchOrg from "../controllers/sendSearchOrgs";
import joinOrganization from "../controllers/joinOrganization";
import removeUser from "../controllers/removeUser";

const orgRouter = Router();

orgRouter.post("/api/create-org", verifyCookie, createOrganization);
orgRouter.post("/api/join-org", verifyCookie, joinOrganization);
orgRouter.get("/api/org-data/:handle", verifyCookie, sendOrgData);
orgRouter.get("/api/orgs-list", verifyCookie, sendOrgsList);
orgRouter.get("/api/search-org/:title", verifyCookie, sendSearchOrg);
orgRouter.patch("/api/remove-user", verifyCookie, removeUser);

export default orgRouter;
