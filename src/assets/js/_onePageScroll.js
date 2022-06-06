const sections = $("section");
const display = $(".page");
const sideMenu = $(".fixed-menu");
const menuItems = sideMenu.find(".fixed-menu__item");

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

let inScroll = false;

sections.first().addClass("active");

const countSectionPosition = sectionEq => {
  const position = sectionEq * -11.1111; //sectionEq - номер секции

  display.css({
    transform: `translateY(${position}%)`
  });

  if (isNaN(position)) {
    console.error("передано не верное значение в countSectionPosition")
    return 0;
  }
  return position;
};

const changeMenuThemeSection = sectionEq => {
  const currentSection = sections.eq(sectionEq);
  const menuTheme = currentSection.attr("data-sidemenu-theme");
  const activeClass = "fixed-menu--shadowed";

  if (menuTheme === "black") {
    sideMenu.addClass(activeClass);
  } else {
    sideMenu.removeClass(activeClass);
  }
};

const resetActiveClassForItem = (items, itemEq, activeClass) => {
  items
    .eq(itemEq)
    .addClass(activeClass)
    .siblings()
    .removeClass(activeClass);
};

const performTransition = sectionEq => {
  if (inScroll) return;

  const transitionOver = 1000;
  const mouseInertiaOver = 300;
  inScroll = true;

  const position = countSectionPosition(sectionEq);
  changeMenuThemeSection(sectionEq);

   resetActiveClassForItem(sections, sectionEq, "active");
  
  setTimeout(() => {
    inScroll = false;
    resetActiveClassForItem(menuItems, sectionEq, "fixed-menu__item--active");
  }, transitionOver + mouseInertiaOver);
};


const viewportScroller = () => {
  const activeSection = sections.filter(".active");
  const nextSection = activeSection.next();
  const prevtSection = activeSection.prev();

  return {
    next() {
      if (nextSection.length) {
        performTransition(nextSection.index());
      }
    },
    prev() {
      if (prevtSection.length) {
        performTransition(prevtSection.index());
      }
    }
  }
};

// Определяем в какую сторону мы делаем скролл

$(window).on("wheel", e => {
  const deltaY = e.originalEvent.deltaY;
  const scroller = viewportScroller();

  if (deltaY > 0) {
    scroller.next();
  }

  if (deltaY < 0) {
    scroller.prev();
  }
});

/* Функция что бы в textarea можно было перемещаться с помощью стрелочек и
при этом не скроллить страницу */
$(window).on("keydown", e => {
  const tagName = e.target.tagName.toLowerCase();
  const userTypingInInputs = tagName === "input" || tagName === "textarea";
  const scroller = viewportScroller();

  if (userTypingInInputs) return;
    switch (e.keyCode) {
      case 38: //prev
      scroller.next();
      break;

      case 40: //next
      scroller.prev();
      break;
  }
});

/* Скролл при нажатие по навигации  - в html к секции  навешиваем data-section-id="имя секции", в навигации на ссылки навешиваем data-scroll-to="имя секции" к которой хотим привязять */

$(".wrapper").on("touchmove", e => e.preventDefault());

$("[data-scroll-to]").click(e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr("data-scroll-to");
  const reqSection = $(`[data-section-id=${target}]`);
    performTransition(reqSection.index());
});



//Универсальный обработчик скролл-тач для всех направлений для мобильных устроиств
// https://github.com/mattbryson/TouchSwipe-Jquery-Plugin

if (isMobile) {
  $('body').swipe({
    swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
  
      const scroller = viewportScroller();
      let scrollDirection = "";
  
      if (direction === "up") scrollDirection = "next";
      if (direction === "down") scrollDirection = "prev";
  
      scroller[scrollDirection]();
    },
  });
};






// Функция которая возвращает после перезагрузки на начало страницы
/* History.scrollRestoration -cвойство Historyinterface позволяет веб-приложениям явно устанавливать поведение восстановления прокрутки по умолчанию при навигации по истории. 
auto
Местоположение на странице, на которую пользователь прокрутил, будет восстановлено.

manual
Расположение на странице не восстанавливается. Пользователю придется прокручивать местоположение вручную.*/

history.scrollRestoration = "manual";

$(window).on('beforeunload', function(){
      $(window).scrollTop(0);
});