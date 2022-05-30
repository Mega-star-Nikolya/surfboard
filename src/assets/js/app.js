
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
    event.preventDefault(); // запрещаем перекидывать вверх или перезагрузать страницу

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
}
// Секция shop со слайдером - сам слайдер -конец-


// Секция Team аккардион -начало-
const team = document.querySelector('.team');
/* Функция для открытия контента по нажатию на ссылку */
function openItem(button) {
    const contentWrap = button.nextElementSibling;
    const content = contentWrap.firstElementChild;
    const currentHeight = content.offsetHeight;

    contentWrap.style.height = currentHeight + 'px';
    button.classList.add('team__name--active', 'has-name--active');
}

/* Функция для закрытия контента по нажатию на ссылку */
function closeItem(button) {
    if (!button) return;
    const contentWrap = button.nextElementSibling;
    contentWrap.style.height = 0;
    button.classList.remove('team__name--active', 'has-name--active');
}

team.addEventListener('click', function (event) {
    event.preventDefault(); // запрещаем перекидывать вверх или перезагрузать страницу
    const target = event.target;
    const activeItem = document.querySelector('.team__name--active', '.has-name--active');

    if (target.classList.contains('team__name')) {
        if (target.classList.contains('team__name--active','has-name--active')) {
            closeItem(target);
        } else {
            closeItem(activeItem);
            openItem(target);
        }
    }
})
// Секция Team аккардион -конец-


// Секция form модельное окно -начало-
const validateFields = (form, fieldsArray) => {

    fieldsArray.forEach(field => {
        field.removeClass("input-error");
        if (field.val().trim() === "") {
            field.addClass("input-error");
        }
    });
    const errorFields = form.find(".input-error");
    return errorFields.length === 0;
};

$('.form').submit(e => {
    e.preventDefault(); // запрещаем перекидывать вверх или перезагрузать страницу
    const form = $(e.currentTarget);
    const name = form.find("[name='name']");
    const phone = form.find("[name='tel']");
    const comment = form.find("[name='comment']");
    const to = form.find("[name='to']");

    const modal = $("#modal");
    const content = modal.find(".modal__content");

    modal.removeClass("error-modal");

    const isValid = validateFields(form, [name, phone, comment, to]);

    if (isValid) {
        const request = $.ajax({
            url: "https://webdev-api.loftschool.com/sendmail",
            method: "post",
            data: {
                name: name.val(),
                phone: phone.val(),
                comment: comment.val(),
                to: to.val(),
            },
        });
        request.done(data => {
            content.text(data.message);
        });
        request.fail(data => {
            const message = data.responseJSON.message;
            content.text(message);
            modal.addClass("error-modal");
        });
        request.always(() => {
            $.fancybox.open({
                src: "#modal",
                type: "inline"
            });
        });
    }
});

$(".js-submit-btn").click(e => {
    e.preventDefault();

    $.fancybox.close();
});
// Секция form модельное окно -конец-

// Секция меню с вертикальным аккордеонам -начало-

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
// Секция меню с вертикальным аккордеонам -конец-

// Секция видео проигрыватель -начало-

/* Большая кнопка воспроизведения */
const playBtn = document.querySelector(".video__player-img");

/* Малая кнопка воспроизведения */
const playerPlayBtn = document.querySelector(".duration__img");

/* Само меню */
const video = document.getElementById('player');

/* input с помощью которого выставляется время воспроизведения */
const durationControl = document.getElementById('durationLevel');

/* input с помощью которого выставляется громкость */
const soundControl = document.getElementById('micLevel');

/* Обертка управления громкостью */
const soundBtn = document.getElementById('soundBtn');

/* Кнопка с динамиком с помощью которой мы будем включать или выключать громкость */
const dynamicBtn = document.getElementById('dynamic');

/* Индификатор интервала, который будет отрисовывать текущее время воспроизведения */
let intervalId;

/* Переменная для сохранения уровня громкости перед выключением звука */
let soundLevel;


window.addEventListener('load', () => {

    /* При клике на само видео выполняем функцию playStop */
    video.addEventListener("click", playStop);

    /* Находи все кнопки управления play/pause */
    let playButtons = document.querySelectorAll(".play");
    for (let i = 0; i < playButtons.length; i++) {
        /* При клике на эти кнопки выполняем функию playStop */
        playButtons[i].addEventListener("click", playStop);
    }
});

/* Функция воспроизводить/поставить на паузу */
function playStop() {
    /* Устанавливает активные классы на элементы чтоб показать возспроизведение */
    playBtn.classList.toggle("video__player-img--active");
    playerPlayBtn.classList.toggle("active");

    /* Если видео на паузе */
    if (video.paused) { 
        video.play(); // Запускаем его
        // Запускаем отрисовку ползунка воспроизведения
        intervalId = setInterval(updateDuration, 1000 / 60);
        // Если видео не на паузе
    } else {
        // Останавливаем отрисовку ползунка времени воспроизведения
        clearInterval(intervalId);
        // Ставим видео на паузу
        video.pause();
    }

}
// Секция видео проигрыватель -конец-