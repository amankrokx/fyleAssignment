import http from 'http'
import loadEnv from './server/components/loadEnv/index.js'
import requestHandler from './server/components/requestHandler/requestHandler.js'
import routes from './server/routes/index.js'

// Load environment variables from .env file
loadEnv(".env")

// Create the route Handlers
const reqHandler = requestHandler(routes)

// Create the server
const server = http.createServer(reqHandler)

// Start the server
server.listen(8080, () => {
    console.log('Server listening on port 8080')
    console.log('Visit http://localhost:8080 to see the magic happen!')
})