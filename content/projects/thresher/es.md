---
title: "SCP: Thresher"
description: "Ingeniería de sistemas y programación de jugabilidad para una experiencia SCP de alta tensión en Roblox."
date: "2025-12-09"
tags: ["LuaU", "Roblox", "Rojo", "Wally", "Git", "Desarrollo de Juegos", "Diseño de Sistemas", "OOP"]
image: "/banners/Thresher.png"
---

# SCP: Thresher

SCP: Thresher es un juego de terror en Roblox inspirado en la Fundación SCP, desarrollado por **GEN Interactive**, un estudio de Roblox y empresa hermana de **Versify Studios** (conocida por entregar scripts y sistemas de calidad a otros desarrolladores y estudios).

El juego toma inspiración de **SCP-1730** ("¿Qué pasó en el Sitio-13?"), poniendo a los jugadores dentro de una instalación dañada e inestable donde la realidad misma se está quebrando. Tu tarea es recorrer pasillos oscuros y hostiles, rastrear y evitar anomalías, y sobrevivir el tiempo suficiente para que los equipos de contención logren entender qué salió mal.

Hasta ahora, el proyecto solo ha tenido **teasers tempranos limitados** (principalmente modelos 3D y assets del mundo, que no son mi trabajo). Los sistemas y el código que describo aquí funcionan detrás de escena, dando vida al mundo, rastreando anomalías y permitiendo que los jugadores interactúen con el entorno.

## El Sistema de Detección de Hume

Una de mis principales responsabilidades en SCP: Thresher es el **sistema de detección de Hume** – básicamente un contador Geiger para anomalías SCP.

Para el jugador, es un dispositivo portátil que:

- Rastrea anomalías cercanas que emiten campo Hume.
- Muestra una lectura en vivo en una unidad personalizada que llamamos **hm**s.
- Reacciona conforme te movés por la instalación, haciéndose más ruidoso o intenso cuando te acercás a anomalías más fuertes o cercanas.

Por dentro, ese comportamiento sencillo esconde un modelo bastante complejo:

- **Fuerza Hume por anomalía:** Cada anomalía tiene una “fuerza Hume” propia que representa qué tan disruptiva es para la realidad.
- **Caída según distancia:** La señal se debilita con la distancia, como un campo físico, así que no recibís lecturas absurdas desde el otro lado del mapa.
- **Ruido base e interferencia:** El sistema mantiene un **nivel base de HM** que toma en cuenta todas las anomalías en el área. Si estás en una zona llena de anomalías débiles, el nivel base sube en vez de que cada señal nueva sature el medidor.
- **Priorización de fuente más cercana:** El detector se enfoca en la anomalía relevante más cercana, así la lectura es clara y no parpadea entre todos los objetos en rango.

El resultado es un detector que *se siente* como un instrumento real: es ruidoso, reactivo y sensible al contexto, pero lo suficientemente predecible para que los diseñadores puedan crear encuentros y los jugadores aprendan a “leerlo”.

## Varios Detectores, Diferentes Comportamientos

Sobre el modelo principal, implementé soporte para **varios tipos de detectores**, cada uno con su propio comportamiento y restricciones:

- **Distintas distancias:** Algunos detectores son de corto alcance y precisos, otros llegan más lejos pero con más ruido de fondo.
- **Sistemas de batería:** Los dispositivos tienen modelos de batería propios – algunos se recargan, otros son desechables, y cada uno se gasta a diferente ritmo según cómo el detector escanea el entorno.
- **Ajuste para roles de juego:** Como el sistema es parametrizable, los diseñadores pueden crear nuevos tipos de detectores (por ejemplo, uno para equipos de reconocimiento y otro para equipos de contención pesada) sin tener que reescribir la lógica principal.

La idea fue mantener **toda la matemática y el procesamiento de señales centralizados**, pero permitir que haya varios ítems en el juego que “hablen el mismo idioma” en unidades HM.

## Registro de Anomalías y Arquitectura de Sistemas

Para soportar el detector de Hume, creé un **Servicio de Registro de Anomalías** que actúa como fuente de verdad para todo lo que puede emitir Hume:

- Cuando las anomalías aparecen o cambian de estado, se **registran** en el servicio.
- El servicio mantiene una tabla de anomalías activas, sus posiciones y propiedades relacionadas con Hume.
- Los detectores consultan este registro para calcular sus lecturas en vez de escanear todo el mundo manualmente.

Esta arquitectura mantiene el código de jugabilidad **modular y fácil de mantener**:

- Se pueden agregar nuevas anomalías registrándolas en el servicio, sin tocar el código interno de los detectores.
- El mismo registro puede alimentar otros sistemas después (IA, eventos dinámicos o protocolos de contención) sin duplicar lógica.
- El rendimiento se mantiene predecible porque los detectores trabajan con datos curados y no con escaneos improvisados.

## Matemática y Modelo de Señal

Toda la matemática y el procesamiento de señales detrás del sistema de detección de Hume fue diseñada e implementada por mí, buscando que el detector se sintiera plausible y divertido para jugar.

### Cálculo del Nivel Base

El nivel base de Hume en una posición se calcula sumando la influencia de todas las anomalías registradas:

$$
\text{Base}(\vec{p}) = 1 + \sum_{i=1}^N \frac{S_i}{\left(\frac{d_i}{10} + 1\right)^{\alpha_i}}
$$

Donde:
- $S_i$ es la fuerza de la anomalía $i$
- $d_i$ es la distancia del detector a la anomalía $i$
- $\alpha_i$ es el exponente de caída para la anomalía $i$
- $N$ es el número de anomalías
- $1$ es el nivel base de Hume

### Lectura del Detector

La lectura del detector para una anomalía específica es:

$$
H(d) = H_0 + \frac{S}{\left(\frac{d}{10} + 1\right)^{\alpha}}
$$

Donde:
- $H_0$ es el nivel base anterior
- $S$ es la fuerza de la anomalía medida
- $d$ es la distancia a la anomalía
- $\alpha$ es el exponente de caída

Así, las lecturas siempre son positivas, escalan suavemente con la distancia y permiten ajustar fácilmente cómo decaen o se acumulan las señales en áreas llenas de anomalías.

## Sistemas de Moneda y Objetivos

Además del detector de Hume, también trabajé en **meta-sistemas** que apoyan la progresión y rejugabilidad:

- Un **sistema de moneda** que premia a los jugadores por completar recorridos, objetivos y explorar, y que otros diseñadores pueden usar para tiendas, mejoras o cosméticos.
- Un **sistema de retos y objetivos** que rastrea metas, estados de completitud y recompensas, para que el juego pueda ofrecer objetivos estructurados además de la exploración libre.

Estos sistemas son **data-driven**, permitiendo que personas no técnicas definan nuevos objetivos o recompensas usando configuración en vez de cambiar código, pero manteniendo todas las reglas en un solo lugar.

## Trabajando con un Estudio Profesional de Roblox

SCP: Thresher no es un prototipo de hobby, sino una **producción de estudio** hecha y propiedad de **GEN Interactive**. Eso significa:

- El juego se desarrolla en una base de código establecida, con scripters, diseñadores y artistas dedicados.
- Hay restricciones reales de rendimiento, mantenibilidad y cómo los sistemas se integran en la arquitectura existente.
- Mi rol es ayudar a implementar y mantener sistemas centrales (como detectores, registros y progresión) como uno de los programadores de jugabilidad del proyecto.

Como el proyecto es privado, no comparto capturas internas, builds ni código. Todo lo que describo aquí es una visión general de los sistemas en los que he trabajado dentro de SCP: Thresher.

## ¿Por Qué Este Proyecto Me Importa?

SCP: Thresher está justo en la intersección de varias cosas que me gustan como ingeniero:

- **Diseño de sistemas en juegos:** Me gusta crear mecánicas donde la matemática, la simulación y la experiencia del jugador están conectadas. El detector de Hume es un ejemplo perfecto: si el modelo está mal, el juego *se siente* mal.
- **Señales en ambientes ruidosos:** Ajustar un detector para que sea legible en una instalación llena de anomalías es procesamiento de señales aplicado, y ese tipo de problema me encanta.
- **Trabajo de confianza e impacto:** Ser uno de dos scripters en un juego de producción significa que los sistemas que hago afectan directamente cómo se juega y cómo el estudio lanza nuevas funciones.

Como muchos de mis proyectos favoritos, SCP: Thresher no es solo “tecnología chiva” – es usar ingeniería para que un mundo ficticio se sienta coherente, reactivo y vivo, respetando los límites de un estudio real.

## Estado

SCP: Thresher **sigue en desarrollo**, sin fecha pública de lanzamiento. Por ahora, mi trabajo sigue enfocado en fortalecer la columna vertebral sistémica del juego – detectores, registros, sistemas de progresión – para que cuando los jugadores finalmente lo prueben, la experiencia sea tensa, coherente y sólida desde el primer día.

