---
title: "Mercury"
description: "A modular Python framework for high-velocity quantitative research, factor construction, model evaluation, and walk-forward strategy validation."
date: "2025-12-09"
tags: ["Python", "Quantitative Finance", "Machine Learning", "Pandas", "NumPy", "Pollers", "VectorDT", "XGBoost", "Django", "Jesse", "TA-Lib", "pandas-ta", "SciPy", "pyportfolioopt", "seaborn", "plotly", "git", "YFinance", "Polygon", "Backtesting"]
image: "/banners/Mercury.png"
pinned: true
order: 1
---

# Mercury

Mercury is a modular, open-source Python framework for high-velocity quantitative research, factor construction, model evaluation, and walk-forward strategy validation. I built Mercury to break into Quant Finance, and give myself (and others) a unified toolkit for everything from data ingestion and feature engineering to multi-model experimentation, backtesting, and live trading integration. 

## The Vision

I wanted a research suite that didn’t just look good on paper, but actually worked for real-world, high-frequency, and high-stakes quant research. Mercury is the result: a modular, open-source toolkit that unifies data ingestion, feature engineering, multi-model experimentation, portfolio backtesting, and execution simulation (with slippage and transaction cost models) into a single, clean pipeline.

## Disclaimer on Project Status and Contribution

**Mercury is my MAIN project right now.** Release is not to be expected for a while, but that's because the project is in **ACTIVE DEVELOPMENT**—I'm still working through design and specifications, and things can change from one day to another.

You can track my current progress and see which stage we're at [here](https://rsrdev.fibery.io/FOSS/Roadmap-74?sharing-key=c678274e-f1d5-4e39-b456-945cfcbd2e7a).

**Suggestions are always welcome!** Email me at `hello[at]rsrdev[dot]com`.

I don't have a lot of experience in quant finance, so I might make a lot of mistakes here. If you spot any, or have suggestions, I REALLY want to hear from you.

## What Mercury Will Do

- **Unified research pipeline:** From raw data to live trading, everything is modular and composable. Ingest historical data (YFinance, Polygon, etc.), engineer features, run multi-model experiments, and validate with walk-forward analysis.
- **Factor library:** Out-of-the-box factors for momentum, volatility, microstructure, and more. Build your own or extend the library for custom research.
- **ML modeling suite:** Linear models, tree-based models, boosting (XGBoost), and custom cross-validation. Designed for rapid iteration and robust evaluation.
- **Walk-forward validation:** Realistic, rolling-window validation to avoid overfitting and get a true sense of out-of-sample performance.
- **Event-driven backtesting:** Portfolio-level backtesting with risk metrics, slippage, spread, and order flow modeling. Integrates with Jesse for robust simulation.
- **Execution simulator:** Models real-world frictions—transaction costs, slippage, and liquidity—so your backtests don’t lie.
- **Live trading integration:** Optional hooks for live trading, so you can take strategies from research to execution without rewriting your stack.

## Why I Built It

This is my “break into quant finance” project. I wanted a research suite that I could use for my own stock and crypto portfolios, but also one that would stand up to scrutiny at real quant firms. Mercury is my proof that I can build, ship, and maintain production-grade research infrastructure—clean, modular, and open source.

## Features

- **Modular architecture:** Swap in new data sources, models, or execution engines with minimal friction.
- **Factor research:** Build, test, and combine factors with a few lines of code.
- **Multi-market support:** Equities, crypto, and futures—no hardcoded assumptions.
- **Realistic validation:** Walk-forward, cross-validation, and overfitting controls.
- **Execution realism:** Slippage, spread, and order flow modeling.
- **Personal + professional:** Built for my own portfolio, but ready for real quant teams.

## Why It Matters

Mercury isn’t just another backtester or factor library. It’s my way of showing that I can build the kind of research infrastructure that real quant firms rely on. If you’re looking for someone who can design, implement, and maintain complex, production-grade quant systems—this is my calling card.

## Tech Stack & Libraries

Mercury is built on a modern, modular Python stack for quant research and trading:

- **Data Analysis:** Pandas, NumPy
- **Feature Engineering:** pandas-ta, TA-Lib, SciPy, Pollers, VectorDT
- **Machine Learning:** XGBoost, scikit-learn, custom cross-validation
- **Backtesting & Simulation:** Jesse
- **Portfolio Optimization:** pyportfolioopt
- **Visualization:** seaborn, plotly
- **Data Ingestion:** YFinance, Polygon
- **Web/UI (optional):** Django
- **Version Control & Automation:** git

Mercury is my all-in-one Python framework for quantitative research, factor construction, model evaluation, and walk-forward strategy validation. It’s built for high-velocity research and realistic strategy evaluation across equities, crypto, and futures markets—my way to break into real quant trading and development.