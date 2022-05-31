// Бургер меню с открытием навигации начало
$("#jsburger").on("click", function (event) {
    event.preventDefault(); // запрещаем перекидывать вверх или перезагрузать страницу

    $(this).toggleClass("active");
    $("#jsnav").toggleClass("active");
});
// Бургер меню с открытием навигации конец


