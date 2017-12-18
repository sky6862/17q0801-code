$().ready( function () {
    // 地址开关
    var destination = $("#destination");
    var carriage = $("#carriage");
    $('#destinationSelect').css( { "left": destination.offset().left, "top": destination.offset().top + 25 } );
    $('#carriageSelect').css( { "left": carriage.offset().left, "top": carriage.offset().top + 25 } );

    destination.click( function () {
        $('#destinationSelect').fadeToggle();
        $(this).toggleClass( "on" );
    } ); 
    carriage.click( function () {
        $('#carriageSelect').fadeToggle();
        $(this).toggleClass( "on" );
    } );

    // 设置商品数量的控制功能
    var num = $("#num");
    setNumFunc( num );
    
    // 产品图片切换
    ( function () {
        var pic = $( ".shop-detail > .left > .left .pic" );
        var smList = $( ".shop-detail > .left > .left .sm-pic ul" );
        smList.click( function ( event ) {
            var target = event.target;
            if ( target.src ) {
                pic.empty();
                var img = document.createElement( "img" );
                img.src = target.src;
                pic.append( img );
                smList.children().removeClass( "on" );
                $(target).parent().addClass( "on" );
            }
            
        } );
    } () );
    

    //购物车按钮
    $( ".car" ).click( function () {
        // 获取商品数量
        var count = parseInt( $( ".numValue" ).val() );
        // 按钮效果
        var span = $( "<span> +" + count + "</span>" );
        span.css( { "position": "absolute", "left": "50%", "margin-left": "-11.5px" } );
        $(this).append( span );
        span.animate( 
            { 
                "margin-top": "-100px", "opacity": 0 }, 
                "slow", 
                function () {
                span.remove();
            } );
        
        // 数据存储
        saveShopData();
        setBubbleNum();
    } );


    // 立即购买按钮
     $( ".buy" ).click( function () { 
         saveShopData();
         window.location.pathname = "/shop_cart.html";
     } );
     function setBubbleNum() {
        var shopCar = $( '.header .bubble' );
        shopCar.text( window.shopCar.getNum() );
     }

     // 数据存储
     function saveShopData() { 
        var product = getProduct()
        window.shopCar.addPro( product );
     }

    // 获取商品数据
    function getProduct() {
        var count = parseInt( $( ".numValue" ).val() );
        var product = {
            id: 1,
            name: "蓝水晶商城 最新品时尚首饰 大号顶级珍珠项链",
            proText: "高贵大气项链",
            count: count,
            addition: {
                color: "白色",
                size: "40cm"
            },
            price: 999,
            destination: "广东广州",
            src: "images/shop_cart/pro1.jpg",
            href: "pro_details.html",
            inventory: 120
        };
        return product;
    }

    // 选项卡切换
    var tabs = $( ".tabs-nav" );
    tabs.click( function ( e ) {
        if ( e.target.nodeName === "LI" ) {
            var index = $( e.target ).index();
            tabs.find( "li" ).removeClass( "on" );
            $( e.target ).addClass( "on" );
            $( ".tabs-data" ).removeClass( "on" ).eq( index ).addClass( "on" );
        }
    } );

    // 评论切换
    var content = $( ".comment .content" );;
    var li = $( ".comment .title li");
    var subTabs = $( ".sub-tabs" );
    li.click( function () {
       li.removeClass( "on" );
       $( this ).addClass( "on" );
       var index = $( this ).index();
       loadComment( index, subTabs );
    } ); 

    function loadComment( index, subTabs ) {
        subTabs.find( ".sub-tab" ).stop().hide().eq( index ).fadeIn();
    }

    // 回复按钮
    $( ".comment-item .comment-btn button" ).click( function () {
        toggleReply( this );
    } )

    function toggleReply( target ) {
        target = $( target );
        target.toggleClass( "on" ).parent().toggleClass( "on-reply" );
    }
} ); 