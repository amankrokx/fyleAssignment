import gitHubAPIs from "../gitHubAPIs/index.js";
/**
 * @description: This is a component to prepare html from json data
 */

/**
 * @description Search GitHub user
 * @param {string} username 
 * @returns {Promise<string[]>}
 */
export async function searchGitHubUser (username) {
    /*
    {
        "total_count": 12,
        "incomplete_results": false,
        "items": [
            {
                "login": "mojombo",
                "avatar_url": "https://secure.gravatar.com/avatar/25c7c18223fb42a4c6ae1c8db6f50f9b?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png",
                "html_url": "https://github.com/mojombo",
                "score": 1,
            },
            {
                "login": "mojombo",
                "avatar_url": "https://secure.gravatar.com/avatar/25c7c18223fb42a4c6ae1c8db6f50f9b?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png",
                "html_url": "https://github.com/mojombo",
                "score": 1,
            },
        ]
    }
    */
    const data = await gitHubAPIs.searchUser(username)
    /*
    Prepare HTML as Array of following structure:
        <div class="user" id="amankrokx">
            <img
                src="./assets/profile.jpg"
                height="32"
                width="32"
                alt="User Profile Image"
                loading="lazy"
            />
            <span class="user-name">amankrokx</span>
        </div>
    */
    return data.items.map((item) => {
        return `<div class="user" id="${item.login}"><img src="${item.avatar_url}" height="32" width="32" alt="User Profile Image" loading="lazy" /><span class="user-name">${item.login}</span></div>`
    })
}

export async function getGitHubUser (username) {
    /*
    {
        login: 'amankrokx',
        avatar_url: 'https://avatars.githubusercontent.com/u/37014828?v=4',
        html_url: 'https://github.com/amankrokx',
        repos_url: 'https://api.github.com/users/amankrokx/repos',
        name: 'Aman kumar',
        company: '@Maersk-Global',
        location: 'India',
        bio: 'Unobtrusive Coder\r\nFull Stack Developer\r\nLoves Electronics',
        twitter_username: 'amankrokx',
        public_repos: 40,
        followers: 4,
        following: 6,
    }
    */
    const data = await gitHubAPIs.getUserDetails(username)
    /*
    Prepare HTML as following structure:
        <div class="user-profile-image">
            <img
                src="./assets/profile.jpg"
                alt="User Profile Image"
                loading="lazy"
            />
        </div>
        <div class="user-profile-details">
            <h2 class="user-profile-name">Aman Kumar</h2>
            <p class="user-profile-bio">Unobtrusive Programmer</p>
            <p class="user-profile-location">
                <img
                    alt="Map Pin Icon"
                    height="16"
                    width="16"
                    src="data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20class=%22icon%20icon-tabler%20icon-tabler-map-pin%22%20width=%2224%22%20height=%2224%22%20viewBox=%220%200%2024%2024%22%20stroke-width=%222%22%20stroke=%22currentColor%22%20fill=%22none%22%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22%3E%3Cpath%20stroke=%22none%22%20d=%22M0%200h24v24H0z%22%20fill=%22none%22/%3E%3Cpath%20d=%22M9%2011a3%203%200%201%200%206%200a3%203%200%200%200%20-6%200%22%20/%3E%3Cpath%20d=%22M17.657%2016.657l-4.243%204.243a2%202%200%200%201%20-2.827%200l-4.244%20-4.243a8%208%200%201%201%2011.314%200z%22%20/%3E%3C/svg%3E"
                />
                <span>
                    Bangalore, India
                </span>
            </p>
            <p class="user-profile-website">
                Twitter: <a href="https://twitter.com/amankrokx" target="_blank">@amankrokx</a>
            </p>
        </div>
    */

    return `
        <div class="user-profile-image">
            <img
                src="${data.avatar_url}"
                alt="User Profile Image"
                loading="lazy"
            />
        </div>
        <div class="user-profile-details">
            <h2 class="user-profile-name">${data.name}</h2>
            <p class="user-profile-bio">${data.bio}</p>
            <p class="user-profile-location">
                <img alt="Map Pin Icon" />
                <span>${data.location}</span>
            </p>
            <p class="user-profile-website">
                Twitter: <a href="https://twitter.com/${data.twitter_username}" target="_blank">@${data.twitter_username}</a>
            </p>
        </div>
    `
}

/**
 * 
 * @param {string} username 
 * @param {Object} paginateInfo
 * @param {number} paginateInfo.page
 * @param {number} paginateInfo.perPage
 * @returns {Promise<{html: string[], pageInfo: {first: number, prev: number, next: number, last: number, perPage: number, orderBy: string}}>}
 */
export async function getGitHubUserRepositories(username, page = 1, perPage = 10, orderBy = "newest") {
    /*
    {
        pageInfo: {
            first: 1,
            prev: 1,
            next: 2,
            last: 40,
            perPage: 1,
            orderBy: 'newest'
        },
        results: [
            {
                name: 'fyleAssignment',
                html_url: 'https://github.com/amankrokx/fyleAssignment',
                description: 'Assignment given by Fyle',
                fork: false,
                forks_url: 'https://api.github.com/repos/amankrokx/fyleAssignment/forks',
                languages_url: 'https://api.github.com/repos/amankrokx/fyleAssignment/languages',
                stargazers_count: 0,
                language: 'JavaScript',
                forks_count: 0,
                forks: 0,
            }
        ]
    }
    */

    const data = await gitHubAPIs.getRepositories(username, page, perPage, "updated", orderBy)
    // for every repo in results, gather the languages
    for (let repo of data.results) {
        try {
            const languages = await gitHubAPIs.getRepositoryLanguages(repo.languages_url)
            repo.languages = Object.keys(languages)
        } catch (error) {
            console.error(error)
            repo.languages = []
        }
    }
    /*
    <div class="user-repository">
        <div class="user-repository-header">
            <h3 class="user-repository-name">AIHomeAutomation</h3>
            <div class="user-repository-stats">
                <div class="user-repository-stars">
                    <img alt="Star Icon" />
                    Star
                    <span>0</span>
                </div>
                <div class="user-repository-forks">
                    <img alt="Fork Icon" />
                    Fork
                    <span>0</span>
                </div>
            </div>
        </div>
        <p class="user-repository-description">Leveraging descision making powers of LLM based AIs to derive intent from natural conversations in order to control home appliances.</p>
        <p class="user-repository-languages">
            <span class="user-repository-language">C/C++</span>
            <span class="user-repository-language">JavaScript</span>
            <span class="user-repository-language">HTML</span>
            <span class="user-repository-language">CSS</span>
        </p>
    </div>
    */

    const html = data.results.map((repo) => {
        return `
            <div class="user-repository">
                <div class="user-repository-header">
                    <h3 class="user-repository-name">${repo.name}</h3>
                    <div class="user-repository-stats">
                        <div class="user-repository-stars">
                            <img alt="Star Icon" />
                            Star
                            <span>${repo.stargazers_count}</span>
                        </div>
                        <div class="user-repository-forks">
                            <img alt="Fork Icon" />
                            Fork
                            <span>${repo.forks_count}</span>
                        </div>
                    </div>
                </div>
                <p class="user-repository-description">${repo.description}</p>
                <p class="user-repository-languages">
                    ${repo.languages.map((language) => `<span class="user-repository-language">${language}</span>`).join("")}
                </p>
            </div>
        `
    })
    return {
        html,
        pageInfo: data.pageInfo,
    }
}