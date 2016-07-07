<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Blog</title>

    <!-- Styles -->
    <link rel="stylesheet" href="/libs/bootstrap/3.3.5/css/bootstrap.min.css">
    <link href="{{ elixir('css/app.css') }}" rel="stylesheet">
    @yield('user_css')
</head>
<body id="app-layout">
    @include('parts/topBar')
    @yield('content')
    <!-- JavaScripts -->
    <script src="/libs/jquery/jquery-2.2.3.min.js"></script>
    <script src="/libs/bootstrap/3.3.5/js/bootstrap.min.js" ></script>
    {{--<script src="{{ elixir('js/app.js') }}"></script>--}}
    @yield('user_js')
</body>
</html>
