import { Page, expect } from "@playwright/test";

export const username = process.env.TEST_USERNAME!;
export const password = process.env.TEST_PASSWORD!;

export async function loginAsTestUser(page: Page) {
  await page.goto("/");
  await page.getByRole("button", { name: "Login", exact: true }).click();
  await expect(page).toHaveURL("/login");
  await page.getByLabel("Username").fill(username);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Login", exact: true }).click();

  await expect(page).toHaveURL(`/u/${username}`);
}
