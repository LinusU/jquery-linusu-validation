/*
 * jQuery Validation Plugin
 *
 * Copyright (c) 2011 Linus Unnebäck
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Depends:
 *  jquery.js
 *  jquery.ui.position.js
 *
 */

(function ($, undefined) {
    
    $.fn.setCustomValidity = function (message) {
        return this.each(function () {
            
            var invalid = ($(this).data('valid') === false);
            
            if(message == "") {
                if(invalid) { $(this).data('linusu-validate').remove(); }
            } else {
                if(invalid) {
                    $(this).data('linusu-validate').text(message);
                } else {
                    $(this).data('linusu-validate',
                        $('<div class="linusu-validate-error" />')
                            .appendTo('body')
                            .text(message)
                            .position({
                                of: $(this),
                                my: "left top",
                                at: "right top"
                            })
                    );
                }
            }
            
            $(this).data('valid', (message == ""));
            
        });
    }
    
})(jQuery);

(function ($, undefined) {
    
    var messages = {
        'select-required': "Du måste välja ett värde",
        'textarea-required': "Du måste skriva något",
        'text-required': "Du måste fylla i detta fält",
        'password-required': "Du måste fylla i ett lösenord",
        'number-required': "Ange ett nummer",
        'number-invalid': "Endast nummer",
        'number-too-small': "Ange ett större värde",
        'number-too-large': "Ange ett mindre värde",
        'date-required': "Ange ett datum",
        'date-invalid': "Endast datum",
        'date-too-early': "Ange ett senare datum",
        'date-too-late': "Ange ett tidigare datum",
        'email-invalid': "Fyll i en giltig emailadress",
        'url-invalid': "Fyll i en giltig webadress",
        'invalid': "Detta fält är ej korrekt ifyllt"
    };
    
    var parseDate = function (date) {
        if(!date) { return NaN; }
        var parts = date.split("-");
        if(parts.length != 3) { return NaN; }
        return new Date(
            parseInt(parts[0], 10),
            parseInt(parts[1], 10) - 1,
            parseInt(parts[2], 10)
        );
    };
    
    var is_valid = function ($e) {
        
        var required = ($e.attr('required') == 'required'),
            val = $e.val();
        
        if($e.is('select')) {
            if(required && !val) {
                return messages['select-required'];
            }
        }
        
        if($e.is('textarea')) {
            if(required && !val) {
                return messages['textarea-required'];
            }
        }
        
        if(!required && val == '') {
            return "";
        }
        
        if($e.attr('type') == 'text') {
            if(required && val == '') {
                return messages['text-required'];
            }
        }
        
        if($e.attr('type') == 'password') {
            if(required && val == '') {
                return messages['password-required'];
            }
        }
        
        if($e.attr('type') == 'number') {
            
            if(required && val == '') {
                return messages['number-required'];
            }
            
            var n = parseFloat(val),
                max = parseFloat($e.attr('max')),
                min = parseFloat($e.attr('min'));
            
            if(required && isNaN(n)) {
                return messages['number-invalid'];
            }
            
            if(!isNaN(min) && n < min) {
                return messages['number-too-small'];
            }
            
            if(!isNaN(max) && n > max) {
                return messages['number-too-large'];
            }
            
        }
        
        if($e.attr('type') == 'date') {
            
            if(required && val == '') {
                return messages['date-required'];
            }
            
            var n = parseDate(val),
                max = parseDate($e.attr('max')),
                min = parseDate($e.attr('min'));
            
            if(required && isNaN(n)) {
                return messages['date-invalid'];
            }
            
            if(!isNaN(min) && n < min) {
                return messages['date-too-early'];
            }
            
            if(!isNaN(max) && n > max) {
                return messages['date-too-late'];
            }
            
        }
        
        if($e.attr('type') == 'email') {
            // Shamelessly lifted from Scott Gonzalez via the Bassistance Validation plugin http://projects.scottsplayground.com/email_address_validation/
            if(!val.match(/((([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?/)) {
                return messages['email-invalid'];
            }
        }
        
        if($e.attr('type') == 'url') {
            // Shamelessly lifted from Scott Gonzalez via the Bassistance Validation plugin http://projects.scottsplayground.com/iri/
            if(!val.match(/(https?|ftp):\/\/(((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?/)) {
                return messages['url-invalid'];
            }
        }
        
        var pattern = $e.attr('pattern');
        
        if(pattern) {
            pattern = new RegExp('^' + pattern + '$');
            if(!pattern.test(val)) {
                return messages['invalid'];
            }
        }
        
        return "";
    }
    
    var validate_element = function ($e) {
        
        var valid = is_valid($e);
        
        $e.setCustomValidity(valid);
        
        return (valid == "");
    };
    
    var methods = {
        'init': function () {
            
            this.find('input, select, textarea').bind('keyup', function () {
                if(!$(this).data('valid')) { validate_element($(this)); }
            }).bind('change blur', function () {
                validate_element($(this));
            }).data('valid', true);
            
            this.filter('form').attr('novalidate', 'novalidate');
            
            return this;
        },
        'valid': function () {
            
            var result = true;
            
            this.each(function () {
                if($(this).is('input, select, textarea')) {
                    if(!validate_element($(this))) { result = false; }
                } else {
                    $(this).find('input, select, textarea').each(function () {
                        if(!validate_element($(this))) { result = false; }
                    });
                }
            });
            
            return result;
        }
    };
    
    $.fn.validation = function (method) {
        
        if(methods[method]) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.validation' );
            return false;
        }
        
    };

})(jQuery);
