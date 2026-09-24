import test, { expect } from "@playwright/test";
import { loginAsTestUser, username } from "./helpers/auth";

test.describe("Dashboard & Sidebar Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsTestUser(page);
  });

  test("displays user dashboard with key sections and actions", async ({
    page,
  }) => {
    
    await expect(page.getByRole("heading", { name: /Welcome/i })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Recent Organizations" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Recent Bugs Assigned" }),
    ).toBeVisible();

    await expect(
      page.getByRole("link", { name: /Create Organization/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Join Organization/i }),
    ).toBeVisible();
  });

  test("navigates through sidebar links seamlessly", async ({ page }) => {

    await page.getByRole("link", { name: "Organizations" }).click();
    await expect(page).toHaveURL("/org");
    await expect(
      page.getByRole("heading", { name: "Organizations" }),
    ).toBeVisible();

    await page.getByRole("link", { name: "My Issues" }).click();
    await expect(page).toHaveURL("/my-issues");
    await expect(
      page.getByRole("heading", { name: "Bug(s) Assigned to you:" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Bug(s) Raised by you:" }),
    ).toBeVisible();

    await page.getByRole("link", { name: "Activites" }).click();
    await expect(page).toHaveURL("/activities");
    await expect(page.getByText("To be added")).toBeVisible();

    await page.getByRole("link", { name: "Dashboard" }).click();
    await expect(page).toHaveURL(`/u/${username}`);
    await expect(page.getByRole("heading", { name: /Welcome/i })).toBeVisible();
  });
});
