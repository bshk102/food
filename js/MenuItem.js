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

new MenuItem(
    'img/tabs/vegy.jpg',
    'vegy',
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    3,
    '.menu__field .container'
).render();

new MenuItem(
    'img/tabs/elite.jpg',
    'elite',
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    6,
    '.menu__field .container',
    'menu__item'
).render();

new MenuItem(
    'img/tabs/post.jpg',
    'post',
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    4,
    '.menu__field .container',
    'menu__item'
).render();