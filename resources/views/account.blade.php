@extends('layouts.app')
@section('user_css')
    <style>
        #accountInfo{
            position: relative;
        }
        #accountInfo dt{
            font-size: 16px;
            height:28px;
            line-height: 28px;
        }
        #accountInfo dd{
            height:28px;
            line-height: 28px;
        }
        .back {
            position:absolute;
            top:8px;
            right:10px;
        }
    </style>
@endsection
@section('metaMore')
    @include('parts/ajaxMeta')
@endsection
@section('content')
<div class="container">
    <div class="row">
        @if( $account )
            <div class="panel panel-info" id="accountInfo">
                <div class="panel-heading">
                    <h3 class="panel-title">账户详情</h3>
                    <a class="back" href="/account">返回</a>
                </div>
                <div class="panel-body">
                    <dl>
                        <dt>
                            基本信息
                        </dt>
                        <dd>
                            <span> 账户名称: {{ $account->name }} </span>
                        </dd>
                        <dd>
                            <span> 类型: {{ $account->type }} </span>
                        </dd>
                        <dd>
                            <span> 所属 {{ $account->belong }} </span>
                        </dd>
                        <dd>
                            <span> 地址: {{ $account->address  }}</span>
                        </dd>
                        <dd>
                            <span> 用户名: {{ $account->account  }}</span>
                        </dd>
                        <dd>
                            <span> 密码: {{ $account->password  }}</span>
                        </dd>
                        <dd>
                            <span> 更新: {{ $account->updated_at  }}</span>
                        </dd>
                    </dl>

                    <dl>
                        <dt>
                            相关信息
                        </dt>
                        <dd>
                            {{ empty($account->info)?'无':$account->info }}
                        </dd>
                    </dl>

                </div>
                <div class="panel-footer">tags: {{ $account->tag  }}</div>
            </div>
        @endif
    </div>
</div>

@endsection

@section('user_js')
@endsection
