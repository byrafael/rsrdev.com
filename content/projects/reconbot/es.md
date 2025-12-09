---
title: "ReconBot"
description: "Un motor de economía y progresión que conecta servidores de rol de ER:LC con sus comunidades en Discord."
date: "2025-12-09"
tags: ["TypeScript", "Discord.js", "Node.js", "Next.js", "Tailwind CSS"]
image: "/banners/ReconBot.png"
demo: "reconbot.xyz"
---

# ReconBot

ReconBot es un motor de economía y progresión propietario que estoy construyendo para comunidades de rol de **Emergency Response: Liberty County** (ER:LC). Se ubica entre la **comunidad de Discord** y su **servidor privado de ER:LC**, asegurándose de que los roles, recompensas y permisos se mantengan alineados, y de que el tiempo y el esfuerzo de la gente realmente valgan la pena.

En lugar de que cada comunidad vuelva a inventar un sistema medio manual con hojas de cálculo, reglas de honor y scripts hechos al vuelo, ReconBot ofrece una capa única y bien definida que se encarga de las recompensas por tiempo de juego, los salarios por trabajo y los beneficios restringidos, como vehículos exclusivos, equipamiento y equipos especiales.

![Captura del sitio web](https://r2.e-z.host/6346c606-bcaf-419e-988b-b0df8a37d6c4/s0giiwjr.png)
<sub>Captura del sitio web al 9 de diciembre de 2025</sub>

## Contexto

ER:LC es un juego de rol en Roblox donde las personas pueden ser oficiales de ley, bomberos, paramédicos, civiles o criminales, y las comunidades construyen encima de eso estructuras completas de rol. Normalmente, esas comunidades viven en **Discord**, mientras que la jugada real pasa en sus servidores privados de ER:LC.

Esa separación crea un problema muy conocido:

- Discord es donde se manejan los **rangos, trabajos y progresión**.
- ER:LC es donde se **invierte el tiempo, se atienden llamados y se rolea**.
- Mantener esas dos cosas sincronizadas es desgastante, propenso a errores y casi siempre injusto para el staff o para los jugadores.

ReconBot existe para cerrar esa brecha. Trata el servidor de Discord y el servidor de juego de ER:LC como un solo ecosistema, de forma que si vos estás metiendo el hombro en juego, el lado de Discord realmente lo reconozca y te recompense por eso.

## Qué hace ReconBot

En términos generales, ReconBot funciona como un **motor de economía y sistema de derechos** para comunidades de rol de ER:LC:

- **Tiempo de juego → ganancias:** rastrea la presencia y actividad de una persona en el servidor de ER:LC y lo convierte en moneda del juego o créditos.
- **Salarios por trabajo:** los trabajos de rol (despacho, policía, bomberos, EMS, roles civiles, etc.) pueden pagar salarios recurrentes, premiando a quienes de verdad se encargan del trabajo del que depende la comunidad.
- **Beneficios ligados a Discord:** comprar un carro, desbloquear equipamiento o entrar a ciertos equipos requiere que hayas comprado el ítem correspondiente en Discord o que hayas llegado a ciertos niveles de progresión.
- **Restricciones basadas en roles:** ciertos vehículos o equipos se pueden bloquear detrás de roles de Discord, de modo que un ascenso o un rango de staff cambie directamente lo que podés hacer dentro del juego.

El resultado es un sistema donde el **tiempo, la responsabilidad y el desempeño** en el rol se traducen en desbloqueos tangibles, en vez de que la progresión viva solo en la memoria de alguien o en una hoja de cálculo vieja.

## Relación con EconSys

Conceptualmente, ReconBot es un **primo enfocado** de [**EconSys**](/projects/econsys):

- EconSys es una **API de simulación económica de uso general** para comunidades en línea.
- ReconBot es un **despliegue específico para ER:LC** de muchas de esas mismas ideas.

Aun cuando ReconBot **no** usa directamente la API pública de EconSys, gran parte del modelado que hice para EconSys —saldos de usuario, verificación de derechos, flujos de compra y aplicación de políticas— aparece aquí de forma simplificada y más especializada. ReconBot es lo que pasa cuando tomás esas ideas y las optimizás para un dominio muy específico: servidores de rol de ER:LC que se toman en serio el realismo y la progresión a largo plazo.

## Mi rol y responsabilidades

ReconBot es un proyecto propietario por encargo, y actualmente soy **el desarrollador principal** tanto del producto como de la experiencia web. En concreto, eso implica:

- **Diseño de producto y de sistemas:** definir cómo funciona la economía (tasas de ganancia, sinks, progresión), cómo se relacionan los trabajos y los salarios, y cómo los roles de Discord se traducen en derechos dentro del juego.
- **Arquitectura e implementación del bot:** construir el bot de Discord en TypeScript con Discord.js, incluyendo el manejo de comandos, permisos, tareas programadas y la lógica que valida si una persona debería poder manejar algo, usar algo o unirse a algo dentro del juego.
- **Vinculación de cuentas y flujos de autenticación:** implementar los flujos de OAuth2 de Discord para que las personas puedan vincular sus cuentas de forma segura y para que el staff pueda gestionar derechos desde un panel web sin tener que tocar IDs crudos.
- **Panel web y landing page:** construir el panel y la landing en Next.js que los dueños de servidores y el staff usan para configurar trabajos, vehículos, beneficios y reglas de progresión.
- **Integración con el servidor de ER:LC:** conectar el puente que permite que el bot y el panel web hablen con el servidor de juego (por ejemplo, revisando si una persona es dueña de un vehículo o si debería poder spawnearlo), manteniendo en privado los detalles propietarios de la implementación.
- **Operación e iteración:** hacerme cargo del despliegue, el monitoreo y la mejora continua conforme cambian las necesidades de la comunidad.

En otras palabras: desde las tripas del bot de Discord, pasando por la interfaz web, hasta cómo se siente la economía en la práctica, soy responsable de que todo el sistema se sienta coherente, justo y mantenible.

## Stack tecnológico

ReconBot usa un stack alineado con mis herramientas preferidas actuales y con el resto de mi ecosistema:

- **Bot y servicios core**
	- **Lenguaje:** TypeScript
	- **Runtime y gestor de paquetes:** Bun + runtime de Node.js
	- **Integración con Discord:** Discord.js + API de OAuth2 de Discord

- **Panel web y landing page**
	- **Framework:** Next.js (App Router) con React
	- **Estilos:** Tailwind CSS y un sistema de diseño propio, basado en las mismas bases que uso en este portafolio

Más allá de las tecnologías de superficie, lo importante es la **arquitectura**:

- Separación clara entre **comandos de Discord**, **lógica de economía** e **integración con ER:LC**.
- Configuración viviendo en un solo lugar consistente para que el staff pueda cambiar políticas sin tocar código.
- Un sistema de permisos que siempre revisa tanto el **estado en Discord** como el **estado dentro del juego** antes de permitir una acción.

## Por qué este proyecto es importante para mí

ReconBot me importa por varias razones:

- **Diseño de incentivos en los bordes:** es un espacio para diseñar estructuras de incentivos que se sientan justas —premiando a quienes aparecen, hacen su brete y se invierten en la comunidad, sin convertir todo en una pura molienda infinita.
- **Conectar plataformas:** me gusta construir sistemas que conectan plataformas que originalmente no fueron hechas para hablar entre sí. Aquí, eso es Discord, Roblox/ER:LC y un panel web propio.
- **Propiedad de punta a punta:** a diferencia de sistemas grandes con varios equipos, este proyecto me permite adueñarme de todo el stack: pensamiento de producto, arquitectura de sistemas, implementación del bot y experiencia de usuario.
- **Coherencia con mi otro trabajo:** igual que **EconSys** y **SentriFlow**, este proyecto vive en esa intersección entre automatización, comportamiento en el mundo real y comunidades que quieren durar.

A medida que el proyecto evolucione, voy a seguir puliendo tanto el modelo económico como la experiencia de uso, para que los dueños de servidores tengan una herramienta en la que puedan confiar, las personas sientan que su tiempo es respetado y el staff pueda enfocarse en correr buen rol en lugar de estar micromanejando quién puede manejar qué carro.

