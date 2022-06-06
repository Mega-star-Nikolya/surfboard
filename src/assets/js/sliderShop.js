var slideShopIndex = 1;

window.plusItem = function (plusItem) {
    showShopItem(slideShopIndex += 1);
};

window.minusItem = function (minusItem) {
    showShopItem(slideShopIndex -= 1); // Функция уменьшяет индекс на 1, показывает предыдущий слайд
};

function currentItem(s) {
    showShopItem(slideShopIndex = s); // Устанавливает текущий слайд
};

/* Основная функция слайдера */
function showShopItem(s) {
    var element;
    var shopItem = document.getElementsByClassName("shop__item");
    var shopBtn = document.getElementsByClassName("slider__carousel-btn");
    if (s > shopItem.length) {
        slideShopIndex = 1
    }
    if (s < 1) {
        slideShopIndex = shopItem.length
    }
    for (element = 0; element < shopItem.length; element++) {
        shopItem[element].style.display = "none";
    }
    shopItem[slideShopIndex - 1].style.display = "";
    shopBtn[slideShopIndex - 1];
};
