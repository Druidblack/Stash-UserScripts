// ==UserScript==
// @name         Stash: Auto-check “Delete file”
// @namespace    https://github.com/Druidblack/Stash-UserScripts
// @version      0.1
// @description  Отмечает чекбокс “Удалить файл (вместе с funscript)”
// @match        http://*:9999/*
// @grant        none
// @run-at       document-end
//
// @downloadURL  https://github.com/Druidblack/Stash-UserScripts/raw/main/stash_check_delete_file.user.js
// @updateURL    https://github.com/Druidblack/Stash-UserScripts/raw/main/stash_check_delete_file.user.js
// ==/UserScript==

(function() {
    'use strict';
    console.log('[AutoDeleteFile] скрипт загружен');

    function checkDeleteCheckbox() {
        const cb = document.getElementById('delete-file');
        if (cb && !cb.checked) {
            console.log('[AutoDeleteFile] отмечаю чекбокс');
            cb.click();
        }
    }

    // сразу пробуем
    checkDeleteCheckbox();

    // наблюдатель за динамическими вставками
    new MutationObserver((mutations, obs) => {
        for (const m of mutations) {
            for (const node of m.addedNodes) {
                if (node.nodeType === 1 && node.querySelector('#delete-file')) {
                    checkDeleteCheckbox();
                    // obs.disconnect(); // снять, если нужно только раз
                    return;
                }
            }
        }
    }).observe(document.body, { childList: true, subtree: true });
})();
