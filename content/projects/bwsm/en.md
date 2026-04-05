---
title: "bwsm"
description: "A lightweight CLI that injects Bitwarden Secrets Manager values into monorepo app processes."
date: "2026-04-03"
tags: ["TypeScript", "Bun", "Node.js", "CLI", "Bitwarden"]
image: "/banners/BWSM.png"
github: "byrafael/bwsm"
---

# bwsm

`bwsm` is an open-source CLI I built to make Bitwarden Secrets Manager easier to use in multi-app repositories.

Instead of manually exporting env vars per app or maintaining ad-hoc shell wrappers, `bwsm` resolves target-scoped secrets from a shared `bitwarden.config.ts` and injects them directly into the child process you run.

## Why I Built It

Monorepos usually have multiple services, each with different secret requirements. The common pain points are:

- repeating local bootstrap setup on every machine
- leaking too many secrets into processes that do not need them
- brittle scripts for switching contexts between apps

`bwsm` solves this by defining explicit targets and secret-selection rules once, then reusing them through a single command.

## Core Workflow

The project currently centers around three commands:

1. `bwsm run` injects selected secrets for one target and executes a child command.
2. `bwsm doctor` validates config, bootstrap env, SDK sync, and target selection in a stage-by-stage report.
3. `bwsm logout` clears local persisted SDK state for a target without revoking Bitwarden tokens.

This keeps daily usage simple while still making troubleshooting and local state management explicit.

## Technical Notes

`bwsm` is implemented in TypeScript and built with Bun/Node tooling. Internally, it handles:

- workspace and config discovery
- bootstrap env loading from process env and root `.env` files
- Bitwarden SDK sync through `@bitwarden/sdk-napi`
- target-level secret filtering (`projectIds`, `includeKeys`, `excludeKeys`)
- deterministic injected environment hashing (`BWSM_ENV_HASH`) and target labeling (`BWSM_TARGET`)

The codebase is intentionally compact and testable, with focused modules for CLI parsing, config validation, filtering, state handling, and command execution.

## Why This Project Matters

`bwsm` is the kind of tooling I care about most: small scope, high leverage, and immediately practical for real repositories.

It improves local developer experience while reducing mistakes around secret handling, and it gives teams a clean path to standardize Bitwarden-based runtime injection across apps.
