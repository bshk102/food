function tabs() {
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
}

module.exports = tabs;