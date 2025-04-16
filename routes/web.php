<?php

use App\Http\Controllers\Invoice\InvoiceController;
use Illuminate\Support\Facades\Route;



Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [InvoiceController::class, 'index'])->name('invoice.index');
    Route::resource('invoices', InvoiceController::class)->except('index', 'edit')->names('invoice');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
