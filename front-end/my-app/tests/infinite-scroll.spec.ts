import { test, expect } from "@playwright/test";

test.describe("Infinite Scroll", () => {
  test("should load 3 memes at a time", async ({ page }) => {
    await page.goto("http://localhost:5173/home/archive");

    await page.waitForSelector('[data-testid="meme-card"]', { timeout: 5000 });
    await page.waitForTimeout(1500);

    const initialCount = await page
      .locator('[data-testid="meme-card"]')
      .count();
    console.log("Initial memes loaded:", initialCount);

    expect(initialCount).toBeGreaterThanOrEqual(3);
    expect(initialCount).toBeLessThanOrEqual(3);

    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(2000);

    const afterScrollCount = await page
      .locator('[data-testid="meme-card"]')
      .count();
    console.log("After first scroll:", afterScrollCount);

    expect(afterScrollCount).toBeGreaterThan(initialCount);
    expect(afterScrollCount).toBeLessThanOrEqual(9);

    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    await page.waitForTimeout(2000);

    const finalCount = await page.locator('[data-testid="meme-card"]').count();
    console.log("After second scroll:", finalCount);

    expect(finalCount).toBeGreaterThan(afterScrollCount);
  });
});
