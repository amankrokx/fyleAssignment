/**
 * Get the correct mime type for a given URL.
 * @param {string} path - The URL path.
 * @returns {string} The mime type for the given URL.
 */
export function getMimeType(path) {

    const mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.ico': 'image/x-icon',
        '.json': 'application/json',
        '.svg': 'image/svg+xml',
        '.pdf': 'application/pdf',
        '.zip': 'application/zip',
        '.txt': 'text/plain',
        '.wav': 'audio/wav',
        '.mp3': 'audio/mpeg',
    };

    const extension = path.substring(path.lastIndexOf('.'));
    const mimeType = mimeTypes[extension] || 'application/octet-stream';

    return mimeType;
}
