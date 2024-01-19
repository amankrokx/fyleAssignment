import http from "http";
import readFile from "../readFile/index.js";
import { getMimeType } from "./getMimeType.js";

/**
 * Handles incoming HTTP requests and routes them to the appropriate handler.
 * @param {RouteHandlers} routes - Object containing route handlers for different URLs.
 * @returns {Function} - Request handler function.
 */
export default function requestHandler(routes) {
    // return a function that will be called with the request and response objects
    /**
     * @description Handles incoming HTTP requests and routes them to the appropriate handler.
     * @param {http.IncomingMessage} req
     * @param {http.ServerResponse} res
     * @returns {void}
     */
    return (req, res) => {
        // ready for exceptions?
        try {
            // use the router if it's defined
            if (routes[ req.url ] && typeof routes[ req.url ] === "function") return routes[ req.url ](req, res);

            // Check if url is a file with valid extension
            if (req.url === "/" || req.url.match(/\/[^\/]+\.[a-zA-Z0-9]{1,8}(\?.*)?$/)) {
                // what will the above regex match? Try it out here: https://regex101.com/r/6yUE8U/1
                const path = 
                    "./client" + // prepend the path with the client folder
                    (req.url === "/" ? "/index.html" : req.url.split("?")[ 0 ]) // if the url is /, serve index.html, else serve the url
                const readStream = readFile(path)
                        // If the file exists, serve it
                        if (readStream) {
                            // write correct mime type in header
                            const mimeType = getMimeType(path)
                            res.setHeader("Content-Type", mimeType)
                            // write the status code in the header
                            res.writeHead(200)
                            // pipe the read stream to the response stream
                            readStream.pipe(res)
                            // close the response stream
                            readStream.on("close", () => res.end())
                            return
                        }
                        // If the file doesn't exist, throw an error
                        throw {
                            code: 404,
                            message: "File not found",
                        }
            }

            // No route defined for this URL
            throw {
                code: 404,
                message: "No route defined for URL " + req.url,
            }
        } catch (error) {
            console.error(error);
            if (error.code) {
                res.writeHead(error.code);
                res.end(error.message);
            } else {
                res.writeHead(500);
                res.end("Internal error: " + error.message);
            }
        }
    };
}
