import { test, expect } from "@playwright/test";

test.describe("Infinite Scroll", () => {
  test("should load memes progressively", async ({ page }) => {
    await page.goto("http://localhost:5173/home/archive");

    await page.waitForSelector('[data-testid="meme-card"]', { timeout: 5000 });
    await page.waitForTimeout(1500);

    const initialCount = await page
      .locator('[data-testid="meme-card"]')
      .count();
    console.log("Initial memes loaded:", initialCount);

    expect(initialCount).toBeGreaterThanOrEqual(3);

    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    await page.waitForTimeout(2000);

    const afterScrollCount = await page
      .locator('[data-testid="meme-card"]')
      .count();
    console.log("After scroll:", afterScrollCount);

    expect(afterScrollCount).toBeGreaterThanOrEqual(initialCount);

    expect(afterScrollCount).toBeLessThanOrEqual(10);
  });
});
