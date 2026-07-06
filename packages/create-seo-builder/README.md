# create-seo-builder

**Add-on scaffolder** for SEO Builder inside an **existing** Next.js + Payload CMS project.

This package does **not** create a full Next.js or Payload app. It adds route wrappers, config files, and setup docs to a project you already have.

## Usage

Run inside your Next.js + Payload project root (where `package.json` lives):

```bash
npx create-seo-builder@latest .
```

Or:

```bash
npm create seo-builder@latest .
```

You can also pass a target directory:

```bash
npx create-seo-builder@latest ./my-existing-app
```

## What it adds

- `seo-builder.config.ts`
- `app/blog/[[...slug]]/page.tsx`
- `app/sitemap.ts` and `app/robots.ts`
- `app/api/seo-builder/provider-info/route.ts`
- `SEO_BUILDER_SETUP.md` and `SEO_BUILDER_ENV.example`

## After scaffolding

Install SEO Builder packages:

```bash
npm install @seo-builder/core @seo-builder/payload-plugin @seo-builder/ui @seo-builder/next
```

Then follow [PACKAGE_INSTALLATION.md](https://github.com/AliWarraich33621013/SEO_Builder/blob/main/PACKAGE_INSTALLATION.md).

## Empty folder?

If there is no `package.json`, the CLI warns you and asks whether to continue. SEO Builder is meant for existing Next.js + Payload projects — use [Payload's create-payload-app](https://payloadcms.com/docs/getting-started/installation) or your own starter first.

Pass `--yes` to scaffold without prompting.

## Repository

https://github.com/AliWarraich33621013/SEO_Builder
