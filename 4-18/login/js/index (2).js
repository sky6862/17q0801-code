$(window).ready( function () {

    // product tab
    var divs = $('.breadCrumb .content > div');
    var tabTitles = $( '.breadCrumb .title li' );
    tabTitles.hover( function () {
        tabTitles.removeClass( 'on' );
        $(this).addClass( 'on' );

        var index = $(this).index();
        divs.removeClass( 'on' );
        divs.eq( index ).addClass( 'on' );
    } );

    // banner
    var s = slidebanner( '.banner', {
        picList: 'ul',
        interval: 4000
    } );


    // product
    var timeToStart = 1000; 
    $('.show .shop-list > li:nth-child( 2 )').each( function ( index, item ) {
        slidebanner( item,  {
            picList: '.carousel ul',
            iconList: '.carousel-icon li',
            interval: 3000,
            timeToStart: timeToStart,
            iconItem: 'li',
            iconItemActive: 'on',
            haveIcon: true
        } );
        timeToStart += 1000;
    } );
} );