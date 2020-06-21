'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const calcCalory = require('./modules/calcCalory'),
          cards = require('./modules/cards'),
          form = require('./modules/form'),
          modal = require('./modules/modal'),
          slider = require('./modules/slider'),
          tabs = require('./modules/tabs'),
          timer = require('./modules/timer');

    calcCalory();
    cards();
    form();
    modal();
    slider();
    tabs();
    timer();
}); 