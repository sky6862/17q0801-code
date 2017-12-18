
function loadShopData( tbody, productList ) {
    appendShopItemByData( tbody, productList );
}
function loadShopDataNotShopCart( tbody, productList ) {
    appendShopItemByDataNotShopCart( tbody, productList );
}

// 添加商品列表   
// 购物车页调用
function appendShopItemByData( tbody, products ) {
    for ( var product in products ) {
        product = products[product];

        var tr = document.createElement( "tr" );

        var goods = createGoodsElem( product );

        tr.appendChild( goods );

        var price = createPriceElem( product );

        tr.appendChild( price );

        var num = createNumElem( product );

        tr.appendChild( num );

        var subtotal = createSubtotalElem( product );

        tr.appendChild( subtotal );

        var operation = createOperationElem();

        tr.appendChild( operation );

        tbody.prepend( tr );
    }
}

function appendShopItemByDataNotShopCart( tbody, products ) {
    for ( var product in products ) {
        product = products[product];

        var tr = document.createElement( "tr" );

        var goods = createGoodsElem( product, true );

        tr.appendChild( goods );

        var price = createPriceElem( product );

        tr.appendChild( price );

        var num = createNumElemNotShopCart( product );

        tr.appendChild( num );

        var subtotal = createSubtotalElem( product );

        tr.appendChild( subtotal );

        tbody.prepend( tr );
    }
}

function createGoodsElem( product, noCheckbox ) {
    var goods = document.createElement( "td" );
    goods.className = "goods";

    if ( !noCheckbox ) {
        var checkBox = createCheckBoxElem();
        goods.appendChild( checkBox );
    }

    var pic = createProductPhoto( product );
    goods.appendChild( pic );

    var proName = createProName( product );
    goods.appendChild( proName );

    if ( product.proText ) {
        var proText = createProText( product );
        goods.appendChild( proText );
    }
    
    if ( product.addition ) {
        var proAddition = createProAddition( product.addition );
        goods.appendChild( proAddition );
    }

    return goods;
}

function createPriceElem( product ) {
    var price = document.createElement( "td" );
    price.className = "price";
    price.innerHTML = "￥" + product.price;

    return price;
}

function createNumElem( product ) {
    var num = document.createElement( "td" );
    var div = document.createElement( "div" );
    div.className = "num";
    div.innerHTML = '<button class="numSub" type="button">-</button>' + '<input class="numValue" type="text" name="" value="' + product.count + '">' +
                    '<button class="numAdd" type="button">+</button>' + '<p>库存' +  product.inventory + '件</p>' ;
    num.appendChild( div );
    return num;
}

function createNumElemNotShopCart( product ) {
    var num = document.createElement( "td" );
    num.className = "num";
    num.innerHTML = product.count;
    return num;
}

function createSubtotalElem( product ) {
    var subtotal = document.createElement( "td" );
    subtotal.className = "subtotal";
    subtotal.innerHTML = '￥' + product.count * product.price;
    return subtotal;
}

function createOperationElem() {
    var operation = document.createElement( "td" );
    operation.className = "operation";
    operation.innerHTML = '<a class="delete" >删除</a>' + '<br>' + '<a >收藏</a>';
    return operation;
}

function createCheckBoxElem() {
    var label = document.createElement( "label" );
    label.className = "fl";

    var input = document.createElement( "input" );
    input.type = "checkbox"

    var span = document.createElement( "span" );

    label.appendChild( input );
    label.appendChild( span );

    return label;
}

function createProductPhoto( product ) {
    var a = document.createElement( "a" );
    a.href = product.href;
    a.className = "fl";
    
    var img = document.createElement( "img" );
    img.src = product.src;

    a.appendChild( img );

    return a;
}

function createProName( product ) {
    var h3 = document.createElement( "h3" );
    var a = document.createElement( "a" );
    a.className = "proName";
    a.href = product.href;
    a.innerHTML = product.name;
    h3.appendChild( a );
    return h3;
}

function createProText( product ) {
    var a = document.createElement( "a" );
    a.href = product.href;

    var h3 = document.createElement( "h3" );

    a.innerHTML = product.proText;
    h3.appendChild( a );

    return h3;
}

function createProAddition( product ) {
    var dl = document.createElement( "dl" );

    var dd = document.createElement( "dd" );
    var dd_2 = dd.cloneNode();

    dd.innerHTML = product.size;
    dd_2.innerHTML = product.color;

    dl.appendChild( dd );
    dl.appendChild( dd_2 );
    return dl;
} 