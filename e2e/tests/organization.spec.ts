import test, { expect } from "@playwright/test";
import { loginAsTestUser } from "./helpers/auth";

test.describe("Organization Workflows", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsTestUser(page);
  });

  test("navigates across organization tools (create, join, recover)", async ({
    page,
  }) => {
    await page.goto("/org");
    await expect(page).toHaveURL("/org");

    const createBtn = page
      .getByRole("link", { name: "Create Organization" })
      .first();
    const joinBtn = page
      .getByRole("link", { name: "Join Organization" })
      .first();
    const recoverBtn = page
      .getByRole("link", { name: "Recover organizations" })
      .first();

    await expect(createBtn).toBeVisible();
    await expect(joinBtn).toBeVisible();
    await expect(recoverBtn).toBeVisible();

    await joinBtn.click();
    await expect(page).toHaveURL("/join-org");
    await expect(page.getByPlaceholder("Start typing...")).toBeVisible();

    await page.goto("/recover-orgs");
    await expect(page).toHaveURL("/recover-orgs");
    await expect(page.getByText("Recover Organizations")).toBeVisible();

    await page.goto("/create-org");
    await expect(page).toHaveURL("/create-org");

    await expect(page.getByText("Create Organization").first()).toBeVisible();
    const nameInput = page.getByLabel("Organization Name");
    const handleInput = page.getByLabel("Handle");
    const descInput = page.getByLabel("About Your Organization");
    const submitBtn = page.getByRole("button", { name: "Create Organization" });

    await expect(nameInput).toBeVisible();
    await expect(handleInput).toBeVisible();
    await expect(descInput).toBeVisible();
    await expect(submitBtn).toBeVisible();

    await nameInput.fill("abc");
    await handleInput.fill("testorg");
    await descInput.fill("This is a valid test organization description.");
    await submitBtn.click();

    await expect(
      page.getByText(/Name should be atleast 6 characters/i),
    ).toBeVisible();
    await expect(page).toHaveURL("/create-org");
  });
});
