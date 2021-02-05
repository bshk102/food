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
    const deadline = new Date(2021, 2, 1, 0, 0),
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
        modal = document.querySelector('.modal');
    
    const showModal = () => {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearTimeout(modalTimerId);
        window.removeEventListener('scroll', showModalByScroll);
    };
    const closeModal = () => {
        modal.classList.remove('show');
        modal.classList.add('hide');
        document.body.style.overflow = '';
    };

    const modalTimerId = setTimeout(showModal, 15000);

    const showModalByScroll = () => {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal();
        }
    };
    
    modalBtns.forEach(btn => btn.addEventListener('click', showModal));
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        } 
    });
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
    window.addEventListener('scroll', showModalByScroll);

    //Forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'Загрузка',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => postData(item));

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.append(statusMessage);

            const req = new XMLHttpRequest();
            req.open('POST', 'server.php');
            req.setRequestHeader('Content-type', 'application/json');

            const formData = new FormData(form);

            const object = {};
            formData.forEach((value, key) => object[key] = value);

            req.send(JSON.stringify(object));

            req.addEventListener('load', () => {
                if (req.status === 200) {
                    console.log(req.response);
                    statusMessage.textContent = message.success;
                    form.reset();
                    setTimeout(() => statusMessage.remove(), 1500);
                } else {
                    statusMessage.textContent = message.failure;
                }
            });
        });
    }

    function showThanksModal(message) {
        const prevModal = document.querySelector('.modal__dialog');
        prevModal.classList.add('hide');
        openModal();
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
    }

});