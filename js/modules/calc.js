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

module.exports = calc;