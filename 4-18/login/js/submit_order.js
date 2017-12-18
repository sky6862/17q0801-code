$().ready( function () {
    var shopInfo = window.shopCar.getShopPro();
    var productList = shopInfo && shopInfo.productList || [];
    // 添加商品
    var tbody = $( "tbody" );
    loadShopDataNotShopCart( tbody,productList );
    // 计算总价和总数
    sumTotoalPrice();
    sumTotalCount();
    function sumTotoalPrice() {
        var totalPrice = $( ".totalPrice" );
        totalPrice.text( "￥" + parseFloat( shopInfo.productAmount ) );
    }

    function sumTotalCount() {
        var totalCount = $( ".totalCount" );
        totalCount.text( shopInfo.productCount );
    }


    // 获取地址信息
    loadAddress();
    function loadAddress() {
        var s = window.localStorage;
        var address = s.getItem( "address" );
        if ( !!address ) {
            address = JSON.parse( address );
            $( ".name" ).text( address.name );
            $( ".phone" ).text( address.phone );
            $( ".address" ).text( address.address );
        }
    }  

    // 提交按钮
    $( "#submitOrder" ).click( function () {
        var success = Math.floor(Math.random() * 10 ) % 2;
        if ( success ) {
            submitSuccess()
        } else {
            submitFail();
        }
    } );
     
    // 提交成功
    function submitSuccess() {
        $( ".shade" ).show();
        $( ".success-order" ).show();
    }

    // 提交失败
    function submitFail() {
        $( ".shade" ).show();
        $( ".fail-order" ).show();
    }

    $( ".shade" ).click( function () {
        $( this ).hide();
        $( ".success-order" ).hide();
        $( ".fail-order" ).hide();
    } )
} );