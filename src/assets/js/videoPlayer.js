
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
