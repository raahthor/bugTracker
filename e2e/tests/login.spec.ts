import test, { expect } from "@playwright/test";
import { loginAsTestUser, username } from "./helpers/auth";

test.describe("Authentication Flows & Guards", () => {
  test("rejects invalid login credentials gracefully", async ({ page }) => {
    await page.goto("/login");

    await page.getByLabel("Username").fill("invalid_user");
    await page.getByLabel("Password").fill("wrongpassword123");
    await page.getByRole("button", { name: "Login", exact: true }).click();

    await expect(page).toHaveURL("/login");
  });

  test("logs out user and protects authenticated routes", async ({ page }) => {
    await loginAsTestUser(page);

    await page.getByRole("button", { name: username }).click();
    await page.getByRole("menuitem", { name: "Log out", exact: true }).click();

    await expect(page).toHaveURL("/login");

    await page.goto("/org");

    await expect(page).not.toHaveURL("/org");
  });
});
