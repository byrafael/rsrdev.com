import http from "node:http"
import next from "next"

const app = next({ dev: false })
const handle = app.getRequestHandler()

app.prepare().then(() => {
	const server = http.createServer((req, res) => {
		handle(req, res)
	})

	const port = process.env.PORT || 3000
	server.listen(port, (err) => {
		if (err) throw err
		console.log(`> Next.js server started on port ${port}`)
	})
})

// Optional: Graceful shutdown hooks
process.on("SIGINT", () => process.exit(0))
process.on("SIGTERM", () => process.exit(0))
