(function () {
    function initDisableMergeButton() {
        GitFlow.disable_merge_button();
    }

    // Make sure this only happens at the right time!
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initDisableMergeButton();
    } else {
        document.addEventListener('load', initDisableMergeButton);
    }
})();
