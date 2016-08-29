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


