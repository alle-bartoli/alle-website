# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [3.0.0] - 2026-03-06

### Changed

- **Full migration from Vite + Vike + React + MDX to vanilla SSG builder**
- Build pipeline replaced with custom Node.js script (`build.ts`)
- Typing animation rewritten from React component to vanilla JS (~2.3KB)
- CSS processing via Tailwind CLI instead of `@tailwindcss/vite` plugin
- Content format changed from `.mdx` to standard `.md`
- HTML templates replace React layout components
- Font loading via self-hosted `@font-face` instead of `@fontsource-variable`
- Dev server replaced with `browser-sync` + `chokidar`
- Deploy config switched to `wrangler.jsonc` for Cloudflare Pages

### Removed

- React, ReactDOM, `@mdx-js/react`, `@mdx-js/rollup` dependencies
- Vite, Vike, `vike-react` framework stack
- All runtime dependencies (0 runtime deps)

### Added

- `build.ts` SSG pipeline: markdown parsing, template injection, asset copying, CSS/JS compilation
- `dev.ts` dev server with file watching and live-reload
- `src/templates/base.html` and `src/templates/404.html` HTML templates
- `src/scripts/typing.ts` vanilla typing animation with sequential element reveal
- `wrangler.jsonc` for Cloudflare Pages deployment
- Self-hosted JetBrains Mono Variable font (`woff2`)

## [2.0.0] - 2025-01-14

### Changed

- Migrated from Next.js to Vite + Vike + React + MDX

## [1.0.0] - 2024-12-01

### Added

- Initial release with Next.js
