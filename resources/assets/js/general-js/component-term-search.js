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
