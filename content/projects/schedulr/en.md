---
title: "Schedulr"
description: "A resilient scheduling system replacing a legendary, fragile Google Sheet at the high school I dropped out of."
date: "2025-02-15"
tags: ["TypeScript", "Next.js", "Express", "MySQL", "Prisma ORM", "Bun"]
image: "/banners/Schedulr.png"
pinned: false
order: 2
---

# Schedulr

Schedulr is a scheduling system I’m building to replace one of the most impressive (and terrifying) Google Sheets I’ve ever seen: the master schedule for my high school.

For years, that single spreadsheet—thousands of rows, dozens of views, and more formulas than should be legal, handled **everything**: room assignments, teacher loads, conflicts, per‑grade timetables, homeroom schedules, and day‑by‑day breakdowns for every class. It was a work of genius maintained almost entirely by one of my favourite teachers, T. Lisa.

My senior year, it became obvious that the school’s scheduling system was effectively a **single point of failure**. The directors didn’t fully understand the sheet, nobody wanted to touch it, and the number of edge cases (like… me) kept growing. That’s where Schedulr comes in.

## The Problem

By the time I hit junior year, I was one of the students with the most heavily customized schedule in the entire school. I was exempt from a lot of classes, pulled into others, and generally lived in a permanent “doesn’t fit the template” state.

Google Sheets does many things well; **native support for complex, per‑student overrides across a whole school is not one of them**. To make my schedule work, Lisa had to:

- Create separate homerooms just for me and a few other “special cases”.
- Manually maintain alternate schedules and exception tables.
- Keep mental models of which sheet, tab, or lookup was the “real” source of truth.

It worked, but it was brittle. Every new exception—joint blocks shared between 10th and 11th grade, ad‑hoc classes for specific homerooms, special schedules for certain grades—added more complexity to an already extremely delicate system.

If Lisa ever stepped away (which she did in late 2025), or if someone made the wrong edit, the whole scheduling system could break.

## What Schedulr Does

Schedulr is a **proper scheduling backend and frontend** designed specifically for this mess:

- **Dynamic classes and blocks:** The system models classes, blocks, and time slots as first‑class entities, with support for different hours, rotating days, and custom block structures.
- **Flexible day structures:** Schedules aren’t hard‑coded to a “Monday–Friday, fixed periods” world. Admins can define the day and block patterns that match the school’s reality.
- **Teachers, rooms, and constraints:** Teachers, classrooms, grades, and homerooms are all modeled in MySQL, making conflicts and impossible combinations easier to detect and manage.
- **Per‑student overrides:** Instead of bolting hacks onto a spreadsheet, overrides are built into the data model. That includes:
	- Students with custom timetables (like me).
	- Blocks where multiple grades share the same class.
	- Homerooms that temporarily diverge for seminars, events, or special programs.
- **Readable for non‑engineers:** Unlike an over‑engineered spreadsheet, the goal is for directors and staff to actually **understand and operate** the system without needing to reverse‑engineer Lisa’s brain.

Under the hood, Schedulr uses:

- **Backend:** Express running on **Bun**, with Prisma ORM on top of **MySQL**.
- **Frontend:** **Next.js** for the web interface.
- **Architecture:** A mono‑repo that will contain the backend, frontend, and infra (tables, migrations, etc.) once the system is production‑ready.

As of the time of writing, the public repository is intentionally empty. Once the core system is stable (estimated around **February 15th**), the full mono‑repo will be pushed to GitHub and opened up for others to inspect, learn from, and contribute to.

## Impact

For my high school, Schedulr is not a “nice to have.” It’s infrastructure:

- It removes a critical single point of failure tied to one teacher and one legendary spreadsheet.
- It makes complex edge cases—like schedule overrides, mixed‑grade blocks, and special seminars—**first‑class citizens** instead of fragile hacks.
- It turns a personal hero project (Lisa’s sheet) into something the entire admin team can understand, maintain, and extend.

Once finished, Schedulr is planned to be **pushed to production for the high school**, even though I’ve since dropped out. Slightly ironic: the kid who left to pursue independent study is now shipping the system that will schedule the classes he no longer attends.

## Learning and Craft

I built Schedulr with T. Lisa's guidance as part of my **A Level Computer Science class**, but also as a deliberate deep dive into relational modeling and SQL. The goal wasn’t just to pass a rubric—it was to:

- Learn **SQL notation** properly, beyond “just make it work” queries.
- Design schemas that reflect the real‑world mess of a school schedule.
- Think in terms of constraints, relationships, and invariants rather than just rows and columns.

Most of my favorite projects share a common thread: they solve problems that are **critical to some domain**, even if that domain looks “boring” from the outside—operations, scheduling, support, internal tooling, etc. Schedulr fits squarely into that philosophy: it’s not flashy, but it deeply matters to the people who rely on it.

## Why This Project Matters to Me

Schedulr sits at the intersection of a few things I care about:

- **Real stakes:** If Schedulr breaks, people notice immediately. Teachers, students, and administrators all feel it. I like building systems where uptime and correctness aren’t abstract.
- **Complex, unglamorous problems:** School scheduling is messy, constrained, and full of weird edge cases. It’s exactly the kind of problem space I enjoy: high complexity, low glamour, but huge impact when you get it right.
- **Tooling that outlives people:** Lisa’s sheet was brilliant, but it lived in one person’s head. Schedulr is my attempt to encode that brilliance into something maintainable, documented, and shareable.

Also, there’s a bit of poetic humor in this being my A Level CS project: a class that literally existed *just for me*, producing a system that exists largely **because** I (along with some other students) was such a scheduling edge case.
