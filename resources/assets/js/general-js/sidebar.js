
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