import { Analytics } from "@vercel/analytics/next"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import type React from "react"
import FloatingPills from "@/components/floating-pills"
import LoadingScreen from "@/components/loading-screen"
import Footer from "@/components/sections/footer"
import Navigation from "@/components/sections/navigation"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/lib/language-context"
import "katex/dist/katex.min.css"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
})

export const metadata: Metadata = {
	title: "Rafael Soley",
	description:
		"Senior Backend Engineer, Aspiring Quant Developer, Game Scripter (LuaU), & an enthusiast for Applied Mathematics.",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${inter.variable} ${jetbrainsMono.variable} flex min-h-screen flex-col bg-background font-sans text-foreground antialiased`}
			>
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
					{/* <LoadingScreen /> // Disabled till actually necessary */}
					<LanguageProvider>
						<Navigation />
						{children}
						<Footer />
						<FloatingPills />
						<Analytics />
					</LanguageProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
