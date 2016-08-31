@extends('layouts.app')
@section('content-nav')
    <div class="container-fluid">
        <h1>{{ $title }}</h1>
    </div>
@endsection
@section('main-content')
    <div class="row">
        <h2>{{ $id  }}</h2>
        <h3>{{ $id2 }}</h3>
        <p>{{ $key }}</p>
    </div>
@endsection

@section('user_js')
@endsection
