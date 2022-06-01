var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
!function() {
/*!******************************!*\
  !*** ./src/assets/js/app.js ***!
  \******************************/
// Бургер меню с открытием навигации начало
$("#jsburger").on("click", function (event) {
    event.preventDefault(); // запрещаем перекидывать вверх или перезагрузать страницу

    $(this).toggleClass("active");
    $("#jsnav").toggleClass("active");
});
// Бургер меню с открытием навигации конец



}();
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
!function() {
/*!************************************!*\
  !*** ./src/assets/js/formModal.js ***!
  \************************************/

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

}();
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
!function() {
/*!*****************************************!*\
  !*** ./src/assets/js/horixontalMenu.js ***!
  \*****************************************/

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

}();
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
!function() {
/*!******************************!*\
  !*** ./src/assets/js/map.js ***!
  \******************************/
let myMap;

const init = () => {
  myMap = new ymaps.Map("map", {

    // Задаем кардинаты
    center: [55.752004, 37.576133],

    // уменьшаем или увеличиваем масштаб
    zoom: 15,
  
    // отключаем все ненужные элементы - Пробки
    controls: []
  });

  // Задаем точки геолокации можно не одну
  const coords = [
    [55.752004, 37.576133]
  ];

  const myCollection = new ymaps.GeoObjectCollection({}, {
    draggable: false,
    iconLayout: 'default#image',
    iconImageHref: './assets/images/map/map_click.png',
    iconImageSize: [58, 73],
    iconImageOffset: [-35, -52]
  });

  coords.forEach(coord => {
    myCollection.add(new ymaps.Placemark(coord));
  });

  myMap.geoObjects.add(myCollection);

  // Отключаем возможность прокрутки 
  myMap.behaviors.disable('scrollZoom');
}

ymaps.ready(init);
}();
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
!function() {
/*!****************************************!*\
  !*** ./src/assets/js/sliderReviews.js ***!
  \****************************************/
/* Индекс слайда по умолчанию */
var slideIndex = 1;
showSlides(slideIndex);

/* Функция увеличивает индекс на 1, показывает следующй слайд*/
function plusSlide() {
    showSlides(slideIndex += 1);
};

/* Функция уменьшяет индекс на 1, показывает предыдущий слайд*/
function minusSlide() {
    showSlides(slideIndex -= 1);
};

/* Устанавливает текущий слайд */
window.currentSlide = function (n) {
    showSlides(slideIndex = n);
};

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
};

}();
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
!function() {
/*!**************************************!*\
  !*** ./src/assets/js/slider_shop.js ***!
  \**************************************/
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

}();
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
!function() {
/*!****************************************!*\
  !*** ./src/assets/js/teamAccardion.js ***!
  \****************************************/

const team = document.querySelector('.team');
/* Функция для открытия контента по нажатию на ссылку */
function openItem(button) {
    const contentWrap = button.nextElementSibling;
    const content = contentWrap.firstElementChild;
    const currentHeight = content.offsetHeight;

    contentWrap.style.height = currentHeight + 'px';
    button.classList.add('team__name--active', 'has-name--active');
};

/* Функция для закрытия контента по нажатию на ссылку */
function closeItem(button) {
    if (!button) return;
    const contentWrap = button.nextElementSibling;
    contentWrap.style.height = 0;
    button.classList.remove('team__name--active', 'has-name--active');
};

team.addEventListener('click', function (event) {
  event.preventDefault(); // запрещаем перекидывать вверх или перезагрузать страницу
  const target = event.target;
  const activeItem = document.querySelector('.team__name--active', '.has-name--active');

  if (target.classList.contains('team__name')) {
    if (target.classList.contains('team__name--active', 'has-name--active')) {
      closeItem(target);
    } else {
      closeItem(activeItem);
      openItem(target);
    }
  }
});


}();
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
!function() {
/*!**************************************!*\
  !*** ./src/assets/js/videoPlayer.js ***!
  \**************************************/

/* Большая кнопка воспроизведения */
const playBtn = document.querySelector(".video__player-img");

/* Малая кнопка воспроизведения */
const playerPlayBtn = document.querySelector(".duration__img");

/* Само меню */
const video = document.getElementById("player");

/* input с помощью которого выставляется время воспроизведения */
const durationControl = document.getElementById("durationLevel");

/* input с помощью которого выставляется громкость */
const soundControl = document.getElementById("micLevel");

/* Обертка управления громкостью */
const soundBtn = document.getElementById("soundBtn");

/* Кнопка с динамиком с помощью которой мы будем включать или выключать громкость */
const dynamicBtn = document.getElementById("dynamic");

/* Индификатор интервала, который будет отрисовывать текущее время воспроизведения */
let intervalId;

/* Переменная для сохранения уровня громкости перед выключением звука */
let soundLevel;


window.addEventListener('load', function() {

    /* При клике на само видео выполняем функцию playStop */
    video.addEventListener("click", playStop);

    /* Находи все кнопки управления play/pause */
    let playButtons = document.querySelectorAll(".play");

    for (let i = 0; i < playButtons.length; i++) {
        /* При клике на эти кнопки выполняем функию playStop */
        playButtons[i].addEventListener("click", playStop);
    }

    /* Выставляем минимальное значение ползунка времени воспроизведения */
    durationControl.min = 0;

    /* Выставляем время воспроизведения в ноль */
    durationControl.value = 0;

    /* Выставляем максимальное значение ползунка времени воспроизведения*/
    durationControl.max = video.duration;

    /* При кликах или перетягивании ползунка выполняем функцию setVideoDuration */
    durationControl.addEventListener("input", setVideoDuration);

    /* Выставляем минимальное значение ползунка громкости */
    soundControl.min = 0;

    /* Выставляем максимальное значение ползунка громкости */
    soundControl.max = 10;

    /* Выставляем текущее положение положение ползунка громкости на максимум  */
    soundControl.value = soundControl.max;

    /* При кликах или перетягивание ползунка выполняем функцию changeSoundVolume */
    soundControl.addEventListener("input", changeSoundVolume);

    /* При клике на динамик выполняем soundOf */
    dynamicBtn.addEventListener('click', soundOf);

    /* Когда видео закончится  */
    video.addEventListener('ended', () => {
        /* Высталяем классы на кнопки, что бы отобразить, что можно воспроизвести */
        playBtn.classList.toggle('video__player-img--active');
        playerPlayBtn.classList.remove('active');

        /* Устанавливаем время воспроизведения в ноль */
        video.currentTime = 0;
    })
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

/* Функция устанавливает текущее время воспроизведения */
function setVideoDuration() {

    /* Устанавливает текущее время воспроизведения видео по позиции ползунка */
    video.currentTime = durationControl.value;

    /* Отрисовывает полосу прогресса */
    updateDuration();
}

/*Функция для обновления позиции ползунка продолжительности видео */

function updateDuration() {

    /* Устанавливаем в наш импут текущее время */
    durationControl.value = video.currentTime;

    /* Рассчитываем процент для закраски програсса */
    let step = video.duration / 100;
    let percent = video.currentTime / step;
  
    /* Устанавливаем стили */
    durationControl.style.background = `linear-gradient(90deg, #FEDB3F 0%, #FEDB3F ${percent}%, #626262 ${percent}%)`;
}

/* Функция изминения уровня громкости */
function changeSoundVolume() {

    /* Видео принимает только значения  от 0 до 1, то есть дробные числа
    поэтому текущее значение ползунка громкости делим на 10 */
    video.volume = soundControl.value / 10;

    /* Если мы выставили ползунок в ноль */
    if (video.volume === 0) {

        /* то отображаем на динамике что звук выключен */
        soundBtn.classList.add("active");

        /* Если звук не выключен, то снимаем отображение выключенного звука с иконки */
    } else {
        soundBtn.classList.remove("active");
    }
}

/* Функция включения/выключения звука */
function soundOf() {

    /* Если при запуске функции звук выключен */
    if (video.volume === 0) {
        /* Мы берем предыдущее сохраненное значение громкости  и выставляем в вмдео */
        video.volume = soundLevel;

        /* Отрисовываем это в ползунок громкости */
        soundControl.value = soundLevel * 10;

        /* Убираем отображение выключенного звука с иконки динамика */
        soundBtn.classList.remove('active');

        /* если при запуске функции звук включен */
    } else {
        /* Сохраняем текущее значение громкости */
        soundLevel = video.volume;

        /* Выставляем громкость на 0 */
        video.volume = 0;

        /* Отрисовываем это на ползунке громкости  */
        soundControl.value = 0;

        /* Отображаем на иконке динамика, что звук выключен */
        soundBtn.classList.add('active');
    }
}

}();

//# sourceMappingURL=app.js.map