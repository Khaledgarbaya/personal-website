import { test, expect } from '@playwright/test';

// Key routes that must render, with a string that proves the right page loaded
// (not just a 200 for a soft-404 shell).
const KEY_PAGES: Array<{ path: string; expect: RegExp }> = [
  { path: '/', expect: /Latest writing/i },
  { path: '/blog', expect: /Blog/i },
  { path: '/til', expect: /TIL|Today I Learned/i },
  { path: '/about', expect: /about/i },
  { path: '/uses', expect: /uses/i },
  { path: '/newsletter', expect: /newsletter/i },
  { path: '/de/leistungen', expect: /Leistungen/i },
  { path: '/de/projekte', expect: /Projekte/i },
];

for (const { path, expect: content } of KEY_PAGES) {
  test(`renders ${path}`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status(), `${path} should return 2xx`).toBeLessThan(400);
    await expect(page.locator('body')).toContainText(content);
  });
}

test('main nav links to the blog', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Blog', exact: true }).first().click();
  await expect(page).toHaveURL(/\/blog\/?$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/Blog/i);
});

// Crawl internal links on the key pages and confirm none 404. Broken internal
// links are the most common rot in a content site — a moved post, a renamed tag.
test('has no broken internal links on key pages', async ({ page, request, baseURL }) => {
  const origin = new URL(baseURL!).origin;
  const checked = new Set<string>();
  const broken: string[] = [];

  for (const { path } of KEY_PAGES) {
    await page.goto(path);
    const hrefs = await page.locator('a[href]').evaluateAll(
      (as) => as.map((a) => (a as HTMLAnchorElement).href),
    );
    for (const href of hrefs) {
      if (!href) continue;
      const url = new URL(href, origin);
      if (url.origin !== origin) continue; // skip external links
      const key = url.pathname;
      if (checked.has(key)) continue;
      checked.add(key);

      const res = await request.get(url.toString());
      if (res.status() >= 400) broken.push(`${key} -> ${res.status()}`);
    }
  }

  expect(broken, `broken internal links:\n${broken.join('\n')}`).toHaveLength(0);
});
