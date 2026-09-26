import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, ".env.test") });

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  webServer: [
    {
      command: "npm run dev",
      cwd: "../server",
      port: 4000,
      timeout: 120 * 1000,
      reuseExistingServer: !process.env.CI,
      env: {
        PORT: "4000",
        CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3000",
      },
    },
    {
      command: "npm run dev",
      cwd: "../client",
      port: 3000,
      timeout: 120 * 1000,
      reuseExistingServer: !process.env.CI,
      env: {
        PORT: "3000",
        NEXT_PUBLIC_CLIENT_URL:
          process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:3000",
        NEXT_PUBLIC_API_URL:
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
      },
    },
  ],
});
