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

    // Menu Items Render

    class MenuItem {
        constructor(img, alt, subtitle, descr, price, parentSelector, ...classes) {
            this.img = img;
            this.alt = alt;
            this.subtitle = subtitle;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.transfer = 70;
            this.parent = document.querySelector(parentSelector);
        }
    
        changeToRUR() {
            return this.price = this.price * this.transfer;
        }
    
        render() {
            const element = document.createElement('div');
            
            if (this.classes.length === 0) {
                element.classList.add('menu__item');
            } else {
                this.classes.forEach(item => element.classList.add(item));
            }
    
            element.innerHTML = `
                <img src=${this.img} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.changeToRUR()}</span> руб/день</div>
                </div>
            `
            this.parent.append(element);
        }
    }
    
    const getResources = async url => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    getResources('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuItem(img, altimg, title, descr, price, '.menu__field .container').render();
            });
        });

    //Forms

    const forms = document.querySelectorAll('form');

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };

    forms.forEach(form => form.addEventListener('submit', e => {
        e.preventDefault();

        const statusMessages = {
            loading: 'icons/spinner.svg',
            sucsess: 'Спасибо, мы свяжемся с вами',
            failure: 'Ошибка'
        };
        const statusMessage = document.createElement('img');
        statusMessage.src = statusMessages.loading;
        statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
        `;
        form.insertAdjacentElement('afterend', statusMessage);

        let formData = new FormData(form);
        
        formData = JSON.stringify(Object.fromEntries(formData.entries()));

        postData('http://localhost:3000/requests', formData)
            .then(data => {
                console.log(data);
                showThanksModal(statusMessages.sucsess);                
                statusMessage.remove();
            })
            .catch(() => showThanksModal(statusMessages.failure))
            .finally(() => form.reset());

    //     const req = new XMLHttpRequest();
    //     req.open('POST', 'server.php');
    //     req.setRequestHeader('Content-type', 'application/json');
    //     req.send(formData);
    //     req.addEventListener('load', () => {
    //         if (req.status === 200) {
    //             showThanksModal(statusMessages.sucsess);
    //             form.reset();
    //             statusMessage.remove();
    //         } else {
    //             showThanksModal(statusMessages.failure);
    //         }
    //     });
    }));

    function showThanksModal(message) {
        const modalDialog = document.querySelector('.modal__dialog');
        modalDialog.classList.add('hide');
        showModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            modalDialog.classList.add('show');
            modalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

    // Slider

    const slider = document.querySelector('.offer__slider'),
        slides = document.querySelectorAll('.offer__slide'),
        slidesTotal = document.querySelector('#total'),
        slidesCurrent = document.querySelector('#current'),
        slidesNext = document.querySelector('.offer__slider-next'),
        slidesPrev = document.querySelector('.offer__slider-prev'),
        slidesInner = document.querySelector('.offer__slider-inner'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper');

    const dots = [];

    let slidesWidth = +window.getComputedStyle(slidesWrapper).width.replace(/\D/g, '');
    
    const totalWidth = slidesWidth * (slides.length - 1);

    let offset = 0;
    let slidesIndex = 0;

    writeCurrentSlideNumber();
    writeTotalSlidesNumber();
    
    slidesInner.style.width = 100 * slides.length + '%';
    slidesInner.style.display = 'flex';
    slidesInner.style.transition = '0.5s ease';
    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => slide.style.width = slidesWidth + 'px');

    slider.style.position = 'relative';
    const sliderIndicators = document.createElement('ul');
    sliderIndicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(sliderIndicators);
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        i === 0 ? dot.style.opacity = 1 : true;
        sliderIndicators.append(dot);
        dots.push(dot);
    }
    

    slidesNext.addEventListener('click', () => {
        slidesIndex++;
        if (slidesIndex === slides.length) {
            offset = 0;
            slidesIndex = 0;
        } else {
            offset += slidesWidth;
        }
        
        slidesInner.style.transform = `translateX(-${offset}px)`;
        writeCurrentSlideNumber();
        setDotsOpacity();
    });
    
    slidesPrev.addEventListener('click', () => {
        if (offset === 0) {
            offset = totalWidth;
            slidesIndex = slides.length - 1;
        } else {
            offset -= slidesWidth;
            slidesIndex--;
        }

        slidesInner.style.transform = `translateX(-${offset}px)`;
        writeCurrentSlideNumber();
        setDotsOpacity();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            slidesIndex = index;
            offset = slidesWidth * index;
            slidesInner.style.transform = `translateX(-${offset}px)`;
            writeCurrentSlideNumber();
            setDotsOpacity();
        });
    });

    function writeTotalSlidesNumber() {
        if (slides.length < 10) {
            slidesTotal.textContent = '0' + slides.length;
        } else {
            slidesTotal.textContent = slides.length;
        }
    }

    function writeCurrentSlideNumber() {
        if (slides.length < 10) {
            slidesCurrent.textContent = '0' + (slidesIndex + 1);
        } else {
            slidesCurrent.textContent = slidesIndex + 1;
        }
    }

    function setDotsOpacity() {
        dots.forEach(dot => dot.style.opacity = .5);
        dots[slidesIndex].style.opacity = 1;
    }
    // slidesNext.addEventListener('click', showNextSlide);
    // slidesPrev.addEventListener('click', showPrevSlide);

    // let currentSlide = 0;

    // showSlide(currentSlide);

    // function showSlide(current) {
    //     slides.forEach(slide => slide.classList.add('hide'));
    //     if (slides.length < 10) {
    //         slidesTotal.textContent = '0' + slides.length;
    //         slidesCurrent.textContent = '0' + (current + 1);
    //     } else {
    //         slidesTotal.textContent = slides.length;
    //         (current + 1) < 10 ? slidesCurrent.textContent = '0' + (current + 1) : slidesCurrent.textContent = current + 1;
    //     }
    //     slides[current].classList.remove('hide');
    // }

    // function showNextSlide() {
    //     currentSlide < slides.length - 1 ? ++currentSlide : currentSlide = 0;
    //     showSlide(currentSlide);
    // }

    // function showPrevSlide() {
    //     currentSlide === 0 ? currentSlide = slides.length - 1 : --currentSlide;
    //     showSlide(currentSlide);
    // }


    // Calories Calculator

    const calcConstitutionInputs = document.querySelectorAll('.calculating__choose_medium input'),
        calcChooseActivityField = document.querySelector('.calculating__choose_big'),
        calcChooseGenderField = document.querySelector('#gender'),
        calcHeight = document.querySelector('#height'),
        calcWeight = document.querySelector('#weight'),
        calcAge = document.querySelector('#age'),
        calcResult = document.querySelector('.calculating__result span');

    const maleRatios = {
        height: 3.1,
        weight: 13.4,
        age: 5.7,
        gender: 88.36
    };

    const femaleRatios = {
        height: 4.8,
        weight: 9.2,
        age: 4.3,
        gender: 447.6
    };

    let userGender = '',
        userActivity = '';

    calcResult.textContent = '';

    calcChooseGenderField.addEventListener('click', calcChooseOption);
    calcChooseActivityField.addEventListener('click', calcChooseOption);
    calcConstitutionInputs.forEach(item => item.addEventListener('input', callRenderResult));
    

    function calcChooseOption(e) {
        const items = this.querySelectorAll('.calculating__choose-item');
        if (e.target.classList.contains('calculating__choose-item')) {
            items.forEach(item => item.classList.remove('calculating__choose-item_active'));
            e.target.classList.add('calculating__choose-item_active');
        }
        if (e.currentTarget === calcChooseGenderField) {
            userGender = e.target.id;
        } else if (e.currentTarget === calcChooseActivityField) {
            userActivity = e.target.dataset.ratio;
        }
        callRenderResult();
    }

    function calcCalories(ratios) {
        return (ratios.gender + (ratios.weight * +calcWeight.value) + (ratios.height * +calcHeight.value) + (ratios.age * +calcAge.value)) * +userActivity;
    }

    function renderResult(result) {
        if (checkFillingOfFields()) {
            if (isNaN(result)) {
                calcResult.textContent = '';
            } else {
                calcResult.textContent = Math.round(result);
            }
        } else {
            calcResult.textContent = '';
        }
    }

    function callRenderResult() {
        if (userGender === 'male') {
            renderResult(calcCalories(maleRatios));
        } else if (userGender === 'female') {
            renderResult(calcCalories(femaleRatios));
        }
    }

    function checkFillingOfFields() {
        let filled = false;
        let inputErrors = [];
        calcConstitutionInputs.forEach(input => input.value === '' ? inputErrors.push('error') : true);        
        if (inputErrors.length > 0) {
            return false;
        }      
        calcChooseGenderField.querySelector('.calculating__choose-item_active') === null ? filled = false : filled = true;
        calcChooseActivityField.querySelector('.calculating__choose-item_active') === null ? filled = false : filled = true;
        return filled;
    }
});