import {expect, test} from "@playwright/test";

test("filters exceptions and opens evidence", async ({page}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", {name:/Trust the outcome/})).toBeVisible();
  await page.getByRole("button", {name:"warning", exact:true}).click();
  await expect(page.getByRole("row", {name:/G-88311/})).toBeVisible();
  await expect(page.getByRole("row", {name:/G-88421/})).toHaveCount(0);
  await page.getByRole("row", {name:/G-88311/}).click();
  await expect(page.getByRole("heading", {name:"Processing lag"})).toBeVisible();
});

test("reconciles a manual mismatch and acknowledges it", async ({page}) => {
  await page.goto("/");
  await page.getByLabel("Promised amount").fill("75");
  await page.getByLabel(/Ledger amount/).fill("50");
  await page.getByRole("button", {name:"Run reconciliation"}).click();
  await expect(page.getByRole("status")).toContainText("Amount mismatch");
  await expect(page.getByText("Promised $75.00; ledger shows $50.00.")).toBeVisible();
  await page.getByRole("button", {name:"Acknowledge exception"}).click();
  await expect(page.getByRole("status")).toContainText("acknowledged");
});

test("validates invalid money input", async ({page}) => {
  await page.goto("/");
  await page.getByLabel(/Ledger amount/).fill("not-money");
  await page.getByRole("button", {name:"Run reconciliation"}).click();
  await expect(page.locator(".form-error")).toContainText("Ledger amount");
});

test("mobile has no document-level horizontal overflow", async ({page}, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "mobile-only assertion");
  await page.goto("/");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(overflow).toBe(false);
  await expect(page.getByRole("button", {name:"Run reconciliation"})).toBeVisible();
});
