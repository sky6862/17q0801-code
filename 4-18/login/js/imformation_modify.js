$().ready( function () {
    var tab = $( ".tab" );
    var tabTigger = $( ".middle .content .head-nav a:not(.setting)" );
    tabTigger.click( function () {
        tabTigger.removeClass( "on" );
        var index = $( this ).addClass( "on" ).index();
        tab.stop().hide().eq( index ).fadeIn();
    } );
} );