class GitHubAPIs {
    /** @type {string} */
    #token = ""
    /** @type {string} */
    apiVersion = ""

    /**
     * @description Initialize the GitHub API client
     * @param {string} token Github token
     * @param {string?} apiVersion Github API version as yyyy-mm-dd
     */
    constructor(token, apiVersion = "2022-11-28") {
        // Initialize any required variables or configurations
        this.#token = token
        this.apiVersion = apiVersion
    }

    #getDefaultHeaders() {
        return {
            Authorization: this.#token ? `token ${this.#token}` : undefined,
            Accept: `application/vnd.github+json`,
            "User-Agent": "GitHub-Search-App",
            "X-GitHub-Api-Version": this.apiVersion,
        }
    }

    /**
     * @description Search for GitHub users
     * @param {string} username
     * @returns {Promise<Object>}
     */
    async searchUser(username) {
        // Implement the logic to search for a GitHub username
        const results = await fetch(`https://api.github.com/search/users?q=${username}`, {
            headers: this.#getDefaultHeaders(),
            keepalive: true,
            cache: "force-cache",
            mode: "cors",
        })
        // if results has 4xx or 5xx status code, throw an error
        if (results.status >= 400) alert("API rate limit exceeded. Please try again later.")
        // Return the search results
        return results.json()
    }

    /**
     * @description Search for GitHub repositories
     * @param {string} repoName
     * @param {string?} username
     * @param {number?} page
     * @param {number?} perPage
     */
    async searchRepositories(repoName, username, page = 1, perPage = 10) {
        // Implement the logic to search for GitHub repositories
        const results = await fetch(
            (
                `https://api.github.com/search/repositories?q=${repoName}` + 
                username ? `+user:${username}` : "" +
                `&page=${page}&per_page=${perPage}`
            ), 
            {
                headers: this.#getDefaultHeaders(),
            }
        )
        // Return the search results
        return results.json()
    }

    /**
     * @description Get the public details of a GitHub user
     * @param {string} username
     * @returns {Promise<Object>}
     */
    async getUserDetails(username) {
        // Implement the logic to retrieve public details of a GitHub user
        const results = await fetch(`https://api.github.com/users/${username}`, {
            headers: this.#getDefaultHeaders(),
            keepalive: true,
            cache: "force-cache",
            mode: "cors",
        })
        // Return the user details
        return results.json()
    }

    matchReturnNumber (linkHeader, match) {
        try {
            const prevLink = linkHeader.match(match)
            if (prevLink) return parseInt(new URL(prevLink[0]).searchParams.get("page"))
            return undefined
        } catch (error) {
            return undefined
        }
    }

    /**
     * @description Get the repositories of a GitHub user
     * @param {string} username
     * @param {number?} page
     * @param {number?} perPage
     * @param {string?} sort
     * @param {("newest"|"oldest")?} direction
     * @returns
     */
    async getRepositories(username, page = 1, perPage = 10, sort = "updated", direction = "newest") {
        if (direction === "newest") direction = "desc"
        else if (direction === "oldest") direction = "asc"
        // Implement the logic to fetch repositories of a GitHub user
        const results = await fetch(`https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}&sort=${sort}&direction=${direction}`, {
            headers: this.#getDefaultHeaders(),
            keepalive: true,
            cache: "force-cache",
            mode: "cors",
        })
        if (results.status >= 400) alert("API rate limit exceeded. Please try again later.")

        // extract "Link" header from response
        const linkHeader = results.headers.get("Link")
        // parse the link header to get the page links /(?<=<)([\S]*)(?=>; rel="Next")/i
        // valid for next, prev, first, last
        // extract the page numbers only
        // <https://api.github.com/user/37014828/repos?page=2&per_page=5&sort=updated&direction=desc>; rel="prev", <https://api.github.com/user/37014828/repos?page=4&per_page=5&sort=updated&direction=desc>; rel="next", <https://api.github.com/user/37014828/repos?page=8&per_page=5&sort=updated&direction=desc>; rel="last", <https://api.github.com/user/37014828/repos?page=1&per_page=5&sort=updated&direction=desc>; rel="first"
        const pageInfo = {
            first: 1,
            prev: this.matchReturnNumber(linkHeader, /(?<=<)([\S]*)(?=>; rel="prev")/i),
            next: this.matchReturnNumber(linkHeader, /(?<=<)([\S]*)(?=>; rel="next")/i),
            last: this.matchReturnNumber(linkHeader, /(?<=<)([\S]*)(?=>; rel="last")/i),
            perPage,
            orderBy: direction === "desc" ? "newest" : "oldest",
        }
        // Return the repositories
        return {
            pageInfo,
            results: await results.json(),
        }
    }

    async getRepositoryLanguages(languagesUrl) {
        // Implement the logic to retrieve the languages used in a GitHub repository
        const results = await fetch(languagesUrl, {
            headers: this.#getDefaultHeaders(),
            keepalive: true,
            cache: "force-cache",
            mode: "cors",
        })
        // Return the repository languages
        return results.json()
    }
}


// export default GitHubAPIs

const gitHubAPIs = new GitHubAPIs()

// console.log(await gitHubAPIs.getRepositoryLanguages("https://api.github.com/repos/amankrokx/fyleAssignment/languages"))


export default gitHubAPIs
