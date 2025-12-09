---
title: "Kira"
description: "A community-funded Discord economy and server utility bot that ran across hundreds of servers."
date: "2025-12-09"
tags: ["TypeScript", "Node.js", "Discord.js", "Yarn", "PM2", "Canvas"]
image: "/banners/Kira.png"
pinned: true
order: 2
---

# Kira

Kira was one of my long‑running proprietary Discord bots and, for a while, the one I poured the most energy into. It started life under a different name ("Athena") and was later renamed after one of my dogs in late 2024. By the time I discontinued active development around mid‑2025, Kira had grown into a verified Discord bot that combined **economy mechanics** with **day‑to‑day server management tools** for hundreds of communities.

Unlike some of my later work that focuses on role‑play servers or very specific domains, Kira was built for **general communities** that wanted a sense of persistence and progression: people could earn currency over time, trade it, gamble it, and then spend it on meaningful perks inside their servers.

## What Kira Was

Kira sat at the intersection of **economy bot** and **server utility bot**:

- For some communities, it was the **main economy layer** — the thing that made showing up every day and hanging out feel rewarding.
- For others, it was part of the **mod‑and‑utilities stack**, handling small quality‑of‑life automation on top of its currency system.

The goal was always the same: give servers a way to **reward consistency and participation**, without turning everything into a grindy, joyless experience.

## What It Did

At a high level, Kira implemented a **lightweight but effective virtual economy** for non‑role‑play servers:

- **Daily income and streaks:** Members could claim daily rewards, build streaks, and earn baseline income just for showing up and participating.
- **Trading and gambling:** Users could trade currency, play simple games, and gamble a portion of their balance — all tuned to be fun rather than predatory.
- **Server‑defined perks:** Communities configured perks like VIP roles, cosmetic upgrades, image permissions, and other benefits that could be purchased with in‑server currency.
- **Retention‑oriented design:** The loops were intentionally simple but sticky: log in, earn, play a little, spend on perks that actually matter in that specific community.

On top of that, Kira shipped a set of **utility features** that helped keep servers organized and healthy — the kind of things you expect from a well‑rounded Discord bot at the time: basic moderation helpers, small automation tasks, and commands that made running a large server a bit less painful.

## Impact and Scale

Over its lifetime, Kira reached a scale that I’m still proud of:

- **~700 servers** used Kira at some point.
- Several of those servers had **2,000+ members** each.
- Overall, Kira reached roughly **50,000 distinct users**.
- It routinely handled **over 100,000 transactions and 150,000 interactions per day** across all guilds.
- It was **verified by Discord**, which both helped discoverability and pushed me to hold it to a higher bar of reliability.

One of the larger servers that ran Kira reported that they believed it had a **clear, positive impact on activity and retention**. The economy layer became a background heartbeat for the community: something that nudged people to come back, participate, and stick around, without ever being the only reason they were there.

Kira was also **community‑funded**. Hosting and infrastructure costs were covered by donations from server owners and users who wanted to keep the bot free and widely available. That support loop mattered a lot to me: the bot paid for itself because people actually valued what it was doing for their communities.

## Relationship to EconSys

Under the hood, Kira ran on top of a **proprietary economic engine** that later evolved into what I now call [**EconSys**](/projects/econsys).

- Kira consumed a **closed, internal API** for balances, permissions, and transaction flows.
- That same modeling work — users, balances, entitlements, policies, and purchase flows — is now being **rebuilt as an open‑source EconSys API**.

The original Kira codebase remains proprietary and is no longer maintained, but once EconSys’ public API is ready, most of what made Kira interesting from an economic perspective will effectively become **free open-source software**. In other words: while the bot itself is gone, its **core engine is being reborn** as a tool that others can use to build their own bots.

## Tech Stack

Kira used a stack that was pretty representative of how I liked to build Discord bots at the time:

- **Language:** TypeScript
- **Runtime:** Node.js, with **Yarn** for package management
- **Process manager:** **PM2** to keep shards and worker processes alive and restart on failure
- **Discord integration:** **Discord.js** on top of the Discord **Gateway** and **REST API**, with support for slash commands and high‑volume interaction handling
- **Rendering:** Canvas‑based image rendering (for things like profile cards and rich embeds) using libraries in the `canvas` ecosystem

Beyond the surface stack, the interesting part was always the **architecture of the economy itself**: rate‑limited commands, anti‑abuse checks, consistency guarantees for balances, and clear separation between **economy logic** and **Discord transport** so that the same ideas could be reused elsewhere.

## Why This Project Matters to Me

Even though Kira no longer runs in production, it represents a few things that are core to how I like to build systems:

- **Designing incentives, not just features:** The most important questions were always “What are we rewarding?” and “What behavior are we quietly nudging?” The bot needed to feel generous and fun without turning the server into a casino or a grind.
- **Earning and keeping trust:** Being verified, managing hundreds of thousands of interactions per day, and being relied on by thousands of people meant uptime, safety, and predictability were non‑negotiable.
- **Community‑first mindset:** Kira existed because communities wanted it, supported it, and proved there was real demand for thoughtful, well‑designed economy systems.
- **Foundation for future work:** The lessons from Kira directly shaped how I think about EconSys and other economic engines I’ve built since.

Kira is discontinued, but its DNA lives on: in the economic models I ship today, in how I approach incentives and retention, and eventually in the open‑source tools that will let other developers build bots that are just as trustworthy and community‑driven.

