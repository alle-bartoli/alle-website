# Alle website

## Description

My personal portfolio built as a vanilla SSG (Static Site Generator) with zero runtime dependencies.

Markdown content is compiled to static HTML at build time. The only client-side JS is a ~2KB typing animation.

## Stack

- **Build**: Custom Node.js SSG pipeline (`build.ts`)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) via CLI
- **Content**: Markdown with [marked](https://marked.js.org/)
- **Bundling**: [esbuild](https://esbuild.github.io/)
- **Dev server**: [browser-sync](https://browsersync.io/) + [chokidar](https://github.com/paulmillr/chokidar)
- **Hosting**: [Cloudflare Pages](https://pages.cloudflare.com/)

## Getting Started

Requires **Node.js 22+**

```bash
# Install dependencies
pnpm install

# Development server with live-reload
pnpm dev

# Production build
pnpm build

# Preview production build
pnpm preview
```

## Deploy

- Build output: `dist/`
- Settings:
   - Build command: `pnpm build`
   - Output directory: `dist`

### Cloudflare Pages

```bash
npx wrangler pages deploy dist
```

## Project Structure

```
src/
├── content/home.md          # Portfolio content (markdown)
├── templates/
│   ├── base.html            # HTML layout with placeholders
│   └── 404.html             # Error page
├── scripts/typing.ts        # Typing animation (vanilla JS)
├── styles/globals.css       # Tailwind directives + custom CSS
└── fonts/                   # JetBrains Mono (self-hosted)
public/                      # Static assets (favicon, manifest, robots)
build.ts                     # SSG build pipeline
dev.ts                       # Dev server with live-reload
```

## License

[MIT](LICENSE)
