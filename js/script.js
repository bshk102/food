window.addEventListener('DOMContentLoaded', () => {
    const tabs = require('./modules/tabs'),
        timer = require('./modules/timer'),
        scroll = require('./modules/scroll'),
        modal = require('./modules/modal'),
        forms = require('./modules/forms'),
        menuItems = require('./modules/menuItems'),
        slider = require('./modules/slider'),
        calc = require('./modules/calc');
    
    tabs();
    timer();
    scroll();
    modal();
    forms();
    menuItems();
    slider();
    calc();
});