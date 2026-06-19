# Lucky Beard — Product Detail Page

A React implementation of a product detail page, built to match the design and typography of [luckybeard.com](https://www.luckybeard.com/).

## Tech Stack

- **React 19** with TypeScript
- **Vite** — dev server and bundler
- **styled-components** — component-scoped styling with a shared theme
- **Zustand** — client-side state management
- **TanStack React Query** — server state and data fetching

## Features

### Product Detail Screen

- Product image gallery with selectable thumbnails
- Product info panel: name, category, SKU, price (with sale price support), stock level
- Star rating display with review count
- Quantity selector
- Add to cart and wishlist toggle
- Product tabs: description, specifications, reviews

### Cart

- Add to cart via `useCart` hook
- Coupon code input with discount application (`useCoupon` hook)
- Delivery estimator by postcode

## Architecture

```
src/
├── features/
│   ├── products/          # Product state, API, components, hooks
│   └── cart/              # Cart state, API, components, hooks
├── screen/
│   └── product.tsx        # Product detail page entry
├── shared/
│   ├── components/        # Button, Section, PageWrapper
│   └── typography/        # H1–H6, Body, Caption styled components
└── theme/
    ├── index.ts           # Design tokens (colors, fonts, radii, shadows, breakpoints)
    └── GlobalStyle.ts     # CSS reset and CSS custom properties
```

## Theming & Typography

The theme provides design tokens consumed via styled-components' `ThemeProvider`:

- **Colors**: brand, text, muted, surface, border
- **Font sizes**: xxsmall → xxxLarge
- **Font weights**: regular, medium, semiBold, bold
- **Radii**: sm, md, lg
- **Shadows**: card
- **Breakpoints**: sm (480px), md (768px), lg (1024px)

Typography components (`H1`–`H6`, `Body`, `Caption`) accept optional `color` and `weight` props mapped to theme tokens.

## Fonts

Fonts match the luckybeard.com site, loaded from Adobe Typekit:

| Font                     | Role              | Weights            |
| ------------------------ | ----------------- | ------------------ |
| `abacaxi-latin-variable` | Body / sans-serif | 100–800 (variable) |
| `ivypresto-headline`     | Headings / serif  | 300, 400, 600, 700 |

CSS custom properties `--font-sans` and `--font-serif` are exposed on `:root`.

## Getting Started

```bash
yarn install
yarn dev
```

```bash
yarn build   # production build
yarn preview # preview production build
```
