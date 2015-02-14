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
                compare_to, new_location, branch, expand, repo_url, base;

            // Get the repo's url and the current branch from the location
            repo_url = href.match(/https?:\/\/(www\.)?github\.com\/([a-zA-Z0-9\-_\.]+\/){2}/i)[0];
            base = href.match(/(?:compare\/(?:(develop|master)...)?)([a-z0-9\-_\/\.]+)/i)[1];
            branch = href.match(/(?:compare\/(?:(?:develop|master)...)?)([a-z0-9\-_\/\.]+)/i)[1];
            expand = !!href.match(/\?expand=1/i);

            // If we have no base branch from the href, we take it from the DOM
            if (!base) {
                // Broken due to GitHub update
                //base = document.querySelector('.branch-name').textContent.trim();

                // FIXME: This is not the nicest way to find the name, but have nothing better ATM:
                base = document.querySelector('.js-commitish-form').action.match(/(?:compare\/)([a-z0-9\-_\/\.]+)\.{3}/i);
            }

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
                    new_location = repo_url + 'compare/' + compare_to + '...' + branch + (expand ? '?expand=1' : '');

                    // Check if the url is other than the current one (to prevent a redirect loop)
                    if (window.location.href != new_location) {
                        window.location.href = new_location;
                    }
                }
            } else {
                // Check if the branch is wrong
                if ((base !== 'develop' && is_feature) || (base !== 'master' && is_hotfix)) {
                    // For it to be Git-Flow, it should be either hotfix or feature
                    if (is_feature || is_hotfix) {
                        var warning = document.createElement('div'),
                            target = document.querySelector('.js-details-container'),
                            type = (is_hotfix ? 'hotfix' : is_feature ? 'feature' : '???');

                        warning.className = 'flash flash-error';
                        warning.textContent = 'Please note that this is a ' + type + ' and is not compared to the branch it originated from.';

                        // If it's not default, but on the wrong branch, we show a subtle warning
                        target.parentNode.insertBefore(warning, target)
                    }
                }
            }
        }
    }

    // Make sure this only happens at the right time!
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initFixCompare();
    } else {
        document.addEventListener('load', initFixCompare);
    }
})(document, window);
