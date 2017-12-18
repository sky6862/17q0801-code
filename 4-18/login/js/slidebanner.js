var slidebanner = null;

(function ( $, w ) {

    slidebanner = ( function () {

        var config = {
            picList : 'ul',
            iconList : 'dl' ,
            next : '.next',
            prev : '.prev',
            index: 0,
            haveIcon: false,
            haveButton: false,
            autoSlide: true,
            autoDirection: 'next',
            interval: 3000,
            picItem: 'li',
            iconItem: 'dd',
            timeToStart: 0,
            // picItemActive: '',  // you can use 'on'
            iconItemActive: ''  // you can use 'on'
        };

        function Slide( target, newConfig ) {
            this.init( target, newConfig );
            this.setView();
            this.setConfig();
            this.start();
        }


        Slide.prototype.init = function ( target, newConfig ) {
            this.target = $( target );

            this.picList = this.target.find( newConfig.picList || config.picList );

            this.haveIcon = newConfig.haveIcon || config.haveIcon;
            this.haveButton = newConfig.haveButton || config.haveButton;
            

            if ( this.haveIcon ) {
                this.iconList = this.target.find( newConfig.iconList || config.iconList );
            }

            if ( this.haveButton ) {
                this.next = this.target.find( newConfig.next || config.next );
                this.prev = this.target.find( newConfig.prev || config.prev );
            }

            this.interval = newConfig.interval || config.interval;

            this.timer = null; 

            this.picItem = this.picList.find( newConfig.picItem || config.picItem );

            if ( this.haveIcon ) {
                this.iconItem = this.iconList.find( newConfig.iconItem || config.iconItem );
            }

            this.autoDirection = newConfig.autoDirection || config.autoDirection;

            this.duringSlide = false;

            this.callback = {};

            this.index = newConfig.index || config.index;

            this.autoSlide = newConfig.autoSlide || config.autoSlide;

            this.picItemCount = this.picItem.length;

            this.move = this.picItem.eq(0).width();

            this.timeToStart = newConfig.timeToStart || config.timeToStart;

            // this.picItemActive = newConfig.picItemActive || config.picItemActive;

            this.iconItemActive = newConfig.iconItemActive || config.iconItemActive;
        };

        Slide.prototype.setView = function () {
        	// TODO
        };

        Slide.prototype.setConfig = function () {
            var self = this;
            if( this.haveButton ) {
                // TODO 
            }

            if ( this.haveIcon ) {
                this.iconList.click( function () {
                    self.index = $( this ).index();
                    self.toSlide( self.index );
                } );
            }

            this.picList.hover( function () {
                self.stop();
            }, function () {
                self.auto();
            } );

        };

        Slide.prototype.toSlide = function ( index ) {
            if ( this.duringSlide ) {
                    return ;
            }

            if ( this.autoSlide ) {
                this.stop();
            }

            if ( this.haveIcon ) {
                this.changeIcon( this.index );
            }
            this.slideTo( this.index );

            if ( this.autoSlide ) {
                this.auto();
            }
        };

        Slide.prototype.start = function () {
            var self = this;
            if ( this.auto ) {
                w.setTimeout( function() {
                    self.auto();
                } , this.timeToStart );
            }
        };

        Slide.prototype.auto = function () {
        	var self = this;
            this.timer = w.setInterval( function () {
            	self.slide( self.autoDirection );
            }, this.interval );
        };

        Slide.prototype.slide = function ( direction ) {
            if ( this.duringSlide ) {
                    return ;
            }

            if ( this.autoSlide ) {
                this.stop();
            }

            if ( direction === "next" ) {
                this.index = (++this.index + this.picItemCount) % this.picItemCount;
            } else {
                this.index = (--this.index + this.picItemCount) % this.picItemCount;
            }	

            if ( this.haveIcon ) {
                this.changeIcon( this.index );
            }
            this.slideTo( this.index );

            if ( this.autoSlide ) {
                this.auto();
            }
        };

        Slide.prototype.stop = function () {
            w.clearInterval( this.timer );
        };

        Slide.prototype.changeIcon = function ( index ) {
            this.iconList.removeClass( this.iconItemActive );
            this.iconList.eq( index ).addClass( this.iconItemActive );
        };

        Slide.prototype.slideTo = function ( index ) {
        	var self = this;
            this.duringSlide = true;
            this.picList.animate({left :- this.index * this.move + "px"},"slow",function(){self.duringSlide = false;});
        };

        Slide.prototype.next = function () {
            this.slide( 'next' ); 
        };

        Slide.prototype.prev = function () {
            this.slide( 'prev' );
        };

        Slide.prototype.beforeSlide = function ( callback ) {
            if ( !this.callback[ 'before' ] ) {
                this.callback[ 'before' ] = [];
            }

            this.callback[ 'before' ].push( callback );
        };

        Slide.prototype.beforeAfter = function ( callback ) {
            if ( !this.callback[ 'after' ] ) {
                this.callback[ 'after' ] = [];
            }

            this.callback[ 'after' ].push( callback );
        };

        Slide.prototype.emitBefore = function () {
            this.emit( 'before' );
        };

        Slide.prototype.emitAfter = function () {
            this.emit( 'after' );
        };

        Slide.prototype.emit = function ( event ) {
            var args = [].slice.apply(arguments,1);
            if ( this.callback[ event ] ) {
                this.callback[ event ].forEach( function ( func ) {
                    func.apply( this, [ args ] );
                } );
            }
        };

        return function ( target, newConfig ) {
            return new Slide( target, newConfig );
        };

    })();
}( jQuery, window ));
