import passport from "passport";
import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";
import prisma from "../utils/client";
import { env } from "../utils/env";

if (
  !env.GOOGLE_CLIENT_ID ||
  !env.GOOGLE_CLIENT_SECRET ||
  !env.GOOGLE_CALLBACK_URL
) {
  throw new Error("google's id or client not loaded");
}

passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: env.GOOGLE_CALLBACK_URL,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      try {
        const userEmail = profile.emails?.[0]?.value as string;
        if (!userEmail) return done(new Error("no email found"));

        let user = await prisma.users.findUnique({
          where: { email: userEmail },
        });

        if (!user)
          user = await prisma.users.create({
            data: {
              email: userEmail,
              avatar: profile.photos?.[0].value,
            },
          });

        done(null, user);
      } catch (error) {
        done(error as Error);
      }
    }
  )
);
