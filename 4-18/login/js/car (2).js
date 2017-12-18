$( window ).ready( function () {
    setBubbleNum();
} );

function setBubbleNum( num ) {
    var shopCar = $( '.header .bubble' );
    shopCar.text( num || window.shopCar.getNum() );
}

var product = {
    id: "",
    name: "",
    count: "",
    price: ""
};
(function ( w ) {

    var storage = window.localStorage;
    var key = 'shopCar';

    function addCart( data ) {
        storage.setItem( key, JSON.stringify( data ) );
    }

    function getCart() {
        return JSON.parse( storage.getItem( key ) );
    }

    function removeCart() {
        storage.removeItem( key );
    }

    function isEmpty() {
        return !getCart();
    }

    function ShopCar() {            
        
        this.s = window.storage;
        this.callback = [];
        this.key = 'shopCar';
        this.length = this.getNum();
    }

    ShopCar.prototype.addPro = function ( product ) {
        var shopInfo = null;
        product.count = parseInt( product.count );
        product.price = parseFloat( product.price );
        if ( isEmpty() ) {
            shopInfo = {
                productList: [ product ],
                productCount:  product.count,
                productAmount: ( product.count * product.price ).toFixed(2)
            };
        } else {
            shopInfo = getCart();
            var productList = shopInfo.productList;
            var found = false;
            for( var i = 0; i < productList.length; i++ ) {
                if ( product.id === productList[i].id ) {
                    productList[i].count = parseInt( productList[i].count ) + parseInt( product.count );
                    found = true;
                }
            }

            if ( !found ) {
                productList.push( product );
            }

            shopInfo.productAmount = ( parseFloat( shopInfo.productAmount ) + 
                                     parseFloat( product.count * product.price ) ).toFixed(2);
            shopInfo.productCount += parseInt( product.count );

        }
        addCart( shopInfo );

        return this;
    };

    ShopCar.prototype.updataProById = function ( id, product ) {
        if( isEmpty() ) {
            this.addPro( product );
        } else {

            var shopInfo = getCart();
            var productList = shopInfo.productList;
            productList.forEach( function ( pro, index ) {
                if ( pro.id === id ) {
                    shopInfo.productCount += ( - pro.count + parseInt( product.count ) );
                    shopInfo.productAmount = ( parseFloat( shopInfo.productAmount ) + 
                                             ( - pro.price * pro.count + product.price * product.count ) ).toFixed(2);
                    return;
                }
            } );

            addCart( shopInfo );
        }

        return this;
    };

    ShopCar.prototype.removeProById = function ( id ) {
        if ( isEmpty() ) {
            return this;
        }
        var shopInfo = getCart();
        var productList = shopInfo.productList;
        var productAmount = 0;
        var productCount = 0;
        var newList = [];
        productList.forEach( function ( product, index ) {
            if ( product.id !== id ) {
                newList.push( product );
                productCount += product.count;
                productAmount += product.count * product.price;
            }
        } );

        shopInfo = {
            productList: newList,
            productCount: productCount,
            productAmount: productAmount.toFixed(2)
        };
        addCart( shopInfo );
    };

    ShopCar.prototype.removeProByName = function ( name ) {
        if ( isEmpty() ) {
            return this;
        }
        var shopInfo = getCart();
        var productList = shopInfo.productList;
        var productAmount = 0;
        var productCount = 0;
        var newList = [];
        productList.forEach( function ( product, index ) {
            if ( product.name !== name ) {
                newList.push( product );
                productCount += product.count;
                productAmount += product.count * product.price;
            }
        } );

        shopInfo = {
            productList: newList,
            productCount: productCount,
            productAmount: productAmount.toFixed(2)
        };
        addCart( shopInfo );
    };

    ShopCar.prototype.getShopPro = function () {
        return getCart();
    };

    ShopCar.prototype.clear = function () {
        removeCart();
        return this;
    };

    ShopCar.prototype.getNum = function() {
        if ( isEmpty() ) {
            return 0;
        }
        
        var shopInfo = getCart();
        return shopInfo.productCount;
    };

    w.shopCar = new ShopCar();

} ( window ));