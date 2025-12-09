---
title: "Portafolio"
description: "Mi portafolio personal."
date: "2025-12-08"
tags: ["Typescript", "React", "Next.js", "Tailwind CSS", "Framer Motion"]
image: "/banners/Portfolio.png"
github: "byrafael/rsrdev.com"
demo: "rsrdev.com"
---

# Portafolio

El sitio web que estás viendo ahora mismo.

Puedes ver mis notas de diseño, el roadmap y los planes futuros para este proyecto [aquí](https://rsrdev.fibery.io/PAS/rsrdev.com-68?sharing-key=d088b3ed-e58b-4103-af41-d8e43f8e23a3).

## Recorrido

Este es, más o menos, mi sexto portafolio como desarrollador, pero es el primero en el que me uní al mundo pixel-perfect en lugar de conformarme con un "suficientemente bueno por ahora". Empezó como un simple "solo necesito una web para mostrar mi trabajo y conseguir un empleo" y poco a poco se convirtió en semanas de trabajo, infinitas reescrituras, una cantidad poco saludable de ajustes de 1–2px y una cantidad de cafeína definitivamente poco saludable.

He invertido unas 40+ horas solo en esta sexta gran iteración (la que vive en [`byrafael/rsrdev.com`](https://github.com/byrafael/rsrdev.com/) y está desplegada en este sitio). Ese tiempo incluye código real, exploraciones de diseño y una cantidad sorprendente de horas mirando al techo, replanteándome mis decisiones de vida y preguntándome si esa sombra realmente necesitaba un 2% más o menos.

Todo el sitio está obsesionado con la experiencia de usuario: interacciones suaves, movimiento con sentido y layouts que se sienten intencionales, no accidentales. Está optimizado para que se sienta bien en cualquier dispositivo: teléfono, monitor 4K, tu tostadora o lo que sea donde hayas conseguido instalar un navegador.

En la parte visual, cada banner de proyecto está diseñado a mano. Intenté automatizar la generación de banners, fallé, y decidí que quemar tiempo en Figma y editores de imagen era un mejor uso de mi existencia (por ahora). Hay *muchas* transiciones y animaciones; siendo realistas, probablemente hay demasiadas, pero al menos son coherentes.

## Stack técnico

Uso TypeScript porque me gusta la seguridad de tipos y también disfruto llorar un poquito cada vez que ejecuto un build de producción. React y Next.js impulsan el sitio porque me dan un enrutador de app rápido y flexible, una gran DX y un ecosistema en el que ya soy bastante cómodo y productivo. Bun se encarga del runtime y del gestor de paquetes, así que el desarrollo se mantiene rápido, con baterías incluidas y relativamente indoloro.

- **Framework:** Next.js (App Router) con React
- **Lenguaje:** TypeScript (lo bastante estricto para doler, lo bastante útil para quedarse)
- **Estilos:** Tailwind CSS + sistema de diseño propio
- **Animaciones:** Framer Motion para micro-interacciones y transiciones de página
- **Layout / Widgets:** Packery para widgets arrastrables y reordenables
- **Tooling & DX:** Toolchain moderno de TypeScript, Bun como runtime y gestor de paquetes, Biome para linting y formateo, y suficiente configuración como para que mi yo del futuro no pueda romper todo tan fácilmente

## Funcionalidades

- **Grid de widgets arrastrable:** Un panel personalizable de widgets que puedes arrastrar, reorganizar y con el que puedes jugar. Todo alimentado por Packery para que el layout se sienta ágil en lugar de caótico.
- **Señales de ingeniería en vivo:** Los widgets obtienen datos de WakaTime, contribuciones de GitHub, pipelines de CI/CD e incluso de mis propios servidores, así que el portafolio no es solo texto estático; es una vista en tiempo (casi) real de cómo trabajo.
- **Historia centrada en la ingeniería:** La mayoría de los widgets están diseñados para responder a una pregunta: "¿Qué tipo de ingeniero es esta persona en la práctica?". Muestran hábitos, proyectos, actividad y fiabilidad en lugar de solo palabras bonitas.
- **Diseño UX-first:** Cada pantalla, transición y estado hover está afinado para sentirse deliberado. El foco está en la claridad, la legibilidad y el flujo, con movimiento que te ayuda a entender qué está pasando en lugar de ser solo fuegos artificiales.
- **Responsivo en todas partes:** El layout está optimizado para todos los dispositivos y breakpoints. Da igual si estás en un móvil, tablet, monitor ultra-wide o una nevera inteligente: la idea es que siga viéndose intencional y legible.
- **Probablemente demasiadas animaciones:** Transiciones de página, movimientos sutiles, efectos hover… están por todas partes. Si crees que quizá hay demasiadas, no estás nada equivocado. Si ves elementos que *deberían* estar animados y todavía no lo están, acabas de descubrir el backlog.
 - **Experiencia multi-idioma:** Todo el portafolio está disponible en inglés y español, con contenido traducido de forma cognitiva para que ambas versiones se sientan naturales y no como una traducción literal.

Esta versión del portafolio está pensada para ser *la* versión de referencia para mí: la que por fin se alinea con el esfuerzo que le dedico a mi trabajo, tanto técnica como visualmente.

## Reconocimientos

Creo en dar crédito y reconocimiento donde toca, así que aquí va:

- **Inspiración de portafolios:** La dirección visual y estructural se inspira en portafolios excelentes de gente como [Jason Cameron](https://jasoncameron.dev/), [Evan Boehs](https://boehs.org/), [Tri Ho](https://www.triho.dev/), [Alvina Yang](https://www.alvinayang.com/), [Sean Goedecke](https://www.seangoedecke.com/about) y otras personas.
- **Iconos:** La iconografía está impulsada por [lucide](https://lucide.dev/) y [react-icons](https://react-icons.github.io/react-icons/).
- **Origen del layout y la paleta:** El tema de color y el layout inicial de la v1 de esta iteración vienen de [v0](https://v0.dev/), y a partir de ahí han evolucionado con muchas rondas de ajustes y refinamientos míos.
- **Fuentes de datos:** El tiempo de código y los lenguajes principales vienen de [WakaTime](https://wakatime.com/). La información de commits y builds viene de GitHub. El contador de visitas está gestionado por [Abacus](https://v2.jasoncameron.dev/abacus/). Los datos del tiempo vienen de [Open-Meteo](https://open-meteo.com/). La información de uptime está proporcionada por [Better Stack](https://betterstack.com/) y scripts propios.
- **Contenido y traducciones:** Las traducciones literales al español están generadas con Google Translate y [google-translate-api-x](https://www.npmjs.com/package/google-translate-api-x/), mientras que las traducciones cognitivas al español están apoyadas por Claude Sonnet 4.5 y revisadas por mí.
- **Inspiración del widget:** El widget de últimos commits de GitHub está inspirado en el de [Jason Cameron](https://jasoncameron.dev/).

Este proyecto tardó mucho más de lo que un portafolio "debería" tardar, pero el resultado es algo de lo que realmente estoy orgulloso: un sitio que refleja cómo pienso, cómo construyo y lo en serio que me tomo tanto la ingeniería como el diseño.

Y si alguna vez encuentras un comentario misterioso en el código, asume que es mi yo del futuro discutiendo con mi yo del pasado… o una feature flag muy avanzada y extremadamente poco documentada.
