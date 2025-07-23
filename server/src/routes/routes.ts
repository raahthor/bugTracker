import { Router, Request, Response } from "express";
import { handleLogin } from "../controllers/handleLogin.controller";
import { createUser } from "../controllers/createUser.controller";
import passport from "passport";
import "../auth/passport";
import { User } from "../types/user";
import { generateToken } from "../auth/jwt";

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

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/auth/failure",
  }),
  (req: Request, res: Response) => {
    const user = req.user as User;
    const token = generateToken(user);

    res.json({ user });
  }
);

router.get("/auth/failure", (req, res) => {
  res.send("Authfailed");
});

router.get("/api/sign-up", createUser);
router.post("/api/login", handleLogin);

export default router;
