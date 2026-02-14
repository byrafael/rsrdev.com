---
title: "Midas"
description: "A high-performance Discord economy bot focused on stock markets and publicly traded user businesses."
date: "2026-02-13"
tags: ["TypeScript", "Node.js", "MySQL", "Discord.js"]
image: "/banners/Midas.png"
---

# Midas

Midas was a Discord economy bot built around a custom stock market engine that I developed with a friend (which I am currently refactoring for use with [**EconSys**](/projects/econsys)). While most bots at the time focused on simple currency loops, Midas allowed users to create businesses, take them public, and trade shares with other players. At its peak, it functioned more like a market simulator than a typical game bot.

I stopped active development of Midas in late 2024 because the project had grown to over 5,000 servers, and maintaining it as a solo developer became difficult to manage alongside my studies. The technical overhead of keeping a high-traffic live environment running was taking up too much time.

In late 2024, I started working on **Athena** (later renamed to [**Kira**](/projects/kira)). It was designed to be a simpler, more manageable project that still offered community incentives without the maintenance burden of a full-scale market engine. This allowed me to keep building for the community while focusing on my academics.

## The Virtual Stock Market

The core of Midas was its real-time market. Unlike other bots where stock prices are randomized, Midas based its economy on user-run businesses.

- **IPOs:** Users could take their ventures public and issue shares to raise capital.
- **Governance:** While moderation was primarily handled by server owners, Midas included features for shareholder oversight. Any shareholder with more than 2% of a company's stock could call a vote to dissolve the business. Additionally, transactions exceeding a server-set threshold required approval from more than 50% of shareholders.
- **Market Dynamics:** Stock prices fluctuated based on supply, demand, and business performance.
- **Dividends:** Profitable businesses distributed earnings back to their shareholders.

## Impact and Scale

Midas reached a significant scale:

- **5,000+ servers**.
- **460,000+ unique users**.
- **2.5 million daily transactions**.
- **Thousands of commands pushed every hour**.

Handling this volume required an optimized backend to ensure data integrity and responsiveness during peak activity.

## Tech Stack

- **Language:** TypeScript / Node.js
- **Database:** MySQL for financial data and relational integrity.
- **Caching:** Redis for real-time market data and state.
- **Infrastructure:** A sharded architecture via Discord.js to handle thousands of concurrent connections.

## Why This Project Matters

Midas taught me how to manage digital economies and systemic balance. Dealing with player-run monopolies and market fluctuations provided practical experience in building high-concurrency systems and maintaining data integrity at scale.
