"use client"

import { Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import Container from "@/components/container"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useTranslation } from "@/hooks/use-translation"

export default function Navigation() {
	const [isOpen, setIsOpen] = useState(false)
	const t = useTranslation()
	const pathname = usePathname()

	const links = [
		{ label: t.nav.about, href: "/about" },
		{ label: t.nav.experience, href: "/experience" },
		{ label: t.nav.projects, href: "/projects" },
		{ label: t.nav.education, href: "/education" },
		{ label: t.nav.credentials, href: "/credentials" },
		{ label: t.nav.community, href: "/community" },
	]

	return (
		<nav className="sticky top-0 z-50 border-border border-b bg-background/95 backdrop-blur-sm">
			<Container className="flex items-center justify-between py-4">
				<div className="flex items-center gap-2 font-mono font-semibold text-lg tracking-tight">
					<Link
						href="/"
						className="text-base text-muted-foreground transition-colors hover:text-brand-accent"
					>
						rsrdev
					</Link>
					<span className="text-muted-foreground/40">/</span>
					{pathname
						.split("/")
						.filter(Boolean)
						.map((segment, index, array) => {
							const href = `/${array.slice(0, index + 1).join("/")}`
							return (
								<div key={href} className="flex items-center gap-2">
									<Link href={href} className="group transition-colors">
										<span className="font-normal text-base text-muted-foreground transition-colors group-hover:text-brand-accent">
											{segment}
										</span>
									</Link>
									<span className="text-muted-foreground/40">/</span>
								</div>
							)
						})}
				</div>

				<div className="hidden gap-6 text-sm md:flex">
					{links.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className="text-muted-foreground transition-colors hover:text-brand-accent"
						>
							{link.label}
						</Link>
					))}
				</div>

				<Sheet open={isOpen} onOpenChange={setIsOpen}>
					<SheetTrigger asChild>
						<Button variant="ghost" size="icon" className="md:hidden">
							<Menu className="h-5 w-5" />
							<span className="sr-only">Toggle menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="right">
						<SheetHeader>
							<SheetTitle>Menu</SheetTitle>
						</SheetHeader>
						<div className="mt-8 flex flex-col gap-4 px-4">
							{links.map((link) => (
								<Link
									key={link.href}
									href={link.href}
									className="font-medium text-lg text-muted-foreground transition-colors hover:text-brand-accent"
									onClick={() => setIsOpen(false)}
								>
									{link.label}
								</Link>
							))}
						</div>
					</SheetContent>
				</Sheet>
			</Container>
		</nav>
	)
}
