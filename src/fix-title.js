(function (document, window, undefined) {
    // First, check if we have to do anything
    if (window.location.href.match(/\/compare\//i)) {
        // Get the title and comment field:
        var title_field   = document.querySelector('[name="pull_request[title]"]'),
            comment_field = document.querySelector('[name="pull_request[body]"]');

        // Remove the 'Hotfix/' or 'Feature/' prefix from the title field
        GitFlow.fix_title(title_field);

        // Check if the comment field is empty
        if (comment_field.value == '') {
            GitFlow.insert_pr_template(comment_field);
        }
    }
})(document, window);
