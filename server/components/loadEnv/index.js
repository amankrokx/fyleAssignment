import * as fs from 'fs'

/**
 * @description Load environment variables from .env file
 * @param {string?} filePath Path to .env file (default: .env)
 */
export default function loadEnv(filePath) {
    try {
        const envPath = filePath || '.env'
        const envFile = fs.readFileSync(envPath, 'utf-8')
        const envLines = envFile.split('\n')
    
        for (const line of envLines) {
            const [key, value] = line.split('=')
            process.env[key] = value
        }
    } catch (error) {
        console.error("File not found: " + filePath)
    }
}

