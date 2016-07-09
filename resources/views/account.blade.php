@extends('layouts.app')
@section('metaMore')
    @include('parts/ajaxMeta')
@endsection
@section('content')
<div class="container">
    <div class="row">
        @if( $account )
            {{ $account->name }}
        @endif
    </div>
</div>

@endsection

@section('user_js')
@endsection
