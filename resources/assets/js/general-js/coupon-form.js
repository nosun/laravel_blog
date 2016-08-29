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