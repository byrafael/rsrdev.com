---
title: "FlagifyTS"
description: "Un SDK en TypeScript para la API self-hosted de Flagify, con recursos tipados, clientes por proyecto y soporte de snapshots runtime."
date: "2026-03-23"
tags: ["TypeScript", "Bun", "SDK", "Feature Flags", "Zod"]
github: "byrafael/FlagifyTS"
---

# FlagifyTS

FlagifyTS es un SDK en TypeScript que construi para la API self-hosted de Flagify.

La meta fue directa: darles a los usuarios de Flagify un cliente limpio y tipado que puedan integrar en backends, herramientas y apps web sin reescribir logica HTTP cada vez.

## Que Cubre El SDK

- **Flujos root y admin:** manejo de proyectos, creacion de keys y operaciones de plataforma.
- **Flujos por proyecto:** con `client.project(projectId)` para trabajar flags, environments, segments, clients, identities y change requests.
- **Flujos runtime:** resolucion de configuracion y snapshots de ambiente para evaluacion real de feature flags.
- **Snapshots con ETag:** soporte de `ifNoneMatch` para evitar payloads cuando no hubo cambios.
- **Soporte browser y server:** usa `fetch` nativo por defecto e inyeccion de fetch custom cuando hace falta.

## Notas De Implementacion

- Construido con **Bun** y exportado como **ESM**.
- Usa esquemas de **Zod** en los recursos para mantener contratos predecibles.
- Expone un `FlagifyClient` principal con clientes de recursos por debajo.
- Separa transporte y recursos para que escalar el SDK sea mas simple.

## Por Que Importa Este Proyecto

FlagifyTS convierte una API REST cruda en una interfaz real para desarrolladores.

En lugar de repetir endpoints, headers y validaciones en cada servicio, los equipos pueden usar un cliente tipado y enfocarse en la logica del producto. Eso acelera integraciones de feature flags y reduce mantenimiento.
