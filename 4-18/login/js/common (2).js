$(window).ready( function () {

    // main nav
    $('.navBar > .container > .left').hover( function () {
        $(this).find('ul').stop().slideToggle();
    } );
});