/**
 * Represents a toggleable element with a class.
 */
class ToggleElementClass {
    /**
     * The map of HTML elements.
     * @type {Map<string, Object<{className: string, element: HTMLElement}>>}
     * @private
     * @static
     */
    #elements = new Map()

    /**
     * Creates a new ToggleElementClass instance.
     * @param {Array<Object>} elems - The object containing key-value pairs of element names and HTML elements or IDs.
     * @param {string} elems[].name - The name of the element.
     * @param {string|HTMLElement} elems[].elements - The element id, HTMLElement object, or an array of element ids or HTMLElement objects.
     * @param {string?} elems[].className - The class name to toggle.
     */
    constructor(elems) {
        for (const {name, elements, className} of elems) {
            if (typeof elements === 'string') {
                const HTMLElement = document.getElementById(elements)
                if (!HTMLElement) continue
                this.#elements.set(name, {
                    className: className || "active",
                    element: HTMLElement
                })
                continue
            }

            this.#elements.set(name, {
                className: className || "active",
                elements
            })
        }
    }

    /**
     * 
     * @param {string} name 
     * @param {string|HTMLElement} element 
     * @param {string} className 
     * @returns {void}
     */
    addElement(name, element, className) {
        if (typeof element === 'string') {
            const HTMLElement = document.getElementById(element)
            if (!HTMLElement) return
            this.#elements.set(name, {
                className: className || "active",
                element: HTMLElement
            })
            return
        }
        // if element is not a string, it must be an HTMLElement
        this.#elements.set(name, {
            className: className || "active",
            element
        })
    }

    /**
     * Hides the elements by adding the class.
     * @param {string?} elementName - The name of the element to hide. If not provided, hides all elements.
     */
    hide(elementName) {
        // if elementName is provided, hide the element
        if (elementName) {
            const element = this.#elements.get(elementName)
            element.element.classList.remove(element.className)
            return
        }

        // if elementName is not provided, hide all elements
        this.#elements.forEach(element => {
            element.element.classList.remove(element.className)
        })
    }

    /**
     * Shows the elements by removing the class.
     * @param {string?} elementName - The name of the element to show. If not provided, shows all elements.
     */
    show(elementName) {
        // if elementName is provided, show the element
        if (elementName) {
            const element = this.#elements.get(elementName)
            element.element.classList.add(element.className)
            return
        }

        // if elementName is not provided, show all elements
        this.#elements.forEach(element => {
            element.element.classList.add(element.className)
        })
    }

    /**
     * Toggles the visibility of the elements.
     * @param {string?} elementName - The name of the element to toggle. If not provided, toggles all elements.
     */
    toggle(elementName) {
        // if elementName is provided, toggle the element
        if (elementName) {
            const element = this.#elements.get(elementName)
            element.element.classList.toggle(element.className)
            return
        }

        // if elementName is not provided, toggle all elements
        this.#elements.forEach(element => {
            element.element.classList.toggle(element.className)
        })
    }
}


const toggleElementClass = new ToggleElementClass([])
export default toggleElementClass