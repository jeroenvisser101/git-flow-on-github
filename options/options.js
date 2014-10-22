(function (document, window, chrome) {
    var save_button = document.getElementById('save-button'),
        reset_button = document.getElementById('reset-button'),
        pr_template = document.getElementById('pr-template'),
        save_status = document.getElementById('save-status'),
        reset_to_v1 = document.getElementById('reset-to-v1');

    restore_settings();
    save_button.addEventListener('click', save_settings);
    reset_button.addEventListener('click', function (){
        pr_template.value = GitFlow.pr_template;
        save_settings();
    });
    reset_to_v1.addEventListener('click', restore_v1_settings);

    /**
     * Saves the settings into local storage.
     */
    function save_settings() {
        chrome.storage.sync.set({
            pr_template_v2: pr_template.value
        }, function (items) {
            save_status.textContent = 'Options saved!';
        });
    }

    /**
     * Restores the previously set settings.
     */
    function restore_settings() {
        chrome.storage.sync.get({
            pr_template_v2: GitFlow.pr_template
        }, function (items) {
            pr_template.value = items.pr_template || GitFlow.pr_template;
        });
    }

    /**
     * Restores the settings used in version 1 of this application.
     */
    function restore_v1_settings() {
        chrome.storage.sync.get({
            pr_template: GitFlow.pr_template
        }, function (items) {
            pr_template.value = items.pr_template;
        });
    }
})(document, window, chrome);
