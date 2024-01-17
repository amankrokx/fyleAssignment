/**
 * @typedef {Object} RouteHandlers
 * @property {Function} / - Handler for the root URL.
 * @property {Function} /echo - Handler for the /echo URL.
 */

// FILEPATH: /C:/aman/fyleAssignment/server/components/routes/index.js
/**
 * @type {RouteHandlers}
 */
const routes = {
    "/": undefined, // no handler for the root URL will result in serving the index.html file
    "/echo": (req, res) => {
        // set the status code to 200 (OK)
        res.writeHead(200)
        // send the request body back
        res.end(req.body || "No body received")
    },
}

export default routes