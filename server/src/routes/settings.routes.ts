import { Router } from "express";
import { verifyCookie } from "../middlewares/verifyCookie";
import updateUser from "../controllers/updateUser";
import changePassword from "../controllers/changePassword";
import sendOrgSetData from "../controllers/sendOrgSetData";
import updateOrg from "../controllers/updateOrg";

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

export default settingsRouter;
