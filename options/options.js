(function (document, window, chrome) {
    var save_button = document.getElementById('save-button'),
        pr_template = document.getElementById('pr-template'),
        save_status = document.getElementById('save-status');

    restore_settings();
    save_button.addEventListener('click', save_settings);

    function save_settings() {
        chrome.storage.sync.set({
            pr_template: pr_template.value
        }, function (items) {
            save_status.textContent = 'Options saved!';
        });
    }

    function restore_settings() {
        chrome.storage.sync.get({
            pr_template:  "#### What does this PR do?\nWhich problem(s) does it fix and how? What does this PR add?\n\n#### Where should the reviewer start?\nExplain what should be set-up first in order to get the review started. Which page has to be viewed etc.\n\n#### How should this be manually tested?\n- [ ] Write down all\n- [ ] the steps a person\n- [ ] needs to take to test it.\n\n##### Screenshots (if appropriate)\nIf this PR changes something that concerns UI changes, please post before and after screenshots here.\n\n#### Who should be notified?\n- [ ] Write down the name/department this branch needs\n- [ ] to be communicated to\n- [ ] Check the box(es) to indicate that it has been\n- [ ] communicated (add the label)\n\n#### What should happen on deployment? (check all that apply)\n- [x] Just the usual steps, no further action required.\n- [ ] There are database changes, which should be run.\n\n#### Questions:\n- Does this require a blog post?\n- Does this require a knowledge base update?\n- Does support need training for this?\n- Does this has to be communicated to partners?"
        }, function (items) {
            pr_template.value = items.pr_template;
        });
    }
})(document, window, chrome);
