import toggleElementClass from "./components/toggleElementClass/index.js"


// listen for window.location.hash change
window.addEventListener("hashchange", (e) => {
    // start the loader
    toggleElementClass.show("linear-loader")
    // wait 2 seconds
    setTimeout(() => {
        // hide the loader
        toggleElementClass.hide("linear-loader")
        // hide the username input
        toggleElementClass.hide("username-input")
        // show the profile
        toggleElementClass.show("profile")
    }, 2000)
})

function findUser (event) {
    event.preventDefault() // prevent the form from submitting
    // change the window.location.hash to the username
    window.location.hash = document.getElementById("username-input").value
}

window.addEventListener("load", () => {

    // instantiate the toggleElementsDisplay
    toggleElementClass.addElement("username-input", "username-input-section", "active")
    toggleElementClass.addElement("profile", "user-profile-section", "active")
    // Instantiate the linearLoader
    toggleElementClass.addElement("linear-loader", "linear-loader", "active")

    // hide the loader
    // linearLoader.hide()
    toggleElementClass.hide("linear-loader")


    // attach handlers
    document.querySelector(`#username-input-form`).addEventListener("submit", findUser)
    
    // if the window.location.hash is not empty
    if (window.location.hash !== "") {
        console.log("window.location.hash is not empty", Date.now())
        // under development
        // linearLoader.show()
        toggleElementClass.hide("username-input")
        toggleElementClass.show("profile")
    } else {
        // under development
        // linearLoader.hide()
        toggleElementClass.show("username-input")
        toggleElementClass.hide("profile")
    }

})