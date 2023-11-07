(function( $ ) {

	"use strict";

	var JEDVEditor = {

		getIconHtml: function() {
			return '<div class="elementor-navigator__element__jedv-icon" title="Dynamic Visibility"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="red" width="16" height="16" style="margin: 0 5px"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm9.4 130.3C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5l-41.9-33zM192 256c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5z"/></svg></div>';
		},

		init: function() {

			JEDVEditor.onNavigatorInit();

			window.elementor.on( 'document:loaded', () => {
				window.elementor.channels.editor.on( 'change', JEDVEditor.onChangeVisibility );
			} );

			$( document ).on( 'click', '.elementor-navigator__element__jedv-icon', JEDVEditor.onClickIcon );
		},

		onNavigatorInit: function() {
			const $navigator = $( '#elementor-navigator' );
			const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

			if ( MutationObserver ) {
				const mutationObserver = new MutationObserver(
					( mutationsList, observer ) => {

						if ( ! mutationsList.length ) {
							return;
						}

						if ( mutationsList[0].addedNodes.length
							&& mutationsList[0].addedNodes[0].classList.contains( 'elementor-navigator__element__jedv-icon' )
						) {
							return;
						}

						setTimeout( () => {
							JEDVEditor.addIconsToNavigator();
						} );
					}
				);

				mutationObserver.observe(
					$navigator[0],
					{
						childList: true,
						subtree: true
					}
				);
			}
		},

		addIconsToNavigator: function() {
			const $navElements = $( '.elementor-navigator__element' );

			if ( ! $navElements.length ) {
				return;
			}

			$navElements.each( function() {

				const cid = $( this ).data( 'model-cid' );

				if ( ! $( this ).hasClass( 'jedv-hidden' )
					&& window.elementorFrontend.config.elements.data[cid]
					&& window.elementorFrontend.config.elements.data[cid].attributes.jedv_enabled
				) {

					$( this )
						.find( '> .elementor-navigator__item > .elementor-navigator__element__title > .elementor-navigator__element__title__text' )
						.after( JEDVEditor.getIconHtml() );

					$( this ).addClass( 'jedv-hidden' );
				}

			} );
		},

		onClickIcon: function() {
			setTimeout( () => {
				const editor = elementor.getPanelView().currentPageView,
					  tab    = editor.getControlModel( 'jedv_section' ).get( 'tab' );

				if ( editor && tab ) {
					editor.activateSection( 'jedv_section' );
					editor.activateTab( tab );

					editor.$el.find( '.elementor-component-tab' )
						.removeClass( 'elementor-active' )
						.filter( '[data-tab="' + tab + '"]' )
						.addClass( 'elementor-active' );
				}
			} );
		},

		onChangeVisibility: function( childView, editedElement ) {

			if ( 'jedv_enabled' !== childView.model.attributes.name  ) {
				return;
			}

			const cid = editedElement.model.cid;

			if ( cid ) {
				const $element  = $( '.elementor-navigator__element[data-model-cid="' + cid + '"]' );
				const isEnabled = window.elementorFrontend.config.elements.data[cid] && window.elementorFrontend.config.elements.data[cid].attributes.jedv_enabled;

				if ( isEnabled ) {

					if ( $element.hasClass( 'jedv-hidden' ) ) {
						return;
					}

					$element
						.find( '> .elementor-navigator__item > .elementor-navigator__element__title > .elementor-navigator__element__title__text' )
						.after( JEDVEditor.getIconHtml() );

					$element.addClass( 'jedv-hidden' );

				} else {
					$element
						.find( '> .elementor-navigator__item > .elementor-navigator__element__title > .elementor-navigator__element__jedv-icon' )
						.remove();

					$element.removeClass( 'jedv-hidden' );
				}
			}
		}

	};

	$( window ).on( 'elementor:init', JEDVEditor.init );

}( jQuery ));