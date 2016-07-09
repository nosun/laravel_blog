@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div id="demo">@{{fullName}}</div>
    </div>
</div>
@endsection

@section('user_js')
<script src="/libs/vue/vue.min.js"></script>
<script type="text/javascript">
    var vm = new Vue({
        el: '#demo',
        data: {
            firstName: 'Foo',
            lastName: 'Bar'
        },
        computed: {
            fullName: function () {
                return this.firstName + ' ' + this.lastName
            }
        }
    })
</script>
@endsection
