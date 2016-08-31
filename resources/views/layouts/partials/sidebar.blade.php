<!-- Left side column. contains the logo and sidebar -->
<aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
       <!-- Sidebar Menu -->
        <ul class="sidebar-menu">
            <li class="header">{{ trans('adminLang::message.header') }}</li>
            <!-- Optionally, you can add icons to the links -->
            <li data-menu="home">
                <a href="{{ url('index') }}">
                    <i class='fa fa-dashboard'></i>
                    <span>首页</span>
                </a>
            </li>
            <li class="treeview">
                <a href="{{ url('menu') }}">
                    <i class='fa fa-file-o'></i>
                    <span>menu A</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li>
                        <a href="{{ url('menu/1') }}">
                            menu1
                        </a>
                    </li>
                    <li>
                        <a href="{{ url('menu/1?key=val') }}">
                            menu2
                        </a>
                    </li>
                    <li>
                        <a href="{{ url('menu/1/3') }}">
                            menu2
                        </a>
                    </li>
                </ul>
            </li>
        </ul><!-- /.sidebar-menu -->
    </section>
    <!-- /.sidebar -->
</aside>
