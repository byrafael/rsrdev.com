---
title: "SCP: Thresher"
description: "Systems engineering and gameplay programming for a high‑tension SCP experience on Roblox."
date: "2025-12-09"
tags: ["LuaU", "Roblox", "Rojo", "Wally", "Git", "Game Development", "Systems Design", "OOP"]
image: "/banners/Thresher.png"
---

# SCP: Thresher

SCP: Thresher is an SCP Foundation style Roblox horror game developed by **GEN Interactive**, a Roblox game studio and sister company to **Versify Studios** (best known for shipping high-quality scripts and systems to other developers and studios).

The game takes inspiration from **SCP-1730** ("What Happened to Site-13?"), putting players inside a damaged, unstable facility where reality itself is breaking down. Your job is to navigate dark, hostile corridors, track and avoid anomalies, and survive long enough for containment teams to understand what went wrong.

Publicly, the project has only had **limited early teasers** so far (mostly 3D models and world assets, which are not my work). The systems and code described below all live under the hood, powering how the world behaves, how anomalies are tracked, and how players interact with the environment.

## The Hume Detection System

One of my main responsibilities on SCP: Thresher is the **Hume detection system** – essentially a Geiger counter for SCP anomalies.

From a player’s point of view, it’s a handheld device that:

- Tracks nearby anomalies that emit a Hume field.
- Surfaces a live reading in a custom unit we call **hm**s.
- Responds as you move through the facility, getting louder or more intense as you approach stronger or closer anomalies.

Under the hood, that simple behavior hides a fairly complex model:

- **Per‑anomaly Hume strength:** Each anomaly has an intrinsic “Hume strength” that represents how disruptive it is to normal reality.
- **Distance‑aware falloff:** The signal decays with distance, roughly like a physical field, so you don’t get absurd readings from the other side of the map.
- **Baseline noise and interference:** The system keeps a **baseline HM level** that accounts for all other anomalies in the area. If you’re in a wing full of weaker anomalies, the baseline rises instead of every new signal overwhelming the meter.
- **Closest‑source prioritization:** The detector focuses on the most relevant nearby anomaly so the reading stays interpretable for players instead of flickering between every object in range.

The result is a detector that *feels* like an instrument in a lab: it’s noisy, reactive, and context‑sensitive, but still predictable enough that designers can build encounters around it and players can learn to “read” it.

## Multiple Detectors, Different Behaviors

On top of the core model, I implemented support for **multiple detector variants**, each with distinct behavior and constraints:

- **Different ranges:** Some detectors are short‑range and precise, others reach further but with more background noise.
- **Battery systems:** Devices have their own battery models – some are rechargeable, some are disposable, and each depletes at a different rate depending on how aggressively the detector is sampling the environment.
- **Tuning for gameplay roles:** Because the system is parameterized, designers can quickly create new detector types (for example, one suited for recon teams vs. one for heavy containment squads) without rewriting core logic.

The goal here was to keep the **math and signal processing centralized**, while making it easy to ship multiple in‑game items that all “speak the same language” in HM units.


## Anomaly Registry and Systems Architecture

To support the Hume detector, I built an **Anomaly Registering Service** that acts as a source of truth for everything that can emit Humes:

- When anomalies spawn or change state, they **register** with the service.
- The service maintains a table of active anomalies, their positions, and their Hume‑related properties.
- Detectors query this registry to compute their readings instead of scanning the entire world manually.

This architecture keeps the gameplay code **modular and maintainable**:

- New anomalies can be added by registering them with the service instead of touching detector internals.
- The same registry can power other systems later on (AI behaviors, dynamic events, or containment protocols) without duplicating logic.
- Performance stays predictable because detectors are working from curated data rather than ad‑hoc scans.

## Math & Signal Model

All of the math and signal processing behind the Hume detection system was designed and implemented by me, with a focus on making the detector feel both physically plausible and game-friendly.

### Baseline Calculation

The baseline Hume level at a given position is calculated by summing the influence of all registered anomalies:

$$
	ext{Baseline}(\vec{p}) = 1 + \sum_{i=1}^N \frac{S_i}{\left(\frac{d_i}{10} + 1\right)^{\alpha_i}}
$$

Where:
- $S_i$ is the strength of anomaly $i$
- $d_i$ is the distance from the detector to anomaly $i$
- $\alpha_i$ is the falloff exponent for anomaly $i$
- $N$ is the number of anomalies
- $1$ is the base Hume level

### Detector Reading

The detector’s reading for a specific anomaly is:

$$
H(d) = H_0 + \frac{S}{\left(\frac{d}{10} + 1\right)^{\alpha}}
$$

Where:
- $H_0$ is the baseline from above
- $S$ is the strength of the anomaly being measured
- $d$ is the distance to the anomaly
- $\alpha$ is the falloff exponent

This approach ensures that readings are always positive, scale smoothly with distance, and allow for easy tuning of how quickly signals decay or stack in crowded areas.

## Currency and Objectives Systems

Beyond the Hume detector, I also contributed to broader **meta‑systems** that support progression and replayability:

- A **currency system** that rewards players for successful runs, objectives, and exploration, and that other designers can hook into for shops, upgrades, or cosmetics.
- A **challenges / objectives system** that tracks goals, completion states, and rewards so the game can layer structured objectives on top of freeform exploration.

These systems are designed to be **data‑driven**, letting non‑programmers define new objectives or rewards using configuration instead of code changes, while keeping all the rules enforced in a consistent place.

## Working With a Professional Roblox Studio

SCP: Thresher is not a hobby prototype, but a **studio production** built and owned by **GEN Interactive**. That means:

- The game is developed inside an established codebase, with dedicated scripters, designers, and artists.
- There are real constraints around performance, maintainability, and how systems plug into the existing architecture.
- My role is to help implement and maintain core systems (like detectors, registries, and progression) as one of the gameplay programmers on the project.

Because the project is proprietary, I'm deliberately not sharing any internal screenshots, builds, or code. Everything here is a high-level description of the systems I've contributed to inside SCP: Thresher.

## Why This Project Matters to Me

SCP: Thresher sits right at the intersection of a few things I care about as an engineer:

- **Systemic game design:** I like building mechanics where math, simulation, and player experience are tightly connected. The Hume detector is a perfect example: if the model is wrong, the game *feels* wrong.
- **Signals in noisy environments:** Tuning a detector to be readable in a facility full of overlapping anomalies is basically applied signal processing, and that kind of problem is very fun for me.
- **High‑trust, high‑impact work:** Being one of two scripters on a production game means the systems I build have a direct impact on how the game plays and how the studio ships features.

Like many of my favorite projects, SCP: Thresher isn’t just about “cool tech” – it’s about using engineering to make a fictional world feel internally consistent, reactive, and alive, while respecting the constraints of a real studio pipeline.

## Status

SCP: Thresher is **still in development**, with no public release date announced yet. As of now, my work continues to focus on deepening the systemic backbone of the game – detectors, registries, progression systems – so that when players finally get their hands on it, the experience feels tense, coherent, and robust from day one.

