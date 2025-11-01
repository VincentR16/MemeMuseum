import { test, expect } from "@playwright/test";

test.describe("Meme Detail Page", () => {
  test("should open meme detail", async ({ page }) => {
    await page.goto("http://localhost:5173/home/archive");

    await page.waitForSelector('[data-testid="meme-card"]', { timeout: 5000 });

    await page.locator('[data-testid="meme-card"]').first().click();

    await expect(page).toHaveURL(/.*archive\/.+/);

    await page.waitForTimeout(1500);

    await expect(page.locator('[data-testid="meme-card"]')).toBeVisible();

    await expect(page.locator(".mantine-Divider-root").first()).toBeVisible();
  });

  test("should display comment list", async ({ page }) => {
    await page.goto("http://localhost:5173/home/archive");

    await page.waitForSelector('[data-testid="meme-card"]');
    await page.locator('[data-testid="meme-card"]').first().click();

    await page.waitForTimeout(1500);

    await expect(page.locator('[data-testid="comment-list"]')).toBeVisible();
  });
});
