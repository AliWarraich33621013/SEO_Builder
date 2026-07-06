# Publishing SEO Builder to npm

Public MIT packages under the `@seo-builder` scope (plus `create-seo-builder`).

## Prerequisites

1. [npm account](https://www.npmjs.com/signup) (free)
2. **Enable 2FA** on npm (required for publishing)
3. Log in locally:

```bash
npm login
npm whoami
```

For CI/GitHub Actions, create an **Automation** or **Publish** token at npm → Access Tokens → add as `NPM_TOKEN` repository secret.

## One-command publish (local)

From monorepo root, after tests pass:

```bash
pnpm install
pnpm test
pnpm check:publish
pnpm publish:packages
```

If npm 2FA is enabled (recommended), pass a one-time password from your authenticator app:

```bash
# PowerShell
$env:NPM_OTP="123456"; pnpm publish:packages

# bash
NPM_OTP=123456 pnpm publish:packages
```

Or publish a single package:

```bash
cd packages/core
npm publish --access public --otp=123456
```

This runs `scripts/publish-all.mjs` which:

1. Verifies `npm whoami`
2. Builds packages in order: core → ui → payload-plugin → next → create-seo-builder
3. Runs `check:publish` (fails if any package contains `workspace:`, `link:`, or `file:`)
4. Publishes each with `npm publish --access public`

## Manual publish (per package)

```bash
pnpm -r --filter "./packages/*" build

cd packages/core && npm publish --access public
cd ../ui && npm publish --access public
cd ../payload-plugin && npm publish --access public
cd ../next && npm publish --access public
cd ../create-seo-builder && npm publish --access public
```

## Verify on npm

| Package | URL |
|---------|-----|
| @seo-builder/core | https://www.npmjs.com/package/@seo-builder/core |
| @seo-builder/payload-plugin | https://www.npmjs.com/package/@seo-builder/payload-plugin |
| @seo-builder/ui | https://www.npmjs.com/package/@seo-builder/ui |
| @seo-builder/next | https://www.npmjs.com/package/@seo-builder/next |
| create-seo-builder | https://www.npmjs.com/package/create-seo-builder |

Search: https://www.npmjs.com/search?q=%40seo-builder

## Install in a client project

```bash
npm install @seo-builder/core @seo-builder/payload-plugin @seo-builder/ui @seo-builder/next
npx create-seo-builder@latest .
```

Or:

```bash
npm create seo-builder@latest .
```

See [PACKAGE_INSTALLATION.md](./PACKAGE_INSTALLATION.md).

## GitHub Actions release

1. Add `NPM_TOKEN` secret to the repository
2. Actions → **Release to npm** → Run workflow

## Version bumps

All packages ship at **0.1.1** for this release. For updates, bump version in each `packages/*/package.json` (or add Changesets later) before publishing.

## What gets published

Only `dist/` (and `templates/` for create-seo-builder). Source, tests, and demo app are **not** published.

## Troubleshooting

| Error | Fix |
|-------|-----|
| `EUNSUPPORTEDPROTOCOL workspace:` | Run `pnpm check:publish` — replace `workspace:*` with `^x.y.z` in `packages/*/package.json` before publishing |
| `EOTP` / 2FA | Set `NPM_OTP` env var with authenticator code |
| `402 Payment Required` on scoped package | Use `--access public` |
| `403 Forbidden` | Enable 2FA; use publish token |
| `You cannot publish over the previously published versions` | Bump version in package.json |
| `404 Not Found` on @seo-builder scope | First publish creates the scope with `--access public` |
