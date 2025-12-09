---
title: "Schedulr"
description: "Un sistema de horarios resiliente que reemplaza una legendaria (y frágil) hoja de cálculo de Google en mi colegio."
date: "2025-02-15"
tags: ["TypeScript", "Next.js", "Express", "MySQL", "Prisma ORM", "Bun"]
image: "/banners/Schedulr.png"
pinned: true
order: 2
---

# Schedulr

Schedulr es un sistema de horarios que estoy construyendo para reemplazar una de las hojas de cálculo de Google más impresionantes (y aterradoras) que he visto en mi vida: la hoja maestra de horarios de mi colegio.

Durante años, esa única hoja de cálculo —miles de filas, decenas de vistas y más fórmulas de las que deberían ser legales— manejó **todo**: asignación de aulas, carga docente, choques de horarios, horarios por nivel, horarios de grupo base y el desglose día a día de cada clase. Era una obra de arte mantenida casi por completo por una de mis profes favoritas, T. Lisa.

En mi último año se hizo evidente que el sistema de horarios del cole era, básicamente, un **punto único de falla**. La dirección no entendía del todo la hoja, nadie quería tocarla y la cantidad de casos especiales (como… yo) no paraba de crecer. Ahí es donde entra Schedulr.

## El problema

Para cuando llegué a undécimo, yo era de los estudiantes con el horario más personalizado de todo el colegio. Estaba exento de varias materias, metido en otras adicionales y, en general, vivía en un estado permanente de “no calza con el modelo estándar”.

Google Sheets hace muchas cosas bien; **soporte nativo para excepciones complejas por estudiante en todo un colegio no es una de ellas**. Para que mi horario funcionara, Lisa tuvo que:

- Crear grupos base separados solo para mí y otros cuantos casos "especiales".
- Mantener a mano horarios alternos y tablas de excepciones.
- Llevar en la cabeza qué hoja, pestaña o búsqueda era la “verdadera” fuente de la verdad.

Funcionaba, pero era frágil. Cada nueva excepción —bloques conjuntos entre décimo y undécimo, clases armadas para grupos específicos, horarios especiales para ciertos niveles— agregaba más complejidad a un sistema que ya era extremadamente delicado.

Si Lisa se iba (como pasó a finales de 2025), o si alguien hacía el cambio equivocado, todo el sistema de horarios podía romperse.

## Qué hace Schedulr

Schedulr es un **backend y frontend de horarios como Dios manda**, diseñado específicamente para este enredo:

- **Clases y bloques dinámicos:** El sistema modela clases, bloques y franjas horarias como entidades de primer nivel, con soporte para distintas horas, días rotativos y estructuras de bloque personalizadas.
- **Estructuras de día flexibles:** Los horarios no están amarrados al típico mundo de “lunes a viernes, lecciones fijas”. Las personas de administración pueden definir los patrones de días y bloques que realmente usa el cole.
- **Profes, aulas y restricciones:** Profes, aulas, niveles y grupos base viven en MySQL, lo que hace más fácil detectar y manejar choques o combinaciones imposibles.
- **Excepciones por estudiante:** En vez de hacer malabares encima de una hoja de cálculo, las excepciones están incluidas en el modelo de datos. Eso incluye:
	- Estudiantes con horarios personalizados (como yo).
	- Bloques donde varios niveles comparten la misma clase.
	- Grupos base que se separan temporalmente por charlas, eventos o programas especiales.
- **Entendible para gente no técnica:** A diferencia de una hoja de cálculo sobre‑ingenierizada, la idea es que dirección y personal **entiendan y operen** el sistema sin tener que reverse‑ingenierizar el cerebro de Lisa.

Por debajo del capó, Schedulr usa:

- **Backend:** Express corriendo sobre **Bun**, con Prisma ORM encima de **MySQL**.
- **Frontend:** **Next.js** para la interfaz web.
- **Arquitectura:** Un monorepo que va a contener el backend, el frontend y toda la parte de infraestructura (tablas, migraciones, etc.) una vez que el sistema esté listo para producción.

Al momento de escribir esto, el repositorio público está vacío a propósito. Cuando el núcleo del sistema esté estable (estimado alrededor del **15 de febrero**), el monorepo completo se va a subir a GitHub para que otras personas puedan verlo, aprender de él y contribuir.

## Impacto

Para mi cole, Schedulr no es un “nice to have”. Es infraestructura:

- Elimina un punto crítico de falla amarrado a una sola profe y a una sola hoja legendaria.
- Vuelve casos extremos —excepciones de horario, bloques mezclados entre niveles, horarios especiales— **ciudadanos de primera clase** en vez de ser hacks frágiles.
- Convierte un proyecto heroico y personal (la hoja de Lisa) en algo que todo el equipo administrativo puede entender, mantener y extender.

Cuando esté listo, Schedulr está pensado para **meterse en producción en el colegio**, aunque yo ya me haya salido de ahí. Un poco irónico: el mae que se fue a hacer estudio independiente es el que termina montando el sistema que va a programar las clases a las que él ya no va.

## Aprendizaje y oficio

Construí Schedulr con la guía de T. Lisa como parte de mi curso de **A Level de Computación**, pero también como un clavado deliberado en modelado relacional y SQL. La meta no era solo cumplir con una rúbrica, sino:

- Aprender bien la **notación de SQL**, más allá del “que funcione y ya”.
- Diseñar esquemas que reflejen el desorden real de un horario escolar.
- Pensar en términos de restricciones, relaciones e invariantes, no solo filas y columnas.

Muchos de mis proyectos favoritos tienen algo en común: resuelven problemas que son **críticos para algún dominio**, aunque desde afuera se vean “aburridos”: operaciones, horarios, soporte, herramientas internas, etc. Schedulr cae directo en esa filosofía: no es un proyecto flashy, pero le importa muchísimo a la gente que depende de él.

## Por qué este proyecto me importa

Schedulr se sienta justo en la intersección de varias cosas que me gustan:

- **Consecuencias reales:** Si Schedulr se cae, la gente se da cuenta al tiro. Profes, estudiantes y administración lo sienten de inmediato. Me gusta construir sistemas donde el uptime y la corrección no son algo abstracto.
- **Problemas complejos y nada glamorosos:** Armar horarios escolares es enredo puro: lleno de restricciones y con un montón de casos raros. Es justo el tipo de problema que me cuadra: alta complejidad, cero glamour, pero un impacto enorme cuando lo resolvés bien.
- **Herramientas que sobreviven a las personas:** La hoja de Lisa era brillante, pero vivía en la cabeza de una sola persona. Schedulr es mi intento de codificar ese genio en algo mantenible, documentado y compartible.

Y, bueno, hay algo medio poético en que este sea mi proyecto de A Level: un curso que literalmente existía *solo para mí*, produciendo un sistema que existe en gran parte **porque** yo (junto con otros estudiantes) era un caso extremo en el horario.

## Palabras finales

Schedulr sigue en desarrollo activo, pero sus objetivos están clarísimos:

- Respetar la genialidad de la hoja original de Google.
- Cambiar su fragilidad por algo resiliente.
- Hacerle la vida más fácil a la gente que corre un colegio, no más difícil.

Y si en el camino me toca escribir demasiados joins en SQL, obsesionarme con diagramas relacionales y hacer un par de chistes autocríticos sobre “ese estudiante que arruinó el horario”, para mí eso ya es ganancia.

