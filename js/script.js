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
    const deadline = new Date(2021, 1, 2, 13, 26),
        htmlDays = document.querySelector('#days'),
        htmlHours = document.querySelector('#hours'),
        htmlMinutes = document.querySelector('#minutes'),
        htmlSeconds = document.querySelector('#seconds');

    const getTimeLeft = (deadline) => {
        let currentDate = new Date();
        let timeLeft = deadline - currentDate;

        let days = Math.floor(timeLeft/1000/60/60/24),
            hours = Math.floor((timeLeft/1000/60/60)%24),
            minutes = Math.floor((timeLeft/1000/60)%60),
            seconds = Math.floor((timeLeft/1000)%60);
        
            return { timeLeft, days, hours, minutes, seconds };
    };

    const renderTimeLeft = (timerHTML, timeLeft) => {
        if (timeLeft.timeLeft <= 0) {
            timerHTML.querySelector('.title').textContent = 'Акция завершена';
            timerHTML.querySelector('.timer').innerHTML = '';
            clearInterval(startTimer);
        }
        htmlDays.textContent = drawZero(timeLeft.days);
        htmlHours.textContent = drawZero(timeLeft.hours);
        htmlMinutes.textContent = drawZero(timeLeft.minutes);
        htmlSeconds.textContent = drawZero(timeLeft.seconds);
    };

    const drawZero = num => num < 10 ? `0${num}` : num;

    const startTimer = setInterval(() => {
        renderTimeLeft(document.querySelector('.promotion__timer'), getTimeLeft(deadline));
    }, 1000);
    
    renderTimeLeft(document.querySelector('.promotion__timer'), getTimeLeft(deadline));

    //скролл
    const headerLinks = document.querySelectorAll('.header__links a'),
        menu = document.querySelector('.menu'),
        order = document.querySelector('.order');

    const smoothScroll = (destination, speed) => {
        let height = 0;
        setInterval(() => {
            if (height <= destination.offsetTop) {
                height += 10;
                window.scrollTo(0, height);
            }
        }, speed);
    };
    
    headerLinks[0].addEventListener('click', (e) => {
        e.preventDefault();
        smoothScroll(order, 10);
    });

    headerLinks[1].addEventListener('click', (e) => {
        e.preventDefault();
        smoothScroll(menu, 10);
    });

    //Modal
    const modalBtns = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalContent = modal.querySelector('.modal__content'),
        modalClose  = document.querySelector('.modal__close');
    
    const showModal = () => {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    };
    const closeModal = () => {
        modal.classList.remove('show');
        modal.classList.add('hide');
        document.body.style.overflow = '';
    };

    const modalTimerId = setTimeout(showModal, 15000);
    
    modalBtns.forEach(btn => btn.addEventListener('click', showModal));
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        } 
    });
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
});