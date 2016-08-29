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