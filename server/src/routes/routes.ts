import { Router, Request, Response, NextFunction } from "express";
import passport from "passport";
import "../auth/passport";
import { handleLogin } from "../controllers/handleLogin";
import { createUser } from "../controllers/createUser";
import handleGoogleCallback from "../controllers/handleGoogleCallback";

const router = Router();

router.get("/api", (req: Request, res: Response) => {
  res.send(
    "<h1>Hello, just hit the correct end point you're almost there!</h1>"
  );
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/auth/google/callback", handleGoogleCallback);

router.get("/auth/failure", (req, res) => {
  res.send("Authfailed");
});

router.get("/api/sign-up", createUser);
router.post("/api/login", handleLogin);

export default router;
