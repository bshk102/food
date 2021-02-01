window.addEventListener('DOMContentLoaded', () => {
    'use strict';
    //Tabs
    const tabContent = document.querySelectorAll('.tabcontent'),
        tabHeaderItem = document.querySelectorAll('.tabheader__item'),
        tabHeaderItems = document.querySelector('.tabheader__items');

    const showTabContent = () => {
        tabContent.forEach(item => {
            item.style.display = 'none';
        });
        
        tabHeaderItem.forEach((item, i) => {
            if (item.classList.contains('tabheader__item_active')) {
                tabContent[i].style.display = 'block';
            }
        });
    };

    tabHeaderItems.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('tabheader__item')) {
            tabHeaderItem.forEach(item => item.classList.remove('tabheader__item_active'));
            e.target.classList.add('tabheader__item_active');
            showTabContent();
        }
    });

    showTabContent();

    //Timer
    const deadline = new Date(2021, 2, 1),
        dlDays = deadline.getDate(),
        dlHours = deadline.getHours(),
        dlMinutes = deadline.getMinutes(),
        dlSeconds = deadline.getSeconds(),
        htmlDays = document.querySelector('#days'),
        htmlHours = document.querySelector('#hours'),
        htmlMinutes = document.querySelector('#minutes'),
        htmlSeconds = document.querySelector('#seconds');
        
    const timer = setInterval(() => {
        let currentDate = new Date();
        let timeLeft = deadline - currentDate;

        
    }, 1000);
});