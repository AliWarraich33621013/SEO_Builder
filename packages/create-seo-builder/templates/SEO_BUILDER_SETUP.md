# SEO Builder setup

Scaffolded by `create-seo-builder`.

## Important

`create-seo-builder` is an **add-on scaffolder** for an **existing** Next.js + Payload CMS project.
It does **not** create a full app — it only adds SEO Builder route wrappers, config, and setup files.

If you ran this in an empty folder, you still need your own Next.js + Payload project first.

## 1. Run inside your project root

Use the directory that already contains your `package.json`, `next.config.ts`, and `payload.config.ts`.

## 2. Install SEO Builder packages

```bash
npm install @seo-builder/core@^0.1.1 @seo-builder/payload-plugin@^0.1.1 @seo-builder/ui@^0.1.1 @seo-builder/next@^0.1.1
```

## 3. Configure Payload + Next.js

Full guide:
https://github.com/AliWarraich33621013/SEO_Builder/blob/main/PACKAGE_INSTALLATION.md

1. Add `seoBuilderPlugin()` to `payload.config.ts`
2. Add `transpilePackages` for `@seo-builder/*` in `next.config.ts`
3. Review the scaffolded blog, sitemap, robots, and API route files
4. Configure `seo-builder.config.ts` and `.env` (see `SEO_BUILDER_ENV.example`)

## 4. Start your app

```bash
npm run dev
```

Then open your SEO Builder dashboard (default `/seo-admin`) and public blog (default `/blog`).
