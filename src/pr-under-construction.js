(function (document, window) {
    function initPRUnderConstruction() {
        if (window.location.href.match(/\/compare\//i)) {
            GitFlow.inject_under_construction_checkbox();
        }
    }

    // Make sure this only happens at the right time!
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initPRUnderConstruction();
    } else {
        document.addEventListener('load', initPRUnderConstruction);
    }
})(document, window);
