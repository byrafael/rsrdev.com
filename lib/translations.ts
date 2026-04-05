export const translations = {
	en: {
		// Navigation
		nav: {
			about: "About",
			techStack: "Tech Stack",
			experience: "Experience",
			projects: "Projects",
			education: "Education",
			certificates: "Certificates",
			credentials: "Credentials",
			research: "Research",
			contact: "Contact",
		},
		// Hero Section
		hero: {
			greeting: "Hey! I'm",
			subtitle: "AI Systems & Backend Engineer",
			description:
				"I'm an <span class='font-bold'>AI Systems Engineer</span> with 8+ years of programming experience and 6+ years of independent contractor work building high-performance infra. After scaling bots and software for <span class='font-bold'>thousands of online communities</span> and <span class='font-bold'>over half a million active users</span>, I now develop AI solutions at <span class='font-bold'>MUSCLE</span> to optimize CX and support efficiency for their global clients. I am currently also applying my systems-first background to <span class='font-bold'>quantitative finance</span>, creating mathematical models to predict market movements.",
			tagline: "Code. Data. Markets.",
		},
		// About Section
		about: {
			paragraph:
				"I build software systems that model, analyze, and optimize complex environments, whether the complexity comes from markets, people, or large-scale operational constraints. I have eight years of programming experience and six years of contractor work developing backend systems, AI workflows, and quantitative tooling. Across all of my projects and work, my focus is the same: using code as a way to understand, simulate, and improve complex systems.",
			stats: [
				{
					value: 6,
					suffix: "+",
					label: "Years Work Experience",
				},
				{
					value: 8,
					suffix: "+",
					label: "Years Programming Experience",
				},
				{
					value: 20,
					suffix: "+",
					label: "Technologies",
				},
			],
		},
		// Tech Stack Section
		techStack: {
			title: "Technical Skills",
			categories: {
				languages: "Languages",
				mlData: "ML & Data",
				trading: "Trading",
				infrastructure: "Infrastructure",
				web: "Web",
				tools: "Tools",
				sound: "Sound Systems",
			},
		},
		// WakaTime Section
		wakatime: {
			mostUsedLanguages: "Most used languages",
			last30Days: "This month",
			last7Days: "Last 7 days",
			noData: "No language data available for this period.",
		},
		// Experience Section
		experience: {
			title: "Experience",
			present: "Present",
			jobs: [
				{
					title: "Co-Founder & CTO",
					company: "Futuryze Consulting Group Ltd.",
					period: { start: "2025", end: "2025-03" },
					description: [
						"Architected and deployed AI voice-agent infrastructure for healthcare scheduling, triage, and patient communication across multiple countries.",
						"Led product vision, systems design, and technical execution for HIPAA-compliant, production-grade deployments.",
						"Engineered backend workflows and automation pipelines integrating OpenAI, Anthropic, ElevenLabs, and Deepgram.",
						"Scaled infrastructure to support high-volume clinical operations without requiring providers to write code.",
						"Directed cross-team coordination, compliance processes, and long-term technical strategy.",
					],
					highlights: [
						"Voice AI",
						"AI Systems",
						"AI Infrastructure",
						"Leadership",
						"Business Administration",
						"Compliance (GDPR / HIPAA)",
						"Team Management & Coordination",
					],
				},
				{
					company: "Global Youth Congress",
					roles: [
						{
							title: "Under-Secretary General for Delegate Relations",
							period: { start: "2025-11" },
							description: [
								"Led all year-round communications and onboarding operations for Global MUN 2026 across 2 online and 4 physical conferences.",
								"Served as the primary liaison between leadership and delegates, ensuring clarity, readiness, and timely delivery of materials.",
								"Oversaw registration, inquiry management, logistics distribution, and academic document flow.",
								"Coordinated with Chairs and Co-Chairs to maintain alignment across content, schedules, and delegation needs.",
								"Maintained reliable remote presence during conferences to ensure a seamless delegate experience.",
							],
							highlights: [
								"Project Management",
								"Team Leadership",
								"Communication",
								"Youth Diplomacy",
								"Leadership",
								"Stakeholder Management",
								"Public Relations",
								"Business Relationship Management",
								"Team Coordination",
							],
						},
						{
							title: "Public Relations Specialist",
							period: { start: "2024-11", end: "2025-11" },
							description: [
								"Managed communication with partner schools to drive delegate and institutional participation across conferences.",
								"Conducted outreach through email, WhatsApp, and digital platforms to boost registration.",
								"Contributed to promotional content, sales calls, and marketing initiatives.",
								"Supported event execution across two virtual conferences and one physical conference.",
								"Participated in staff coordination, meetings, and community engagement activities.",
							],
							highlights: [
								"Media Relations",
								"Content Creation",
								"Event Coordination",
								"Business Relationship Management",
								"Public Relations",
								"Marketing",
							],
						},
					],
				},
				{
					title: "Contract Software Developer",
					company: "Independent Contractor",
					period: { start: "2019", end: "2025" },
					description: [
						"Delivered full-stack software solutions for online communities and small businesses across Costa Rica.",
						"Built backend systems integrated with the Discord Bot API for automation and community management.",
						"Lead the development and/or owned online bots, many with over 500,000 unique users, and over 1,000 guilds each. Many have even passed the Discord verification (both the legacy and modern verification).",
						"Scripted advanced systems for games in Roblox's LuaU as a senior scripter for independent clients and game studios, including GEN Interactive, Versify Studios, Mizal's Studio, and more.",
						"Developed custom websites and tools tailored to individual client needs.",
						"Managed the full development lifecycle including requirements, design, implementation, and deployment.",
						"Worked directly with clients to translate business objectives into technical systems.",
					],
					highlights: [
						"Full-Stack Web Development",
						"Backend Systems Design",
						"Discord Bot API Integration",
						"Client Communication",
						"Project Management",
						"Requirements Analysis",
						"Node.js / JavaScript",
					],
				},
				{
					title: "Software Engineer",
					company: "MUSCLE",
					period: { start: "2026-01" },
					description: [
						"Tasked with developing production software to optimize the Customer Support and Customer Satisfaction pipelines for MUSCLE's international clients.",
						"Solo developer of MUSCLE's internal CRM and Customer Help Desk.",
						"Leveraging AI agents to optimize Software Development.",
						"Implementing AI models to the Customer Support pipeline to increase customer satisfaction and boost SLAs.",
					],
					highlights: [
						"AI Systems",
						"Node.js",
						"Bun",
						"TypeScript",
						"HubSpot / N8N",
						"Full-Stack Development",
						"Google Cloud Infrastructure",
						"Cursor",
					],
				},
				{
					title: "AI System Development Intern",
					company: "MUSCLE",
					period: { start: "2025-07", end: "2025-07" },
					description: [
						"Built AI agents and sentiment-analysis workflows inside n8n for high-volume support call automation.",
						"Implemented Node.js, LangChain, and Python components for real-time, production-ready deployments.",
						"Developed scalable integrations with HubSpot, Aircall, and internal R&D pipelines.",
						"Delivered automation systems capable of processing inbound and outbound calls at scale.",
					],
					highlights: ["AI Systems", "Langchain / N8N", "JS / Python", "Hubspot / Aircall"],
				},
				{
					title: "Student Sound Technician",
					company: "Tree Of Life International School",
					period: { start: "2022", end: "2025" },
					description: [
						"Directed audio production for assemblies, hearings, theatre productions, and school events.",
						"Engineered more than 100 hours of live sound across dozens of events and three major theatrical productions.",
						"Trained and led the Student Sound Tech team in technical skills and operational standards.",
						"Operated Yamaha DM3 mixers, Bose audio systems, wireless microphones, and stage monitoring setups.",
						"Performed live EQ, gain staging, signal processing, and rapid troubleshooting during events.",
					],
					highlights: [
						"Technical Direction",
						"Team Leadership & Training",
						"Yamaha Mixers",
						"Bose Sound Systems",
						"Live EQ, Gain, & Signal Processing",
						"Wireless Audio Systems",
						"Stage Audio Management",
					],
				},
			],
		},
		// Projects Section
		projects: {
			title: "Selected Projects",
			disclaimer:
				"Most of these systems were originally developed proprietarily. I'm currently recreating most as open-source projects, so repositories may be empty or incomplete.",
			viewAll: "View all projects",
			viewProject: "View Project",
			viewCode: "View Code",
			list: [
				{
					title: "EconSys",
					description:
						"Modular economic-simulation API platform powering virtual economies: models users, assets, markets and policy effects in real time.",
					tags: ["Node.js", "Express", "API", "MySQL", "Virtual Economy"],
					source: "https://github.com/byrafael/EconSys",
					preview: "https://econsys.rsrdev.com",
				},
				{
					title: "QuantOps",
					description:
						"Python-based quantitative research and trading framework with CLI and built-in interactive dashboard: covers data ingestion, backtesting, portfolio optimisation.",
					tags: ["Python", "Quantitative Trading", "Backtesting", "CLI"],
					source: "https://github.com/byrafael/QuantOps",
				},
				{
					title: "Schedulr",
					description:
						"Intelligent scheduling system that dynamically orchestrates classes, blocks, and teachers across multiple days.",
					tags: ["Next.js", "MySQL", "Education Tech"],
					source: "https://github.com/byrafael/Schedulr",
				},
				{
					title: "Mosaic",
					description:
						"Your smarter operations platform — a unified tool for managing and automating operational workflows across your infrastructure and product stack.",
					tags: ["Node.js", "Microservices", "Operations Automation", "SaaS"],
					source: "https://github.com/byrafael/Mosaic",
				},
				{
					title: "EconDash",
					description:
						"Interactive analytics & visualization dashboard built atop EconSys—delivers real-time insights into market/user behaviour, policies and outcomes.",
					tags: ["React", "D3.js", "Dashboard", "Data Visualization"],
					source: "https://github.com/byrafael/EconDash",
				},
				{
					title: "ReconBot",
					description:
						"A comprehensive economy engine built specifically for Emergency Response: Liberty County (ER:LC) role-play servers. Manages player banking, purchase-only vehicle ownership, business structures with revenue sharing, and real-time economy analytics.",
					tags: ["Node.js", "Discord.js", "Next.js", "React", "TailwindCSS", "OAuth2"],
					preview: "https://reconbot.xyz",
				},
			],
		},
		// Education Section
		education: {
			title: "Formal Education",
			list: [
				{
					degree: "High School Diploma",
					school:
						"Ministerio de Educación Pública de Costa Rica (Costa Rican Ministry of Education)",
					year: "Expected 2026",
					details:
						"Independently pursuing high school diploma through the Educación Diversificada a Distancia (EDAD) program.",
				},
				{
					degree: "Next Gen Data Science",
					school: "INCAE Business School",
					year: "2025",
					details:
						"Participated in an INCAE Next Gen program, focused on data science and modelling in business contexts.",
				},
				{
					degree: "IGCSEs",
					school: "Cambridge International Education",
					year: "2023 - 2024",
					details: ["International Mathematics", "Computer Science", "English Language", "History"],
				},
			],
		},
		// Certificates Section
		certificates: {
			title: "Credentials",
			view: "View",
			list: [
				{
					title: "Next Gen Data Science",
					issuer: "INCAE Business School",
					year: "2025",
				},
				{
					title: "ISC2 Candidate",
					issuer: "ISC2",
					year: "2025",
				},
				{
					title: "Data Visualization with Python",
					issuer: "IBM's Cognitive Class",
					year: "2024",
				},
				{
					title: "Python & Statistics for Financial Analysis",
					issuer: "The Hong Kong University of Science and Technology",
					year: "2024",
				},
			],
		},
		// Research Section
		research: {
			title: "My Research",
			readMore: "Read More",
			noResearch: "No published research at this time.",
			description: "Thoughts on systems, markets, and code.",
			list: [
				// {
				//   title: "Building Low-Latency Trading Systems in 2024",
				//   excerpt:
				//     "A deep dive into modern approaches to sub-millisecond order execution and the trade-offs between latency and complexity.",
				//   date: "Nov 15, 2024",
				//   link: "https://cdn.rsrdev.com/papers/low-latency-trading-2024.pdf",
				// },
			],
		},
		// About Page
		aboutPage: {
			title: "About Me",
			subtitle: "I operate at the intersection of code, data, and markets.",
			paragraph1:
				"Based in San José, Costa Rica (and holding dual EU citizenship), I spend my days building high-performance systems, but my time away from the keyboard is dedicated to high-performance living. I’m deeply invested in the science of physical training, spending hours studying biomechanics and nutrition to fine-tune my own strength and calisthenics routines.",
			paragraph2:
				"Beyond the self-improvement, I focus heavily on my circle. I’m a dedicated dog dad to six, and I’m passionate about animal rescue work. Whether I’m reading up on the latest health research or spending time with my friends and dogs, I prioritize the offline connections that keep me grounded.",
			outsideTerminal: {
				title: "Outside the Terminal",
				sound: {
					title: "Sound Engineering",
					description:
						"I treat sound engineering as a technical craft. I mix audio, troubleshoot acoustic issues, and manage full live-event setups. This includes stage management, configuring professional sound systems, handling signal flow, and working with vocal ranges to produce clean, reliable sound.",
				},
				training: {
					title: "Physical Training",
					description:
						"Strength training, and more recently, calisthenics, form the core of my physical improvement. While I'm still new to calisthenics, the progression and skill work push me in ways that weight lifting just doesn't. Strength training built my foundation of discipline and consistency, while calisthenics challenges my coordination and body control.",
				},
				community: {
					title: "Community Service",
					description:
						"Community service is a long-term commitment for me, not a checkbox. I've accumulated more than 360 hours of volunteer work, focusing on creating visible, measurable improvements in the communities I serve.",
				},
			},
		},
		// Footer
		footer: {
			contactTitle: "Let's Get in Touch",
			copyright: `© ${new Date().getFullYear()} Rafael Soley.`,
			madeWith: "Made with",
			and: "and",
			nextjs: "NextJS",
		},
		// Social Media Labels
		social: {
			linkedin: "LinkedIn",
			github: "GitHub",
			x: "X",
			email: "Email",
			orcid: "ORCiD",
		},
		// Floating Pills
		floatingPills: {
			switchToSpanish: "Switch to Spanish",
			switchToEnglish: "Switch to English",
			lightMode: "Switch to light mode",
			darkMode: "Switch to dark mode",
			customize: "Customize look and feel",
			accentColor: "Accent Color",
			backgroundTint: "Background Tint",
			reset: "Reset to Defaults",
			colors: {
				purple: "Purple",
				blue: "Blue",
				cyan: "Cyan",
				green: "Green",
				orange: "Orange",
				red: "Red",
				pink: "Pink",
			},
			tints: {
				white: "Modern",
				ocean: "Ocean",
				forest: "Forest",
				rose: "Rose",
				slate: "Slate",
			},
		},
		// Widgets
		widgets: {
			recentCommits: "Recent Commits",
			inspiredBy: "Inspired by",
			noCommits: "No recent public commits.",
			poweredBy: "Uptime powered by",
			codingTime: "Coding Time",
			last7Days: "Last 7 Days",
			latestBuild: "Latest Build",
			systemStatus: "System Status",
			connections: "Connections",
			uptime: "Uptime",
			latency: "Latency",
			allSystemsOperational: "All systems operational",
			systemIssuesDetected: "System issues detected",
		},
	},
	es: {
		// Navigation
		nav: {
			about: "Sobre mí",
			techStack: "Stack Técnico",
			experience: "Experiencia",
			projects: "Proyectos",
			education: "Educación",
			certificates: "Certificados",
			credentials: "Credenciales",
			research: "Investigación",
			contact: "Contacto",
		},
		// Hero Section
		hero: {
			greeting: "¡Hola! Soy",
			subtitle: "Ingeniero de Sistemas de IA y Backend",
			description:
				"Soy un <span class='font-bold'>Ingeniero de Sistemas de IA</span> con más de 8 años de experiencia en programación y 6+ años como contratista independiente desarrollando infraestructura de alto rendimiento. Tras escalar software y bots para <span class='font=bold'>miles de comunidades en línea</span> y <span class='font-bold'>más de medio millón de usuarios activos</span>, actualmente desarrollo soluciones de IA en <span class='font-bold'>MUSCLE</span> para optimizar la experiencia del cliente (CX) y la eficiencia de soporte. Además, aplico mi enfoque centrado en sistemas a las <span class='font-bold'>finanzas cuantitativas</span>, creando modelos matemáticos para predecir movimientos del mercado.",
			tagline: "Código. Datos. Mercados.",
		},
		// About Section
		about: {
			paragraph:
				"Construyo sistemas de software que modelan, analizan y optimizan entornos complejos, ya sea que la complejidad provenga de mercados, personas o restricciones operacionales a gran escala. Tengo ocho años de experiencia en programación y seis años de trabajo por contrato desarrollando sistemas backend, flujos de trabajo de IA y herramientas cuantitativas. En todos mis proyectos y trabajos, mi enfoque es el mismo: usar código como una forma de entender, simular y mejorar sistemas complejos.",
			stats: [
				{
					value: 6,
					suffix: "+",
					label: "Años de Experiencia Laboral",
				},
				{
					value: 8,
					suffix: "+",
					label: "Años de Experiencia en Programación",
				},
				{
					value: 20,
					suffix: "+",
					label: "Tecnologías",
				},
			],
		},
		// Tech Stack Section
		techStack: {
			title: "Habilidades Técnicas",
			categories: {
				languages: "Lenguajes",
				mlData: "ML y Datos",
				trading: "Trading",
				infrastructure: "Infraestructura",
				web: "Web",
				tools: "Herramientas",
				sound: "Sistemas de Sonido",
			},
		},
		// WakaTime Section
		wakatime: {
			mostUsedLanguages: "Lenguajes más usados",
			last30Days: "Últimos 30 días",
			last7Days: "Últimos 7 días",
			noData: "No hay datos de lenguajes disponibles para este período.",
		},
		// Experience Section
		experience: {
			title: "Experiencia",
			present: "Presente",
			jobs: [
				{
					title: "Co-Fundador y CTO",
					company: "Futuryze Consulting Group Ltd.",
					period: { start: "2025", end: "2026-03" },
					description: [
						"Diseñé y desplegué infraestructura de agentes de voz con IA para programación, triaje y comunicación clínica en múltiples países.",
						"Dirigí la visión del producto, diseño de sistemas y ejecución técnica para implementaciones con cumplimiento HIPAA.",
						"Desarrollé flujos backend y automatizaciones integrando OpenAI, Anthropic, ElevenLabs y Deepgram.",
						"Escalé la infraestructura para soportar operaciones clínicas de alto volumen sin requerir código por parte del cliente.",
						"Coordiné equipos, procesos de cumplimiento y estrategia técnica a largo plazo.",
					],
					highlights: [
						"IA de Voz",
						"Sistemas de IA",
						"Infraestructura de IA",
						"Liderazgo",
						"Administración de Empresas",
						"Compliance (GDPR / HIPAA)",
						"Coordinación y Administración de Equipos",
					],
				},
				{
					company: "Global Youth Congress",
					roles: [
						{
							title: "Subsecretario General para Relaciones con Delegados",
							period: { start: "2025-11" },
							description: [
								"Lideré la comunicación y el proceso de incorporación para Global MUN 2026 en 2 conferencias virtuales y 4 presenciales.",
								"Actué como enlace principal entre la dirección y los delegados, asegurando claridad, preparación y entrega puntual de materiales.",
								"Supervisé registro, gestión de consultas, distribución logística y flujo de documentos académicos.",
								"Coordiné con Chairs y Co-Chairs para mantener alineación en contenidos, horarios y necesidades delegacionales.",
								"Mantuvé presencia operativa remota durante las conferencias para asegurar una experiencia fluida.",
							],
							highlights: [
								"Gestión de Proyectos",
								"Dirección de Equipos",
								"Comunicación",
								"Diplomacia Juvenil",
								"Liderazgo",
								"Gestión de Partes Interesadas",
								"Relaciones Públicas",
								"Gestión de Relaciones Empresariales",
								"Coordinación de Equipos",
							],
						},
						{
							title: "Especialista en Relaciones Públicas",
							period: { start: "2024-11", end: "2025-11" },
							description: [
								"Gestioné la comunicación con escuelas asociadas para impulsar la participación de delegados e instituciones.",
								"Realicé outreach mediante correo, WhatsApp y plataformas digitales para incrementar inscripciones.",
								"Apoyé la creación de contenido promocional, llamadas de ventas y acciones de marketing.",
								"Contribuí a la ejecución de dos conferencias virtuales y una presencial.",
								"Participé en coordinación de personal, reuniones y actividades comunitarias.",
							],
							highlights: [
								"Relaciones con Medios",
								"Creación de Contenido",
								"Coordinación de Eventos",
								"Gestión de Relaciones Empresariales",
								"Relaciones Públicas",
								"Marketing",
							],
						},
					],
				},
				{
					title: "Desarrollador de Software por Contrato",
					company: "Contratista Independiente",
					period: { start: "2019", end: "2025" },
					description: [
						"Entregué soluciones de software full-stack para comunidades en línea y pequeñas empresas en Costa Rica.",
						"Construí sistemas backend integrados con la API de Discord para automatización y gestión comunitaria.",
						"Lideré el desarrollo, y fuí dueño de bots en línea, varios con más de 500,000 usuarios únicos y más de 1,000 servidores. Muchos incluso han pasado la verificación de Discord (tanto la verificación legacy como la moderna).",
						"Programé sistemas avanzados para juegos en LuaU de Roblox como scripter senior para clientes independientes y estudios de juegos, incluyendo GEN Interactive, Versify Studios, Mizal's Studio, y más.",
						"Desarrollé sitios web y herramientas personalizadas según las necesidades del cliente.",
						"Gestioné el ciclo completo de desarrollo: requisitos, diseño, implementación y despliegue.",
						"Trabajé directamente con clientes para traducir objetivos de negocio en sistemas técnicos.",
					],
					highlights: [
						"Desarrollo Web Full-Stack",
						"Diseño de Sistemas Backend",
						"Integración API Discord Bot",
						"Comunicación con Clientes",
						"Gestión de Proyectos",
						"Análisis de Requisitos",
						"Node.js / JavaScript",
					],
				},
				{
					title: "Ingeniero de Software",
					company: "MUSCLE",
					period: { start: "2026-01" },
					description: [
						"Encargado de desarrollar software de producción para optimizar los flujos de Atención al Cliente y Satisfacción del Cliente para los clientes internacionales de MUSCLE.",
						"Desarrollador único del CRM interno y Centro de Ayuda al Cliente de MUSCLE.",
						"Aprovechando agentes de IA para optimizar el Desarrollo de Software.",
						"Implementando modelos de IA en el flujo de Atención al Cliente para aumentar la satisfacción del cliente y mejorar los SLAs.",
					],
					highlights: [
						"Sistemas de IA",
						"Node.js",
						"Bun",
						"TypeScript",
						"HubSpot / N8N",
						"Desarrollo Full-Stack",
						"Infraestructura de Google Cloud",
						"Cursor",
					],
				},
				{
					title: "Desarrollador Pasante de Sistemas de IA",
					company: "MUSCLE",
					period: { start: "2025-07" },
					description: [
						"Construí agentes de IA y flujos de análisis de sentimiento en n8n para automatizar llamadas de soporte de alto volumen.",
						"Implementé componentes en Node.js, LangChain y Python para despliegues en tiempo real y de calidad productiva.",
						"Desarrollé integraciones escalables con HubSpot, Aircall y los flujos internos de I+D.",
						"Entregué sistemas de automatización capaces de procesar llamadas entrantes y salientes a gran escala.",
					],
					highlights: ["Sistemas de IA", "Langchain / N8N", "JS / Python", "Hubspot / Aircall"],
				},
				{
					title: "Técnico de Sonido Estudiantil",
					company: "Tree Of Life International School",
					period: { start: "2022", end: "2025" },
					description: [
						"Dirigí la producción de audio para asambleas, audiencias, obras teatrales y eventos escolares.",
						"Ejecuté más de 100 horas de sonido en vivo en decenas de eventos y tres producciones teatrales.",
						"Formé y lideré al equipo estudiantil de sonido en habilidades técnicas y estándares operativos.",
						"Operé mixers Yamaha DM3, sistemas Bose, micrófonos inalámbricos y monitores de escenario.",
						"Realicé EQ en vivo, ajuste de ganancia, procesamiento de señal y solución rápida de problemas.",
					],
					highlights: [
						"Dirección Técnica",
						"Liderazgo y Formación de Equipos",
						"Mixers Yamaha",
						"Sistemas de Sonido Bose",
						"EQ en Vivo, Ganancia y Procesamiento de Señal",
						"Sistemas de Audio Inalámbricos",
						"Gestión de Audio de Escenario",
					],
				},
			],
		},
		// Projects Section
		projects: {
			title: "Proyectos Seleccionados",
			disclaimer:
				"La mayoría de estos sistemas fueron desarrollados originalmente de forma propietaria. Actualmente estoy recreando la mayoría como proyectos de código abierto, por lo que algunos repositorios pueden estar vacíos o incompletos.",
			viewAll: "Ver todos los proyectos",
			viewProject: "Ver Proyecto",
			viewCode: "Ver Código",
			list: [
				{
					title: "EconSys",
					description:
						"Plataforma API modular de simulación económica que impulsa economías virtuales: modela usuarios, activos, mercados y efectos de políticas en tiempo real.",
					tags: ["Node.js", "Express", "API", "MySQL", "Economía Virtual"],
					source: "https://github.com/byrafael/EconSys",
					preview: "https://econsys.rsrdev.com",
				},
				{
					title: "QuantOps",
					description:
						"Marco de investigación cuantitativa y trading basado en Python con CLI y panel interactivo integrado: cubre ingesta de datos, backtesting y optimización de cartera.",
					tags: ["Python", "Trading Cuantitativo", "Backtesting", "CLI"],
					source: "https://github.com/byrafael/QuantOps",
				},
				{
					title: "Schedulr",
					description:
						"Sistema de programación inteligente que orquesta dinámicamente clases, bloques y profesores a través de múltiples días.",
					tags: ["Next.js", "MySQL", "Tecnología Educativa"],
					source: "https://github.com/byrafael/Schedulr",
				},
				{
					title: "Mosaic",
					description:
						"Tu plataforma de operaciones más inteligente: una herramienta unificada para gestionar y automatizar flujos de trabajo operacionales en tu infraestructura y pila de productos.",
					tags: ["Node.js", "Microservicios", "Automatización de Operaciones", "SaaS"],
					source: "https://github.com/byrafael/Mosaic",
				},
				{
					title: "EconDash",
					description:
						"Panel de análisis y visualización interactivo construido sobre EconSys—entrega información en tiempo real sobre comportamiento de mercado/usuario, políticas y resultados.",
					tags: ["React", "D3.js", "Panel de Control", "Visualización de Datos"],
					source: "https://github.com/byrafael/EconDash",
				},
				{
					title: "ReconBot",
					description:
						"Un motor económico integral construido específicamente para servidores de juego de rol de Emergency Response: Liberty County (ER:LC). Gestiona banca de jugadores, propiedad de vehículos solo por compra, estructuras comerciales con reparto de ingresos y análisis económico en tiempo real.",
					tags: ["Node.js", "Discord.js", "Next.js", "React", "TailwindCSS", "OAuth2"],
					preview: "https://reconbot.xyz",
				},
			],
		},
		// Education Section
		education: {
			title: "Educación Formal",
			list: [
				{
					degree: "Bachiller en la Educación Media",
					school: "Ministerio de Educación Pública de Costa Rica",
					year: "Graduación Esperada 2026",
					details:
						"Cursando independientemente el bachillerato a través del programa de Educación Diversificada a Distancia (EDAD).",
				},
				{
					degree: "IGCSEs",
					school: "Cambridge International Education",
					year: "2023 - 2024",
					details: [
						"Matemáticas Internacionales",
						"Ciencias de la Computación",
						"Idioma Inglés",
						"Historia",
					],
				},
			],
		},
		// Certificates Section
		certificates: {
			title: "Credenciales",
			view: "Ver",
			list: [
				{
					title: "Next Gen Data Science",
					issuer: "INCAE Business School",
					year: "2025",
				},
				{
					title: "ISC2 Candidate",
					issuer: "ISC2",
					year: "2025",
				},
				{
					title: "Data Visualization with Python",
					issuer: "IBM's Cognitive Class",
					year: "2024",
				},
				{
					title: "Python & Statistics for Financial Analysis",
					issuer: "The Hong Kong University of Science and Technology",
					year: "2024",
				},
			],
		},
		// Research Section
		research: {
			title: "Mi Investigación",
			readMore: "Leer Más",
			noResearch: "No hay investigación publicada en este momento.",
			description: "Reflexiones sobre sistemas, mercados y código.",
			list: [
				// {
				//   title: "Construyendo Sistemas de Trading de Baja Latencia en 2024",
				//   excerpt:
				//     "Una inmersión profunda en enfoques modernos para la ejecución de órdenes submilisegundos y las compensaciones entre latencia y complejidad.",
				//   date: "Nov 15, 2024",
				//   link: "https://cdn.rsrdev.com/papers/low-latency-trading-2024.pdf",
				// },
			],
		},
		// About Page
		aboutPage: {
			title: "Sobre Mí",
			subtitle: "Opero en la intersección de código, datos y mercados.",
			paragraph1:
				"Basado en San José, Costa Rica (y con doble ciudadanía europea), dedico mis días a construir sistemas de alto rendimiento, pero mi tiempo fuera del teclado está dedicado a vivir con alto rendimiento. Me involucro profundamente en la ciencia del entrenamiento físico, pasando horas estudiando biomecánica y nutrición para perfeccionar mis rutinas de fuerza y calistenia.",
			paragraph2:
				"Más allá de la mejora personal, pongo mucho énfasis en mi círculo cercano. Soy un dedicado 'papá' de seis perros y me apasiona el trabajo de rescate animal. Ya sea leyendo sobre las últimas investigaciones en salud o compartiendo tiempo con mis amigos y perros, priorizo las conexiones fuera de línea que me mantienen centrado.",
			outsideTerminal: {
				title: "Fuera de la Terminal",
				sound: {
					title: "Ingeniería de Sonido",
					description:
						"Trato la ingeniería de sonido como un oficio técnico. Mezclo audio, soluciono problemas acústicos y gestiono configuraciones completas para eventos en vivo. Esto incluye la gestión de escenarios, la configuración de sistemas de sonido profesionales, el manejo del flujo de señales y el trabajo con rangos vocales para producir un sonido limpio y confiable.",
				},
				training: {
					title: "Entrenamiento Físico",
					description:
						"El entrenamiento de fuerza y, más recientemente, la calistenia, forman el núcleo de mi mejora física. Aunque todavía soy nuevo en la calistenia, la progresión y el trabajo de habilidades me empujan de formas que el levantamiento de pesas simplemente no hace. El entrenamiento de fuerza construyó mi base de disciplina y consistencia, mientras que la calistenia desafía mi coordinación y control corporal.",
				},
				community: {
					title: "Servicio Comunitario",
					description:
						"El servicio comunitario es un compromiso a largo plazo para mí, no una casilla que marcar. He acumulado más de 360 horas de trabajo voluntario, enfocándome en crear mejoras visibles y medibles en las comunidades a las que sirvo.",
				},
			},
		},
		// Footer
		footer: {
			contactTitle: "Pongámonos en Contacto",
			copyright: `© ${new Date().getFullYear()} Rafael Soley.`,
			madeWith: "Hecho con",
			and: "y",
			nextjs: "NextJS",
		},
		// Social Media Labels
		social: {
			linkedin: "LinkedIn",
			github: "GitHub",
			x: "X",
			email: "Correo",
			orcid: "ORCiD",
		},
		// Floating Pills
		floatingPills: {
			switchToSpanish: "Cambiar a español",
			switchToEnglish: "Cambiar a inglés",
			lightMode: "Cambiar a modo claro",
			darkMode: "Cambiar a modo oscuro",
			customize: "Personalizar apariencia",
			accentColor: "Color de Acento",
			backgroundTint: "Tinte de Fondo",
			reset: "Restablecer valores",
			colors: {
				purple: "Púrpura",
				blue: "Azul",
				cyan: "Cian",
				green: "Verde",
				orange: "Naranja",
				red: "Rojo",
				pink: "Rosa",
			},
			tints: {
				white: "Moderno",
				ocean: "Océano",
				forest: "Bosque",
				rose: "Rosa",
				slate: "Pizarra",
			},
		},
		// Widgets
		widgets: {
			recentCommits: "Commits Recientes",
			inspiredBy: "Inspirado por",
			noCommits: "No hay commits públicos recientes.",
			poweredBy: "Uptime impulsado por",
			codingTime: "Tiempo Programando",
			last7Days: "Últimos 7 Días",
			latestBuild: "Última Build",
			systemStatus: "Estado del Sistema",
			connections: "Conexiones",
			uptime: "Uptime",
			latency: "Latencia",
			allSystemsOperational: "Todos los sistemas operativos",
			systemIssuesDetected: "Problemas del sistema detectados",
		},
	},
} as const

export type TranslationKey = keyof typeof translations.en
