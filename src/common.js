var GitFlow = {
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
            pr_template: "#### What does this PR do?\nWhich problem(s) does it fix and how? What does this PR add?\n\n#### Where should the reviewer start?\nExplain what should be set-up first in order to get the review started. Which page has to be viewed etc.\n\n#### How should this be manually tested?\n- [ ] Write down all\n- [ ] the steps a person\n- [ ] needs to take to test it.\n\n##### Screenshots (if appropriate)\nIf this PR changes something that concerns UI changes, please post before and after screenshots here.\n\n#### Who should be notified?\n- [ ] Write down the name/department this branch needs\n- [ ] to be communicated to\n- [ ] Check the box(es) to indicate that it has been\n- [ ] communicated (add the label)\n\n#### What should happen on deployment? (check all that apply)\n- [x] The usual steps.\n- [ ] There are database changes, which should be run.\n- [ ] There are files that should be manually uploaded.\n\n#### Questions:\n- Does this require a blog post?\n- Does this require a knowledge base update?\n- Does support need training for this?\n- Does this has to be communicated to partners?"
        }, function (items) {
            comment_field.value = items.pr_template;
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
    insert_pr_template_button: function () {
        var form = document.getElementById('new_pull_request'),
            button = document.createElement('a');

        // Add button styles
        button.classList.add('button', 'composer-submit');
        button.style.bottom = '55px';
        button.style.textAlign = 'center';

        // Add button text
        button.textContent = 'Insert template';

        // Add the click event listener
        button.addEventListener('click', function (){
            GitFlow.insert_pr_template();
        });

        // Insert the button
        form.appendChild(button);
    }
};
