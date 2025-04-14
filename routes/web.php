<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('invoice/index');
    })->name('invoice.index');

    Route::get('/{id}', function (string $id) {
        return Inertia::render('invoice/show', [
            'id' => $id
        ]);
    })->name('invoice.show');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
