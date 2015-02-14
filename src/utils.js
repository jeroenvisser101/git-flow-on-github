/**
 * Runs a given function when the document is ready.
 *
 * @param {Function} fn
 */
var onLoad = function (fn) {
    // Make sure this only happens at the right time!
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        fn();
    } else {
        document.addEventListener('load', fn);
    }
};
