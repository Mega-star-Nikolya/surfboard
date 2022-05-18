
// Слайдер в секции с отзывами начало
/* Индекс слайда по умолчанию */
var slideIndex = 1;
showSlides(slideIndex);

/* Функция увеличивает индекс на 1, показывает следующй слайд*/
function plusSlide() {
    showSlides(slideIndex += 1);
}

/* Функция уменьшяет индекс на 1, показывает предыдущий слайд*/
function minusSlide() {
    showSlides(slideIndex -= 1);
}

/* Устанавливает текущий слайд */
function currentSlide(n) {
    showSlides(slideIndex = n);
}

/* Основная функция сладера */
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slider__track");
    var dots = document.getElementsByClassName("slider__dots-item");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" actives", "");
    }
    slides[slideIndex - 1].style.display = "flex";
    dots[slideIndex - 1].className += " actives";
}
// Слайдер в секции с отзывами конец

// Бургер меню с открытием навигации начало
$("#jsburger").on("click", function(event) {
event.preventDefault();

$(this).toggleClass("active");
$("#jsnav").toggleClass("active");
})
// Бургер меню с открытием навигации конец

// Секция shop со слайдером - сам слайдер -начало-

var slideShopIndex = 1;
showSlides(slideShopIndex);

function plusItem() {
    showShopItem(slideShopIndex += 1);
}

function minusItem() {
    showShopItem(slideShopIndex -= 1); // Функция уменьшяет индекс на 1, показывает предыдущий слайд
}

function currentItem(s) {
    showShopItem(slideShopIndex = s); // Устанавливает текущий слайд
}

/* Основная функция слайдера */
function showShopItem(s) {
    var element;
    var shopItem = document.getElementsByClassName("shop__item");
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
}
// Секция shop со слайдером - сам слайдер -конец-

