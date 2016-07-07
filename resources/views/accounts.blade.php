@extends('layouts.app')
@section('user_css')
<link rel="stylesheet" href="/libs/DataTables/1.10.12/media/css/dataTables.bootstrap.min.css">
@endsection
@section('content')
<div class="container">
    <div class="row">
        <div class="btn-group" style="float: right;margin-bottom:10px;">
            <button type="button" class="btn btn-primary">增加记录</button>
        </div>
    </div>
    <div class="row">
        @if( $accounts )
            <table class="table table-striped table-bordered" width="100%" cellspacing="0">
                <thead>
                    <tr>
                        <th>name</th>
                        <th>type</th>
                        <th>belong</th>
                        <th>address</th>
                        <th>account</th>
                        <th>password</th>
                        <th>info</th>
                        <th>tag</th>
                        <th>sid</th>
                    </tr>
                </thead>
                <tbody>
                @foreach($accounts as $row)
                    <tr>
                        <td>{{ $row->name }}</td>
                        <td>{{ $row->type }}</td>
                        <td>{{ $row->belong }}</td>
                        <td>{{ $row->address }}</td>
                        <td>{{ $row->account }}</td>
                        <td>{{ $row->password }}</td>
                        <td>{{ $row->info }}</td>
                        <td>{{ $row->tag }}</td>
                        <td>{{ $row->sid }}</td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        @endif
    </div>
</div>
@endsection

@section('user_js')
    <script src="/libs/DataTables/1.10.12/media/js/jquery.dataTables.min.js" ></script>
    <script src="/libs/DataTables/1.10.12/media/js/dataTables.bootstrap.min.js" ></script>
    <script type="text/javascript" >
        $(document).ready(function() {
            $('table').DataTable();
        } );
    </script>
@endsection
