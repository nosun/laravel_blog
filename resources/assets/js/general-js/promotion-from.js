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