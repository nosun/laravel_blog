<head>
    <meta charset="UTF-8">
    <title> Trade Center - @yield('htmlheader_title', 'Title') </title>
    <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
    @yield('metaMore')

    @yield('user_css')
    <!-- Bootstrap 3.3.4 -->
    <link href="{{ asset('/lib/bootstrap-3.3.5/css/bootstrap.css') }}" rel="stylesheet" type="text/css" />
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdn.staticfile.org/font-awesome/4.2.0/css/font-awesome.min.css">
    <!-- Ionicons -->
    <link rel="stylesheet" href="https://cdn.staticfile.org/ionicons/2.0.1/css/ionicons.min.css">
    <!-- Theme style -->

    <link href="{{ asset('/css/admin-lte/AdminLTE.css') }}" rel="stylesheet" type="text/css" />
    <!-- AdminLTE Skins. We have chosen the skin-blue for this starter
          page. However, you can choose any other skin. Make sure you
          apply the skin class to the body tag so the changes take effect.
    -->
    <link href="{{ asset('/css/admin-lte/skins/skin-blue.css') }}" rel="stylesheet" type="text/css" />
    <!-- iCheck -->
    <link href="{{ asset('/plugins/iCheck/square/blue.css') }}" rel="stylesheet" type="text/css" />

    <link href="{{ asset('/css/app.css') }}" rel="stylesheet" type="text/css" />

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="{{ asset('/lib/html5shiv.min.js') }}"></script>
    <script src="{{ asset('/lib/respond.min.js') }}"></script>
    <![endif]-->
    <script src="{{ url('/lib/jquery/jquery-1.7.2.min.js') }}"></script>
</head>
