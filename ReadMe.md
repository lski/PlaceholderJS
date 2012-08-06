Placeholder Shim
================

This is a jquery plugin to simulate placeholders in browsers that dont support them using feature detection to idenitify browsers. Code is not run if the browser already supports them. Unlike a lot of the placeholder shims it has the ability to disable and enable the placeholders. This means that the blanking of fields prior to submission is not forced to be handled on form.submit, but can be disabled prior to validation.

Usage:
------
$('form').placeholder();
$('div').placeholder();
$('input, textarea').placeholder();
$.placeholder(); // Does all valid inputs with a placeholder

To Disable:
-----------
$('input').placeholder( 'disable' );
$('input').placeholder('disable', true );

To Renable:
-----------
$('input, textarea').placeholder();
$('input, textarea').placeholder( 'disable', false );

NOTE: The placeholders are only applied the elements selected, to select all on a page use $.placeholder();

To Do:
------
- Add handler for surrounding forms, to auto-matically handle disabling the values on submit with the option to not implement that
- Update instructions to show how to use the form handler with jquery.validate and jquery.validate.unobtrusive without them effecting the 