// ==UserScript==
// @name         Stash Blur
// @namespace    https://github.com/Druidblack/Stash-UserScripts
// @version      1.0
// @description  Blurs preview scenes, images of performers and bands in Stash as early as possible, as well as sprite images (img.hoverZoomLink), removes blur during hover, adds a slider and a button on the left to control blur.
// @match        http://*:9999/*
// @grant        none
// @run-at       document-start
//
// @downloadURL  https://github.com/Druidblack/Stash-UserScripts/raw/main/stash_blur.user.js
// @updateURL    https://github.com/Druidblack/Stash-UserScripts/raw/main/stash_blur.user.js
// ==/UserScript==

(function() {
    'use strict';

    const BLUR_STYLE_ID = 'tm-blur-style';
    const CTRL_STYLE_ID = 'tm-controls-style';

    // 1) Всегда-включаемые CSS для выравнивания navbar и контролов
    function injectControlStyles() {
        if (document.getElementById(CTRL_STYLE_ID)) return;
        const css = `
/* Выравниваем все элементы navbar по центру */
.navbar-buttons.flex-row.ml-auto.order-xl-2.navbar-nav {
    display: flex !important;
    align-items: center !important;
}

/* Контейнеры контролов */
.tm-slider-container,
.tm-btn-container {
    display: flex !important;
    align-items: center !important;
    margin: 0 0.5rem !important;
    height: 100% !important;
}

/* Стили ползунка */
#tm-blur-range {
    width: 80px !important;
    margin: 0 !important;
    padding: 0 !important;
}

/* Фиксированный размер кнопки */
#tm-toggle-blur-btn {
    width: 80px !important;
    text-align: center !important;
    margin: 0 !important;
}
`;
        const style = document.createElement('style');
        style.id = CTRL_STYLE_ID;
        style.textContent = css;
        (document.head || document.documentElement).prepend(style);
    }

    // 2) CSS размытия, toggled кнопкой, расширено под все нужные селекторы
    function injectBlurStyles() {
        if (document.getElementById(BLUR_STYLE_ID)) return;
        const css = `
:root { --tm-blur-size: 8px; }

/* Применяем blur к превью-сценам, картинкам исполнителей, групп, sprite-картинкам, миниатюрам, самим карточкам сцен, wall-item-media изображениям и видео */
.video-section.thumbnail-section .scene-card-preview,
img.performer-card-image,
img.group-card-image,
img.hoverZoomLink,
img.image-thumbnail,
.scene-card.mr-3,
img.wall-item-media,
img.wall-item-media.hoverZoomLink,
video.wall-item-media,
video.hoverZoomLink {
    filter: blur(var(--tm-blur-size)) !important;
    transition: filter 0.2s ease-in-out;
}

/* Снимаем blur при hover */
.video-section.thumbnail-section .scene-card-preview:hover,
img.performer-card-image:hover,
img.group-card-image:hover,
img.hoverZoomLink:hover,
img.image-thumbnail:hover,
.scene-card.mr-3:hover,
img.wall-item-media:hover,
img.wall-item-media.hoverZoomLink:hover,
video.wall-item-media:hover,
video.hoverZoomLink:hover {
    filter: none !important;
}`;
        const style = document.createElement('style');
        style.id = BLUR_STYLE_ID;
        style.textContent = css;
        (document.head || document.documentElement).prepend(style);
    }

    // Инжектим стили как можно раньше
    injectControlStyles();
    injectBlurStyles();
    new MutationObserver((m, obs) => {
        injectControlStyles();
        injectBlurStyles();
        if (document.getElementById(CTRL_STYLE_ID) && document.getElementById(BLUR_STYLE_ID)) {
            obs.disconnect();
        }
    }).observe(document.documentElement, { childList: true, subtree: true });

    // 3) Вставляем контролы в начало navbar
    function addControls() {
        const nav = document.querySelector('.navbar-buttons.flex-row.ml-auto.order-xl-2.navbar-nav');
        if (!nav || nav.querySelector('#tm-blur-range')) return;

        // Ползунок
        const sliderContainer = document.createElement('div');
        sliderContainer.className = 'tm-slider-container';
        const slider = document.createElement('input');
        slider.id = 'tm-blur-range';
        slider.type = 'range';
        slider.min = '8';
        slider.max = '30';
        slider.value = '8';
        slider.title = 'Уровень размытия (8–30px)';
        slider.addEventListener('input', function() {
            document.documentElement.style.setProperty('--tm-blur-size', this.value + 'px');
        });
        sliderContainer.appendChild(slider);

        // Кнопка
        const btnContainer = document.createElement('div');
        btnContainer.className = 'tm-btn-container';
        const btn = document.createElement('button');
        btn.id = 'tm-toggle-blur-btn';
        btn.type = 'button';
        btn.className = 'btn btn-secondary minimal';
        btn.textContent = 'Blur: ON';
        btn.addEventListener('click', function() {
            const blurStyle = document.getElementById(BLUR_STYLE_ID);
            if (!blurStyle) return;
            blurStyle.disabled = !blurStyle.disabled;
            btn.textContent = 'Blur: ' + (blurStyle.disabled ? 'OFF' : 'ON');
        });
        btnContainer.appendChild(btn);

        // Вставляем сначала кнопку, затем ползунок в начало navbar
        nav.prepend(btnContainer);
        nav.prepend(sliderContainer);
    }

    window.addEventListener('DOMContentLoaded', addControls);
    new MutationObserver(addControls).observe(document.body, { childList: true, subtree: true });
})();
