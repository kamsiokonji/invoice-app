<?php

namespace App\Http\Requests\Invoice;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class CreateInvoiceRequest extends FormRequest
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
            'from_country' => 'required|string',
            'to_country' => 'required|string',
            'from_address' => 'required|string',
            'to_address' => 'required|string',
            'from_zipcode' => 'required|string',
            'to_zipcode' => 'required|string',
            'from_city' => 'required|string',
            'to_city' => 'required|string',
            'client_name' => 'required|string',
            'client_email' => 'required|email',
            'due_date' => 'required',
            'payment_terms' => 'required|integer',
            'project_description' => 'required',
            'items' => 'required|array',
            'items.*.name' => 'required|string',
            'items.*.quantity' => 'required|min:1',
            'items.*.price' => 'required|integer',
            'status' => 'nullable|in:pending,draft,paid',
        ];
    }

    public function messages(): array
    {
        return [
            'items.*.quantity.required' => "Can't be empty",
            'items.*.price.required' => "Can't be empty",
            'items.*.name.required' => "Can't be empty",
            'items.*.quantity.min' => "Quantity must be greater than 0",
            'from_country.required' => "Can't be empty",
            'to_country.required' => "Can't be empty",
            'from_address.required' => "Can't be empty",
            'to_address.required' => "Can't be empty",
            'from_zipcode.required' => "Can't be empty",
            'to_zipcode.required' => "Can't be empty",
            'from_city.required' => "Can't be empty",
            'to_city.required' => "Can't be empty",
            'client_name.required' => "Can't be empty",
            'client_email.required' => "Can't be empty",
            'due_date.required' => "Can't be empty",
            'payment_terms.required' => "Can't be empty",
            'project_description.required' => "Can't be empty",
        ];
    }
}
