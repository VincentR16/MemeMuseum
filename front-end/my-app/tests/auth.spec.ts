import { test, expect } from "@playwright/test";

test.describe("Authentication", () => {
  test("should open login modal and fill form", async ({ page }) => {
    await page.goto("http://localhost:5173/home/archive");

    await page.click("text=Login or Sign Up");

    await page.waitForTimeout(500);

    await page.fill(
      'input[placeholder="hello@mantine.dev"]',
      "test@example.com"
    );

    await page.fill('input[placeholder="Your password"]', "password123");

    await page.click('button:has-text("Login")');
    await page.waitForTimeout(1000);
  });
});

test("should show error with invalid credentials", async ({ page }) => {
  await page.goto("http://localhost:5173/home/archive");

  await page.click("text=Login or Sign Up");

  await page.waitForTimeout(500);

  await page.fill(
    'input[placeholder="hello@mantine.dev"]',
    "wrong@example.com"
  );
  await page.fill('input[placeholder="Your password"]', "wrongpassword");

  await page.click('button:has-text("Login")');

  await page.waitForTimeout(2000);

  await expect(
    page.locator("text=/error|invalid|incorrect|wrong|failed/i")
  ).toBeVisible({ timeout: 5000 });
});
