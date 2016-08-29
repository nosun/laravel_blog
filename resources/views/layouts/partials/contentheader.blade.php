<!-- Content Header (Page header) -->
<section class="content-header">
    @yield('content-nav')
    @if(isset($breadcrumb))
    <ol class="breadcrumb" style="margin-right: 20px; height: 40px; line-height: 40px">
        @foreach($breadcrumb as $title => $url)
            <li class="{{!$url ? 'active' : ''}}">
                @if($url)
                    <a href="{{$url}}">
                    <i class="fa {{$title == 'Home' ? 'fa-angle-double-right' : ''}} "></i>
                    {{$title}}
                </a>
                @else
                    {{$title}}
                @endif
            </li>
        @endforeach
    </ol>
    @endif
</section>