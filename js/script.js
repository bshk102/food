import tabs from './modules/tabs';
import timer from './modules/timer';
import scroll from './modules/scroll';
import modal from './modules/modal';
import forms from './modules/forms';
import menuItems from './modules/menuItems';
import slider from './modules/slider';
import calc from './modules/calc';
import {showModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => showModal('.modal', modalTimerId), 15000);

    tabs('.tabcontent', '.tabheader__item', '.tabheader__items', 'tabheader__item_active');
    timer('.timer', '2021-05-01');
    scroll();
    modal('[data-modal]', '.modal', modalTimerId);
    forms('form', modalTimerId);
    menuItems();
    slider({
        container: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slider',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    calc();
});