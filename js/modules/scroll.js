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

export default scroll;