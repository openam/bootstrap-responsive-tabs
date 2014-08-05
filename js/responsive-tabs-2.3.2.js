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
				var newHash        = $this.get( 0 ).hash.replace( '#', 'collapse-' );

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
								'href'        : '#' + newHash,
								'html'        : $this.html()
							} )
						)
					).append(
						$( '<div>', {
							'id'    : newHash,
							'class' : 'accordion-body collapse' + active
						} )
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
			fakewaffle.tabToPanel();
			fakewaffle.currentPosition = 'panel';
		} else if ( $( '.accordion.responsive' ).is( ':visible' ) === false && fakewaffle.currentPosition === 'panel' ) {
			fakewaffle.panelToTab();
			fakewaffle.currentPosition = 'tabs';
		}

	};

	fakewaffle.tabToPanel = function () {

		var tabGroups = $( '.nav-tabs.responsive' );

		$.each( tabGroups, function ( index, tabGroup ) {

			// Find the tab
			var tabContents = $( tabGroup ).next( '.tab-content' ).find( '.tab-pane' );

			$.each( tabContents, function ( index, tabContent ) {
				// Find the id to move the element to
				var destinationId = $( tabContent ).attr( 'id' ).replace ( /^/, '#collapse-' );

				// Convert tab to panel and move to destination
				$( tabContent )
					.removeClass( 'tab-pane' )
					.addClass( 'accordion-inner' )
					.appendTo( $( destinationId ) );

			} );

		} );

	};

	fakewaffle.panelToTab = function () {

		var panelGroups = $( '.accordion.responsive' );

		$.each( panelGroups, function ( index, panelGroup ) {

			var destinationId = $( panelGroup ).attr( 'id' ).replace( 'collapse-', '#' );
			var destination   = $( destinationId ).next( '.tab-content' )[ 0 ];

			// Find the panel contents
			var panelContents = $( panelGroup ).find( '.accordion-inner' );

			// Convert to tab and move to destination
			panelContents
				.removeClass( 'accordion-inner' )
				.addClass( 'tab-pane' )
				.appendTo( $( destination ) );

		} );

	};

	fakewaffle.bindTabToCollapse = function () {

		var tabs     = $( '.nav-tabs.responsive' ).find( 'li a' );
		var collapse = $( '.accordion.responsive' ).find( '.accordion-body' );

		tabs.on( 'shown', function ( e ) {
			var $current  = $( e.currentTarget.hash.replace( /#/, '#collapse-' ) );

			// manually open
			if ( !$current.hasClass( 'in' ) ) {
				$current.addClass( 'in' ).height( 'auto' );
			}

			// manually collapse
			if ( e.relatedTarget ) {
				var $previous = $( e.relatedTarget.hash.replace( /#/, '#collapse-' ) );
				$previous.removeClass( 'in' ).height( '0px' );
			}
		} );

		collapse.on( 'shown', function ( e ) {

			// Activate current tabs
			var current = e.target.id.replace( /collapse-/g, '#' );
			$( 'a[href="' + current + '"]' ).tab( 'show' );

			// Update the content with active
			var panelGroup = $( e.currentTarget ).closest( '.accordion.responsive' );
			$( panelGroup ).find( '.accordion-inner' ).removeClass( 'active' );
			$( e.currentTarget ).find( '.accordion-inner' ).addClass( 'active' );

		} );
	};

	$( window ).resize( function () {
		fakewaffle.checkResize();
	} );

	return fakewaffle;
}( window.jQuery, fakewaffle || { } ) );
