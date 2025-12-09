import type React from "react"

export default function Container({
	children,
	className = "",
}: Readonly<{
	children: React.ReactNode
	className?: string
}>) {
	return (
		<div className={`mx-auto w-full max-w-6xl px-8 sm:px-6 ${className}`.trim()}>{children}</div>
	)
}
