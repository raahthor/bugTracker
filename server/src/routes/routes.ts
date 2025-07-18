import { Router, Request, Response } from "express";
import { handleLogin } from "../controllers/handleLogin.controller";
import { createUser } from "../controllers/createUser.controller";
const router = Router();

router.get("/api", (req: Request, res: Response) => {
  res.send("<h1>Hello, just hit the correct end point you're almost there!</h1>");
});

router.post("/api/sign-up", createUser);
router.post("/api/login", handleLogin);

export default router;
