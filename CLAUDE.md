# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start Next.js dev server at localhost:3000
npm run build        # Static export to `out/` directory (output: 'export')
npm run start        # Production preview (requires build first)
```

No test runner, linter, or formatter is currently configured.

## Architecture

**SOFE COFFEE** — a bilingual (EN/ZH) static e-commerce showcase for a Hong Kong coffee brand, built with Next.js 15 (App Router, `output: 'export'`). Product links redirect to the real `sofecoffee.com` Shopify store. Dark-themed design with gold accent (`#c8a45c`).

### Project Structure

```
app/                    # Next.js App Router pages
  layout.js             # Root layout: LanguageProvider > Header + main + Footer
  page.js               # Home page: HeroBanner (auto-rotating), product sections by category, CreditSection
  globals.css           # Dark theme design tokens, reset, utility classes
  about/                # About SOFE (static content page)
  cart/                 # Empty cart placeholder (client component, uses i18n)
  collections/[slug]/   # Dynamic collection pages from generateStaticParams
  contact/              # Contact info (social links, email)
  interact/             # Firecrawl interactive demo playground (client-side, ~1100 lines)
  locations/            # Store locations grouped by HK area
  subscription/         # Subscription cards (drip bags + beans tiers)
components/             # Shared components
  Header.js             # Client component: nav, language toggle, search overlay, mobile hamburger menu
  Footer.js             # Client component: product links, social, payment methods
lib/                    # Data and utilities
  products.js           # ~45 static product objects + 7 categories + subscriptions + helpers
  i18n.js               # Language context (Context API) with en/zh translation map
  firecrawl.js          # Firecrawl SDK wrapper (scrape, interact, search) for sofecoffee.com
  locations.js          # 5 store locations in Hong Kong
```

### Key Patterns

- **i18n**: React Context via `LanguageProvider` wrapping root layout. `useTranslation()` returns `{ t, lang }` — call `t("key")` for translated strings. Toggle with `useLanguage().toggleLang()`. Translation map defined in `lib/i18n.js` — add keys to both `en` and `zh` objects.
- **Product data**: Static array in `lib/products.js`. Each product has `id`, `name`, `category`, `price`, `image`, `href` (external Shopify URL or "#"), optional `badge` and `originalPrice`. The `categories` array drives `generateStaticParams` for collection pages. Helper `getProductsByCategory(categoryId)` and `getCategoryBySlug(slug)`.
- **Collection pages** (`app/collections/[slug]/page.js`): Handle three states — unknown slug (fallback message), known slug with no products, and populated collection. `CollectionProductCard` renders as external `<a>` or internal `<Link>` depending on `href`.
- **Home page**: `HeroBanner` auto-rotates through 4 slides (5s interval) with dot navigation. `ProductSection` shows first 4 products per category with "View all →" link. `CreditSection` is a dark promo banner for Sofe Credits.
- **Search**: Client-side search overlay in Header — filters products array by name locally. No backend search.
- **Firecrawl integration**: `lib/firecrawl.js` wraps Firecrawl SDK with pre-built interaction flows (browse, add to cart, search, etc.) for `sofecoffee.com`. The `/interact` page is a full playground requiring `NEXT_PUBLIC_FIRECRAWL_API_KEY` — it manages browser sessions (start/stop), runs flow-specific prompts, and shows a crawl reference data browser.
- **Static export**: `next.config.js` sets `output: 'export'` and `images.unoptimized: true`. No API routes, no ISR, no middleware.
- **No TypeScript**: Pure JS with `jsconfig.json` mapping `@/*` to project root. `strict: false`.
- **Path alias**: `@/*` maps to project root (via `jsconfig.json`).

### Environment

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_FIRECRAWL_API_KEY` to use the interact page. The API key is client-side (`NEXT_PUBLIC_` prefix). The rest of the site works without it.

## Deployment (Cloudflare Pages)

This project is pre-configured for Cloudflare Pages static hosting.

### Build

```bash
npm run build          # Outputs to `out/` directory
```

### How to Deploy

**Option 1 — Git integration (recommended)**
1. Push the repo to GitHub
2. In Cloudflare Pages dashboard, connect your GitHub repo
3. Set build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
   - **Node.js version**: 18 or later (default is fine)
4. Deploy — Cloudflare automatically deploys on every `git push`

**Option 2 — Wrangler CLI**
```bash
npx wrangler pages deploy out/ --project-name sofe-coffee
```

### Notes

- `public/_headers` is included in the project — it defines security headers (X-Frame-Options, Permissions-Policy) and cache policies for HTML pages, Shopify CDN assets, and static files. Cloudflare Pages applies these automatically.
- Cloudflare Pages automatically strips `.html` extensions: `/about` serves `out/about.html` with no extra config needed.
- The site is fully static (no API routes, no middleware, no ISR), so it boots instantly on Cloudflare's edge network.