(function (document, window) {
    function initPRTemplate() {
        // If we are on a compare page, insert the button
        if (window.location.href.match(/\/compare\//i)) {
            GitFlow.inject_pr_template_button();
        }

        // If the user is creating a new issue
        if (window.location.href.match(/\/issues\/new/i)) {
            var form_actions_container = document.querySelector('.js-new-issue-form .form-actions'),
                button = document.createElement('a'),
                body_field = document.querySelector('[name="issue[body]"]');

            // Set button styles
            button.textContent = 'Insert template';
            button.classList.add('button');

            // Add the eventlistener
            button.addEventListener('click', function () {
                GitFlow.insert_pr_template(body_field);
            });

            // Add the button to the form actions
            form_actions_container.appendChild(button);
        }
    }

    // Make sure this only happens at the right time!
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initPRTemplate();
    } else {
        document.addEventListener('load', initPRTemplate);
    }
})(document, window);
