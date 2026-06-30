# Agent Guide

## Docs i18n architecture

The documentation site in `docs/` uses **Nextra 4** with the **content-directory convention** for i18n.

- Route handler: `docs/app/[lang]/[[...mdxPath]]/page.jsx`
- Layout + sidebar: `docs/app/[lang]/layout.jsx`
- Content lives in locale subfolders:
  - `docs/content/en/` — English pages
  - `docs/content/ar/` — Arabic pages
- Each locale needs a parallel file tree and `_meta.json` files for sidebar labels.

### Why locale subfolders?

Nextra 4 with the App Router does **not** support the older `page.ar.mdx` suffix approach for file-based routing. It resolves localized content via `importPage(path, lang)`, which loads from `content/<lang>/...`.

## Adding a new language

1. Add the locale to `docs/next.config.js`:

   ```js
   i18n: {
     locales: ['en', 'ar', 'fr'],
     defaultLocale: 'en'
   }
   ```

2. Add the locale to `docs/theme.config.jsx` so the language switcher shows it:

   ```jsx
   i18n: [
     { locale: 'en', name: 'English' },
     { locale: 'ar', name: 'العربية', direction: 'rtl' },
     { locale: 'fr', name: 'Français' }
   ]
   ```

3. Copy the entire `docs/content/en/` tree to `docs/content/<locale>/`.

4. Translate the `.mdx` files and the `_meta.json` sidebar labels as needed.

5. Update `docs/app/[lang]/layout.jsx` if the locale needs special layout handling (e.g. RTL is already handled for `ar`).

## Adding a new page

1. Create the English source file under `docs/content/en/` matching the desired URL path:

   ```
   docs/content/en/docs/my-topic.mdx  →  /en/docs/my-topic/
   docs/content/en/docs/my-topic/subpage.mdx  →  /en/docs/my-topic/subpage/
   ```

2. Create the same file under every other locale folder (`docs/content/ar/...`, etc.). It can be translated later; for now copy the English version so the route exists and does not 404.

3. Add the page to the relevant `_meta.json` files in every locale so it appears in the sidebar in the correct order.

4. Restart the dev server with a cache clear (see below) and verify the route renders.

## Updating content

- Edit the file in **every locale folder** you want to update.
- If a page only exists in one locale, the other locale will 404 for that route. Keep locales in sync by copying stubs.
- Relative links like `[link](docs/quick-start)` from `content/en/index.mdx` stay within the current locale. Absolute links like `/docs/quick-start` will drop the locale prefix and may 404.

## Common issue: dev server 500 after editing content

Symptom: pages return 500 with errors like `getPageMap(...)[lang] is not a function`, `importPage` failures, missing webpack chunks, or `Cannot find module './vendor-chunks/mermaid.js'`.

Cause: The Next.js dev cache in `docs/.next/` gets out of sync after content edits, especially with i18n + content directory. **Switching between `yarn build` (production export) and `yarn dev` without clearing `.next` is the most common trigger.** The two modes write conflicting chunk manifests into the same directory.

Fix:

```bash
cd docs
# Kill any stale Next.js processes first
lsof -ti:3000,3001,3002 | xargs kill 2>/dev/null
rm -rf .next
yarn dev
```

Always run a clean restart after adding/removing files, changing `_meta.json`, running `yarn build`, or seeing any 500/404 in dev.

## Verify before finishing

Run a production build to ensure all locales export correctly:

```bash
cd docs
yarn build
```

It should generate `out/en/` and `out/ar/` (plus any other locales) without 404s.
