
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
    var dots = document.getElementsByClassName("slider-dots__item");
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

// Секция shop со слайдером - сам слайдер -начало-
let position = 0;
const slidesToShow = 1;
const slidesToScroll = 1;
const container = document.querySelector('.shop__slider__container');
const track = document.querySelector('.shop__slider__track');
const items = document.querySelectorAll('.shop__item');
const btnPrev = document.querySelector('.sliderCarousel__btn--prev');
const btnNext = document.querySelector('.sliderCarousel__btn--next');
const itemsCount = items.length;
const itemWidth = container.clientWidth / slidesToShow;
const movePosition = slidesToScroll * itemWidth;

items.forEach((item) => {
    item.style.minWidth = `${itemWidth}px`;
});


btnNext.addEventListener('click', () => {
    const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;

    position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;

    setPosition();
    checkBtns();
});

btnPrev.addEventListener('click', () => {
    const itemsLeft = Math.abs(position) / itemWidth;

    position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;

    setPosition();
    checkBtns();
});

const setPosition = () => {
    track.style.transform = `translateX(${position}px)`;
};

const checkBtns = () => {
    btnPrev.disabled = position === 0;
    btnNext.disabled = position <= -(itemsCount - slidesToShow) * itemWidth;
};
checkBtns();
// Секция shop со слайдером - сам слайдер -конец-

