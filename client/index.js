import debounce from "./components/debounce/index.js"
import { getGitHubUser, searchGitHubUser } from "./components/prepareHtmlFromJson/index.js"
import toggleElementClass from "./components/toggleElementClass/index.js"

const htmlElements = {}

// listen for window.location.hash change
function hashChangeHandler () {
    // get the username from the window.location.hash
    const username = window.location.hash.slice(1)
    if (username !== "") {
        // start the loader
        toggleElementClass.show("linear-loader")
        // start loading the profile
        // change .user-profile-url a href to the profile url
        const aHref = document.querySelector(".user-profile-url a")
        aHref.href = `https://github.com/${username}`
        aHref.innerTEXT = aHref.href
        // get the profile html
        getGitHubUser(username).then((html) => {
            // set the profile html in .user-profile-info
            document.querySelector(".user-profile-info").innerHTML = html
        }).catch((error) => {
            console.error(error)
        })
        // get the repositories html
        // getGitHubUserRepositories

        return
    }

    // hide the loader
    toggleElementClass.hide("linear-loader")
    // hide the profile
    toggleElementClass.hide("profile")
    // show the username input
    toggleElementClass.show("username-input")
}

function findUser (event) {
    event.preventDefault() // prevent the form from submitting
    // change the window.location.hash to the username
    window.location.hash = htmlElements.usernameInput.value
}

function searchUser (event) {
    event.preventDefault() // prevent the form from submitting
    // get the username from the input
    const username = htmlElements.usernameInput.value
    // if the username is not empty
    if (username !== "")
        (async () => {
            // search for the username
            const html = await searchGitHubUser(username)
            // set the html to the username list
            htmlElements.usernameInputList.innerHTML = html.join("")
            // show the username list
            toggleElementClass.show("username-list")
        })()
    else
        // hide the username list
        toggleElementClass.hide("username-list")
}

function selectUser (event) {
    // if the target is not the username list
    if (event.target !== htmlElements.usernameInputList) {
        // get the username
        const username = event.target.id
        // change the window.location.hash to the username
        window.location.hash = username
    }
}

window.addEventListener("load", () => {

    // instantiate the toggleElementsDisplay
    toggleElementClass.addElement("username-input", "username-input-section", "active")
    toggleElementClass.addElement("username-list", "username-input-list", "active")
    toggleElementClass.addElement("profile",  "user-profile-section", "active")
    // Instantiate the linearLoader
    toggleElementClass.addElement("linear-loader", "linear-loader", "active")

    // hide the loader
    // linearLoader.hide()
    toggleElementClass.hide("linear-loader")

    // gather html elements and store them in the htmlElements object that will be reused
    htmlElements.usernameInput = document.querySelector("#username-input")
    htmlElements.usernameInputList = document.querySelector("#username-input-list .users")

    // attach handlers
    document.querySelector(`#username-input-form`).addEventListener("submit", findUser)
    htmlElements.usernameInputList.addEventListener("click", selectUser)
    htmlElements.usernameInput.addEventListener("keyup", debounce(searchUser, 500))

    window.addEventListener("hashchange", hashChangeHandler)
    
    // if the window.location.hash is not empty
    if (window.location.hash !== "") {
        console.log("window.location.hash is not empty", Date.now())
        hashChangeHandler()
    } else {
        // under development
        // linearLoader.hide()
        toggleElementClass.show("username-input")
        toggleElementClass.hide("profile")
    }

}, true)