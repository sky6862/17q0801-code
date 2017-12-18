$(document).ready( function () {
    $('.tbody .item').each( function ( index, item ) {
        var div = $(item).find( ' > div' );
        var height = div.eq(0).height();
        div.slice( 1 ).css( { "height" : height + 'px' } );
    } );

    $( ".tab" ).hide().filter( ":first" ).show();
    var tabSpan = $( '.middle .content .top-nav span' );
    tabSpan.click( function () {
        tabSpan.removeClass( "on" );
        $( this ).addClass( "on" );
        var index = $( this ).index();
        $( ".tab" ).stop().hide().eq( index ).fadeIn();
    } )
    
} );