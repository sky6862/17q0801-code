$().ready( function () {
    $( "#addressList" ).click( function ( e ) {
        var target = $( e.target );
        if ( target.hasClass( "choseBtn" ) ) {
            $( "#addressList .choseBtn" ).removeClass( "choose" );
            target.addClass( "choose" );
        }

        if ( target.hasClass( "del" ) ) {
            var result = confirm( "你是否要删除此地址?" );
            if ( result ) {
                target.parents( "li" ).remove();
            }
        }
    } );


    // 确认地址按钮
    $( "#confirmBtn" ).click( function () {
        var address = $( "#addressList .choseBtn" ).filter( ".choose" );
        if ( address.length === 0 ) {
            alert( "没有选择任何地址" );
            return;
        }

        var li = $( "#addressList .choseBtn" ).filter( ".choose" ).parents( "li" );
        var info = li.children();
        var name = info.eq(0).text().match( /姓名：(.+)/ )[1];
        var phone = info.eq(1).text().match( /电话：(.+)/ )[1];
        var address = info.eq(2).text().match( /地址：(.+)/ )[1];

        var s = window.localStorage;
        s.setItem( "address", JSON.stringify( {
            name: name,
            phone: phone,
            address: address
        } ) );      
        
        var dir = location.pathname.match( /(.*)\/.+$/ )[1];
        location.pathname= dir + '/submit_order.html';
    } );

    $( "#saveAddress" ).click( saveAddress );


    $( "input" ).blur( function () {
        var val = $( this ).val();
        if ( val === "" ) {
            $( this ).next().show();
        } else {
            $( this ).next().hide();
        }
    } );

    $( 'select' ).blur( function () {
        if ( this.selectedIndex === 0 ) {
            $( this ).next().show();
        } else {
            $( this ).next().hide();
        }
    } );

    // 保存收货地址
    function saveAddress() {
        var name = $( "#name" ).val();
        var phone = $( "#phone" ).val();
        var area = $( "#area" ).val();
        var detailAddress = $( "#detailAddress" ).val();
        if ( !name || name === "" ) {
            return;
        }

        if ( !phone || phone === ""  ) {
            return;
        }

        if ( !area || area === "" ) {
            return;
        }

        if ( !detailAddress || detailAddress === "" ) {
            return ;
        }

        var address = area + detailAddress;
        var li = document.createElement( 'li' );
        var p = document.createElement( 'p' );
        var p2 = p.cloneNode();
        var p3 = p.cloneNode();
        var div = $( '<div><a class="choseBtn">选择</a><a class="del">删除</a></div>' );
        p.innerHTML = "姓名：" + name;
        p2.innerHTML = '电话：' + phone;
        p3.innerHTML = '地址：' + address;
        var li = $( li );
        li.append( p );
        li.append( p2 );
        li.append( p3 );
        li.append( div );
        $( "#addressList" ).append( li );

        var defaultAddress = $( "#defaultAddress" ).prop( "checked" );
        if ( defaultAddress ) {
            $( "#addressList .choseBtn" ).removeClass( "choose" );
            li.find(".choseBtn").addClass( "choose" );
        }
        
    } 

} ); 