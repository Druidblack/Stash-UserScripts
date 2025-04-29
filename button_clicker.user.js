// ==UserScript==
// @name         Auto Delete File Button Clicker for Stash
// @namespace    https://github.com/Druidblack/Stash-UserScripts
// @author       Druidblack
// @version      0.1
// @description  Automatically clicks the "Удалить файл" button when a file info card appears in Stash.
// @author       Your Name
// @match        http://*:9999/*
// @grant        none
//
// @downloadURL  https://github.com/Druidblack/Stash-UserScripts/raw/main/button_clicker.user.js
// @updateURL    https://github.com/Druidblack/Stash-UserScripts/raw/main/button_clicker.user.js
// ==/UserScript==

(function() {
    'use strict';

    /**
     * Clicks the "Удалить файл" button within a given card-body element, if present.
     * @param {HTMLElement} cardBody - The .card-body element to search within.
     */
    function clickDeleteButton(cardBody) {
        const deleteBtn = cardBody.querySelector('button.btn.btn-danger');
        if (deleteBtn) {
            console.log('[AutoDelete] Clicking delete button:', deleteBtn);
            deleteBtn.click();
        }
    }

    // Observe added nodes to the document body, looking for new card-body elements
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType !== Node.ELEMENT_NODE) return;

                // If the added node is a card-body or contains card-body children
                if (node.matches && node.matches('.card-body')) {
                    clickDeleteButton(node);
                } else {
                    node.querySelectorAll && node.querySelectorAll('.card-body').forEach(clickDeleteButton);
                }
            });
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Also process any existing card-body elements on initial load
    document.querySelectorAll('.card-body').forEach(clickDeleteButton);
})();
