<?php

// Route::apiResource('user','api\userController');

Route::post('auth/login', 'Api\AuthController@login');
Route::post('/users', 'Api\UserController@store');
Route::post('/products', 'Api\ProductsController@index');
Route::post('/products/show', 'Api\ProductsController@show');


Route::group(['middleware' => ['apiJwt']] , function(){
    Route::post('logout', 'Api\AuthController@logout');
    Route::post('me', 'Api\AuthController@me');

    Route::post('/dashboard', 'Api\DashboardController@index');

    Route::get('/users', 'Api\UserController@index');
    Route::post('/users/show', 'Api\UserController@show');
    Route::put('/users/update', 'Api\UserController@update');

    Route::post('/products/new', 'Api\ProductsController@store');
    Route::put('/products/update', 'Api\ProductsController@update');

});
