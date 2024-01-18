/**
 * @name LinearLoader
 * @description Class for linearLoader component
 */
class LinearLoader {
    /**
     * @description Constructs a new LinearLoader instance
     * @param {HTMLElement|String} element - The element to add the .active class to
     */
    constructor(element) {
        if (typeof element === "string")
            element = document.getElementById(element)

        if (element)
            this.element = element
    }

    /**
     * @description Change the element to a linearLoader
     * @param {HTMLElement|String} element - The element to change to a linearLoader
     */
    changeElement(element) {
        if (typeof element === "string")
            this.element = document.getElementById(element)

        if (!element)
            throw new Error("linearLoader: element not found")
    }

    /**
     * @description Adds .active class to the element
     */
    show() {
        if (!this.element) return
        this.element.classList.add("active")
    }

    /**
     * @description Removes .active class from the element
     */
    hide() {
        if (!this.element) return
        this.element.classList.remove("active")
    }

    /**
     * @description Toggles .active class on the element
     */
    toggle() {
        if (!this.element) return
        this.element.classList.toggle("active")
    }
}

const linearLoader = new LinearLoader("linear-loader")

export default linearLoader
