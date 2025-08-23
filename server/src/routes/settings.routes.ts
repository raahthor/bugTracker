import { Router } from "express";
import { verifyCookie } from "../middlewares/verifyCookie";
import updateUser from "../controllers/updateUser";
import changePassword from "../controllers/changePassword";

const settingsRouter = Router();

settingsRouter.patch("/api/update-user", verifyCookie, updateUser);
settingsRouter.patch("/api/change-password", verifyCookie, changePassword);

export default settingsRouter;
