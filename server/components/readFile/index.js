import * as fs from 'fs'

/**
 * @description Reads a file from the file system. If the file does not exist, returns null. If the file exists, returns contents in a stream.
 * @param {string} filePath - Path to the file.
 * @returns {fs.ReadStream|null} - A promise that resolves to a stream of the file contents, or null if the file does not exist.
 */
export default function readFile(filePath) {
    if (!fs.existsSync(filePath)) return null

    return fs.createReadStream(filePath)
}