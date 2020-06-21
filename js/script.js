'use strict';
import calcCalory from './modules/calcCalory';
import cards from './modules/cards';
import form from './modules/form';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';
import {openModal} from './modules/modal';

document.addEventListener('DOMContentLoaded', () => {
    
    const modalTimer = setTimeout(() => openModal('.modal', modalTimer), 50000);
    
    calcCalory();
    cards();
    form('form', modalTimer);
    modal('[data-modal]', '.modal', modalTimer);
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        next: '.offer__slider-next',
        prev: '.offer__slider-prev',
        currentSlide: '#current',
        totalSlides: '#total',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('.timer', '2020-06-25');
}); 