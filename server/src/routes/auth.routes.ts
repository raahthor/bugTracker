import { Router, Request, Response } from "express";
import passport from "passport";
import "../auth/passport";
import handleLogin from "../controllers/handleLogin";
import createUser from "../controllers/createUser";
import handleGoogleCallback from "../controllers/handleGoogleCallback";
import handleLogout from "../controllers/handleLogout";
import { verifyCookie } from "../middlewares/verifyCookie";
import forgotPassword from "../controllers/forgotPassword";
import resetPassword from "../controllers/resetPassword";

const authRouter = Router();

authRouter.get("/api", (req, res: Response) => {
  res.send(
    "<h1>Hello, just hit the correct end point you're almost there!</h1>"
  );
});

authRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get("/auth/google/callback", handleGoogleCallback);

authRouter.post("/api/complete-profile", verifyCookie, createUser);
authRouter.post("/api/login", handleLogin);
authRouter.get("/api/logout", handleLogout);

authRouter.post("/api/forgot-password", forgotPassword);
authRouter.patch("/api/reset-password", resetPassword);
export default authRouter;
