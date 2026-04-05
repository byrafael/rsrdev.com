---
title: "bwsm"
description: "Un CLI liviano que inyecta secretos de Bitwarden Secrets Manager en procesos de apps dentro de monorepos."
date: "2026-04-03"
tags: ["TypeScript", "Bun", "Node.js", "CLI", "Bitwarden"]
image: "/banners/BWSM.png"
github: "byrafael/bwsm"
---

# bwsm

`bwsm` es un CLI open-source que construi para facilitar el uso de Bitwarden Secrets Manager en repositorios con varias apps.

En lugar de exportar variables manualmente por app o mantener scripts de shell fragiles, `bwsm` resuelve secretos por objetivo desde un `bitwarden.config.ts` compartido y los inyecta directamente en el proceso hijo que ejecutes.

## Por Que Lo Construi

En un monorepo es normal tener varios servicios con necesidades de secretos distintas. Los problemas mas comunes son:

- repetir bootstrap local en cada maquina
- exponer demasiados secretos a procesos que no los necesitan
- scripts fragiles para cambiar de contexto entre apps

`bwsm` resuelve esto definiendo objetivos explicitos y reglas de seleccion una sola vez, para luego reutilizarlas con un comando unico.

## Flujo Principal

Hoy el proyecto gira alrededor de tres comandos:

1. `bwsm run` inyecta secretos seleccionados para un objetivo y ejecuta un comando hijo.
2. `bwsm doctor` valida config, bootstrap env, sincronizacion del SDK y seleccion del objetivo con un reporte por etapas.
3. `bwsm logout` limpia el estado local persistido del SDK para un objetivo, sin revocar tokens de Bitwarden.

Con esto, el uso diario se mantiene simple y el diagnostico queda claro cuando algo falla.

## Notas Tecnicas

`bwsm` esta implementado en TypeScript y se compila con tooling de Bun/Node. Internamente maneja:

- descubrimiento de workspace y configuracion
- carga de bootstrap env desde variables de proceso y archivos `.env` raiz
- sincronizacion del SDK de Bitwarden via `@bitwarden/sdk-napi`
- filtrado de secretos por objetivo (`projectIds`, `includeKeys`, `excludeKeys`)
- hash deterministico del entorno inyectado (`BWSM_ENV_HASH`) y etiqueta de objetivo (`BWSM_TARGET`)

El codebase es pequeno a proposito y facil de probar, con modulos separados para parsing del CLI, validacion de config, filtrado, estado y ejecucion de comandos.

## Por Que Importa Este Proyecto

`bwsm` representa el tipo de tooling que mas disfruto: alcance pequeno, alto impacto y utilidad inmediata en repos reales.

Mejora la experiencia local de desarrollo, reduce errores al manejar secretos y ofrece una forma limpia de estandarizar inyeccion de secretos con Bitwarden en varias apps.
