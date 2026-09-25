import { Page, expect } from "@playwright/test";

export const username = process.env.TEST_USERNAME!;
export const password = process.env.TEST_PASSWORD!;

export async function loginAsTestUser(page: Page) {
  console.log("username exists:", !!username);
  console.log("NODE_ENV:", process.env.NODE_ENV);

  page.on("response", async (response) => {
    if (response.request().method() === "POST") {
      console.log("POST:", response.status(), response.url());
    }
  });

  await page.getByRole("button", { name: "Login", exact: true }).click();

  console.log("cookies:", await page.context().cookies());
  console.log("url:", page.url());

  await page.goto("/");
  await page.getByRole("button", { name: "Login", exact: true }).click();
  await expect(page).toHaveURL("/login");
  await page.getByLabel("Username").fill(username);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Login", exact: true }).click();

  await expect(page).toHaveURL(`/u/${username}`);
}
