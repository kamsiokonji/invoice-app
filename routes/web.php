<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('invoices/index');
    })->name('invoices');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
