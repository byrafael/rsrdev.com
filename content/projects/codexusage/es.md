---
title: "CodexUsage"
description: "Un monitor de uso de Codex hecho con Bun, con dashboards web en vivo, CLI de terminal y vistas recorder para Picture-in-Picture."
date: "2026-03-08"
tags: ["TypeScript", "Bun", "CLI", "Observability", "HTML/CSS"]
image: "/banners/CodexUsage.svg"
github: "byrafael/CodexUsage"
---

# CodexUsage

CodexUsage es una herramienta local de monitoreo que construi para responder una pregunta muy concreta: cuanto presupuesto de Codex he consumido hoy, en la ventana actual de sesion y a lo largo de la semana activa.

El repositorio es pequeno y directo a proposito. En lugar de meter una base de datos, un backend hospedado o un framework de frontend, todo corre como un unico servidor en Bun mas un CLI ligero. La meta es feedback rapido y cero ceremonia.

## Que Hace Realmente El Repo

La version actual crecio rapido entre el **2 de marzo de 2026** y el **8 de marzo de 2026**. Empezo como un dashboard sencillo de uso y termino convirtiendose en un monitor con varias superficies:

- **`/` overview dashboard:** Un panel web en vivo con contadores principales y tarjetas separadas para la ventana de sesion y la semanal.
- **`/session`, `/day`, `/week`:** Paginas enfocadas para la ventana concreta que quieres vigilar mientras trabajas.
- **`/day/rec`, `/week/rec`, `/session/rec`:** Vistas recorder que generan un stream de video basado en canvas y pueden abrirse en Picture in Picture.
- **`bun cli`:** Un dashboard de terminal que consulta la misma API y soporta modos como `day`, `week`, `all`, `--range` y `--12hr`.

Esa separacion es lo que hace que la pagina refleje el repo de verdad. No es solo "un dashboard"; es un monitor con varias vistas para distintos contextos de trabajo.

## Arquitectura

La implementacion es mas interesante que la UI por si sola porque combina varias fuentes locales reales:

- **Codex app-server por stdio:** El servidor en Bun lanza `codex app-server --listen stdio://` y pide snapshots de rate limits directamente.
- **Logs locales de sesion:** Escanea `~/.codex/sessions` y logs JSONL archivados para reconstruir uso de tokens por dia y por modelo.
- **Precios de LiteLLM:** Descarga metadatos de precios de LiteLLM y estima costo en USD a partir de los tokens de entrada y salida.
- **Fallbacks con cache:** Los snapshots y precios se cachean para que la UI siga funcionando aunque una dependencia este lenta temporalmente.

Me gusta esta arquitectura porque es honesta con el problema. La app no intenta fingir que es un producto SaaS. Es una herramienta personal de operaciones construida alrededor de las fuentes que Codex ya expone localmente.

## Por Que El Repo Se Siente Bien

Las decisiones de frontend encajan con la herramienta:

- El dashboard principal funciona como un panel de control compacto en el navegador.
- Las vistas focus son oscuras, minimas y pensadas para quedarse al lado del editor sin robar atencion.
- Las vistas recorder estan hechas para permanecer visibles todo el tiempo, especialmente en Picture in Picture.

El codebase refleja esa misma mentalidad pragmatica. Casi toda la logica vive en `server.ts`, la UI del navegador esta hecha con HTML/CSS/JS plano en `public/`, y el CLI es otra superficie de consulta en lugar de una app distinta.

## Por Que Importa Este Proyecto

CodexUsage es el tipo de proyecto que mas me gusta construir: alcance pequeno, proposito claro y utilidad directa en el trabajo diario. Convierte esa intuicion vaga de "creo que estoy gastando muchos tokens" en algo visible, medible y dificil de ignorar.

Tambien es un buen ejemplo de cuanto se puede lograr con herramientas simples cuando el limite del producto esta claro: Bun, archivos estaticos, un renderizador de terminal, logs locales y una sola ruta API bastan para que todo el proyecto se sienta completo.
