
const menu = document.getElementById('horixontalMenu');
const items = document.querySelectorAll(".menu__item");

const getItemWidth = (item) => {
    let resultWidth = 524;
    const windowWidth = window.innerWidth;
    const itemWidth = item.offsetWidth;

    const isTablet = window.matchMedia('(max-width: 768px)').matches;
    const isMobile = window.matchMedia('(max-width: 480px)').matches;

    if (isTablet) {
        resultWidth = windowWidth - itemWidth * items.length;
    }
    if (isMobile) {
        resultWidth = windowWidth - itemWidth;
    }
    return resultWidth;
};

const opensItem = (item) => {

    const itemParent = item.parentElement;
    itemParent.classList.add('menu__item--active');
    item.classList.add('menu__button--active');

    const itemContent = item.nextElementSibling;
    const itemText = itemContent.firstElementChild;
    itemContent.style.width = `${getItemWidth(item)}px`;
    itemText.style.width = `${getItemWidth(item)}px`;

};

const closesItem = (item) => {
    const itemParent = item.parentElement;
    itemParent.classList.remove('menu__item--active');
    item.classList.remove('menu__button--active');

    const itemContent = item.nextElementSibling;
    itemContent.style.width = 0;
};

menu.addEventListener('click', (e) => {
    e.preventDefault();
    const target = e.target; // ищем по чем мы кликаем
    const isActive = target.classList.contains('menu__button--active');
    const activeElement = document.querySelector(".menu__button--active");

    if (target.classList.contains('menu__button') && isActive && activeElement) {
        closesItem(target);
    }

    if (target.classList.contains('menu__button') && !isActive) {
        if (activeElement) {
            closesItem(activeElement);
        }
        opensItem(target);
    }
});

window.addEventListener('resize', () => {
    const activeElement = document.querySelector(".menu__button--active");
    if (activeElement) {
        closesItem(activeElement);
}
});
