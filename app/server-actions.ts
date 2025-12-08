"use server"

// Server Actions for Widgets

export async function getWakaTimeStats() {
	const apiKey = process.env.WAKA_KEY

	if (!apiKey) {
		return null
	}

	try {
		const response = await fetch("https://wakatime.com/api/v1/users/current/stats/last_7_days", {
			headers: {
				Authorization: `Basic ${Buffer.from(apiKey).toString("base64")}`,
			},
			next: { revalidate: 3600 },
		})

		if (!response.ok) {
			return null
		}

		const data = await response.json()
		return data.data
	} catch (_error) {
		return null
	}
}

export async function getGithubCommits() {
	const token = process.env.GITHUB

	if (!token) {
		return []
	}

	try {
		const response = await fetch(
			"https://katib.jasoncameron.dev/v2/commits/latest?username=byrafael",
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
				cache: "no-store",
			}
		)

		if (!response.ok) {
			const _errorText = await response.text()
			return []
		}

		const data = await response.json()

		// The API returns an object with a 'commits' array
		const commits = data.commits || []

		interface Commit {
			oid: string
			repo: string
			messageHeadline: string
			committedDate: string
			commitUrl: string
		}

		return commits.slice(0, 5).map((commit: Commit) => ({
			id: commit.oid,
			repo: commit.repo,
			message: commit.messageHeadline,
			date: new Date(commit.committedDate).toLocaleDateString(),
			url: commit.commitUrl,
		}))
	} catch (_error) {
		return []
	}
}

export async function getWeather() {
	try {
		const response = await fetch(
			"https://api.open-meteo.com/v1/forecast?latitude=9.9281&longitude=-84.0907&current=temperature_2m,weather_code&timezone=auto",
			{ cache: "no-store" }
		)

		if (!response.ok) {
			throw new Error("Failed to fetch weather")
		}

		const data = await response.json()

		if (!data.current) {
			throw new Error("Invalid weather data format")
		}

		return {
			temperature: data.current.temperature_2m,
			weatherCode: data.current.weather_code,
		}
	} catch (_error) {
		return null
	}
}
