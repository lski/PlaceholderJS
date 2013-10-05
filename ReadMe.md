Placeholder Shim
================

This is a jquery plugin to simulate placeholders in browsers that dont support them, it uses feature detection, not browser detection. Unlike a lot of shim out there it has the ability to manually disable it and re-enable it to enable it to work with form validation. This means that the blanking of fields prior to submission is not forced to be handled on form.submit, but can be disabled prior to validation.

If a browser supports placeholders, then only minimal code is run, one feature test on load and then nothing when enabling and disabling calls are made to improve efficiency.

Usage:
------

```
/// To enable and re-enable:
$.placeholder();

/// To disable:
$.placeholder( 'disable', true );

/// To re-enable:
$.placeholder( 'disable', false );
```

As well as enabling the placeholder for the entire page you can enable/disable it for individual inputs.

```
/// To enable and re-enable:
$('input, textarea').placeholder();

/// To disable:
$('input').placeholder('disable', true );

/// To re-enable:
$('input').placeholder('disable', false );
```

To Do:
------
- Update instructions to show how to use the form handler with jquery.validate and jquery.validate.unobtrusive without them effecting the 