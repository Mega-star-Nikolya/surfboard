
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

// Секция shop со слайдером - при наведение на блок параметры всплывает окно. -начало-
// const parametersHover = document.querySelector('.shop__parameters');
// const parameterShow = document.querySelector('.shop__parameters-info');
// const parameterClose = document.querySelector('.section--shop');

const parametersHover = document.querySelectorAll('.shop__parameters')[0];
const parameterShow = document.querySelectorAll('.shop__parameters-info') [0];
const parameterClose = document.querySelectorAll('.shop__item') [0];

parametersHover.onmouseover = hover => {
    parameterShow.style.display = 'block';
}

parameterShow.onmouseover = show => {
    parameterShow.style.display = 'block';
}

parameterClose.onmouseout = close => {
    parameterShow.style.display = 'none';
}

// Секция shop со слайдером - при наведение на блок параметры всплывает окно. -конец-



