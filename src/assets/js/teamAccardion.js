
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

