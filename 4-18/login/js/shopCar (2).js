$().ready( function () {
    var shopInfo = window.shopCar.getShopPro();
    var productList = shopInfo && shopInfo.productList || [];

    // 添加商品
    var tbody = $( '.middle tbody' );
    loadShopData( tbody, productList );
    // 删除功能
    $( ".delete" ).click( function () {
        var isDelete = window.confirm( "你是否要删除此商品?" );
        if ( isDelete ) {
            var tr = $(this).parents( "tr" );
            deleteShopItem( tr );
        }
    } );

    $( ".guessYouLike button" ).click( function () {
        window.setTimeout( function () {
            var shopInfo = window.shopCar.getShopPro();
            var productList = shopInfo && shopInfo.productList || [];
            tbody.empty();
            tbody.append( $( '<tr class="table-division"></tr>' ) );
            loadShopData( tbody, productList );
            // 删除功能
            $( ".delete" ).click( function () {
                var isDelete = window.confirm( "你是否要删除此商品?" );
                if ( isDelete ) {
                    var tr = $(this).parents( "tr" );
                    deleteShopItem( tr );
                }
            } );
        }, 10 );
    } );

    // 全选按钮
    var allSelect = $( ".allSelect" );
    var checkbox = getShopCheckbox();

    function getShopCheckbox() {
        return $( "input[type='checkbox']" ).filter( function () {
            return !$( this ).parent().hasClass( "allSelect" );
        } ) ;
    }

    allSelect.click( function () {
        var checked = $( this ).children("input").prop( "checked" );
        allSelect.children("input").prop( "checked", checked );
        getShopCheckbox().prop( "checked", checked );
    } );

    checkbox.click( function () {
        var isAllCheck = checkbox.filter( ":checked" ).length === checkbox.length;
        allSelect.children( "input[type='checkbox']" ).prop( "checked", isAllCheck );
    } );

    // 设置商品数量的控制功能
    var num = $(".num");
    num.each( function ( index, item ) {
        sumSubPrice( item, $( item ).find( '.numValue' ).val() );
    } );
    num.each( function ( index, item ) {
        var maxNum = parseInt( $( item ).find( 'p' ).text().match( /\d+/ ) );
        setNumFunc( $( item ), { maxNum: maxNum, callbacks: [
            function ( count ) {
                sumSubPrice( this, count );
            }
        ] } );
    } );


    $( "#settleAccounts" ).click( function () {
        settleAccounts();
    } );
    // 结算
    function settleAccounts() {
        var checkbox = getShopCheckbox().filter( ":checked" );
        if ( checkbox.length === 0 ) {
            alert( "没有选择任何商品" );
            return;
        }
        window.shopCar.clear();
        for ( var index in  productList ) {
            var product = productList[index];
            checkbox.each( function ( index, item ) {
                var tr = $( item ).parents( "tr" );
                var name = tr.find( ".proName" ).text();
                if ( product.name === name )  {
                    var count = tr.find( ".numValue" ).val();
                    product.count = count;
                    window.shopCar.addPro( product );
                    return;
                }
            } );
        }
        var dir = location.pathname.match( /(.*)\/.+$/ )[1];
        location.pathname= dir + '/confirm_order.html';
    }

    

    // 批量删除
    $( '.groupDel' ).click( function () {
        var checkbox = getShopCheckbox().filter( ":checked" );
        if ( checkbox.length === 0 ) {
            return;
        }
        var isDelete = window.confirm( "你是否要删除所有选中的商品?" );
        if ( !isDelete ) {
            return;
        }
        checkbox.each( function ( index, item ) {
            var tr = $( item ).parents( "tr" );
            deleteShopItem( tr );
        } );
    } );

    function deleteShopItem( target ) {
        var name = target.find( ".proName" ).text();
        window.shopCar.removeProByName( name );
        target.remove();
    }

    // 计算总价和总数
    $( 'table' ).click( function () {
         sumTotoalPrice();
         sumTotalCount();
    } );
    sumTotoalPrice();
    sumTotalCount();

    function sumTotoalPrice() {
        var totalPrice = $( ".totalPrice" );
        var checkbox = getShopCheckbox().filter( ":checked" );
        var result = checkbox.toArray().reduce( function ( result, current ) {
            current = $( current );
            return result += parseFloat( current.parents( "tr" ).find( ".subtotal" ).text().match(/\d+/) );
        }, 0 ) ;
        totalPrice.text( "￥" + result );
    }

    function sumTotalCount() {
        var totalCount = $( ".totalCount" );
        var checkbox = getShopCheckbox().filter( ":checked" );
        var result = checkbox.toArray().reduce( function ( result, current ) {
            current = $( current );
            return result += parseInt( current.parents( "tr" ).find( ".numValue" ).val() );
        }, 0 ) ;
        totalCount.text( result );
    }
 
    function sumSubPrice( numTarget, count ) {
        var tr = $( numTarget ).parents( "tr" );
        var price = parseFloat( tr.find( ".price" ).text().match( /\d+/ ) );
        tr.find( ".subtotal" ).text( "￥" + ( count * price ) );
    }
    
} );