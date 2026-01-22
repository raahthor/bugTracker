import dotenv from "dotenv";
dotenv.config();

const isTest = process.env.NODE_ENV === "test";

const getEnv = (key: string): string | undefined => {
  const value = process.env[key];
  if (!value && !isTest) {
    throw new Error(`missing required env variable: ${key}`);
  }
  return value;
};

export const env = {
  // Google OAuth variables
  GOOGLE_CLIENT_ID: getEnv("GOOGLE_CLIENT_ID"),
  GOOGLE_CLIENT_SECRET: getEnv("GOOGLE_CLIENT_SECRET"),
  JWT_SECRET: getEnv("JWT_SECRET"),
  GOOGLE_CALLBACK_URL: getEnv("GOOGLE_CALLBACK_URL"),

  //  Brevo variables
  BREVO_API_KEY: getEnv("BREVO_API_KEY"),
  JWT_BREVO_SECRET: getEnv("JWT_BREVO_SECRET"),

  // Server variables
  DATABASE_URL: getEnv("DATABASE_URL"),
  DIRECT_URL: getEnv("DIRECT_URL"),
  CLIENT_URL: getEnv("CLIENT_URL"),
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
};
