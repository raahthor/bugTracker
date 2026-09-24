import test, { expect } from "@playwright/test";

test("login flow", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Login", exact: true }).click();
  await expect(page).toHaveURL("/login");

  await page.getByLabel("Username").fill(process.env.TEST_USERNAME!);
  await page.getByLabel("Password").fill(process.env.TEST_PASSWORD!);
  await page.getByRole("button", { name: "Login", exact: true }).click();

  await expect(page).toHaveURL("/u/" + process.env.TEST_USERNAME);
});
