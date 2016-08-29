/**
 * easyvali.Form validation.Relying on the JQuery
 *
 * on 1/8/2016
 */


/**-------------------------------------------------
 *
 * Example:
 * HTML:<input type="text" class='js-input'>
 *   JS: $('.js-input').easyVali('string',{maxLen:16,minLen:6});
 *
 * ---------------------------------------------------
 */


;(function($){

    $.fn.easyVali=function(type,options){
        var settings= $.extend({
            maxLen:10,
            minLen:1
        }, options||{});

        var thisVal=$(this).val();
        var validation={
            required : function(){
                return $.trim(thisVal).length > 0;
            },
            maxLen : function(maxVal){
                return $.trim(thisVal).length < maxVal;
            },
            minLen : function(minVal){
                return $.trim(thisVal).length > minVal;
            },
            length : function(length){
                return $.trim(thisVal).length == length;
            },
            string:function(maxLen,minLen){
                return (thisVal.length<minLen || thisVal.length>maxLen)?0:1;
            },
            number: function () {
                return thisVal.match(/^[0-9|\.]+$/);
            },
            mobiTel:function(){
                return thisVal.match(/^((\+)?[1-9]{1,2})?([-\s\.])?((\(\d{1,4}\))|\d{1,4})(([-\s\.])?[0-9]{1,12}){1,2}$/);
            },
            zoneCode:function(){
                return thisVal.match(/^0(\d{2}|\d{3})$/);
            },
            telephone:function(){
                return thisVal.match(/^[2-9](\d{6}|\d{7})$/);
            },
            email:function(){
                return thisVal.match(/^\w+([\-\+.]\w+)*\@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
            },
            confirm:function(confirmClass){
                var $element = $('.'+confirmClass);
                if($element.length){
                    return $.trim(thisVal) == $.trim($element.val());
                }
                return true;
            }
        };

        switch(type){
            case 'required':
                return !!validation.required();
                break;
            case 'maxLen':
                return !!validation.maxLen(settings[0]);
                break;
            case 'minLen':
                return !!validation.minLen(settings[0]);
                break;
            case 'length':
                return !!validation.length(settings[0]);
            case 'string':
                return !!validation.string(settings.maxLen,settings.minLen);
                break;
            case 'number':
                return !!validation.number();
                break;
            case 'mobiTel':
                return !!validation.mobiTel();
                break;
            case 'zoneCode':
                return !!validation.zoneCode();
                break;
            case 'telephone':
                return !!validation.telephone();
                break;
            case 'email':
                return !!validation.email();
                break;
            case 'confirm':
                return !!validation.confirm(settings[0]);
                break;
            default:
                break;
        }
    };

    function getAutoCheckFormModule(opts){
        var checkKey = function(key){
            var keyArr = ['required', 'maxLen', 'minLen', 'length', 'number', 'mobiTel', 'zoneCode', 'telephone', 'email','confirm'];
            return keyArr.indexOf(key) > -1;
        };

        var parseCheckRules = function(rules){
            var splitRules = rules.split('|');
            var parseRules = {};
            $.each(splitRules, function(index, rule){
                var splitRule = rule.split(':');
                if(checkKey(splitRule[0])){
                    parseRules[splitRule[0]] = splitRule[1] ? splitRule[1].split(',') : '';
                }
            });
            return parseRules;
        };

        var errorMessageParse = function(errorMessage, key, setting){
            if(key == 'max'){
                errorMessage = errorMessage.replace(':max', setting[0]);
            }else if(key == 'min'){
                errorMessage = errorMessage.replace(':min', setting[0]);
            }else if(key == 'confirm'){
                errorMessage = errorMessage.replace(':confirm', setting[0]);
            }else if(key == 'maxLen'){
                errorMessage = errorMessage.replace(':maxLen', setting[0]);
            }else if(key == 'minLen'){
                errorMessage = errorMessage.replace(':minLen', setting[0]);
            }else if(key == 'length'){
                errorMessage = errorMessage.replace(':length', setting[0]);
            }
            return errorMessage;
        };

        var errorInput = function($element, key, setting){
            var name = $element.attr('name');
            var $errorSpan = $('.'+opts.setting.errorPrefix+name);
            if(opts.setting.inputErrorClass){
                $element.addClass(opts.setting.inputErrorClass);
            }
            if($errorSpan.length){
                var message = opts.message;
                if(key in message){
                    var errorMessage = message[key];
                    var field = name.replace(/_/g, ' ');
                    errorMessage = errorMessage.replace(':field', field);
                    errorMessage = errorMessageParse(errorMessage, key, setting);
                    $errorSpan.html(errorMessage);
                    $errorSpan.css('display', 'inline-block');
                }
            }
        };

        var rightInput = function($element){
            var name = $element.attr('name');
            var $errorSpan = $('.'+opts.setting.errorPrefix+name);
            if($errorSpan.length){
                $errorSpan.html('');
                $errorSpan.css('display', 'none');
            }
        };

        return {
            parseCheckRules : parseCheckRules,
            errorInput : errorInput,
            rightInput : rightInput
        };
    };

    var opts = {
        message : {
            required : 'The :field is required.',
            maxLen : 'This maximum length of :field is required :maxLen',
            minLen : 'This minimum length of :field is required :minLen',
            length : 'This  length of :field is required :length',
            number : 'The :field is required to be digital.',
            mobiTel : 'The :field is required to be mobile.',
            zoneCode : 'The :field is required to be post code.',
            telephone : 'The :field is required to be telephone.',
            email : 'The :field is required to be email.',
            confirm : 'The :field is required to be matched with :confirm'
        },
        setting : {
            errorPrefix : 'sp_',
            inputErrorClass : null,
            fullyVerified : true
        }
    };

    $.fn.autoCheckForm = function(checkRules){
        var message = arguments[1] ? arguments[1] : null;
        var setting = arguments[2] ? arguments[2] : null;
        opts.message = $.extend({}, opts.message, message);
        opts.setting = $.extend({}, opts.setting, setting);

        var module = getAutoCheckFormModule(opts);

        var $checkForm = $(this);
        var checkInfo = [];

        for (key in checkRules){
            var $element = $checkForm.find('[name="'+key+'"]');
            if($element.length){
                checkInfo.push({
                    element : $element,
                    checkRules : module.parseCheckRules(checkRules[key])
                });
            }
        }

        var check = function(){
            var valid = true;
            if(checkInfo.length){
                $.each(checkInfo, function(index, elementCheckInfo){
                    var $element = elementCheckInfo.element;
                    var checkRules = elementCheckInfo.checkRules;
                    for (key in checkRules){
                        if($element.easyVali(key, checkRules[key])){
                            module.rightInput($element);
                        }else{
                            valid = false;
                            module.errorInput($element, key, checkRules[key]);
                            if(!opts.setting.fullyVerified){
                                return valid;
                            }
                        }
                    }
                });
            }
            return valid;
        };

        return {
            check : check
        };
    };
})(jQuery);
