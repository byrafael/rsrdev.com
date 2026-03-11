---
title: "CodexUsage"
description: "A Bun-based Codex usage monitor with live web dashboards, a terminal CLI, and Picture-in-Picture recorder views."
date: "2026-03-08"
tags: ["TypeScript", "Bun", "CLI", "Observability", "HTML/CSS"]
image: "/banners/CodexUsage.png"
github: "byrafael/CodexUsage"
---

# CodexUsage

CodexUsage is a local monitoring tool I built to answer a very practical question: how much Codex budget have I burned today, in the current session window, and across the current week?

The repository is intentionally small and direct. Instead of adding a database, a hosted backend, or a frontend framework, it runs as a single Bun server plus a lightweight CLI. The goal is fast feedback and zero ceremony.

## What The Repo Actually Does

The current version grew quickly between **March 2, 2026** and **March 8, 2026**. It started as a simple usage dashboard and expanded into a multi-surface monitor:

- **`/` overview dashboard:** A live browser dashboard with top-line counters and separate session / weekly window cards.
- **`/session`, `/day`, `/week`:** Focused pages for the specific window you care about while working.
- **`/day/rec`, `/week/rec`, `/session/rec`:** Recorder pages that render a canvas-backed video stream and can be popped into Picture in Picture.
- **`bun cli`:** A terminal dashboard that polls the same API and supports modes like `day`, `week`, `all`, `--range`, and `--12hr`.

That split is what makes the project feel true to the repo. It is not just "a dashboard"; it is a monitor with multiple surfaces for different working contexts.

## Architecture

The implementation is more interesting than the UI alone because it merges several real local data sources:

- **Codex app-server over stdio:** The Bun server spawns `codex app-server --listen stdio://` and requests rate-limit snapshots directly.
- **Local session logs:** It scans `~/.codex/sessions` and archived JSONL logs to reconstruct token usage by day and by model.
- **LiteLLM pricing data:** It fetches LiteLLM pricing metadata and estimates USD cost from the tracked input and output tokens.
- **Cached fallbacks:** Snapshot and pricing requests are cached so the UI can keep rendering even if one dependency is temporarily slow.

I like this architecture because it stays honest to the problem. The app is not pretending to be a SaaS product. It is a personal operations tool built around the sources Codex already exposes locally.

## Why The Repo Feels Good

The front-end choices match the tool:

- The main dashboard is a compact browser control panel.
- The focus views are minimal, dark, and designed to sit beside an editor without stealing attention.
- The recorder views are built for always-on visibility, especially when popped into Picture in Picture.

The codebase reflects that same pragmatism. Most of the logic lives in `server.ts`, the browser UI is plain HTML/CSS/JS in `public/`, and the CLI is a separate polling surface instead of a different app entirely.

## Why This Project Matters

CodexUsage is the kind of project I enjoy building most: small scope, sharp purpose, and directly useful in day-to-day work. It turns vague "I think I am using a lot of tokens" intuition into something visible, measurable, and hard to ignore.

It is also a good example of how much mileage you can get out of simple tools when the product boundary is clear: Bun, static files, a terminal renderer, local logs, and one API route are enough to make the whole thing feel complete.
