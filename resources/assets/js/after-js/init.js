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