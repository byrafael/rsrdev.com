# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project overview

- Personal portfolio site for Rafael Soley, deployed at `rsrdev.com`.
- Built with **Next.js 16 App Router**, **React 19**, **TypeScript**, **Tailwind CSS 4**, and a custom component library based on Radix UI.
- Content is fully bilingual (English/Spanish) and driven by a central `translations` object plus some filesystem-based markdown content for projects.
- The repository is **All Rights Reserved** (see `LICENSE`); do not copy code or content into other projects.
- For a detailed non-code breakdown (tech stack, features, design rationale), see the portfolio page and external docs linked from `README.md`.

## Core commands

Prefer **Bun** for both runtime and package management. You can still use `npm`-style commands if needed, but when running commands programmatically or from agents, default to `bun`.

- **Install dependencies**
  - `bun install`
- **Run the dev server**
  - `bun run dev`
  - Next.js dev server on `http://localhost:3000`.
- **Build for production**
  - `bun run build`
- **Run the production server (after build)**
  - `bun run start`
- **Lint / static analysis (Biome)**
  - Check only: `bun run lint`
  - Auto-fix safe issues: `bun run lint:fix`
  - Auto-fix including unsafe transforms: `bun run lint:unsafe`
- **Format code (Biome)**
  - `bun run format`
- **Type checking**
  - There is no dedicated script; use `bun x tsc --noEmit` (or `npx tsc --noEmit`) if you need an explicit type-check step. `next build` also performs type checking unless disabled.
- **Tests**
  - As of this version there is no test runner or test script configured (no Jest/Vitest/Cypress configs and no `test` script in `package.json`). Before you can run a single test, you will need to introduce a testing framework and corresponding scripts (prefer `bun test` / `bun run test` once added).

## Runtime configuration and external services

These APIs power the home page widgets and require environment variables in `.env.local` (or your deployment environment):

- **GitHub activity widgets** (`/api/github`, `/api/github/status`)
  - Env: `GITHUB` — a GitHub personal access token with read access to public data.
  - `/api/github`
    - Fetches recent public events for the `byrafael` account, deduplicates recent push events, and then fetches detailed commit data (including stats) for up to 5 commits.
  - `/api/github/status`
    - Fetches the latest GitHub Actions workflow run for `byrafael/rsrdev.com` and exposes status, conclusion, branch, timestamps, and commit message for the "Latest Build" widget.
- **Coding time / WakaTime replacement widget** (`/api/wakatime`)
  - Env: `WAKA_KEY` — bearer token for the Hackatime API.
  - Calls `https://hackatime.hackclub.com/api/v1/stats`, reshapes the stats into total seconds, language breakdown, and a human-readable duration string. The raw response is also included under `debug` for troubleshooting.
- **Ops & uptime widget** (`/api/ops/stats`)
  - No secrets required, but it calls two external endpoints:
    - `https://cdn.rsrdev.com/ops/core/status` for live connection and ping metrics.
    - `https://rsrdev.betteruptime.com` for status and uptime, parsed from the Better Stack status page HTML.
  - Uses `google-translate-api-x` to translate the Better Stack status message into Spanish (`statusTextEs`) when available.
  - Returns: live connection count, ping, derived uptime%, status enum (`ok`/`issue`), and optional English/Spanish status text.
- **Weather widget** (`/api/weather`)
  - No secrets required.
  - Calls Open-Meteo with hard-coded coordinates for San José, Costa Rica and returns current temperature and `weather_code` for icon selection.

If any required env var is missing, the corresponding API route returns a `500` JSON error; the rest of the site continues to render, but specific widgets will show loading or empty states.

## High-level architecture

### Routing and layouts (Next.js App Router)

- The app uses the App Router via the top-level `app/` directory.
- `app/layout.tsx` defines the root HTML shell and wraps all pages with:
  - Google fonts (`Inter`, `JetBrains_Mono`) loaded via `next/font` and wired into CSS variables used by Tailwind.
  - `ThemeProvider` from `components/theme-provider.tsx` (thin wrapper around `next-themes`) for light/dark mode.
  - `LanguageProvider` from `lib/language-context.tsx` to manage the current language and expose it via context.
  - Global navigation (`components/sections/navigation.tsx`), footer, `FloatingPills` (theme/language quick controls), and Vercel Analytics.
- Main top-level routes under `app/`:
  - `/` → `app/page.tsx`: home page with hero, widget grid, and pinned projects.
  - `/about` → `app/about/page.tsx`: about-page content plus tech stack, using translation-driven copy.
  - `/experience` → `app/experience/page.tsx` → `ExperienceList`.
  - `/education` → `app/education/page.tsx` → `EducationList`.
  - `/credentials` → `app/credentials/page.tsx` → `CredentialsList`.
  - `/projects` → `app/projects/page.tsx` → `ProjectList`.
  - `/projects/[slug]` → markdown-backed project detail pages (see below).

### Internationalization and content model

The site is fully bilingual and avoids hard-coded English/Spanish strings in UI components.

- **Language context**
  - `lib/language-context.tsx` exposes `language: "en" | "es"` and `setLanguage(lang)` via React context.
  - Language preference is persisted in `localStorage` under the `language` key, and the provider delays rendering until mounted to avoid hydration mismatches.
- **Translations lookup**
  - `lib/translations.ts` contains all structured copy for both locales, grouped by feature (navigation, hero, experience, projects, education, certificates, research, widgets, etc.).
  - `hooks/use-translation.ts` reads the current language from `LanguageContext` and returns the appropriate branch of the `translations` object.
  - Many "data" concepts (experience timeline, education history, credentials list) are embedded directly in this translations file and then transformed into richer domain models.
- **Derived content utilities**
  - `lib/experience-data.ts`, `lib/content-data.ts`, and `lib/date-formatter.ts` convert the raw translation JSON into strongly-typed objects, apply sorting (e.g., reverse-chronological by date), and compute ranges like “start–end” or “start–Present” in the correct locale.
  - UI components such as `ExperienceList`, `EducationList`, and `CredentialsList` consume these transformed structures, not the raw translation data.

**Implication for future changes:**

- To change CV-style content (jobs, roles, education, certificates), update the relevant arrays in `lib/translations.ts`; the UI will update automatically.
- Only add new human-readable copy to components when it is truly one-off. For anything user-facing that might need localization in the future, extend `translations.ts` and use `useTranslation()`.

### Project content (markdown-backed)

Project cards and detail pages are powered by filesystem-based markdown files rather than hard-coded JSX.

- `lib/projects.ts`
  - Uses Node `fs` and `path` along with `gray-matter` to read markdown from `content/projects/<slug>/<language>.md`.
  - `getProjectSlugs()` enumerates subdirectories in `content/projects`.
  - `getProjectData(slug, language)` loads `<language>.md` for the requested slug, falling back to `en.md` when the target language file is missing.
  - Frontmatter is parsed into the `ProjectData` type, with fields like `title`, `description`, `date`, `tags`, `image`, `github`, `demo`, `pinned`, and `order`.
  - `getAllProjects(language)` returns all projects with the following sort priority:
    1. Pinned projects first, ordered by `order`.
    2. Unpinned projects with explicit `order` come next.
    3. Remaining projects sorted by `date` (most recent first).
- Usage:
  - List pages (`app/page.tsx`, `app/projects/page.tsx`) call `getAllProjects("en" | "es")` and pass results into `PinnedProjects` / `ProjectList`.
  - Detail route `app/projects/[slug]/page.tsx` loads both `en` and `es` versions, falls back when one language is missing, and passes them into `ProjectContent`.
  - `ProjectContent` uses `react-markdown` plus `remark-gfm`, `remark-math`, `rehype-raw`, and `rehype-katex` to render markdown with support for math and inline HTML, and then maps markdown elements onto the design system (headings, lists, blockquotes, code blocks, etc.).

**Implication for future changes:**

- To add a new project, create a folder under `content/projects/<slug>` with at least `en.md` (and optionally `es.md`), include frontmatter matching `ProjectData`, and the site will generate list and detail views automatically.
- If you need additional per-project fields, extend `ProjectData` and update both the markdown frontmatter and the consuming components.

### Widget system and API integration

Dynamic widgets on the home and about pages are powered by a shared client-side data context.

- **WidgetDataContext** (`lib/widget-data-context.tsx`)
  - Client-only React context that holds the latest values for:
    - WakaTime/Hackatime coding stats
    - Weather
    - Recent GitHub commits
    - Latest GitHub Actions build status
    - Ops status (connections, uptime, latency)
  - On mount, performs parallel `fetch` calls to the `/api/*` routes, updates the context, and tracks per-widget loading flags.
  - `useWidgetData()` throws if used outside the provider, enforcing correct composition.
- **Widgets grid** (`components/sections/widgets-grid.tsx`)
  - Layouts the individual widgets into a draggable Packery grid with Draggabilly integration, initialized client-side only after mount to avoid SSR issues.
  - Individual widgets:
    - **WakaTimeWidget** — displays total coding time and range label using translation keys; currently hard-codes the hours string alongside the live range from the API.
    - **LocationWidget** — displays a rotating Cobe globe centered on Costa Rica, local time in `America/Costa_Rica`, and weather data (icon + label + temperature) derived from `weatherCode`.
    - **GithubWidget** — lists recent commits (repo badge, message, additions/deletions) with a tooltip crediting `jasoncameron.dev` for the idea.
    - **BuildStatusWidget** — uses build status enums to determine the colored dot and animation, plus a humanized "time since" via `date-fns` (`formatDistanceToNow`) in the appropriate locale.
    - **UptimeWidget** — shows current ops status text (with Spanish translation when available), current connection count, average uptime percentage, and ping.
- `WidgetDataProvider` is used in `app/page.tsx` and `app/about/page.tsx` to wrap the sections that consume widget data.

**Implication for future changes:**

- When adding new widgets, prefer extending `WidgetDataContext` and wiring a new `/api/*` route rather than embedding API calls in individual components.
- Be mindful that all current widget fetches run on initial client mount; if you add heavier integrations, consider staggering or memoizing requests.

### Design system and styling

- Styling is handled via **Tailwind CSS 4** configured directly in `app/globals.css` using the new `@import "tailwindcss"` and `@theme inline` APIs.
- Global CSS variables define semantic design tokens for backgrounds, text, borders, charts, and sidebar/brand colors in both light and dark modes.
- The `components/ui/` directory contains a reusable component library (buttons, cards, dialogs, sheets, navigation menu, etc.), many of which wrap Radix UI primitives and unify styling.
- Helper utilities:
  - `lib/utils.ts` exposes `cn` (Tailwind-aware class merger) and `getTagStyles()` which deterministically derives a hue from a tag name for colored tag badges, plus `formatDate()` for human-friendly dates.
- Navigation (`components/sections/navigation.tsx`) is translation-driven, uses `usePathname()` to render breadcrumb-like path segments, and reuses `Sheet` and `Button` components for the mobile menu.

## How to approach common modifications

These patterns recur in the codebase and are useful for future changes:

- **Adding or changing textual content**
  - First look in `lib/translations.ts` for the corresponding section (navigation, hero, about, experience, projects, education, certificates, widgets, etc.).
  - Update both `en` and `es` branches to keep locales in sync, then consume via `useTranslation()`.
- **Adding a new resume item (experience/education/credential)**
  - Modify the structured arrays in `lib/translations.ts` under `experience.jobs`, `education.list`, or `certificates.list`.
  - Sorting and formatting are handled by the respective transformer utilities (`experience-data.ts`, `content-data.ts`), so you rarely need to change the UI components.
- **Adding a new project**
  - Create markdown under `content/projects/<slug>/<language>.md` with frontmatter matching `ProjectData`.
  - Ensure `slug` matches the folder name and that `date` is ISO-8601 so sorting behaves correctly.
- **Adding a new widget**
  - Extend `WidgetData` and `WidgetDataContext` in `lib/widget-data-context.tsx`, add a new `/app/api/.../route.ts` to source data, then create a new widget component inside `components/sections/widgets-grid.tsx` and register it as another `.grid-item`.

This should give future Warp agents enough context to navigate the project quickly, wire new features into the existing architecture, and respect the content and localization model already in place.
