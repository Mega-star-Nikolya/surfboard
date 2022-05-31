
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

    /* Выставляем минимальное значение ползунка времени воспроизведения */
    durationControl.min = 0;

    /* Выставляем время воспроизведения в ноль */
    durationControl.value = 0;

    /*  */
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
};
