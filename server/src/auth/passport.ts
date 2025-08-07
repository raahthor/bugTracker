import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import prisma from "../utils/client";
import { User } from "../types/user";

if (
  !process.env.GOOGLE_CLIENT_ID ||
  !process.env.GOOGLE_CLIENT_SECRET ||
  !process.env.GOOGLE_CALLBACK_URL
) {
  throw new Error("google's id or client not loaded");
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done
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
        done(error);
      }
    }
  )
);
