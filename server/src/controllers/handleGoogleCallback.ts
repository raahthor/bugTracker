import { Request, Response, NextFunction } from "express";
import passport from "passport";
import "../auth/passport";
import { User } from "../types/user.types";
import { generateToken } from "../auth/jwt";
import sendCookie from "../utils/sendCookie";

const clientUrl = process.env.FRONTEND_URL;

export default function handleGoogleCallback(
  req: Request,
  res: Response,
  next: NextFunction
) {
  passport.authenticate(
    "google",
    { session: false },

    (err, userPayload, info) => {
      if (err || !userPayload)
        return res.status(400).json({
          success: false,
          message: "Authorization failed :" + err.message,
          data: null,
        });

      const user = userPayload as User; // removed newUser flag for now
      const token = generateToken(user.id, user.email);

      sendCookie(res, token);
      res.redirect(`${clientUrl}/u/${user.username}`);
      // res.status(newUser ? 201 : 200).json({
      //   success: true,
      //   message: newUser ? "Account created" : "Login successful",
      //   data: {
      //     newUser,
      //     user,
      //   },
      // });
    }
  )(req, res, next);
}
