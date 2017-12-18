$().ready( function () {
    var tab = $( ".tab" );
    var tabTigger = $( ".middle .content .head-nav a" )
    tabTigger.click( function () {
        tabTigger.removeClass( "on" );
        var index = $( this ).addClass( "on" ).index();
        tab.stop().hide().eq( index ).fadeIn();
    } );
    tab.click( function (e) {
        var target = $( e.target );
        if ( target.hasClass( "allChecked" ) ) {
            var check = target.prop( "checked" );
            $( this ).find( "input[type='checkbox']:not(.allChecked)" ).prop( "checked", check );
        }

        if ( target.is( "input[type='checkbox']:not(.allChecked)" ) ) {
            var checkbox = $( this ).find( "input[type='checkbox']:not(.allChecked)" );
            var isAllCheck = checkbox.length === checkbox.filter( ":checked" ).length;
            $( this ).find( ".allChecked" ).prop( "checked", isAllCheck );
        }
        
    } )
} ); 