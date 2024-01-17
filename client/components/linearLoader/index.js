/**
 * @name linearLoader
 * @description JS for linearLoader component
 */

/**
 * @description Gives methods to toggle .active class on linearLoader
 * @param {String} id id of html element to which .active class is to be added
 */
export default function linearLoader (id) {

    /**
     * @description Adds .active class to the element with given id
     */
    function show () {
        document.getElementById(id).classList.add("active")
    }

    /**
     * @description Removes .active class from the element with given id
     */
    function hide () {
        document.getElementById(id).classList.remove("active")
    }

    /**
     * @description Toggles .active class on the element with given id
     */
    function toggle () {
        document.getElementById(id).classList.toggle("active")
    }

    return {
        show,
        hide,
        toggle
    }
}