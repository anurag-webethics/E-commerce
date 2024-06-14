<?php

use Illuminate\Support\Facades\Route;

Route::any('/{catchall?}', function () {
    return view('welcome');
})->where('catchall', '(.*)');