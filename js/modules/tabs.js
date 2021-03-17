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

export default tabs;