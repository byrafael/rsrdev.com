---
title: "Flagify"
description: "Una API REST self-hosted de feature flags en PHP puro, con identidades, targeting, analitica y snapshots de runtime."
date: "2026-03-23"
tags: ["PHP", "MySQL", "REST API", "OpenAPI", "Feature Flags"]
image: "/banners/Flagify.png"
github: "byrafael/Flagify"
demo: "flagify.rsrdev.com"
---

# Flagify

Flagify es una plataforma self-hosted de gestion de feature flags que construi como API REST en PHP puro.

La meta fue directa: mantener control total sobre la infraestructura de feature flags sin depender de un proveedor SaaS, pero con capacidades reales para ambientes de produccion.

## Que Cubre El Proyecto

Flagify implementa el modelo completo de feature management:

- Proyectos con ambientes aislados (`development`, `staging` y `production`)
- Flags con variantes, prerequisitos, metadata de expiracion y reporte de flags stale
- Evaluacion por identidad con traits persistentes y overrides por request
- Segmentos reutilizables y reglas de targeting por ambiente
- Rollouts porcentuales sticky y ventanas programadas de activacion
- Overrides por cliente

Tambien incluye piezas operativas que normalmente faltan en herramientas simples:

- Ambientes protegidos con flujo de change requests
- Audit logs para mutaciones administrativas
- Analitica de evaluaciones por flag y variante
- Import/export deterministico
- Ingestion de code references para detectar flags stale

## Runtime Y Entrega

En runtime, Flagify resuelve configuracion por ambiente y expone snapshots para evaluacion local/offline.

El contrato del snapshot incluye cache por checksum (`ETag`), recomendaciones de polling (`poll_ttl_seconds`) y metadata de compatibilidad para que los consumidores puedan refrescar de forma segura y seguir sirviendo la ultima configuracion valida.

La API esta documentada con OpenAPI 3.1 (`openapi.yaml`) y viene con colecciones de Postman para pruebas locales y onboarding.

## Direccion Tecnica

La base tecnica es intencionalmente simple:

- PHP 8.3+
- MySQL 8+
- PDO
- Sin dependencia de Composer en runtime

Esto permite desplegar en entornos compartidos o restringidos sin sacrificar un modelo de dominio claro ni la mantenibilidad.

## Por Que Importa Este Proyecto

Flagify representa bien mi enfoque en backend: partir de restricciones operativas reales, disenar para comportamiento de produccion (no solo CRUD feliz), y mantener una arquitectura que un equipo pequeno pueda operar y evolucionar con confianza.
