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

            <li class="treeview" data-menu="site">
                <a href="#">
                    <i class='fa fa-calendar'></i>
                    <span>站点设置</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li data-menu="siteinfo">
                        <a href="{{url('site/siteinfo')}}">
                            <i class='fa fa-circle-o'></i>
                            <span>站点信息</span>
                        </a>
                    </li>
                    <li data-menu="mailserver">
                        <a href="{{url('site/mailserver')}}">
                            <i class='fa fa-circle-o'></i>
                            <span>邮件服务器设置</span>
                        </a>
                    </li>
                    <li data-menu="mail">
                        <a href="{{url('site/mail')}}">
                            <i class='fa fa-circle-o'></i>
                            <span>邮件设置</span>
                        </a>
                    </li>
                </ul>
            </li>

            <li class="treeview">
                <a href="#">
                    <i class='fa fa-file-o'></i>
                    <span>文章管理</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li>
                        <a href="#">
                            类别管理
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            内容管理
                        </a>
                    </li>
                </ul>
            </li>
        </ul><!-- /.sidebar-menu -->
    </section>
    <!-- /.sidebar -->
</aside>
