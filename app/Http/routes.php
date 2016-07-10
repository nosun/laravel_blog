<?php

// index
Route::get('/', 'PageController@index');

// home
Route::get('/home', 'HomeController@index');


// auth
Route::get('login', 'Auth\AuthController@showLoginForm');
Route::post('login', 'Auth\AuthController@login');
Route::get('logout', 'Auth\AuthController@logout');

// Registration Routes...
//Route::get('register', 'Auth\AuthController@showRegistrationForm');
//Route::post('register', 'Auth\AuthController@register');

// Password Reset Routes...
Route::get('password/reset/{token?}', 'Auth\PasswordController@showResetForm');
Route::post('password/email', 'Auth\PasswordController@sendResetLinkEmail');
Route::post('password/reset', 'Auth\PasswordController@reset');


// account
Route::get('account','AccountController@showList');
Route::post('account','AccountController@AjaxAdd');
Route::get('account/{id}','AccountController@show');
Route::put('account/{id}','AccountController@AjaxEdit');
Route::delete('account/{id}','AccountController@AjaxDelete');

// service
Route::get('service','ServiceController@showList');
Route::post('service','ServiceController@AjaxAdd');
Route::get('service/{id}','ServiceController@show');
Route::put('service/{id}','ServiceController@AjaxEdit');
Route::delete('service/{id}','ServiceController@AjaxDelete');

// blog
Route::get('blog','ArticleController@showList');
Route::post('blog','ArticleController@AjaxAdd');
Route::get('blog/{id}','ArticleController@show');
Route::put('blog/{id}','ArticleController@AjaxEdit');
Route::delete('blog/{id}','ArticleController@AjaxDelete');

// fortest
Route::get('test','TestController@index');
