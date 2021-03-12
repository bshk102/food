function slider() {
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
}

module.exports = slider;