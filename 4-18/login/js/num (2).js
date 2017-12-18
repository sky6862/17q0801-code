// 商品数量更改
function setNumFunc( num, config ) {
    ( function ( num ) {
        var maxNum = config && config.maxNum || 99;
        var minNum = config && config.minNum || 1;
        var callbacks = config && config.callbacks || [];
        
        var numVal = num.find( ".numValue" );
        num.find( ".numSub" ).click( function () {
            if( numVal.val() <= minNum ) {
                return;
            }
            numVal.val( parseInt( numVal.val() ) - 1 );
            whenChange();
        } );
        
        num.find( ".numAdd" ).click( function () {
            if( numVal.val() >= maxNum ) {
                return;
            }
            numVal.val( parseInt( numVal.val() ) + 1 );
            whenChange();
        } );

        function whenChange() {
            callbacks.forEach( function ( func ) {
                func.call( num, numVal.val() );
            } );
        }

        ( function () {
            var num = 1;
            numVal.blur( function () {
                num = numVal.val();
            } );
            numVal.change( function () {
                if ( isNaN( numVal.val() ) || numVal.val() < minNum || numVal.val() > maxNum ) {
                    numVal.val(num);
                }
                whenChange();
            } );
        } () );
    } ( num, config ) );
    
}