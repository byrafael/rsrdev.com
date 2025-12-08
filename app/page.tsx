import About from "@/components/sections/about"
import Certificates from "@/components/sections/certificates"
import Education from "@/components/sections/education"
import Experience from "@/components/sections/experience"
import Hero from "@/components/sections/hero"
import Projects from "@/components/sections/projects"
import TechStack from "@/components/sections/tech-stack"

export default function Home() {
	return (
		<main className="flex-1 bg-background text-foreground">
			<Hero />
			<About />
			<TechStack />
			<Experience />
			<Projects />
			<Education />
			<Certificates />
			{/* <Research /> */}
			{/* <Contact /> */}
		</main>
	)
}
