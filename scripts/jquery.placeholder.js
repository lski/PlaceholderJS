/*!
* jQuery.placeholder plugin
* Lee Cooper
* v1.0
*/
;(function($, window, document, undefined) {

	/**
	* If auto load is desired then un-comment the following block 
	*/
	/*
	$(function() {
		$.placeholder();
	});
	*/
	
    var _placeholderSupported = ('placeholder' in document.createElement('input')),
        _methods = {
			/** 
			* The disable method either disables, or if
			* @param - bool - where or not the plugin should be disabled
			*/
            disable: function(toDisable) {
				
                if(toDisable === false) {
                    _add(this);
                }
                else {
                    _remove(this);
                }
            }
        },
        _consts = {
            selectors: {
                inputs: 'input[placeholder], textarea[placeholder]'
            }
        };

	/**
	* The selector version of the placeholder plugin. Performs the same as the static version, however cleans up the collection originally selected.
	* Only runs if placeholders are not natively supported
	* @param - string - optional - Name of the method to run in initBase
	*/
    var _initSelected = function(method) {

        // Only run if placeholders are not supported
        if(!_placeholderSupported) {
            _initBase(_cleanElements(this), arguments);
        }

        return this;
    }

	/**
	* The static placeholder call, optional accepts the method name plus additional parameters, selects all inputs and textareas with placeholders and passed them on
	* to initBase. Only runs if placeholders are not natively supported
	* @param - string - optional - Name of the method to run in initBase
	*/
    var _initAll = function(method) {

        // Only run if placeholders are not supported
        if(!_placeholderSupported) {
            _initBase($(_consts.selectors.inputs), method, arguments);
        }
    }

	/**
	* The generic init method used to handle the method called and the args passed in. If a method is not set it will simply run the method to add the handler to the selected handlers
	* @param - jQuery - a collection of inputs and textareas to apply the shim too
	* @param - string - optional - the public method to run against the collection passed in
	* @param - param array - optional - an optional list of additional arguments for the method selected
	*/
    var _initBase = function($set, method, args) {

        if(_methods[method] !== undefined) {
            // Use the Array.prototype.slice.call because arguments as not an array
            _methods[method].apply($set, Array.prototype.slice.call(args, 1));
        } else {
            _add($set);
        }
    }

    /**
    * Returns a filtered set of input elements, first getting all the input/textareas from the in the original query, 
	* plus any sub elements for any container elements, that contain the placeholder attribute
	* @param - jQuery - A selection of elements in a jquery object
	* @return - jQuery - Containing only input elements in a jquery object
    */
    function _cleanElements($set) {

        // If the selector contains divs and forms then get a selection of inputs with placeholders
        return $set.not(_consts.selectors.inputs).find(_consts.selectors.inputs)
        // add the selector inputs
            .add($set.filter(_consts.selectors.inputs))
    }

	/**
	* Adds the behaviour to the passed in elements. The elements have handlers placed onto focus and blur to show and hide 
	* placeholder text when applicable. Also runs the blur handler (without firing blur) to ensure the placeholders are placed into the elements.
	* @param - jQuery - a collection of inputs with placeholder attributes
	*/
    function _add($set) {

        // bind the blur and focus events to simulate the show and hide of placeholders
        $set.bind('focus.placeholder', _elementFocus)
            .bind('blur.placeholder', _elementBlur)
            // Place a marker so that we can filter out the inputs that are already bound using selectors
            .attr('data-placeholder', '')
            // Simply forces the elements to display the placeholders, DONT just trigger blur as it will fire validation
            .each(_elementBlur);
    }

	/**
	* Removes the simulated behaviour from the passed in elements in a jquery object. Only attempts to remove the handlers if marked as having them attached.
	* @param - jQuery - a collection of inputs with placeholder attributes
	*/
    function _remove($set) {

        $set.unbind('focus.placeholder', _elementFocus)
            .unbind('blur.placeholder', _elementBlur)
			// Remove a marker so that we can filter out the inputs that are already bound using selectors
            .removeAttr('data-placeholder')
            .each(function(i, item) {

                var $this = $(item);
                if($this.val() === $this.attr('placeholder')) {
                    $this.val('');
                }
            });
    }

    /**
    * Handles when the user enters the input, if the text is the same as the placeholder text then it removes it and removes the 'placeholder' class
    */
    function _elementFocus() {

        //console.log(j++);

        var i = $(this);
        if(i.val() === i.attr('placeholder')) {

            i.val('').removeClass('placeholder');

            if(i.hasClass('password')) {
                i.removeClass('password');
                this.type = 'password';
            }
        }
    }

    /**
    * Handles when a user leaves a box and if the box is empty and if it is places the placeholder text in the box and adds the 'placeholder' class
    */
    function _elementBlur() {

        var i = $(this);
        if(i.val() === '' || i.val() === i.attr('placeholder')) {

            if(this.type == 'password') {

                i.addClass('password');
                this.type = 'text';
            }
            i.addClass('placeholder').val(i.attr('placeholder'));
        }

    }

	// Attach the plugins to the selected namespace
    $.placeholder = _initAll;
    $.fn.placeholder = _initSelected;

})(jQuery, window, document);