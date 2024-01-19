/**
 * @description Debounce function
 * @param {Function} func
 * @param {Number} delay 
 * @returns 
 */
export default function debounce(func, delay = 500) {
    let timeoutId;

    return function (...args) {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}
