(function (document, window, undefined) {
    function ucfirst(s) {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    // First, check if we have to do anything
    if (window.location.href.match(/\/compare\//i)) {
        // Get the title and comment field:
        var title_field   = document.querySelector('[name="pull_request[title]"]'),
            comment_field = document.querySelector('[name="pull_request[body]"]');

        // Check if the title field is contaminated
        if (title_field.value.match(/^(hotfix|feature)\//i)) {
            title_field.value = ucfirst(title_field.value.replace(/^(hotfix|feature)\//i, ''));
        }

        // Check if the comment field is empty
        // TODO: Add this template in a settings variable
        if (comment_field.value == '') {
            comment_field.value = "#### What does this PR do?\nWhich problem(s) does it fix and how? What does this PR add?\n\n#### Where should the reviewer start?\nExplain what should be set-up first in order to get the review started. Which page has to be viewed etc.\n\n#### How should this be manually tested?\n- [ ] Write down all\n- [ ] the steps a person\n- [ ] needs to take to test it.\n\n##### Screenshots (if appropriate)\nIf this PR changes something that concerns UI changes, please post before and after screenshots here.\n\n#### Who should be notified?\n- [ ] Write down the name/department this branch needs\n- [ ] to be communicated to\n- [ ] Check the box(es) to indicate that it has been\n- [ ] communicated (add the label)\n\n#### What should happen on deployment? (check all that apply)\n- [x] Just the usual steps, no further action required.\n- [ ] There are database changes, which should be run.\n\n#### Questions:\n- Does this require a blog post?\n- Does this require a knowledge base update?\n- Does support need training for this?\n- Does this has to be communicated to partners?";
        }
    }
})(document, window);
