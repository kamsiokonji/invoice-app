<?php

namespace App\Http\Requests\Invoice;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateInvoiceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'from_country' => 'nullable|string',
            'to_country' => 'nullable|string',
            'from_address' => 'nullable|string',
            'to_address' => 'nullable|string',
            'from_zipcode' => 'nullable|string',
            'to_zipcode' => 'nullable|string',
            'from_city' => 'nullable|string',
            'to_city' => 'nullable|string',
            'client_name' => 'nullable|string',
            'client_email' => 'nullable|email',
            'due_date' => 'nullable',
            'payment_terms' => 'nullable|integer',
            'project_description' => 'nullable',
            'items' => 'nullable|array',
            'items.*.name' => 'nullable|string',
            'items.*.quantity' => 'nullable|min:1',
            'items.*.price' => 'nullable|integer',
            'status' => 'nullable|in:pending,paid,draft',
        ];
    }
}
