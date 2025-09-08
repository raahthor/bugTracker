import { Router } from "express";
import { verifyCookie } from "../middlewares/verifyCookie";
import updateUser from "../controllers/updateUser";
import changePassword from "../controllers/changePassword";
import sendOrgSetData from "../controllers/sendOrgSetData";
import updateOrg from "../controllers/updateOrg";
import softDeleteOrg from "../controllers/softDeleteOrg";
import sendSoftDeletedOrgs from "../controllers/sendSoftDeletedOrgs";
import recoverOrg from "../controllers/recoverOrg";
import sendProjSetData from "../controllers/sendProjSetData";
import updateProj from "../controllers/updateProj";
import deleteProject from "../controllers/deleteProject";

const settingsRouter = Router();

settingsRouter.patch("/api/settings/update-user", verifyCookie, updateUser);
settingsRouter.patch(
  "/api/settings/change-password",
  verifyCookie,
  changePassword
);
settingsRouter.get(
  "/api/settings/org-data/:handle",
  verifyCookie,
  sendOrgSetData
);
settingsRouter.patch("/api/settings/update-org", verifyCookie, updateOrg);
settingsRouter.delete(
  "/api/settings/delete-org/:orgId",
  verifyCookie,
  softDeleteOrg
);
settingsRouter.get(
  "/api/settings/soft-deleted-orgs",
  verifyCookie,
  sendSoftDeletedOrgs
);
settingsRouter.patch("/api/settings/recover-org", verifyCookie, recoverOrg);


settingsRouter.get(
  "/api/settings/proj-data/:handle/:slug",
  verifyCookie,
  sendProjSetData
);
settingsRouter.patch("/api/settings/update-proj", verifyCookie, updateProj);
settingsRouter.delete(
  "/api/settings/delete-proj/:projId",
  verifyCookie,
  deleteProject
);
export default settingsRouter;
