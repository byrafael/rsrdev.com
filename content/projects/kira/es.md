---
title: "Kira"
description: "Un bot de economía y utilidades para Discord, financiado por la comunidad, que llegó a correr en cientos de servidores."
date: "2025-12-09"
tags: ["TypeScript", "Node.js", "Discord.js", "Yarn", "PM2", "Canvas"]
image: "/banners/Kira.png"
---

# Kira

Kira fue uno de mis bots propietarios de Discord de más larga duración y, por un buen rato, el proyecto al que más energía le metí. Nació con otro nombre ("Athena") y más tarde lo renombré en honor a una de mis perras, a finales de 2024. Para cuando dejé de desarrollarlo activamente, alrededor de mediados de 2025, Kira se había convertido en un bot verificado de Discord que combinaba **mecánicas de economía** con **herramientas de gestión diaria del servidor** para cientos de comunidades.

A diferencia de algunos proyectos más recientes, que se enfocan en servidores de rol o nichos muy específicos, Kira estaba pensado para **comunidades generales** que querían una sensación de persistencia y progreso: la gente podía ganar moneda con el tiempo, cambiarla, apostarla y gastarla en beneficios que realmente se sentían relevantes dentro de sus servidores.

## Qué Era Kira

Kira se ubicaba en el cruce entre **bot de economía** y **bot de utilidades para servidor**:

- Para algunos servidores, era la **capa principal de economía**: lo que hacía que llegar todos los días y pasar el rato se sintiera recompensado.
- Para otros, era parte de su **stack de moderación y utilidades**, manejando pequeñas automatizaciones de calidad de vida encima de su sistema de moneda.

La meta siempre fue la misma: darle a los servidores una forma de **recompensar la constancia y la participación**, sin convertir todo en algo cansado o sin gracia.

## Qué Hacía

A grandes rasgos, Kira implementaba una **economía virtual ligera pero efectiva** para servidores que no eran de rol:

- **Ingresos diarios y rachas:** Las personas podían reclamar recompensas diarias, armar rachas y ganar un ingreso base solo por llegar y participar.
- **Intercambio y apuestas:** Los usuarios podían mover moneda entre ellos, jugar juegos sencillos y apostar parte de su saldo, siempre con ajustes pensados para que fuera entretenido, no abusivo.
- **Beneficios definidos por el servidor:** Cada comunidad configuraba perks como roles VIP, mejoras cosméticas, permisos para imágenes y otros beneficios que se podían comprar con la moneda interna del servidor.
- **Diseño orientado a retención:** Los loops eran intencionalmente simples pero pegajosos: entrar, ganar, jugar un rato y gastar en cosas que realmente importan en ese espacio específico.

Además de eso, Kira ofrecía un conjunto de **funciones de utilidad** que ayudaban a mantener los servidores ordenados y sanos: lo típico que esperás de un bot completo de la época — herramientas básicas de moderación, pequeñas tareas automatizadas y comandos que hacían que manejar un servidor grande fuera un poco menos pesado.

## Impacto y Escala

A lo largo de su vida útil, Kira llegó a una escala de la que todavía me siento muy orgulloso:

- **~700 servidores** usaron Kira en algún momento.
- Varios de esos servidores tenían **más de 2.000 miembros** cada uno.
- En total, Kira llegó a **unas 50.000 personas usuarias distintas**.
- Manejaba de forma rutinaria **más de 150.000 interacciones al día** (de lo cual al rededor de 100.000 eran "transacciones" individuales) entre todos los servidores.
- Fue **verificado por Discord**, lo que ayudó con la visibilidad y, al mismo tiempo, me obligó a mantener un estándar alto de confiabilidad.

Uno de los servidores grandes que usaba Kira comentó que sentían que el bot tenía un **impacto claro y positivo en la actividad y la retención**. La capa de economía se convirtió en una especie de pulso de fondo para la comunidad: algo que empujaba a la gente a volver, participar y quedarse, sin que esa fuera la única razón para estar ahí.

Kira también fue **financiado por la comunidad**. Los costos de hosting e infraestructura se cubrían con donaciones de dueños de servidores y personas usuarias que querían mantener el bot gratuito y disponible para más comunidades. Ese ciclo de apoyo fue muy importante para mí: el bot se pagaba solo porque la gente realmente valoraba lo que estaba haciendo por sus servidores.

## Relación con EconSys

Por debajo, Kira corría sobre un **motor económico propietario** que luego evolucionó hacia lo que hoy llamo [**EconSys**](/projects/econsys).

- Kira consumía una **API interna y cerrada** para saldos, permisos y flujos de transacciones.
- Ese mismo modelado — usuarios, saldos, derechos, políticas y flujos de compra — ahora se está **reconstruyendo como una API abierta de EconSys**.

El código original de Kira sigue siendo propietario y ya no se mantiene, pero cuando la API pública de EconSys esté lista, casi todo lo que hacía interesante a Kira desde el lado económico va a convertirse, en la práctica, en **software libre y de código abierto**. En otras palabras: aunque el bot ya no existe, su **motor central está renaciendo** como una herramienta que otras personas pueden usar para construir sus propios bots.

## Stack Tecnológico

Kira usaba un stack muy parecido a cómo me gustaba construir bots de Discord en ese momento:

- **Lenguaje:** TypeScript
- **Runtime:** Node.js, con **Yarn** para la gestión de dependencias
- **Administrador de procesos:** **PM2** para mantener shards y procesos de trabajo vivos y reiniciarlos en caso de falla
- **Integración con Discord:** **Discord.js** sobre el **Gateway** y la **REST API** de Discord, con soporte para comandos slash y manejo de alto volumen de interacciones
- **Renderizado:** Renderizado de imágenes basado en Canvas (para cosas como tarjetas de perfil y embeds ricos) usando librerías del ecosistema de `canvas`

Más allá de la parte visible del stack, lo realmente interesante siempre fue la **arquitectura de la economía**: comandos con rate limiting, chequeos anti‑abuso, garantías de consistencia para los saldos y una separación clara entre **la lógica de economía** y **el transporte por Discord**, de manera que las mismas ideas se pudieran reutilizar en otros contextos.

## Por Qué Este Proyecto Importa para Mí

A pesar de que Kira ya no corre en producción, representa varias cosas que son centrales en cómo me gusta diseñar sistemas:

- **Diseñar incentivos, no solo features:** Las preguntas más importantes siempre fueron “¿Qué estamos premiando?” y “¿Qué comportamiento estamos empujando de forma silenciosa?”. El bot tenía que sentirse generoso y divertido sin convertir el servidor en un casino ni en una pura molienda infinita.
- **Ganar y mantener confianza:** Ser verificado, manejar cientos de miles de interacciones al día y ser parte del día a día de miles de personas significaba que el uptime, la seguridad y la previsibilidad no eran negociables.
- **Mentalidad comunidad‑primero:** Kira existió porque las comunidades lo pidieron, lo apoyaron y demostraron que sí había demanda real por sistemas de economía bien pensados y bien implementados.
- **Base para trabajo futuro:** Las lecciones de Kira influyeron directamente en cómo pienso EconSys y otros motores económicos que he construido desde entonces.

Kira está discontinuado, pero su ADN sigue vivo: en los modelos económicos que construyo hoy, en cómo me acerco al diseño de incentivos y retención, y pronto en las herramientas de código abierto que van a permitir que otras personas desarrollen bots igual de confiables y centrados en la comunidad.

