( function ( w ) {

    function Storage( w ) {
        this.storage = w.localStorage;
    }

    Storage.prototype.addItem = function ( key, object ) {
        var str = '';
        if ( Array.isArray( object ) ) {
            str = Storage.arr2Str( object );
        } else {
            str = JSON.stringify( object );
        }
        if ( this.hasItem( key ) ) {
            var item = Storage.arr2Str( this.getItem( key ) );
            str += ( item === "" ? "" : ';' ) + item;
        }
        this.storage.setItem( key, str );
    };

    Storage.arr2Str = function ( arr ) {
        return arr.reduce( function ( result, item ) {
            return result += ( ( result === "" ? "" : ";" ) + JSON.stringify( item ) );
        }, '' );
    };

    Storage.prototype.hasItem = function ( key ) {
        var arr = this.getItem( key );
        return arr.length !== 0;
    };

    Storage.prototype.setItem = function ( key, object ) {
        var str = '';
        if ( Array.isArray( object ) ) {
            str = Storage.arr2Str( object );
        } else {
            str = JSON.stringify( object );
        }
        this.storage.setItem( key, str );
    };

    Storage.prototype.getItem = function ( key ) {
        var str = this.storage.getItem( key );
        if ( !str ) {
            return [];
        }
        var strArr = str.split( ';' );
        return strArr.map( function ( item ) {
            return JSON.parse( item );
        } );
    };

    Storage.prototype.removeItemByKey = function ( key ) {
        if ( this.hasItem( key ) ) {
            this.storage.removeItem( key );
        }
    };

    Storage.prototype.removeItemByValue = function ( object ) {
        var str = '';
        if ( Array.isArray( object ) ) {
            str = Storage.arr2Str( object );
        } else {
            str = JSON.stringify( object );
        }
        
        for ( var i = 0; i < this.storage.length; i++ ) {
            var key = this.storage.key( i );
            if ( this.storage.getItem( key ) === str ) {
                this.removeItemByKey( key );
            }
        }
    };

    Storage.prototype.removeValueInItem = function ( key, object ) {
        var self = this;
        var arr = this.getItem( key );
        for( var index = 0; index < arr.length; index++ ) {
            var toDelete = true;
            var item = arr[index];
            for ( var name in object ) {
                if ( !( item[name] && item[name] == object[name] ) ) {
                    toDelete = false;
                }
            }
            if ( toDelete ) {
                arr.splice( index, 1 );
                self.setItem( key, arr );
                return;
            }
        }
    };

    Storage.prototype.removeValueInItemAll = function ( key, object ) {
        var self = this;
        var arr = this.getItem( key );
        var deleteArr = [];
        arr.forEach( function ( item, index ) {
            var toDelete = true;
            for ( var name in object ) {
                if ( !( item[name] && item[name] == object[name] ) ) {
                    toDelete = false;
                } 
            }
            if ( toDelete ) {
                deleteArr.push( index );
            }
        } );
        deleteArr.forEach( function ( index ) {
            delete arr[ index ];
        } );
        arr = arr.slice( 0 );
        this.setItem( key, arr );
    };

    Storage.prototype.clear = function ( key ) {
        this.storage.setItem( key, '' );
    };

    Storage.prototype.clearAll = function () {
        this.storage.clear();  
    };

} ( window ));