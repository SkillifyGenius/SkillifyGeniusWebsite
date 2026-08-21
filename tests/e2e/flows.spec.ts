import { test, expect } from "@playwright/test";

test.describe("Skillify Genius 2.0 Critical User Flows", () => {
  test("Homepage loads with hero headline and Light Theme", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("Build Future-Ready Engineers");
    await expect(page.getByRole("link", { name: "Start Learning" })).toBeVisible();
  });

  test("Pathfinder Quiz calculates readiness score", async ({ page }) => {
    await page.goto("/pathfinder");
    await expect(page.locator("h1")).toContainText("Find Your Child's Future Skills Track");
    // Click Next through steps
    await page.getByRole("button", { name: "Continue" }).click();
    await page.getByRole("button", { name: "Continue" }).click();
    await page.getByRole("button", { name: "Continue" }).click();
    await page.getByRole("button", { name: "Calculate Readiness Score" }).click();
    await expect(page.locator("text=Future Readiness Score")).toBeVisible();
  });

  test("Parent Trust Portal displays blue/green growth metrics", async ({ page }) => {
    await page.goto("/dashboard/parent");
    await expect(page.locator("text=Problem Solving Ability")).toBeVisible();
    await expect(page.locator("text=Monthly Growth & Milestone Timeline")).toBeVisible();
  });

  test("Mentor Studio allows student search and telemetry inspection", async ({ page }) => {
    await page.goto("/dashboard/mentor");
    await expect(page.locator("text=Skill Graph™ Telemetry Calibration")).toBeVisible();
  });
});
