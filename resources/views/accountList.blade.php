@extends('layouts.app')
@section('metaMore')
    @include('parts/ajaxMeta')
@endsection
@section('user_css')
<link rel="stylesheet" href="/libs/DataTables/1.10.12/media/css/dataTables.bootstrap.min.css">
@endsection
@section('content')
<div class="container">
    <div class="row">
        <div class="btn-group" style="float: right;margin-bottom:10px;">
            <a data-toggle="modal" href="#accountModal" class="btn btn-sm btn-primary"
               data-title="增加记录" data-value="create">增加记录</a>
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
                        <th class="hidden">tag</th>
                        <th class="hidden">info</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                @foreach($accounts as $row)
                    <tr>
                        <td id="name_{{ $row->id }}">{{ $row->name }}</td>
                        <td id="type_{{ $row->id }}">{{ $row->type }}</td>
                        <td id="belong_{{ $row->id }}">{{ $row->belong }}</td>
                        <td id="address_{{ $row->id }}">{{ $row->address }}</td>
                        <td id="account_{{ $row->id }}">{{ $row->account }}</td>
                        <td id="password_{{ $row->id }}">{{ $row->password }}</td>
                        <td class="hidden" id="tag_{{ $row->id }}">{{ $row->tag }}</td>
                        <td class="hidden" id="info_{{ $row->id }}">{{ $row->info }}</td>
                        <td class="action">
                            <a type="button" class="btn btn-xs btn-primary" title="查看" href="/account/{{ $row->id }}">
                                <i class="glyphicon glyphicon-list-alt"></i></a>
                            <button type="button" class="btn btn-xs btn-success" data-toggle="modal" title="编辑"
                                    data-target="#accountModal" data-title="编辑" data-value='edit' data-id="{{ $row->id }}">
                                <i class="glyphicon glyphicon-edit"></i>
                            </button>
                            <button type="button" class="btn btn-xs btn-danger" data-toggle="modal"
                                    data-target="#smallModal" title="删除" data-id="{{ $row->id }}">
                                <i class="glyphicon glyphicon-trash"></i>
                            </button>
                        </td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        @endif
    </div>
</div>

@include('parts/modalSmall')
@include('parts/modalAccount')
@endsection

@section('user_js')
    <script src="/libs/DataTables/1.10.12/media/js/jquery.dataTables.min.js" ></script>
    <script src="/libs/DataTables/1.10.12/media/js/dataTables.bootstrap.min.js" ></script>
    <script type="text/javascript" >
        $(document).ready(function() {
            $('table').DataTable({
                "order": [ 1, "desc" ],
                "lengthMenu": [[10, 20, 30, -1], [10, 20, 30, "All"]],
                "paging":true,
                "bFilter": true
            });

            var accountModal = $('#accountModal');
            var deleteModal = $('#smallModal');
            var id;

            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });

            accountModal.on('show.bs.modal', function (event) {
                var button = $(event.relatedTarget); // Button that triggered the modal
                var value = button.data('value'); //button value
                var title = button.data('title');
                var action;
                var url = '/account/';
                id = button.data('id');
                accountModal.find('h4').html(title);

                if (value == 'edit') {
                    url = url + id;
                    action = 'put';
                    accountModal.find("input[name='name']").val($('#name_' + id).html());
                    accountModal.find("input[name='address']").val($('#address_' + id).html());
                    accountModal.find("input[name='account']").val($('#account_' + id).html());
                    accountModal.find("input[name='password']").val($('#password_' + id).html());
                    accountModal.find("input[name='belong']").val($('#belong_' + id).html());
                    accountModal.find("textarea[name='tag']").val($('#tag_' + id).html());
                    accountModal.find("textarea[name='info']").val($('#info_' + id).html());
                }

                if (value == 'create') {
                    action = 'post';
                    accountModal.find("input").val('');
                    accountModal.find("textarea").val('');
                }
                accountModal.find('form').attr("data-url", url);
                accountModal.find('form').attr("data-action", action);
            });

            accountModal.find('form').submit(function (event) {
                event.preventDefault();
                var formData = {
                    'name':    $(this).find('input[name=name]').val(),
                    'address': $(this).find('input[name=address]').val(),
                    'account': $(this).find('input[name=account]').val(),
                    'password':$(this).find('input[name=password]').val(),
                    'info':    $(this).find('textarea[name=info]').val().trim(),
                    'tag':     $(this).find('textarea[name=tag]').val().trim(),
                    'belong':  $(this).find('input[name=belong]').val(),
                    'type':    $(this).find('select[name=type]').val()
                };

                // process the form
                $.ajax({
                    type: $(this).attr('data-action'),
                    url: $(this).attr('data-url'),
                    data: formData, // our data object
                    dataType: 'json', // what type of data do we expect back from the server
                    encode: true
                })
                // using the done promise callback
                .done(function (data) {
                    accountModal.find(".message").addClass('alert', 'alert-success').html('success');
                    //setTimeout(reload, 500);
                })
                .fail(function (data) {
                    accountModal.find(".message").addClass('alert', 'alert-fail').html('action fail');
                });
            });

            deleteModal.on('show.bs.modal', function (event) {
                var button = $(event.relatedTarget); // Button that triggered the modal
                id = button.data('id'); // Extract info from data-* attributes
                accountModal.attr('data-id',id);
            });

            $("#deleteIt").on('click', function (event) {
                id = accountModal.attr('data-id',id);
                $.ajax({
                    type: "DELETE",
                    url: "/account/" + id,
                    dataType: "json",
                    success: function (data) {
                        if (data.code == 200) {
                            $('#delMsg').html('您已经成功删除该信息')
                        }
                        setTimeout(reload, 500);
                    }
                })

            });

            function reload() {
                window.location.reload();
            }
        });
    </script>
@endsection
