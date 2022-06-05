// Бургер меню с открытием навигации начало
// $("#jsburger").on("click", function (event) {
//     event.preventDefault(); // запрещаем перекидывать вверх или перезагрузать страницу
// 
//     $(this).toggleClass("active");
//     $("#jsnav").toggleClass("active");
// });
// Бургер меню с открытием навигации конец


let nav = $("#jsnav");
let jsburger = $("#jsburger");
jsburger.on("click", function(event) {
    event.preventDefault(); // запрещаем перекидывать вверх или перезагрузать страницу
    jsburger.toggleClass("active"); // при нажатие появляется крестик
    nav.toggleClass("show"); // при нажатие появляется меню
});

$("[data-scroll-to]").on("click", function(event) {
    event.preventDefault();
        nav.removeClass("show");
    jsburger.removeClass("active");
  });