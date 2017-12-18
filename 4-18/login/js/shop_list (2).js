$().ready(function () {
    $('.commodity .left').each(function ( index, item ) {
        var center = $(item).next();
        var height = center.height();
        $(item).css({height: height + 'px'});
    });

    $( ".middle .commodity .center ul" ).click( function ( e ) {
        var target = $( e.target ); 
        if ( target.is( "li" ) ) {
            target.parent().find( ".on" ).removeClass( "on" );
            target.addClass( "on" );  
        }
    } );

    // 添加购物车
    $( ".shop-list .list .shopCar" ).click( function () {
        var li = $( this ).parents( "li" );
        var name = li.find( "p a" ).text();
        var src = li.find( "img" ).attr( "src" );
        var price = parseFloat( li.find( ".price" ).text().match( /\d+/ )[0] ); 
        var id = 3;
        var count = 1;
        var href = "pro_details.html";
        var inventory = parseInt( li.find( ".stock" ).text().match( /\d+/ )[0] );
        var product = {
            name: name,
            src: src,
            price: price,
            id: id,
            count: count,
            href: href,
            inventory: inventory
        }

        window.shopCar.addPro( product );
        setBubbleNum();
    } ); 

    var dd = $( ".shop-list .top-nav dd + dd" );
    dd.click( function () {
        dd.removeClass( "on" );
        $( this ).addClass( "on" );
    } )

});