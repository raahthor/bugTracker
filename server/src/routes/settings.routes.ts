import { Router } from "express";
import { verifyCookie } from "../middlewares/verifyCookie";
import updateUser from "../controllers/updateUser";
import changePassword from "../controllers/changePassword";
import sendOrgSetData from "../controllers/sendOrgSetData";
import updateOrg from "../controllers/updateOrg";
import softDeleteOrg from "../controllers/softDeleteOrg";
import sendSoftDeletedOrgs from "../controllers/sendSoftDeletedOrgs";
import recoverOrg from "../controllers/recoverOrg";

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

export default settingsRouter;
