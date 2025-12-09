---
title: "Portfolio"
description: "My personal portfolio."
date: "2025-12-08"
tags: ["Typescript", "React", "Next.js", "Tailwind CSS", "Framer Motion"]
image: "/banners/Portfolio.png"
github: "byrafael/rsrdev.com"
demo: "rsrdev.com"
---

# Portfolio

The website you are seeing right now.

You can check out my design notes, the roadmap, and my future plans for this project [here](https://rsrdev.fibery.io/PAS/rsrdev.com-68?sharing-key=d088b3ed-e58b-4103-af41-d8e43f8e23a3).

## Journey

This is roughly my sixth developer portfolio, but it’s the first one where I went fully into pixel-perfect territory instead of “good enough for now.” It started as a simple "I just need a portfolio website to showcase my work and get hired" and then quietly spiraled into weeks of work, endless rewrites, an unhealthy amount of tweaking 1–2px at a time, and a definitely unhealthy amount of caffeine.

I’ve spent around 40+ hours on this sixth major iteration alone (the one living at [`byrafael/rsrdev.com`](https://github.com/byrafael/rsrdev.com/) and deployed to this site). That time includes actual coding, design explorations, and a surprising number of hours just staring at the ceiling, re-evaluating my life choices and whether that shadow really needed a 2% adjustment.

The entire website is obsessed with user experience: smooth interactions, meaningful motion, and layouts that feel intentional rather than accidental. It’s optimized to feel great on any device, whether you’re on a phone, a 4K monitor, your toaster, or whatever else you’ve somehow managed to install a browser on.

On the visual side, every project banner is designed by hand. I tried to automate banner generation, failed, and decided that burning time in Figma and image editors was a better use of my existence (for now). There are a *lot* of transitions and animations; realistically, there are probably too many, but at least they’re consistent.

## Tech Stack

I'm using TypeScript because I like type safety and also enjoy crying a little bit every time I run a production build. React and Next.js power the website because they give me a fast, flexible app router, great DX, and an ecosystem I'm already deeply comfortable and productive in. Bun handles the runtime and package management so development stays fast, batteries-included, and relatively painless.

- **Framework:** Next.js (App Router) with React
- **Language:** TypeScript (strict enough to hurt, helpful enough to keep)
- **Styling:** Tailwind CSS + custom design system
- **Animations:** Framer Motion for micro-interactions and page transitions
- **Layout / Widgets:** Packery for draggable and rearrangeable widgets
- **Tooling & DX:** Modern TypeScript toolchain, Bun as the runtime and package manager, Biome for linting and formatting, and enough config to ensure future-me can’t break everything too easily

## Features

- **Draggable widget grid:** A customizable dashboard of widgets you can drag, rearrange, and play with. Powered by Packery so the layout feels snappy instead of chaotic.
- **Live engineering signals:** Widgets pull data from WakaTime, GitHub contributions, CI/CD pipelines, and even my own servers, so the portfolio isn’t just static text; it’s a live view of how I work.
- **Engineer-centric storytelling:** Most widgets are designed to answer one question: "What kind of engineer is this person in practice?" They surface habits, projects, activity, and reliability instead of just buzzwords.
- **UX-first design:** Every screen, transition, and hover state is tuned to feel deliberate. The focus is on clarity, legibility, and flow, with motion that helps you understand what’s happening instead of just showing off.
- **Responsive everywhere:** The layout is optimized for all devices and breakpoints. Whether you’re on a phone, tablet, ultrawide monitor, or a smart fridge, the goal is that it still feels intentional and readable.
- **Probably too many animations:** Page transitions, subtle motions, hover effects — they’re everywhere. If you think there might be too many, you are absolutely not wrong. If you spot elements that feel like they *should* be animated but aren’t yet, you’ve just discovered the backlog.
 - **Multi-language experience:** The entire portfolio is available in English and Spanish, with cognitively translated content so both versions read naturally instead of like literal machine output.

This version of the portfolio is meant to be *the* reference version for me — the one that finally matches the effort I put into my work, both technically and visually.

## Recognition

I believe in giving credit and recognition where it's due, so here it is:

- **Portfolio inspiration:** The visual and structural direction is inspired by excellent portfolios from people like [Jason Cameron](https://jasoncameron.dev/), [Evan Boehs](https://boehs.org/), [Tri Ho](https://www.triho.dev/), [Alvina Yang](https://www.alvinayang.com/), [Sean Goedecke](https://www.seangoedecke.com/about), and others.
- **Icons:** Iconography is powered by [lucide](https://lucide.dev/) and [react-icons](https://react-icons.github.io/react-icons/).
- **Layout & theme origins:** The v1 color theme and initial layout for this iteration came from [v0](https://v0.dev/), then evolved through many rounds of my own tweaking and refinements.
- **Data sources:** Coding time and top languages are provided by [WakaTime](https://wakatime.com/). Commit and build information comes from GitHub. The page view counter is handled by [Abacus](https://v2.jasoncameron.dev/abacus/). Weather data is pulled from [Open-Meteo](https://open-meteo.com/). Uptime information is powered by [Better Stack](https://betterstack.com/) and custom scripts.
- **Content & translations:** Literal Spanish translations are powered by Google Translate and [google-translate-api-x](https://www.npmjs.com/package/google-translate-api-x/), while cognitive Spanish translations are powered by Claude Sonnet 4.5 / GPT-5.1 Pro and refined by me.
- **Widget inspiration:** The GitHub latest commits widget is inspired by [Jason Cameron](https://jasoncameron.dev/).

This project took far longer than a portfolio "should" take, but the result is something I’m genuinely proud of: a site that reflects how I think, how I build, and how seriously I take both engineering and design.

Also, if you ever find a mysterious comment in the codebase, just assume it’s either future-me arguing with past-me or a very advanced, extremely undocumented feature flag.