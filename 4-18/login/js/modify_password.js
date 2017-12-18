$().ready( function () {
    var tabTigger = $( ".middle .content .head-nav a" );
    var tabs = $( ".tab" );
    tabTigger.click( function () {
        tabTigger.removeClass( "on" );
        var index = $( this ).addClass( "on" ).index();
        tabs.stop().hide().eq( index ).fadeIn();
    } );
    
} );