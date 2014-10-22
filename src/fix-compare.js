(function (document, window) {
    function initFixCompare() {
        // Because sometimes the URL is url-encoded
        var href = decodeURIComponent(window.location.href);

        // First, check if we have to do anything
        if (window.location.href.match(/\/compare\//i)) {
            // Define our variables:
            var is_feature = !!href.match(/feature/i),
                is_hotfix = !!href.match(/hotfix/i),
                is_default = !href.match(/develop|master/i),
                compare_to, new_location, branch, repo_url;

            // Get the repo's url and the current branch from the location
            repo_url = href.match(/https?:\/\/(www\.)?github\.com\/([a-zA-Z0-9\-_\.]+\/){2}/i)[0];
            branch = href.match(/(?:compare\/(?:(?:develop|master)...)?)([a-z0-9\-_\/\.]+)/i)[1];

            // We only change this when it's still defaulted
            if (is_default) {
                // If it's a feature, we compare to develop
                if (is_feature) {
                    compare_to = 'develop';
                }

                // ...but if it's a hotfix, we compare directly to master
                if (is_hotfix) {
                    compare_to = 'master';
                }

                // Only change the comparison when we have to change it
                if (compare_to) {
                    // Compose the new url
                    new_location = repo_url + 'compare/' + compare_to + '...' + branch + '?expand=1';

                    // Check if the url is other than the current one (to prevent a redirect loop)
                    if (window.location.href != new_location) {
                        window.location.href = new_location;
                    }
                }
            }
        }
    }

    // Adds a clickHandler to the 'Create PR' button. This is because of the fact that
    // it would otherwise redirect you to develop...feature/something when you just want
    // to compare it to another branch.
    function addCreatePRButtonClickHandler() {
        var createPrButton;
        // Check if there is a button to create the PR
        if (createPrButton = document.querySelector('.js-details-target')) {
            createPrButton.addEventListener('click', initFixCompare);
        } else {
            initFixCompare();
        }
    }

    // Make sure this only happens at the right time!
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        addCreatePRButtonClickHandler();
    } else {
        document.addEventListener('load', addCreatePRButtonClickHandler);
    }
})(document, window);
