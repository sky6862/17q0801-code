$().ready( function () {
    var tab = $( ".tab" );
    var tabTigger = $( ".middle .content .head-nav a:not(.setting)" );
    tabTigger.click( function () {
        tabTigger.removeClass( "on" );
        var index = $( this ).addClass( "on" ).index();
        tab.stop().hide().eq( index ).fadeIn();
    } );

    // 全选
    $( ".allChecked" ).click( function () {
        var checkbox = $( this ).parents( ".tab" ).find( "input[type='checkbox']:not(.allChecked)" );
        checkbox.prop( "checked", $( this ).prop( "checked" ) );
    } );

    $( ".tab" ).click( function ( e ) {
        var target = $( e.target );
        if ( target.is( "input[type='checkbox']:not(.allChecked)" ) ) {
            var checkbox = $( this ).find( "input[type='checkbox']:not(.allChecked)" );
            var checked = checkbox.length === checkbox.filter( ":checked" ).length;
            $( this ).find( ".allChecked" ).prop( "checked", checked );
        }
    } )
} ); 