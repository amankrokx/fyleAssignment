import linearLoader from "./components/linearLoader/index.js"

// Instantiate the linearLoader
const topLoader = linearLoader("linear-loader")

// listen for window.location.hash change
window.addEventListener("hashchange", (e) => {
    // start the loader
    topLoader.show()
})

function findUser (event) {
    event.preventDefault()
    window.location.hash = document.getElementById("username-input").value
}

// attach handlers
document.querySelector(`#username-input-section input[type="submit"]`).addEventListener("click", findUser)