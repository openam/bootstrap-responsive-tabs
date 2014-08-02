var fakewaffle = ( function ( $, fakewaffle ) {
	'use strict';

	fakewaffle.responsiveTabs = function ( collapseDisplayed ) {
		fakewaffle.currentPosition = 'tabs';

		var tabGroups = $( '.nav-tabs.responsive' );
		var hidden    = '';
		var visible   = '';

		if ( collapseDisplayed === undefined ) {
			collapseDisplayed = [ 'phone', 'tablet' ];
		}

		$.each( collapseDisplayed, function () {
			hidden  += ' hidden-' + this;
			visible += ' visible-' + this;
		} );

		$.each( tabGroups, function () {
			var $tabGroup   = $( this );
			var tabs        = $tabGroup.find( 'li a' );
			var collapseDiv = $( '<div></div>', {
				'class' : 'accordion responsive' + visible,
				'id'    : 'collapse-' + $tabGroup.attr( 'id' )
			} );

			$.each( tabs, function () {
				var $this          = $( this );
				var active         = '';
				var oldLinkClass   = $this.attr( 'class' ) === undefined ? '' : $this.attr( 'class' );
				var newLinkClass   = 'accordion-toggle';
				var oldParentClass = $this.parent().attr( 'class' ) === undefined ? '' : $this.parent().attr( 'class' );
				var newParentClass = 'accordion-group';

				if ( oldLinkClass.length > 0 ) {
					newLinkClass += ' ' + oldLinkClass;
				}

				if ( oldParentClass.length > 0 ) {
					oldParentClass = oldParentClass.replace( /\bactive\b/g, '' );
					newParentClass += ' ' + oldParentClass;
					newParentClass = newParentClass.replace( /\s{2,}/g, ' ' );
					newParentClass = newParentClass.replace( /^\s+|\s+$/g, '' );
				}

				if ( $this.parent().hasClass( 'active' ) ) {
					active = ' in';
				}

				collapseDiv.append(
					$( '<div>' ).attr( 'class', newParentClass ).html(
						$( '<div>' ).attr( 'class', 'accordion-heading' ).html(
							$( '<a>', {
								'class'       : newLinkClass,
								'data-toggle' : 'collapse',
								'data-parent' : '#collapse-' + $tabGroup.attr( 'id' ),
								'href'        : '#collapse-' + $this.attr( 'href' ).replace( /#/g, '' ),
								'html'        : $this.html()
							} )
						)
					).append(
						$( '<div>', {
							'id'    : 'collapse-' + $this.attr( 'href' ).replace( /#/g, '' ),
							'class' : 'accordion-body collapse' + active
						} ).html(
							$( '<div>' ).attr( 'class', 'accordion-inner' ).html( '' )
						)
					)
				);
			} );

			$tabGroup.next().after( collapseDiv );
			$tabGroup.addClass( hidden );
			$( '.tab-content.responsive' ).addClass( hidden );
		} );

		fakewaffle.checkResize();
		fakewaffle.bindTabToCollapse();
	};

	fakewaffle.checkResize = function () {
		if ( $( '.accordion.responsive' ).is( ':visible' ) === true && fakewaffle.currentPosition === 'tabs' ) {
			fakewaffle.toggleResponsiveTabContent();
			fakewaffle.currentPosition = 'panel';
		} else if ( $( '.accordion.responsive' ).is( ':visible' ) === false && fakewaffle.currentPosition === 'panel' ) {
			fakewaffle.toggleResponsiveTabContent();
			fakewaffle.currentPosition = 'tabs';
		}

	};

	fakewaffle.toggleResponsiveTabContent = function () {
		var tabGroups = $( '.nav-tabs.responsive' );

		$.each( tabGroups, function () {
			var tabs = $( this ).find( 'li a' );

			$.each( tabs, function () {
				var href         = $( this ).attr( 'href' ).replace( /#/g, '' );
				var tabId        = '#' + href;
				var panelId      = '#collapse-' + href;
				var tabContent   = $( tabId ).html();
				var panelContent = $( panelId + ' div:first-child' ).html();

				$( tabId ).html( panelContent );
				$( panelId + ' div:first-child' ).html( tabContent );
			} );

		} );
	};

	fakewaffle.bindTabToCollapse = function () {
		var tabs     = $( '.nav-tabs.responsive' ).find( 'li a' );
		var collapse = $( '.accordion.responsive' ).find( '.accordion-body' );

		tabs.on( 'shown', function ( e ) {
			var $current  = $( $( e.target )[ 0 ].hash.replace( /#/, '#collapse-' ) );

			if ( !$current.hasClass( 'in' ) ) {
				$current.addClass( 'in' ).height( 'auto' );
			}

			if ( e.relatedTarget ) {
				var $previous = $( $( e.relatedTarget )[ 0 ].hash.replace( /#/, '#collapse-' ) );
				$previous.removeClass( 'in' ).height( '0px' );
			}
		} );

		collapse.on( 'shown', function ( e ) {
			var current = $( e.target ).context.id.replace( /collapse-/g, '#' );

			$( 'a[href="' + current + '"]' ).tab( 'show' );
		} );
	};

	$( window ).resize( function () {
		fakewaffle.checkResize();
	} );

	return fakewaffle;
}( window.jQuery, fakewaffle || { } ) );
