import { test, expect } from "@playwright/test";

test.describe("Archive Page", () => {
  test("should load and display memes", async ({ page }) => {
    await page.goto("http://localhost:5173/home/archive");

    await page.waitForSelector('[data-testid="meme-card"]', { timeout: 5000 });

    const memeCards = await page.locator('[data-testid="meme-card"]').count();
    expect(memeCards).toBeGreaterThan(0);
  });

  test("should search memes by tag", async ({ page }) => {
    await page.goto("http://localhost:5173/home/archive");

    await page.fill('input[placeholder="Search tags"]', "react");
    await page.keyboard.press("Enter");

    await expect(page).toHaveURL(/.*tags=react/);

    await page.waitForTimeout(1000);
  });

  test("should filter by date range", async ({ page }) => {
    await page.goto("http://localhost:5173/home/archive");

    await page
      .locator("button")
      .filter({ has: page.locator("svg") })
      .first()
      .click();

    await page.waitForSelector(".mantine-Menu-dropdown", { timeout: 2000 });

    await page.locator(".mantine-DatePicker-day").first().click();

    await page.locator(".mantine-DatePicker-day").nth(10).click();

    await page.waitForTimeout(1000);

    expect(page.url()).toContain("dateFrom");
  });

  test("should toggle sort by votes/date", async ({ page }) => {
    await page.goto("http://localhost:5173/home/archive");

    await page.waitForSelector('[data-testid="meme-card"]');

    await page.locator(".mantine-Switch-root").click();

    await page.waitForTimeout(1500);

    const firstMeme = await page.locator('[data-testid="meme-card"]').first();
    await expect(firstMeme).toBeVisible();
  });

  test("should clear search when input is emptied", async ({ page }) => {
    await page.goto("http://localhost:5173/home/archive");

    await page.fill('input[placeholder="Search tags"]', "test");
    await page.keyboard.press("Enter");

    await expect(page).toHaveURL(/.*tags=test/);

    await page.fill('input[placeholder="Search tags"]', "");

    await page.waitForTimeout(500);

    expect(page.url()).not.toContain("tags=");
  });
});
