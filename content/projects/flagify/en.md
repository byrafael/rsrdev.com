---
title: "Flagify"
description: "A self-hosted feature management API built in plain PHP, with identities, targeting, analytics, and runtime snapshots."
date: "2026-03-23"
tags: ["PHP", "MySQL", "REST API", "OpenAPI", "Feature Flags"]
image: "/banners/Flagify.png"
github: "byrafael/Flagify"
demo: "flagify.rsrdev.com"
---

# Flagify

Flagify is a self-hosted feature management platform I built as a plain PHP REST API.

The goal was simple: keep full control over feature-flag infrastructure without depending on a hosted SaaS vendor, while still supporting the workflows teams actually need in production.

## What The Project Covers

Flagify includes the full core model behind feature management:

- Projects with isolated environments (`development`, `staging`, and `production`)
- Flags with variants, prerequisites, expiration metadata, and stale-state reporting
- Identity-based evaluation with persistent traits and request-time trait overrides
- Reusable segments and environment-specific targeting rules
- Sticky percentage rollouts and scheduled activation windows
- Per-client overrides

It also includes operational capabilities that are usually missing from simple flag tools:

- Protected environments with change-request gating
- Audit logs for admin mutations
- Evaluation analytics grouped by flag and variant
- Deterministic import/export
- Code-reference ingestion to detect stale flags

## Runtime And Delivery

At runtime, Flagify provides environment-aware config resolution and a snapshot endpoint for local/offline evaluators.

The snapshot contract includes checksum-based caching (`ETag`), polling hints (`poll_ttl_seconds`), and compatibility metadata so SDK consumers can poll safely and keep serving the last known good configuration.

The API is documented with OpenAPI 3.1 (`openapi.yaml`) and includes Postman collections for local testing and onboarding.

## Technical Direction

I intentionally kept the stack straightforward:

- PHP 8.3+
- MySQL 8+
- PDO
- No Composer runtime dependency

That decision makes it easy to run in constrained or shared hosting environments while still keeping the domain model expressive and testable.

## Why This Project Matters

Flagify is a good example of how I approach backend systems: start from operational constraints, design for real production behaviors (not only happy-path CRUD), and keep the architecture understandable enough that a small team can self-host and evolve it confidently.
