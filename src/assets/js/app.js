// Бургер меню с открытием навигации начало
$("#jsburger").on("click", function (event) {
    event.preventDefault(); // запрещаем перекидывать вверх или перезагрузать страницу

    $(this).toggleClass("active");
    $("#jsnav").toggleClass("active");
});
// Бургер меню с открытием навигации конец


$(function() {
    var header = $("#jsheader"),
        introH = $("#jsintro").innerHeight(),
        scrolloffset = $(window).scrollTop();


    /* Fixed Header */
    checkScroll(scrolloffset);

    $(window).on("scroll", function() {
        scrolloffset = $(this).scrollTop();
        checkScroll(scrolloffset);
    });

    function checkScroll(scrolloffset) {
        if (scrolloffset >= introH) {
            header.addClass("fixed")
        } else {
            header.removeClass("fixed")
        }
    }
});