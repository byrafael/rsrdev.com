import { NextResponse } from "next/server"

export async function GET() {
	try {
		const response = await fetch(
			"https://api.open-meteo.com/v1/forecast?latitude=9.9281&longitude=-84.0907&current=temperature_2m,weather_code&timezone=auto",
			{ cache: "no-store" }
		)

		if (!response.ok) {
			return NextResponse.json({ error: "Failed to fetch weather" }, { status: response.status })
		}

		const data = await response.json()

		if (!data.current) {
			return NextResponse.json({ error: "Invalid weather data format" }, { status: 500 })
		}

		return NextResponse.json({
			temperature: data.current.temperature_2m,
			weatherCode: data.current.weather_code,
		})
	} catch (_error) {
		return NextResponse.json({ error: "Failed to fetch weather" }, { status: 500 })
	}
}
