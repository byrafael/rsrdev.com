---
title: "Mercury"
description: "Un framework modular en Python para investigación cuantitativa de alto nivel, construcción de factores, evaluación de modelos y validación de estrategias walk-forward."
date: "2025-12-09"
tags: ["Python", "Finanzas Cuantitativas", "Machine Learning", "Pandas", "NumPy", "Pollers", "VectorDT", "XGBoost", "Django", "Jesse", "TA-Lib", "pandas-ta", "SciPy", "pyportfolioopt", "seaborn", "plotly", "git", "YFinance", "Polygon", "Backtesting"]
image: "/banners/Mercury.png"
pinned: true
order: 1
---

# Mercury

Mercury es un framework modular y de código abierto en Python para investigación cuantitativa de alto nivel, construcción de factores, evaluación de modelos y validación de estrategias walk-forward. Lo creé para meterme de lleno en el mundo de las finanzas cuantitativas y para tener una herramienta unificada que sirva desde la ingesta de datos y la ingeniería de características, hasta la experimentación con modelos, backtesting y la integración con trading en vivo.

## La Visión

Quería una suite de investigación que no fuera solo teoría, sino que realmente funcionara para investigación cuantitativa de verdad, rápida y exigente. Mercury es el resultado: una caja de herramientas modular y abierta que une la ingesta de datos, ingeniería de características, experimentos con varios modelos, backtesting de portafolios y simulación de ejecución (con modelos de slippage y costos de transacción) en un solo flujo limpio.

## Estado del Proyecto y Cómo Contribuir

**Mercury es mi proyecto PRINCIPAL en este momento.** No esperés un release pronto, porque está en **DESARROLLO ACTIVO**—todavía estoy afinando el diseño y las especificaciones, y las cosas pueden cambiar de un día para otro.

Podés ver mi progreso y en qué etapa estoy [aquí](https://rsrdev.fibery.io/FOSS/Roadmap-74?sharing-key=c678274e-f1d5-4e39-b456-945cfcbd2e7a).

**¡Las sugerencias siempre son bienvenidas!** Escribime a `hello[arroba]rsrdev[punto]com`.

No tengo mucha experiencia en finanzas cuantitativas, así que seguro cometo errores. Si ves algo raro o tenés ideas, de verdad quiero escucharlas.

## ¿Qué Va a Hacer Mercury?

- **Pipeline de investigación unificado:** Desde datos crudos hasta trading en vivo, todo es modular y se puede combinar. Ingesta datos históricos (YFinance, Polygon, etc.), creá features, corré experimentos con varios modelos y validá con análisis walk-forward.
- **Librería de factores:** Factores listos para usar de momentum, volatilidad, microestructura y más. Podés crear los tuyos o extender la librería para tu propia investigación.
- **Suite de modelos de ML:** Modelos lineales, de árboles, boosting (XGBoost) y validación cruzada personalizada. Pensado para iterar rápido y evaluar bien.
- **Validación walk-forward:** Validación realista con ventanas móviles para evitar el overfitting y ver el rendimiento fuera de muestra.
- **Backtesting orientado a eventos:** Backtesting a nivel de portafolio con métricas de riesgo, slippage, spread y modelado de flujo de órdenes. Se integra con Jesse para simulaciones robustas.
- **Simulador de ejecución:** Modela fricciones reales—costos de transacción, slippage y liquidez—para que los backtests sean honestos.
- **Integración con trading en vivo:** Opcional, para llevar estrategias de la investigación a la ejecución sin tener que reescribir todo.

## ¿Por Qué Lo Hice?

Este es mi proyecto para meterme en finanzas cuantitativas. Quería una suite que me sirviera para mis portafolios de acciones y cripto, pero también que aguantara el ritmo en firmas cuantitativas de verdad. Mercury es mi prueba de que puedo construir, lanzar y mantener infraestructura de investigación de calidad—modular, limpia y abierta.

## Funcionalidades

- **Arquitectura modular:** Podés cambiar fuentes de datos, modelos o motores de ejecución sin complicaciones.
- **Investigación de factores:** Construí, probá y combiná factores con pocas líneas de código.
- **Soporte multi-mercado:** Acciones, cripto y futuros—sin suposiciones fijas.
- **Validación realista:** Walk-forward, validación cruzada y controles contra el overfitting.
- **Realismo en ejecución:** Modelado de slippage, spread y flujo de órdenes.
- **Personal y profesional:** Lo uso para mi portafolio, pero está listo para equipos cuantitativos serios.

## ¿Por Qué Es Importante?

Mercury no es solo otro backtester o librería de factores. Es mi forma de mostrar que puedo construir la infraestructura de investigación que usan los equipos cuantitativos de verdad. Si buscás a alguien que sepa diseñar, implementar y mantener sistemas complejos y de calidad—este es mi carta de presentación.

## Stack Tecnológico y Librerías

Mercury está construido sobre un stack moderno y modular en Python para investigación y trading cuantitativo:

- **Análisis de datos:** Pandas, NumPy
- **Ingeniería de características:** pandas-ta, TA-Lib, SciPy, Pollers, VectorDT
- **Machine Learning:** XGBoost, scikit-learn, validación cruzada personalizada
- **Backtesting y simulación:** Jesse
- **Optimización de portafolios:** pyportfolioopt
- **Visualización:** seaborn, plotly
- **Ingesta de datos:** YFinance, Polygon
- **Web/UI (opcional):** Django
- **Control de versiones y automatización:** git

Mercury es mi framework todo-en-uno para investigación cuantitativa, construcción de factores, evaluación de modelos y validación de estrategias walk-forward. Está hecho para investigación rápida y evaluación realista de estrategias en mercados de acciones, cripto y futuros—mi forma de entrarle al trading cuantitativo de verdad.
