import dotenv from "dotenv";
dotenv.config();
export const env = {
  // Google OAuth
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  JWT_SECRET: process.env.JWT_SECRET,
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,

  //   Brevo variables
  BREVO_API_KEY: process.env.BREVO_API_KEY,
  JWT_BREVO_SECRET: process.env.JWT_BREVO_SECRET,

  // Server variables
  DATABASE_URL: process.env.DATABASE_URL,
  DIRECT_URL: process.env.DIRECT_URL,
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  CLIENT_URL: process.env.CLIENT_URL,
};
