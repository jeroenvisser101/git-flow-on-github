/**
 * GitFlow
 */
var GitFlow = {
    /**
     * This is the global setting that's used for the pr_template
     */
    pr_template: "#### What does this PR do?\nWhich problem(s) does it fix and how? What does this PR add?\n\n#### Where should the reviewer start?\nExplain what should be set-up first in order to get the review started. Which page has to be viewed etc.\n\n#### How should this be manually tested?\n- [ ] Write down all\n- [ ] the steps a person\n- [ ] needs to take to test it.\n\n#### Documents\n##### Screenshots (if appropriate)\nIf this PR changes something that concerns UI changes, please post before and after screenshots here.\n\n##### Other documents\nIf you have any documents that have anything to do with this PR.\n\n#### Who should be notified?\n- [ ] Write down the name/department this branch needs\n- [ ] to be communicated to\n- [ ] Check the box(es) to indicate that it has been\n- [ ] communicated (add the label)\n\n#### What should happen on deployment? (check all that apply)\n- [x] The usual steps.\n- [ ] There are database changes, which should be run.\n- [ ] There are files that should be manually uploaded.\n\n#### Questions:\n- Does this require a blog post?\n- Does this require a knowledge base update?\n- Does support need training for this?\n- Does this has to be communicated to partners?",

    /**
     * Inserts pr_template info the given comment_field, no matter if
     * the field is filled or not.
     *
     * @param {HTMLElement} [comment_field] The comment field
     */
    insert_pr_template: function (comment_field) {
        // Set the default
        if (typeof comment_field === 'undefined') {
            comment_field = document.querySelector('[name="pull_request[body]"]');
        }

        // Get the template from LocalStorage
        chrome.storage.sync.get({
            pr_template_v1: GitFlow.pr_template
        }, function (items) {
            comment_field.value = items.pr_template || GitFlow.pr_template;
        });
    },

    /**
     * Removes the 'Hotfix/' or 'Feature/' prefix from the given title
     * field.
     *
     * @param {HTMLElement} title_field
     */
    fix_title: function (title_field) {
        // Check if the title field is contaminated
        if (title_field.value.match(/^(hotfix|feature)\//i)) {
            title_field.value = ucfirst(title_field.value.replace(/^(hotfix|feature)\//i, ''));
        }
    },

    /**
     * Inserts the pull request template button into the
     * new_pull_request form.
     */
    inject_pr_template_button: function () {
        var form = document.getElementById('new_pull_request'),
            button = document.createElement('a');

        // To prevent exceptions from happening
        if (typeof form !== 'undefined') {
            // Add button styles
            button.classList.add('button', 'composer-submit');
            button.style.bottom = '55px';
            button.style.textAlign = 'center';

            // Add button text
            button.textContent = 'Insert template';

            // Add the click event listener
            button.addEventListener('click', function () {
                GitFlow.insert_pr_template();
            });

            // Insert the button
            form.appendChild(button);
        }
    },

    /**
     * Inserts or removes a :construction: emoji.
     *
     * @param {boolean} insert Indicates whether to insert or remove the :construction: emoji.
     */
    insert_pr_under_construction: function (insert) {
        var title_field = document.querySelector('[name="pull_request[title]"]');

        // Check if it needs to be inserted or not
        if (insert) {
            title_field.value = 'WIP: ' + title_field.value;
        } else {
            title_field.value = title_field.value.replace(/^(WIP:)\s+/i, '');
        }
    },

    /**
     * Inserts the checkbox into the new pull request form.
     */
    inject_under_construction_checkbox: function () {
        var form = document.getElementById('new_pull_request'),
            checkbox_container = document.createElement('div'),
            checkbox;

        // Checkbox styling
        checkbox_container.id = 'under_construction';
        checkbox_container.style.position = 'absolute';
        checkbox_container.style.right = '1%';
        checkbox_container.style.bottom = '90px';
        checkbox_container.style.width = '18%';
        checkbox_container.style.padding = '10px';
        checkbox_container.innerHTML = '<label><input type="checkbox">Under construction</label>';
        checkbox = checkbox_container.querySelector('input[type="checkbox"]');
        checkbox.style.marginRight = '5px';

        // Add an eventlistener
        checkbox.addEventListener('click', function () {
            GitFlow.insert_pr_under_construction(this.checked);
        });

        // Add it to the form
        form.appendChild(checkbox_container);
    },

    /**
     * Hides the 'Merge pull request' button if the pull request is in a
     * GitFlow manner. This is because if you merge it via this button,
     * a feature or hotfix is not finished in the right way.
     */
    disable_merge_button: function () {
        var button_container, branch_name, repo_name, button, is_merge_button;
        button_container = document.getElementById('partial-pull-merging');

        // Because if there is no container, there's no button!
        if (button_container) {
            button = button_container.querySelector('.merge-branch-action');

            // And if there's no button, it's definitely not a merge_button
            if (button) {
                /**
                 * Actually, GitHub has the same class for a merge as a delete branch
                 * button. That's why we check if this button has a git-merge icon,
                 * because if it does, it's a merge button.
                 *
                 * @type {boolean}
                 */
                is_merge_button = (button.querySelector('.octicon-git-merge') !== null);

                // But if both are, then chances are it's a git-flow branch
                if (button_container && is_merge_button) {
                    // Get the repo and branch, repo is currently not used, but already implemented
                    repo_name = button_container.dataset.channel.match(/^((?:[a-zA-Z0-9\-_\.]+\/?){2}):branch:([a-zA-Z0-9\-_\.\/]+)/i)[1];
                    branch_name = button_container.dataset.channel.match(/^((?:[a-zA-Z0-9\-_\.]+\/?){2}):branch:([a-zA-Z0-9\-_\.\/]+)/i)[2];

                    // It is a git flow branch!
                    if (branch_name.match(/^(feature|hotfix)/i)) {
                        button.classList.add('disabled', 'tooltipped', 'tooltipped-s');
                        button.setAttribute('aria-label', "This branch cannot be merged in GitHub because it's a git-flow branch.");
                    }
                }
            }
        }
    }
};
