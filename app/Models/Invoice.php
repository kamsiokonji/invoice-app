<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Invoice extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'invoice_number',
        'to_address',
        'from_address',
        'project_description',
        'to_city',
        'from_city',
        'to_zipcode',
        'from_zipcode',
        'to_country',
        'from_country',
        'client_name',
        'client_email',
        'due_date',
        'payment_terms',
        'total_amount',
        'status',
    ];

    public function items(): HasMany
    {
        return $this->hasMany(InvoiceItem::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
