/**
 * Class representing a toggleable elements display.
 */
export class ToggleElementsDisplay {
    /**
     * Stores the initial display of the elements.
     * @type {Map<string, string>}
     * @private
     * @static
    */
    #initialDisplay = new Map()
    /**
     * The map of HTML elements.
     * @type {Map<string, HTMLElement>}
     * @private
     * @static
     */
    #elements = new Map()


    /**
     * Create a ToggleElementsDisplay instance.
     * @param {Object} eles - The object containing key-value pairs of element names and HTML elements or IDs.
     * @param {string} eles.name - The name of the element.
     * @param {HTMLElement|string} eles.element - The HTML element or ID.
     * @param {string?} eles.initialDisplay - The initial display of the element.
     */
    constructor(eles) {
        for (const [name, element] of Object.entries(eles)) {
            if (typeof element === 'string') {
                const HTMLElement = document.getElementById(element)
                if (!HTMLElement) continue
                this.#initialDisplay.set(name, eles.initialDisplay || HTMLElement.style.display)
                this.#elements.set(name, HTMLElement)
                continue
            }

            this.#initialDisplay.set(name, eles.initialDisplay || element.style.display)
            this.#elements.set(name, element)
        }
    }

    /**
     * Add an element to the map.
     * @param {string} name - The name of the element.
     * @param {HTMLElement|string} element - The HTML element.
     * @param {string?} initialDisplay - The initial display of the element.
     */
    add(name, element, initialDisplay) {
        if (typeof element === 'string') {
            const HTMLElement = document.getElementById(element)
            if (!HTMLElement) return
            this.#initialDisplay.set(name, initialDisplay || HTMLElement.style.display)
            this.#elements.set(name, HTMLElement)
            return
        }
        // if element is not a string, it must be an HTMLElement
        this.#initialDisplay.set(name, initialDisplay || element.style.display)
        this.#elements.set(name, element)
    }

    /**
     * Show the specified element.
     * @param {string} elementName - The name of the element to show.
     */
    show(elementName) {
        const element = this.#elements.get(elementName)
        if (!element) return

        const initialDisplay = this.#initialDisplay.get(elementName)
        if (initialDisplay === 'none')
            element.style.display = 'block'
        else
            element.style.display = initialDisplay
    }

    /**
     * Hide the specified element.
     * @param {string} elementName - The name of the element to hide.
     */
    hide(elementName) {
        const element = this.#elements.get(elementName)
        if (!element) return

        // if element display style is not none and differs from initial display
        // save the current display style, then hide the element
        if (element.style.display !== 'none' && element.style.display !== this.#initialDisplay.get(elementName))
            this.#initialDisplay.set(elementName, element.style.display)
        // hide the element
        element.style.display = 'none'
    }

    /**
     * Toggle the visibility of the specified element.
     * @param {string} elementName - The name of the element to toggle.
     */
    toggle(elementName) {
        if (!this.#elements.get(elementName))
            return

        if (element.style.display === 'none')
            this.show(elementName)
        else
            this.hide(elementName)
    }

    /**
     * Show all elements.
     */
    showAll() {
        for (const [name, element] of this.#elements.entries())
            this.show(name)
    }

    /**
     * Hide all elements.
     */
    hideAll() {
        for (const [name, element] of this.#elements.entries())
            this.hide(name)
    }

}

const toggleElementsDisplay = new ToggleElementsDisplay({})
export default toggleElementsDisplay