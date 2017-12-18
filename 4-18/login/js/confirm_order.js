$().ready( function () {
    var shopInfo = window.shopCar.getShopPro();
    var productList = shopInfo && shopInfo.productList || [];
    // 添加商品
    var tbody = $( "tbody" );
    loadShopDataNotShopCart( tbody,productList );

    // 计算总价和总数
    sumTotoalPrice();
    sumTotalCount();

    // 确认订单按钮
    $( "#confirmOrder" ).click( function () {
        var dir = location.pathname.match( /(.*)\/.+$/ )[1];
        location.pathname= dir + '/address.html';
    } );
 
    function sumTotoalPrice() {
        var totalPrice = $( ".totalPrice" );
        totalPrice.text( "￥" + parseFloat( shopInfo.productAmount ) );
    }

    function sumTotalCount() {
        var totalCount = $( ".totalCount" );
        totalCount.text( shopInfo.productCount );
    }

} );