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

;var adminJs = window.adminJs || {};

adminJs.activity = {
    init : function(){
        adminJs.activity.front();
    },

    activityAddFormCheck : function(){
        var $activityAddWrap = $('.js-activity-add');
        if($activityAddWrap.length){
            $activityAddWrap.on('submit', '.js-activity-add-form', function(e){
                var activityCheck = $(this).autoCheckForm({
                    name : 'required',
                    path_alias : 'required',
                    description : 'required',
                    start_time : 'required',
                    end_time : 'required'
                }, {}, {errorPrefix:'sm_'});

                var valid = activityCheck.check();
                if(adminJs.pageVariables.check){
                    valid = adminJs.pageVariables.check() && valid;
                }
                return valid;
            });
        }
    },

    activityEditFormCheck : function(){
        var $activityAddWrap = $('.js-activity-edit');
        if($activityAddWrap.length){
            $activityAddWrap.on('submit', '.js-activity-edit-form', function(e){
                var $this = $(this);
                var activityCheck = $this.autoCheckForm({
                    name : 'required',
                    path_alias : 'required',
                    description : 'required',
                    start_time : 'required',
                    end_time : 'required'
                }, {}, {errorPrefix:'sm_'});

                var valid = activityCheck.check();
                if(adminJs.pageVariables.check){
                    valid = adminJs.pageVariables.check() && valid;
                }
                if(valid){
                    $this.find('.js-disabled').prop('disabled', false);
                }
                return valid;
            });
        }
    },

    promotionFromCheck : function(){
        var $promotionForm = $('.js-promotion-form');
        if($promotionForm.length && adminJs.promotionForm.check){
            $promotionForm.on('submit', function(){
                var valid = adminJs.promotionForm.check();
                if(valid){
                    $(this).find('.js-disabled').prop('disabled', false);
                }
                return valid;
            });
        }
    },

    couponFormCheck : function(){
        var $couponForm = $('.js-coupon-form');
        if($couponForm.length){
            $couponForm.on('submit', function(){
                var valid =  adminJs.couponForm.check();
                if(valid){
                    $(this).find('.js-disabled').prop('disabled', false);
                }
                return valid;
            });
        }
    },

    front : function(){
        adminJs.activity.activityAddFormCheck();
        adminJs.activity.activityEditFormCheck();
        adminJs.activity.promotionFromCheck();
        adminJs.activity.couponFormCheck();
    }
};
/**
 * Created by JKH on 2016/7/21.
 */

;var adminJs=window.adminJs || {};

adminJs.common={
    init: function(){
        var $removeLink = $('.js-remove-link');
        if($removeLink.length){
            $removeLink.on('click', function(e){
                if(!confirm('Are you sure to delete?')){
                    e.preventDefault();
                }
            });
        }

        var $select2 = $('.select2');
        if($select2.length){
            $select2.select2();
        }

        var $datepicker = $('.datepicker');
        if($datepicker.length){
            $datepicker.datepicker({
                autoclose: true,
                format: 'yyyy/mm/dd'
            });
        }
    },

    ajaxSetup: function () {
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
    }
};



/**
 * Created by JKH on 2016/7/22.
 */

;var adminJs=window.adminJs || {};

adminJs.componentTermSearch = {
    init : function(){
        adminJs.componentTermSearch.ajaxLogic();
        adminJs.componentTermSearch.front();
    },

    termSearchRel : null,

    front : function(){
        var $componentWrap = $('.component-term-search');

        $componentWrap.on('click', '.js-add-term-a', function(e){
            e.preventDefault();

            var $this = $(this);
            var $termSelect = $('.term-select');

            var tid = $this.data('tid');
            var termSearchRel = adminJs.componentTermSearch.termSearchRel;

            if(termSearchRel[tid] != undefined && $termSelect.find('option[value="'+tid+'"]').length == 0){
                $termSelect.append($('<option value="'+tid+'" selected>'+termSearchRel[tid].name+'</option>'));
            }
            $this.closest('.js-term-tr').remove();
        });

        $componentWrap.on('click', '.js-clear-terms', function(e){
            e.preventDefault();
            $('.js-term-tr').remove();
        });

        $componentWrap.on('click', '.js-all-terms', function(e){
            e.preventDefault();
            $('.js-add-term-a').trigger('click');
        });

        $('.term-select').on('dblclick', 'option', function(){
            var $this = $(this);
            var tid = $this.attr('value');
            if(!$('.js-ajax-rel-tr').hasClass('hide')){
                var $termTable = $('.js-term-table');
                var termSearchRel = adminJs.componentTermSearch.termSearchRel;

                var tr = '<tr class="js-term-tr">';
                tr += '<td><a href="'+termSearchRel[tid].url+'" target="_blank">'+termSearchRel[tid].name+'</a></td>';
                tr += '<td><a class="js-add-term-a" href="#" data-tid="'+tid+'">Add this term</a></td>';
                tr += '</tr>';
                $termTable.append($(tr));
            }
            $this.remove();
        });
    },

    ajaxLogic : function(){
        adminJs.common.ajaxSetup();

        var $keywordsInput = $('.js-keywords-input');

        $keywordsInput.on('keydown', function(e){
            if(e.which == 13) {
                adminJs.componentTermSearch.ajaxTermSearch($(this));
            }
        });

        $('.js-search-btn').on('click', function(){
            adminJs.componentTermSearch.ajaxTermSearch($keywordsInput);
        });

    },

    ajaxTermSearch : function($this){
        var keywords = $.trim($this.val());
        var request = $.ajax({
            url : '/center/term/search',
            type : 'POST',
            data : {
                'keywords' : keywords
            },
            dataType : 'json'
        });

        request.done(function(result){
            if(result.code == 200){

                var $emptyTr = $('.js-ajax-empty-tr');
                var $relTr = $('.js-ajax-rel-tr');
                var $termSelectTr = $('.js-term-select-tr');

                if(result.data.length == 0){
                    $emptyTr.removeClass('hide');
                    $relTr.addClass('hide');
                    $termSelectTr.addClass('hide');
                }else {
                    $emptyTr.addClass('hide');
                    $relTr.removeClass('hide');
                    $termSelectTr.removeClass('hide');

                    adminJs.componentTermSearch.termSearchRel = result.data;

                    var $termTable = $('.js-term-table');
                    $('.js-term-tr').remove();
                    $.each(result.data, function(index, element){
                        var termTr = '<tr class="js-term-tr">';
                        termTr += '<td><a href="'+element.url+'" target="_blank">'+element.name+'</a></td>';
                        termTr += '<td><a class="js-add-term-a" href="#" data-tid="'+element.tid+'">Add this term</a></td>';
                        termTr += '</tr>';
                        $termTable.append($(termTr));
                    });
                }
            }
        });
    }
};

;var adminJs = window.adminJs || {};
adminJs.constant = {"activityRangeAll":1,"activityRangeTerm":2,"activityTypeTopic":1,"activityTypePromotion":2,"activityTypeCoupon":3,"promotionTypeProduct":1,"promotionTypeCart":2,"promotionBenefitDiscount":1,"promotionBenefitReduction":2,"promotionBenefitFree":3,"promotionLimitNone":1,"promotionLimitFUllPrice":2,"promotionLimitFUllNumber":3,"couponLimitNone":1,"couponLimitFullPrice":2,"couponLimitFullNumber":3,"couponStatusUnused":0,"couponStatusLocked":1,"couponStatusUsed":2};
;var adminJs = window.adminJs || {};

adminJs.couponForm = {
    init : function(){
        adminJs.couponForm.front();
    },

    check : null,

    front : function(){
        var $couponFromWrap = $('.coupon-form-wrap');
        var $limitValueTr = $('.js-limit-value-tr');
        var $limitValue = $('.js-limit-value');
        $couponFromWrap.on('change', '.js-limit-select', function(){
            var $this = $(this);
            if($this.val() == 'no_limit'){
                $limitValueTr.addClass('hide');
            }else{
                $limitValueTr.removeClass('hide');
            }
            $limitValue.val('');
        });

        adminJs.couponForm.check = $couponFromWrap.autoCheckForm({
            name : 'required',
            path_alias : 'required',
            coupons_fee : 'required|number',
            total : 'required|number'
        },{},{errorPrefix:'sm_'}).check;
    }
};

;var adminJs=window.adminJs || {};

adminJs.pageVariables = {
    init : function(){
        adminJs.pageVariables.front();
    },

    check : null,

    front : function(){
        var $pageVariableWrap = $('.js-page-variable');
        if($pageVariableWrap.length){
            adminJs.pageVariables.check = function(){
                var pvid = $pageVariableWrap.find('[name="pvid"]').val();
                if(['1', '2', '3'].indexOf(pvid) == -1){
                    return $pageVariableWrap.autoCheckForm({
                        title : 'required',
                        meta_keywords : 'required',
                        meta_description : 'required'
                    }, {}, {errorPrefix:'sm_'}).check();
                }else{
                    return true;
                }
            }
        }

        $pageVariableWrap.on('change', '.js-pvid-input', function(){
            var $pageVariableTr = $('.page-variable-tr');
            if(['1', '2', '3'].indexOf($(this).val()) > -1){
                $pageVariableTr.addClass('hide');
            }else{
                $pageVariableTr.removeClass('hide');
            }
        });

        $('.js-pvid-input').trigger('change');

    }
};
;var adminJs=window.adminJs || {};

adminJs.promotionForm = {
    init : function(){
        adminJs.promotionForm.front();
    },

    frontPromotionMultipleCheck : function(){
        var $multipleInput = $('.multiple-input');
        if($multipleInput.is(':checked')){
            if($typeSelect.val() != 'cart' || $limitSelect.val() != 'full_price' || $benefitSelect.val() != 'price_reduction'){
                $multipleInput.prop('checked', false);
                return false;
            }
        }
        return true;
    },

    front : function(){
        var $fromWrap = $('.promotion-form-wrap');
        var $multipleInput = $('.multiple-input');
        var $limitValueLabel = $('.limit-value-label');
        var $benefitSelect = $('.benefit-select');
        var $benefitValueLabel = $('.benefit-value-label');

        $fromWrap.on('click', '.promotion-form-wrap', function(){
            if(!adminJs.promotionForm.frontPromotionMultipleCheck()){
                alert('Multiple does not support the promotion you choose');
            }
        });

        $fromWrap.on('change', '.type-select', function(){
            var $this = $(this);
            var $cartProp = $('.cart-prop');
            var $productProp = $('.product-prop');

            if($this.val() == 'cart'){
                $cartProp.removeClass('hide');
                $productProp.addClass('hide');
                $multipleInput.prop('disabled', false);
                $benefitSelect.val('price_reduction')
            }else if($this.val() ==  'product'){
                $cartProp.addClass('hide');
                $productProp.removeClass('hide');
                $multipleInput.prop('disabled', true);
                $benefitSelect.val( 'discount')
            }
            adminJs.promotionForm.frontPromotionMultipleCheck();
            $benefitSelect.trigger('change');
        });

        $fromWrap.on('change', '.limit-select', function(){
            var $this = $(this);
            adminJs.promotionForm.frontPromotionMultipleCheck();
            $('.js-limit-value').val('');
            if($this.val() ==  'no_limit'){
                $('.limit-value-tr').addClass('hide');
            }else if($this.val() == 'full_price'){
                $('.limit-value-tr').removeClass('hide');
                $limitValueLabel.html('Required price');
            }else if($this.val() == 'full_number'){
                $('.limit-value-tr').removeClass('hide');
                $limitValueLabel.html('Required number');
            }
        });

        $fromWrap.on('change', '.benefit-select', function(){
            var $this = $(this);
            adminJs.promotionForm.frontPromotionMultipleCheck();
            $('.js-benefit-value').val('');
            if($this.val() ==  'discount'){
                $benefitValueLabel.html('Discount');
            }else if($this.val() == 'price_reduction'){
                $benefitValueLabel.html('Reduced price');
            }else if($this.val() == 'lower_free'){
                $benefitValueLabel.html('Free product number');
            }
        });

        adminJs.promotionForm.check = $fromWrap.autoCheckForm({
            name : 'required',
            benefit_value : 'required'
        },{},{errorPrefix:'sm_'}).check;
    },

    check:null,
};

;var adminJs=window.adminJs || {};

adminJs.sidebar = {
    init : function(){
        adminJs.sidebar.menuSet();
    },
    menuSet : function(){

        var $firstMenuList = $('.sidebar-menu>li');
        var pathInfo = window.location.pathname;
        if(pathInfo[0] == '/'){
            pathInfo = pathInfo.substr(1);
        }
        var menuInfo = pathInfo.split('/');
        var firstMenu = menuInfo[0] ? menuInfo[0] : 'home';
        var secondMenu = menuInfo[1] ? menuInfo[1] : 'home';
        var thirdMenu = menuInfo[2] ? menuInfo[2] : 'home';
        $.each($firstMenuList, function(index, element){
            var $this = $(element);
            if($this.data('menu') == firstMenu){
                $this.addClass('active');
                $.each($this.find('li'), function(index2, element2){
                    var $this2 = $(element2);
                    if($this2.data('menu') == secondMenu){
                        $this2.addClass('active');
                    }
                });
            }
        });

        $.each($('.js-third-menu li'), function(index, element){
            var $this = $(this);
            if($this.data('menu') == thirdMenu){
                $this.addClass('active');
            }
        });
    }
};
/**
 * Created by JKH on 2016/7/22.
 *
 * warning:This file in the last when the mergers.
 */

!(function($){
    /**
     *
     * @param {element} el  Feature detection
     * @param {function} fn  Executive function
     */
    var init=function(el,fn){
        if($(el).length) fn(el);
    };

    $(function(){
        adminJs.common.init();
        init('.main-sidebar', adminJs.sidebar.init);
        init('.page-variable', adminJs.pageVariables.init);
        init('.promotion-form-wrap', adminJs.promotionForm.init);
        init('.coupon-form-wrap', adminJs.couponForm.init);

        init('.component-term-search', adminJs.componentTermSearch.init);
        init('.js-activity', adminJs.activity.init);
    });
})(jQuery);
//# sourceMappingURL=app.js.map
