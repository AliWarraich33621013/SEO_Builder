# Package Roadmap — SEO Builder

This monorepo delivers **package-ready local workspace** structure. npm publishing is a future phase.

## Current state (v0.1.0 workspace)

| Package | Status |
|---------|--------|
| `@seo-builder/core` | AI, SEO, config, validation, rate limit |
| `@seo-builder/payload-plugin` | Collections, globals, AI Assistant |
| `@seo-builder/ui` | Blog components, theme provider |
| `@seo-builder/next` | API routes, sitemap, robots, queries |
| `create-seo-builder` | Minimal CLI — wrapper scaffolding only |
| `apps/demo-next-payload-app` | Reference integration |

## Before npm publish

- [ ] Changesets / semver strategy
- [ ] CI matrix (Node 20+, pnpm, build all packages)
- [ ] Publish `dist/` only; peer dependency compatibility matrix (Payload 3.x, Next 15.x)
- [ ] E2E test: `create-seo-builder` on fresh Next + Payload app
- [ ] Replace any temporary globals with factory APIs
- [ ] License / entitlement system
- [ ] Component override API
- [ ] Redis-backed rate limiting
- [ ] Remove demo-specific paths from published packages

## Future product

- **CLI expansion** — optional full starter (not in v0.1 scope)
- **SaaS tier** — hosted AI, analytics (separate product)
- **Template marketplace** — blog layouts, industry themes
- **npm scope** — `@seo-builder/*` on npm registry

## Versioning plan

- `0.x` — workspace-only, breaking changes allowed
- `1.0.0` — first npm publish with stable factory APIs and peer dep matrix

## Contributing to packages

1. Change code in `packages/<name>/src/`
2. Run `pnpm test` and `pnpm build` from root
3. Verify demo app: `pnpm dev` + smoke checklist in [QUICKSTART.md](./QUICKSTART.md)

See legacy [ROADMAP.md](./ROADMAP.md) for product feature history.
