$().ready( function () {
    $( ".guessYouLike button" ).click( function () {
        var li = $( this ).parents( "li" );
        var src = li.find( "img" ).attr( "src" );
        var proName = li.find( "p a" ).text();
        var proPrice = parseFloat( li.find( "span" ).text().match(/\d+/)[0] );
        var product = {
            id: 2,
            name: proName,
            count: 1,
            src: src,
            href: "pro_details.html",
            price:  proPrice,
            inventory: 10
        };
        window.shopCar.addPro( product );
        var dir = location.pathname.match( /(.*)\/.+$/ )[1];
        location.pathname= dir + '/shop_cart.html';
    } );
} );