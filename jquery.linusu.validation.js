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
 *  jquery.ui.widget.js
 *  jquery.ui.position.js
 *
 */
 
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
            return true;
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
            
            var n = Date.parse(val),
                max = Date.parse($e.attr('max')),
                min = Date.parse($e.attr('min'));
            
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
        
        return true;
    }
    
    var validate_element = function ($e) {
        
        var last = ($e.data('valid') !== false);
        var valid = is_valid($e);
        
        if(valid === true && !last) {
            $e.data('linusu-validate').remove();
        }
        
        if(valid !== true && last) {
            
            var err = $('<div class="linusu-validate-error" />');
            
            err.text(valid).position({
                of: $e,
                my: "left top",
                at: "right top"
            }).appendTo('body');
            
            $e.data('linusu-validate', err);
        }
        
        $e.data('valid', (valid === true));
        
        return (valid === true);
    };
    
    $.widget( "linusu.validation", {
        version: "beta",
        _create: function () {
            
            this.element.find('input, select, textarea').bind('keyup', function () {
                if(!$(this).data('valid')) { validate_element($(this)); }
            }).bind('change blur', function () {
                validate_element($(this));
            }).data('valid', true);
            
            this.element.attr('novalidate', 'novalidate');
            
        },
        'valid': function () {
            
            var result = true;
            
            this.element.find('input, select, textarea').each(function () {
                if(!validate_element($(this))) { result = false; }
            });
            
            return result;
        }
    });
    
})(jQuery);
