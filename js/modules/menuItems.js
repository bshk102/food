import {getResources} from '../services/services';

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

    getResources("http://localhost:3000/menu").then((data) => {
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

export default menuItems;