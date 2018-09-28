<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//Route::apiResource('users', 'API\UserController');
// For register many API resource controllers
Route::apiResources([
    'users' => 'API\UserController',
]);


Route::get('/profile','API\UserController@profile');
Route::put('/profile','API\UserController@updateProfile');
