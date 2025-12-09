---
title: "LuaFence"
description: "Una API robusta para listas blancas, licenciamiento y protección de activos para scripts de Roblox."
date: "2025-12-09"
tags: ["LuaU", "TypeScript", "Express", "API", "Seguridad", "Licenciamiento", "Protección de Activos", "Ofuscación"]
image: "/banners/LuaFence.png"
---

# LuaFence

LuaFence es una API especializada para el ecosistema de Roblox que brinda un sistema robusto de listas blancas (*whitelisting*) y control de acceso para scripts. Funciona como una solución de gestión de derechos digitales (DRM) para desarrolladores que venden activos — como scripts de robots, sistemas de armas u otras mecánicas de juego — a estudios de videojuegos.

## El Problema

En la comunidad de desarrollo de Roblox, crear activos de alta calidad toma mucho tiempo y experiencia. Cuando los desarrolladores venden estos activos a los estudios, siempre existe el riesgo de reventa no autorizada o de que se usen sin una licencia válida. Una vez que entregás el código, es difícil controlar dónde va a parar.

## La Solución

LuaFence actúa como un sistema de llaves y licencias que se ubica entre el código del desarrollador y el usuario final. En lugar de entregar el código fuente directamente, la lógica central se almacena de forma segura en nuestros propios servidores.

Cuando un estudio compra un script, reciben una llave de licencia. El script en su juego se comunica con la API de LuaFence para verificar esta licencia antes de ejecutarse. Esto asegura que:
- **Seguridad del Código:** El código fuente no puede ser robado o filtrado fácilmente.
- **Control de Acceso:** Solo los estudios con una licencia válida y activa pueden usar los activos.
- **Prevención de Reventa:** La distribución no autorizada se bloquea desde la fuente.

## Impacto y Escala

LuaFence está actualmente desplegado y protegiendo activos para un estudio de desarrollo importante.

- **Base de Usuarios:** El sistema soporta a un estudio con más de **2,000 compradores**.
- **Protección Activa:** Actualmente protege código usado por más de **400 clientes diferentes**.
- **Valor de Activos:** El sistema asegura actualmente activos valorados en más de **$5,200**.
- **Potencial Futuro:** Estamos explorando expandir el sistema para cubrir toda la línea de productos del estudio, lo cual aseguraría aproximadamente **$20,000** en activos digitales.

### Planes a Futuro

Estamos planeando hacer público el código fuente de LuaFence pronto. Este cambio va a introducir un modelo híbrido:
- **Self-Hosted (Gratis):** Los desarrolladores van a poder correr su propia instancia de LuaFence totalmente gratis, dándoles control total sobre su infraestructura.
- **Servicio Gestionado (Pago):** Para los que prefieren no complicarse, vamos a ofrecer un plan de pago que incluye hospedaje gestionado y servicios avanzados de ofuscación de código.

## Tech Stack

El sistema está construido para ser seguro, rápido y confiable, manejando solicitudes de autenticación con latencia mínima para asegurar que el *gameplay* no se vea afectado.

- **Backend:** TypeScript y Express
- **Scripting:** LuaU (Lua pero para Roblox)
