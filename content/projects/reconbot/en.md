---
title: "ReconBot"
description: "An economy and progression engine that connects ER:LC roleplay servers with their Discord communities."
date: "2025-12-09"
tags: ["TypeScript", "Discord.js", "Node.js", "Next.js", "Tailwind CSS"]
image: "/banners/ReconBot.png"
demo: "reconbot.xyz"
---

# ReconBot

ReconBot is a proprietary economy and progression engine I’m building for **Emergency Response: Liberty County** (ER:LC) roleplay communities. It sits between a community’s **Discord community** and their **private ER:LC game server**, making sure that roles, rewards, and permissions stay in sync, and that players feel like their time and effort actually matter.

Instead of every community re‑inventing a half‑manual system with spreadsheets, honor rules, and ad‑hoc scripts, ReconBot provides a single, opinionated layer that handles playtime‑based rewards, job salaries, and gated perks like exclusive vehicles, equipment, and teams.

![Website Screenshot](https://r2.e-z.host/6346c606-bcaf-419e-988b-b0df8a37d6c4/s0giiwjr.png)
<sub>Website screenshot as of December 9th, 2025</sub>

## Context

ER:LC is a Roblox roleplay game where players can be law enforcement officers, firefighters, EMTs, civilians, or criminals, and communities build entire roleplay structures on top of it. Those communities usually live on **Discord**, while the actual gameplay happens in their private ER:LC servers.

That split creates a familiar problem:

- Discord is where **ranks, jobs, and progression** are managed.
- ER:LC is where **time is spent, calls are run, and roleplay happens**.
- Keeping those two in sync is painful, error‑prone, and usually unfair to either staff or players.

ReconBot exists to bridge that gap. It treats the Discord server and the ER:LC game server as a single ecosystem, so that if you’re putting in the work in game, the Discord side actually recognizes and rewards you for it.

## What ReconBot Does

At a high level, ReconBot acts as an **economy engine and entitlement system** for ER:LC roleplay communities:

- **Playtime → earnings:** It tracks a player’s presence and activity on the ER:LC server and converts that into in‑game currency or credits.
- **Job‑based salaries:** Roleplay jobs (dispatch, police, fire, EMS, civilian roles, etc.) can pay recurring salaries, rewarding people for actually doing the work the community depends on.
- **Discord‑gated perks:** Buying a car, unlocking equipment, or joining certain teams requires that you’ve purchased the corresponding item in Discord or reached specific progression thresholds.
- **Role‑aware restrictions:** Certain vehicles or teams can be locked behind Discord roles, so a promotion or staff rank directly changes what you can do in game.

The result is a system where **time, responsibility, and performance** in roleplay translate into tangible unlocks, instead of progression living purely in someone’s memory or an outdated Google Sheet.

## Relationship to EconSys

Conceptually, ReconBot is a **focused cousin** of [**EconSys**](/projects/econsys):

- EconSys is a **general‑purpose economic simulation API** for online communities.
- ReconBot is a **narrow, ER:LC‑specific deployment** of many of the same ideas.

Even though ReconBot does **not** use the EconSys public API directly, a lot of the modeling work I did for EconSys — user balances, entitlement checks, purchase flows, and policy enforcement — shows up here in simplified, specialized form. ReconBot is what happens when you take those ideas and optimize them for one very specific domain: ER:LC roleplay servers that care about realism and long‑term progression.

## My Role and Responsibilities

ReconBot is a commissioned, proprietary project, and I currently serve as **the main developer** on both the product and its web experience. Concretely, that looks like:

- **Product & systems design:** Designing how the economy works (earn rates, sinks, progression), how jobs and salaries interact, and how Discord roles map to in‑game entitlements.
- **Bot architecture & implementation:** Building the Discord bot in TypeScript with Discord.js, including command handling, permissions, scheduled tasks, and the logic that validates whether a player should be allowed to drive/use/join something in game.
- **Account linking & auth flows:** Implementing Discord OAuth2 flows so players can link their accounts safely, and so staff can manage entitlements from a web dashboard without touching raw IDs.
- **Web dashboard & landing page:** Building the Next.js‑powered dashboard and landing page that server owners and staff will use to configure jobs, vehicles, perks, and progression rules.
- **Integration with the ER:LC server:** Wiring up the bridge that lets the bot and dashboard talk to the game server (for example, checking whether a player owns a vehicle or should be allowed to spawn it), while keeping proprietary implementation details private.
- **Operations & iteration:** Owning the deployment, monitoring, and ongoing improvements as the community’s needs evolve.

In other words: from the Discord bot internals, to the web UI, to the way the economy feels in practice, I’m responsible for making sure the whole system feels coherent, fair, and maintainable.

## Tech Stack

ReconBot uses a stack that matches my current preferred tooling and the rest of my ecosystem:

- **Bot & core services**
  - **Language:** TypeScript
  - **Runtime & package manager:** Bun + Node.js runtime
  - **Discord integration:** Discord.js + Discord OAuth2 API

- **Web dashboard & landing page**
  - **Framework:** Next.js (App Router) with React
  - **Styling:** Tailwind CSS and a custom design system, influenced by the same foundations as this portfolio

Beyond the surface technologies, the important part is the **architecture**:

- Clear separation between **Discord commands**, **economy logic**, and **ER:LC integration**.
- Configuration living in a single, consistent place so staff can change policies without touching code.
- A permission system that always checks both **Discord state** and **in‑game state** before allowing an action.

## Why This Project Matters to Me

ReconBot is important to me for a few reasons:

- **Incentive design at the edges:** It’s a playground for designing incentive structures that feel fair — rewarding people for showing up, doing their jobs, and investing in the community, without turning everything into a grind.
- **Bridging platforms:** I enjoy building systems that connect platforms that weren’t really designed to talk to each other. Here, that’s Discord, Roblox/ER:LC, and a custom web dashboard.
- **Hands‑on ownership:** Unlike larger, multi‑team systems, this project lets me own the full stack: product thinking, system architecture, bot implementation, and UX.
- **Consistency with my other work:** Just like **EconSys** and **SentriFlow**, this project lives in that intersection between automation, real‑world behavior, and long‑lived communities.

As the project evolves, I’ll be refining both the economy model and the user experience so that server owners get a tool they can trust, players feel that their time is respected, and staff can focus on running great roleplay instead of micromanaging who’s allowed to drive which car.
