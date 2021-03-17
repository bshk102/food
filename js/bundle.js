/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
    // const calcConstitutionInputs = document.querySelectorAll('.calculating__choose_medium input'),
    //     calcChooseActivityField = document.querySelector('.calculating__choose_big'),
    //     calcChooseGenderField = document.querySelector('#gender'),
    //     calcHeight = document.querySelector('#height'),
    //     calcWeight = document.querySelector('#weight'),
    //     calcAge = document.querySelector('#age'),
    //     calcResult = document.querySelector('.calculating__result span');

    // const maleRatios = {
    //     height: 3.1,
    //     weight: 13.4,
    //     age: 5.7,
    //     gender: 88.36
    // };

    // const femaleRatios = {
    //     height: 4.8,
    //     weight: 9.2,
    //     age: 4.3,
    //     gender: 447.6
    // };

    // let userGender = '',
    //     userActivity = '';

    // calcResult.textContent = '';

    // calcChooseGenderField.addEventListener('click', calcChooseOption);
    // calcChooseActivityField.addEventListener('click', calcChooseOption);
    // calcConstitutionInputs.forEach(item => item.addEventListener('input', callRenderResult));


    // function calcChooseOption(e) {
    //     const items = this.querySelectorAll('.calculating__choose-item');
    //     if (e.target.classList.contains('calculating__choose-item')) {
    //         items.forEach(item => item.classList.remove('calculating__choose-item_active'));
    //         e.target.classList.add('calculating__choose-item_active');
    //     }
    //     if (e.currentTarget === calcChooseGenderField) {
    //         userGender = e.target.id;
    //     } else if (e.currentTarget === calcChooseActivityField) {
    //         userActivity = e.target.dataset.ratio;
    //     }
    //     callRenderResult();
    // }

    // function calcCalories(ratios) {
    //     return (ratios.gender + (ratios.weight * +calcWeight.value) + (ratios.height * +calcHeight.value) + (ratios.age * +calcAge.value)) * +userActivity;
    // }

    // function renderResult(result) {
    //     if (checkFillingOfFields()) {
    //         if (isNaN(result)) {
    //             calcResult.textContent = '';
    //         } else {
    //             calcResult.textContent = Math.round(result);
    //         }
    //     } else {
    //         calcResult.textContent = '';
    //     }
    // }

    // function callRenderResult() {
    //     if (userGender === 'male') {
    //         renderResult(calcCalories(maleRatios));
    //     } else if (userGender === 'female') {
    //         renderResult(calcCalories(femaleRatios));
    //     }
    // }

    // function checkFillingOfFields() {
    //     let filled = false;
    //     let inputErrors = [];
    //     calcConstitutionInputs.forEach(input => input.value === '' ? inputErrors.push('error') : true);        
    //     if (inputErrors.length > 0) {
    //         return false;
    //     }      
    //     calcChooseGenderField.querySelector('.calculating__choose-item_active') === null ? filled = false : filled = true;
    //     calcChooseActivityField.querySelector('.calculating__choose-item_active') === null ? filled = false : filled = true;
    //     return filled;
    // }

    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', sex);
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', ratio);
    }

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }

            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => elem.addEventListener('click', (e) => {
            if (e.target.getAttribute('data-ratio')) {
                ratio = +e.target.getAttribute('data-ratio');
                localStorage.setItem('ratio', ratio);
            } else {
                sex = e.target.getAttribute('id');
                localStorage.setItem('sex', sex);
            }

            elements.forEach(elem => elem.classList.remove(activeClass));
            e.target.classList.add(activeClass);
            calcTotal();
        }));
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");



function forms(formSelector, modalTimerId) {
    const forms = document.querySelectorAll(formSelector);

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

        (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.postData)('http://localhost:3000/requests', formData)
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
        (0,_modal__WEBPACK_IMPORTED_MODULE_1__.showModal)('.modal', modalTimerId);

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
            (0,_modal__WEBPACK_IMPORTED_MODULE_1__.closeModal)('.modal');
        }, 4000);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/menuItems.js":
/*!*********************************!*\
  !*** ./js/modules/menuItems.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function menuItems() {
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
            return (this.price = this.price * this.transfer);
        }

        render() {
            const element = document.createElement("div");

            if (this.classes.length === 0) {
                element.classList.add("menu__item");
            } else {
                this.classes.forEach((item) => element.classList.add(item));
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
            `;
            this.parent.append(element);
        }
    }

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResources)("http://localhost:3000/menu").then((data) => {
        data.forEach(({ img, altimg, title, descr, price }) => {
            new MenuItem(
                img,
                altimg,
                title,
                descr,
                price,
                ".menu__field .container"
            ).render();
        });
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (menuItems);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "showModal": () => (/* binding */ showModal),
/* harmony export */   "closeModal": () => (/* binding */ closeModal)
/* harmony export */ });
const showModal = (modalSelector, modalTimerId) => {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    
    if (modalTimerId) {
        clearTimeout(modalTimerId);
    }
};
const closeModal = (modalSelector) => {
    const modal = document.querySelector(modalSelector);
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = '';
};

function modal(btnsSelector, modalSelector, modalTimerId) {
    const modalBtns = document.querySelectorAll(btnsSelector),
        modal = document.querySelector(modalSelector);

    const showModalByScroll = () => {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    };

    modalBtns.forEach(btn => btn.addEventListener('click', () => showModal(modalSelector, modalTimerId)));
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });
    window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/scroll.js":
/*!******************************!*\
  !*** ./js/modules/scroll.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function scroll() {
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (scroll);

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    const slider = document.querySelector(slide),
        slides = document.querySelectorAll(container),
        slidesTotal = document.querySelector(totalCounter),
        slidesCurrent = document.querySelector(currentCounter),
        slidesNext = document.querySelector(nextArrow),
        slidesPrev = document.querySelector(prevArrow),
        slidesInner = document.querySelector(field),
        slidesWrapper = document.querySelector(wrapper);

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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabContentSelector, tabHeaderItemSelector, tabHeaderItemsSelector, activeClass) {
    const tabContent = document.querySelectorAll(tabContentSelector),
        tabHeaderItem = document.querySelectorAll(tabHeaderItemSelector),
        tabHeaderItems = document.querySelector(tabHeaderItemsSelector);

    const showTabContent = () => {
        tabContent.forEach(item => {
            item.style.display = 'none';
        });
        
        tabHeaderItem.forEach((item, i) => {
            if (item.classList.contains(activeClass)) {
                tabContent[i].style.display = 'block';
            }
        });
    };

    tabHeaderItems.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains(tabHeaderItemSelector.slice(1))) {
            tabHeaderItem.forEach(item => item.classList.remove(activeClass));
            e.target.classList.add(activeClass);
            showTabContent();
        }
    });

    showTabContent();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(timerSelector, timerDeadline) {
    const deadline = new Date(timerDeadline),
        htmlDays = document.querySelector('#days'),
        htmlHours = document.querySelector('#hours'),
        htmlMinutes = document.querySelector('#minutes'),
        htmlSeconds = document.querySelector('#seconds');

    const getTimeLeft = (deadline) => {
        let currentDate = new Date();
        let timeLeft = deadline - currentDate;

        let days = Math.floor(timeLeft / 1000 / 60 / 60 / 24),
            hours = Math.floor((timeLeft / 1000 / 60 / 60) % 24),
            minutes = Math.floor((timeLeft / 1000 / 60) % 60),
            seconds = Math.floor((timeLeft / 1000) % 60);

        return { timeLeft, days, hours, minutes, seconds };
    };

    const renderTimeLeft = (timerHTML, timeLeft) => {
        if (timeLeft.timeLeft <= 0) {
            timerHTML.querySelector('.title').textContent = 'Акция завершена';
            timerHTML.querySelector(timerSelector).innerHTML = '';
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

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "getResources": () => (/* binding */ getResources)
/* harmony export */ });
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

const getResources = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
};



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_scroll__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/scroll */ "./js/modules/scroll.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_menuItems__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/menuItems */ "./js/modules/menuItems.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");










window.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.showModal)('.modal', modalTimerId), 15000);

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__.default)('.tabcontent', '.tabheader__item', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_1__.default)('.timer', '2021-05-01');
    (0,_modules_scroll__WEBPACK_IMPORTED_MODULE_2__.default)();
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.default)('[data-modal]', '.modal', modalTimerId);
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__.default)('form', modalTimerId);
    (0,_modules_menuItems__WEBPACK_IMPORTED_MODULE_5__.default)();
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__.default)({
        container: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slider',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_7__.default)();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map