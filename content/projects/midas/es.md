---
title: "Midas"
description: "Un bot de economía de alto rendimiento para comunidades en Discord, centrado en mercados de valores y empresas públicas."
date: "2026-02-13"
tags: ["TypeScript", "Node.js", "PostgreSQL", "Discord.js", "Redis"]
image: "/banners/Midas.png"
pinned: true
order: 1
---

# Midas

Midas fue un bot de economía para Discord basado en un motor de mercado de valores personalizado que desarrollé con un amigo (y que ahora estoy refactorizando para usar en [**EconSys**](/projects/econsys)). Mientras que la mayoría de los bots de la época se centraban en ciclos de moneda simples, Midas permitía a los usuarios crear empresas, sacarlas a bolsa e intercambiar acciones con otros jugadores. En su apogeo, funcionaba más como un simulador de mercado que como un bot de juego típico.

Dejé el desarrollo activo de Midas a finales de 2024 por que el proyecto había crecido hasta superar los 5,000 servidores, y mantenerlo como desarrollador único se volvió difícil de compaginar con mis estudios. La carga técnica de mantener un entorno en vivo con tanto tráfico consumía demasiado tiempo.

A finales de 2024, empecé a trabajar en **Athena** (más tarde renombrado a [**Kira**](/projects/kira)). Fue diseñado para ser un proyecto más sencillo y manejable que siguiera ofreciendo incentivos a las comunidades, pero sin la carga de mantenimiento de un motor de mercado a gran escala. Esto me permitió seguir construyendo para la comunidad mientras me enfocaba en mis estudios.

## El Mercado de Valores Virtual

El núcleo de Midas era su mercado en tiempo real. A diferencia de otros bots donde los precios de las acciones son aleatorios, Midas basaba su economía en empresas gestionadas por los usuarios.

- **IPOs:** Los usuarios podían sacar sus empresas a bolsa y emitir acciones para recaudar capital.
- **Gobernanza:** Aunque la moderación recaía principalmente en los dueños de los servidores, Midas incluía funciones de supervisión para los accionistas. Cualquier socio con más del 2% de las acciones podía convocar una votación para disolver la empresa. Además, las transacciones que superaban un límite fijado por el servidor requerían la aprobación de más del 50% de los accionistas.
- **Dinámica del Mercado:** Los precios de las acciones fluctuaban según la oferta, la demanda y el rendimiento del negocio.
- **Dividendos:** Las empresas rentables distribuían ganancias entre sus accionistas.

## Impacto y Escala

Midas alcanzó una escala considerable:

- **5,000+ servidores**.
- **460,000+ usuarios únicos**.
- **2.5 millones de transacciones diarias**.
- **Miles de comandos ejecutados por hora**.

Manejar este volumen requirió un backend optimizado para garantizar la integridad de los datos y la capacidad de respuesta durante los picos de actividad.

## Stack Tecnológico

- **Lenguaje:** TypeScript / Node.js
- **Base de datos:** PostgreSQL para datos financieros e integridad relacional.
- **Caché:** Redis para datos de mercado y estado en tiempo real.
- **Infraestructura:** Arquitectura fragmentada (sharding) mediante Discord.js para gestionar miles de conexiones simultáneas.

## Por qué es importante este proyecto

Midas me enseñó a gestionar economías digitales y el equilibrio sistémico. Lidiar con monopolios de jugadores y fluctuaciones del mercado me dio experiencia práctica en la creación de sistemas de alta concurrencia y el mantenimiento de la integridad de los datos a escala.
