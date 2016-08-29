
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