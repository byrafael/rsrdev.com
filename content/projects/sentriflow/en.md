---
title: "SentriFlow"
description: "An AI-powered customer support intelligence layer for MUSCLE’s operations."
date: "2025-07-31"
tags: ["JavaScript", "Python", "LangChain", "N8N", "HubSpot", "Aircall", "Deepgram", "LLMs"]
image: "/banners/SentriFlow.png"
---

# SentriFlow

SentriFlow is a proprietary AI system I built for [**MUSCLE**](https://www.musclepoints.com/) during a one‑month internship as an AI Systems Development under **MUSCLE Innovation Labs**. It currently sits in the middle of their customer support stack, quietly watching every interaction and turning raw calls and tickets into structured, actionable intelligence for the team.

Instead of customer conversations living as scattered call logs and half-complete tickets on a CRM, SentriFlow ingests each interaction, analyzes it with LLMs, and pushes enriched, structured records back into HubSpot. The end result: support leadership, success teams, and management get a live, high‑signal view of what customers are actually experiencing, without adding more work to support agents’ plates.

The name **SentriFlow** is my own label for this project. Inside MUSCLE, the system is implemented in production under a different internal name, overseen by the Customer Success team.

`$O(\log n)$$`

## What SentriFlow Does

At a high level, SentriFlow acts as an **AI observability and decision layer for customer support**:

- **Per‑call analysis pipeline:** Whenever a support call ends in Aircall (or at the start of the project, RingCentral), an automation I built in **N8N** fires. It gathers call metadata, recordings, and context, then passes them down the pipeline.
- **Transcription and enrichment:** Audio is transcribed via the **DeepGram STR**, then fed into **LangChain** workflows powered by models like **Gemini 2.5 Flash**, **GPT‑4.5** models, and **Claude Sonnet 4.0** (depending on the task).
- **Outcome and intent detection:** The system evaluates whether the interaction was successful, what the customer was trying to achieve, what follow‑ups are required, and whether escalation is needed.
- **Sentiment and satisfaction scoring:** Each call gets a sentiment profile (satisfied, confused, frustrated, angry, etc.), giving the business a way to quantify how customers *felt*, not just what they asked.
- **Rich HubSpot tickets:** For every interaction, SentriFlow creates or updates a **HubSpot** ticket with a structured summary, key details, follow‑ups, escalation flags, and links back to the original call recording and transcription.

All of this runs automatically in the background, so agents can stay focused on the customer instead of wrestling with CRMs and documentation.

## Daily Intelligence for the Business

Beyond the per‑call analysis, SentriFlow also acts as a **daily executive briefing** for customer experience:

- At the end of each day, it aggregates all interactions processed in the last 24 hours.
- It clusters and summarizes **top issues, recurring themes, and common questions**.
- It surfaces **emerging problems** (for example, when ~90 customers in a single day report the same friction point).
- It produces a high‑level digest and sends it to **customer satisfaction teams and Muscle’s management**.

This daily rollup turned customer support from a black box into a **continuous feedback loop**. Instead of hearing about problems weeks later, leadership could see patterns as they formed and move quickly to fix them. The company explicitly shared that they were **extremely happy** with the system and shipped it to production with little to no modifications. The version that’s running in production today is still fundamentally the software I designed and built, but being maintained by a different team.

## The Journey

SentriFlow started from a simple but high‑stakes question: *“How do we make sure every customer interaction actually turns into learning for our clients?”*

During my one‑month, I didn’t want to just build a demo or a toy feature. I wanted to work on something **mission‑critical** and to prove my worth as a developer.

Customer support was perfect for this: it’s noisy, high volume, emotionally loaded, and absolutely central to how a company is perceived. Human agents are great at empathizing and solving problems in the moment, but not so great at manually turning every call into structured data and long‑term insight. That’s where automation and LLMs shine.

I mapped out the existing tooling: **Aircall** for VoIP and call logs, **HubSpot** for CRM and tickets, and existing internal workflows. From there, I designed a system that could plug into those tools rather than replace them, respecting the team’s current stack while upgrading the intelligence layer around them.

The result was SentriFlow: an orchestration of **N8N workflows**, **LangChain pipelines**, and **custom integrations** that quietly connect Aircall, Deepgram, HubSpot, and multiple LLM providers into a single, reliable flow.

## How It Works (Under the Hood)

Even though SentriFlow is proprietary and not open‑sourced, the architectural ideas are simple and intentional:

- **Event‑driven core:** Aircall emits a “call finished” event, which kicks off an n8n workflow I built. That workflow coordinates API calls, retries, and branching logic.
- **Multilingual speech‑to‑text:** Call recordings are streamed to **DeepGram**, which returns high‑quality transcripts suitable for LLM processing.
- **LLM‑first reasoning:** Using **LangChain** and both **TypeScript** and **Python**, I chain multiple LLM prompts to:
	- Extract intents and sub‑intents
	- Determine whether the issue was resolved
	- Propose next actions or escalations
	- Generate a concise but information‑dense summary
	- Score sentiment and emotional tone
- **HubSpot as the source of truth:** Once analysis is complete, the workflow uses the **HubSpot API** to create or update tickets with all enriched data so support, success, and management can live in one single source of truth.
- **Daily summarization:** Another scheduled workflow aggregates that day’s tickets, runs clustering and summarization through LLMs, and sends a digest email to the right stakeholders.

Technologies involved include **N8N**, **LangChain**, **TypeScript**, **Python**, **Aircall**, **Deepgram**, multiple **LLM providers**, and the **HubSpot API**, all glued by custom scripts and careful orchestration and a non‑trivial amount of coffee (as well as at least three “why is this webhook not firing” debugging sessions).

## Why This Project Matters to Me

SentriFlow is important not just because it works, but because it **embodies how I like to work**:

- **Business‑critical focus:** I’m drawn to systems where failure is felt immediately—things that move KPIs, not just dashboards. SentriFlow sits directly in the loop between customers, support, and leadership.
- **Complex problem spaces:** Customer support is messy: natural language, emotion, partial information, and legacy tools. I enjoy taking that complexity and building structured, resilient pipelines around it.
- **Tight feedback loops:** I care a lot about shortening the distance between “something is going wrong for users” and “we know about it and can act on it.” SentriFlow literally operationalizes that mindset, so instead of guessing, the company gets real data (and fewer “I have a feeling” product meetings).
- **Human‑in‑the‑loop AI:** The goal was never to replace agents, but to make their work easier and the company smarter. Agents still talk to customers; SentriFlow just makes sure those conversations aren’t lost.

My managers reaction was that this was a **high‑impact, production‑ready system** that they were excited to run, and that reinforced the type of work I want to keep doing: AI systems that are deeply embedded in operations and meaningfully improve how a company runs.

## Final Thoughts

SentriFlow is, in many ways, a snapshot of my core mindset as an engineer: work on **high‑leverage, high‑impact systems** that sit close to the beating heart of a business, use AI where it actually compounds human effort, and solve problems that are complex enough to be interesting—and important enough to matter.


