---
title: "FlagifyTS"
description: "A TypeScript SDK for the self-hosted Flagify API, with typed resources, project-scoped clients, and runtime snapshot support."
date: "2026-03-23"
tags: ["TypeScript", "Bun", "SDK", "Feature Flags", "Zod"]
image: "/banners/FlagifyTS.png"
github: "byrafael/FlagifyTS"
---

# FlagifyTS

FlagifyTS is a TypeScript SDK I built for the self-hosted Flagify API.

The goal was simple: give Flagify users a clean, typed client they can drop into backend services, tools, and browser apps without rewriting request logic every time.

## What The SDK Covers

- **Root and admin flows:** manage projects, create keys, and handle platform-level operations.
- **Project-scoped flows:** use `client.project(projectId)` to work with flags, environments, segments, clients, identities, and change requests.
- **Runtime flows:** resolve bound config and fetch environment snapshots for real feature evaluation.
- **ETag-aware snapshots:** request snapshots with `ifNoneMatch` and skip unnecessary payload work when nothing changed.
- **Browser and server support:** use native `fetch` by default and inject a custom fetch implementation when needed.

## Implementation Notes

- Built with **Bun** and exported as **ESM**.
- Uses **Zod** schemas across resources for predictable request and response shapes.
- Exposes a single `FlagifyClient` entry point plus resource-specific clients under the hood.
- Keeps transport and resource logic separated so the SDK is easy to extend.

## Why This Project Matters

FlagifyTS turns a raw REST API into a practical developer interface.

Instead of manually wiring endpoints, auth headers, and validation in every service, teams can call a typed client and focus on product logic. This keeps feature-flag integrations faster to ship and easier to maintain.
