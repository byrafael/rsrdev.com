---
title: "SentriFlow"
description: "Una capa de inteligencia de soporte al cliente impulsada por IA para las operaciones de MUSCLE."
date: "2025-07-31"
tags: ["JavaScript", "Python", "LangChain", "n8n", "HubSpot", "Aircall", "Deepgram", "LLMs"]
image: "/banners/SentriFlow.png"
---

# SentriFlow

SentriFlow es un sistema de IA propietario que desarrollé para [**MUSCLE**](https://www.musclepoints.com/) durante una pasantía de un mes como AI Systems Developer en **MUSCLE Innovation Labs**. Actualmente se sitúa en medio de su stack de soporte al cliente, observando silenciosamente cada interacción y convirtiendo llamadas y tickets en bruto en inteligencia estructurada y accionable para el equipo.

En lugar de que las conversaciones con clientes vivan como registros de llamadas dispersos y tickets a medias en el CRM, SentriFlow ingiere cada interacción, la analiza con LLMs y envía registros enriquecidos y estructurados de vuelta a HubSpot. El resultado: liderazgo de soporte, equipos de éxito del cliente y dirección tienen una vista en vivo y de alta señal de lo que realmente están experimentando los clientes, sin añadir más trabajo a la carga diaria de los agentes.

El nombre **SentriFlow** es una etiqueta que yo le di a este proyecto. Dentro de MUSCLE, el sistema está implementado en producción bajo un nombre interno diferente, supervisado por el equipo de Customer Success.

## Qué hace SentriFlow

A grandes rasgos, SentriFlow actúa como una **capa de observabilidad e inteligencia para el soporte al cliente**:

- **Pipeline de análisis por llamada:** Cada vez que termina una llamada de soporte en Aircall (o al inicio del proyecto, en RingCentral), se dispara una automatización que construí en **n8n**. Esta reúne metadatos de la llamada, grabaciones y contexto, y luego los envía hacia abajo por el pipeline.
- **Transcripción y enriquecimiento:** El audio se transcribe usando **Deepgram STR** y después se alimenta en flujos de trabajo de **LangChain** impulsados por modelos como **Gemini 2.5 Flash**, modelos **GPT‑4.5** y **Claude Sonnet 4.0** (según la tarea).
- **Detección de resultado e intención:** El sistema evalúa si la interacción fue exitosa, qué intentaba lograr el cliente, qué seguimientos se requieren y si es necesaria una escalada.
- **Puntuación de sentimiento y satisfacción:** Cada llamada recibe un perfil de sentimiento (satisfecho, confundido, frustrado, enojado, etc.), ofreciendo al negocio una forma de cuantificar cómo se *sintieron* los clientes, no solo qué preguntaron.
- **Tickets enriquecidos en HubSpot:** Para cada interacción, SentriFlow crea o actualiza un ticket en **HubSpot** con un resumen estructurado, detalles clave, seguimientos, banderas de escalada y enlaces a la grabación y transcripción originales.

Todo esto se ejecuta automáticamente en segundo plano, para que los agentes puedan centrarse en el cliente en lugar de luchar contra el CRM y la documentación.

## Inteligencia diaria para el negocio

Más allá del análisis por llamada, SentriFlow también funciona como un **briefing ejecutivo diario** sobre la experiencia del cliente:

- Al final de cada día, agrega todas las interacciones procesadas en las últimas 24 horas.
- Agrupa y resume los **principales problemas, temas recurrentes y preguntas frecuentes**.
- Supervisa **problemas emergentes** (por ejemplo, cuando ~90 clientes en un solo día reportan el mismo punto de fricción).
- Produce un resumen de alto nivel y lo envía a los **equipos de satisfacción del cliente y al management de MUSCLE**.

Este resumen diario convirtió el soporte al cliente de una caja negra en un **ciclo de retroalimentación continuo**. En lugar de enterarse de los problemas semanas después, el liderazgo podía ver los patrones mientras se formaban y moverse rápido para solucionarlos. La empresa compartió explícitamente que estaban **extremadamente contentos** con el sistema y lo llevaron a producción con pocas o ninguna modificación. La versión que corre hoy en producción sigue siendo, en lo fundamental, el software que diseñé y construí yo, aunque ahora mantenido por otro equipo.

## El recorrido

SentriFlow nació de una pregunta simple pero de alto riesgo: *«¿Cómo nos aseguramos de que cada interacción con un cliente se convierta realmente en aprendizaje para nuestros clientes?»*

Durante mi mes allí, no quería limitarme a construir un demo o una funcionalidad de juguete. Quería trabajar en algo **crítico para el negocio** y demostrar mi valor como desarrollador.

El soporte al cliente era perfecto para eso: es ruidoso, de alto volumen, cargado de emociones y absolutamente central para cómo se percibe a una empresa. Los agentes humanos son excelentes empatizando y resolviendo problemas en el momento, pero no tanto para convertir manualmente cada llamada en datos estructurados y aprendizaje a largo plazo. Ahí es donde brillan la automatización y los LLMs.

Mapeé las herramientas existentes: **Aircall** para VoIP y registros de llamadas, **HubSpot** para CRM y tickets, y los workflows internos existentes. A partir de ahí, diseñé un sistema que pudiera conectarse a esas herramientas en vez de reemplazarlas, respetando el stack actual del equipo mientras mejoraba la capa de inteligencia que las rodea.

El resultado fue SentriFlow: una orquestación de **workflows en n8n**, **pipelines en LangChain** e **integraciones personalizadas** que conectan Aircall, Deepgram, HubSpot y varios proveedores de LLM en un único flujo fiable.

## Cómo funciona (por dentro)

Aun siendo un sistema propietario y no open-source, la arquitectura de SentriFlow es intencionalmente simple:

- **Núcleo orientado a eventos:** Aircall emite un evento de "llamada finalizada", que dispara un workflow en n8n que construí. Ese flujo coordina llamadas a APIs, reintentos y lógica de ramificación.
- **Speech‑to‑text multilingüe:** Las grabaciones de llamadas se envían a **Deepgram**, que devuelve transcripciones de alta calidad, listas para ser procesadas por LLMs.
- **Razonamiento primero con LLMs:** Usando **LangChain** y tanto **TypeScript** como **Python**, encadeno múltiples prompts de LLM para:
	- Extraer intenciones e intenciones secundarias
	- Determinar si el problema quedó resuelto
	- Proponer siguientes acciones o posibles escaladas
	- Generar un resumen conciso pero denso en información
	- Puntuar el sentimiento y el tono emocional
- **HubSpot como fuente de verdad:** Cuando el análisis termina, el workflow usa la **API de HubSpot** para crear o actualizar tickets con todos los datos enriquecidos, de modo que soporte, éxito del cliente y dirección puedan vivir en una única fuente de verdad.
- **Resúmenes diarios:** Otro flujo programado agrega los tickets del día, ejecuta clustering y resumido mediante LLMs y envía un correo de resumen a las personas adecuadas.

Las tecnologías implicadas incluyen **n8n**, **LangChain**, **TypeScript**, **Python**, **Aircall**, **Deepgram**, varios **proveedores de LLM** y la **API de HubSpot**, todo pegado con scripts a medida, orquestación cuidadosa y una cantidad nada trivial de café (además de al menos tres sesiones de debugging del tipo «¿por qué este webhook no se está disparando?»).

## Por qué este proyecto es importante para mí

SentriFlow es importante no solo porque funciona, sino porque **encarna la forma en la que me gusta trabajar**:

- **Enfoque en lo crítico para el negocio:** Me atraen los sistemas donde el fallo se siente de inmediato: cosas que mueven KPIs, no solo dashboards. SentriFlow está directamente en la intersección entre clientes, soporte y la administración de la empresa.
- **Espacios de problemas complejos:** El soporte al cliente es desordenado: lenguaje natural, emociones, información incompleta y herramientas heredadas. Disfruto tomar esa complejidad y construir pipelines estructurados y resilientes a su alrededor.
- **Ciclos de retroalimentación cortos:** Me importa mucho acortar la distancia entre "algo está yendo mal para los usuarios" y "lo sabemos y podemos actuar". SentriFlow operacionaliza literalmente esa mentalidad: en lugar de conjeturas, la empresa obtiene datos reales (y menos reuniones de producto basadas en «tengo la sensación de que…»).
- **IA con humanos en el centro:** El objetivo nunca fue reemplazar a los agentes, sino hacer su trabajo más fácil y a la empresa más inteligente. Los agentes siguen hablando con los clientes; SentriFlow solo se asegura de que esas conversaciones no se pierdan.

La reacción de mis lideres fue que este era un sistema **de alto impacto y listo para producción** con el que estaban entusiasmados, lo que reforzó el tipo de trabajo que quiero seguir haciendo: sistemas de IA profundamente integrados en las operaciones que mejoran de forma significativa cómo funciona una empresa.

## Pensamientos finales

SentriFlow es, en muchos sentidos, una instantánea de mi mentalidad como ingeniero: trabajar en **sistemas de alto apalancamiento y alto impacto** que se sientan cerca del corazón operativo de un negocio, usar IA donde realmente potencie el trabajo humano y resolver problemas lo bastante complejos como para ser interesantes… y lo bastante importantes como para importar de verdad.

<sub>Traducido de la versión en inglés por GPT-5.1 Pro</sub>