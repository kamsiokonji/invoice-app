<?php

namespace App\Http\Controllers\Invoice;

use App\Http\Controllers\Controller;
use App\Http\Requests\Invoice\CreateInvoiceRequest;
use App\Http\Requests\Invoice\UpdateInvoiceRequest;
use App\Models\Invoice;
use App\Models\InvoiceItem;
use Carbon\Carbon;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $paginator = Invoice::with('items')->latest()->simplePaginate(10);
        $total = Invoice::count();

        $data = [
            'data' => $paginator->items(),
            'meta' => [
                'current_page' => $paginator->currentPage(),
                'per_page' => $paginator->perPage(),
                'from' => $paginator->firstItem(),
                'to' => $paginator->lastItem(),
                'path' => $paginator->path(),
                'first_page_url' => $paginator->url(1),
                'prev_page_url' => $paginator->previousPageUrl(),
                'next_page_url' => $paginator->nextPageUrl(),
                'total' => $total
            ]
        ];

        return inertia('invoice/index', compact('data'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateInvoiceRequest $request)
    {
        $data = $request->validated();
        $invoice = Invoice::create([
            ...$data,
            'invoice_number' => Carbon::now()->format('vsih')
        ]);

        foreach ($data['items'] as $item) {
            InvoiceItem::create([
                'invoice_id' => $invoice->id,
                'name' => $item['name'],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
                'total' => $item['quantity'] * $item['price']
            ]);
        }

        return response()->json([
            'status' => true,
            'message' => 'Invoice has been created!',
            'data' => $invoice
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Invoice $invoice)
    {
        $invoice::with('items')->findOrFail($invoice->id);
        inertia('invoice/show', compact('invoice'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Invoice $invoice)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateInvoiceRequest $request, Invoice $invoice)
    {
        $data = $request->validated();

        $invoice->update([...$data]);

        foreach ($data['items'] as $item) {
            InvoiceItem::update([
                'name' => $item['name'],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
                'total' => $item['quantity'] * $item['price']
            ]);
        }

        return response()->json([
            'status' => true,
            'message' => 'Invoice has been updated!',
        ]);
    }

    public function updateInvoiceStatus(Request $request, Invoice $invoice)
    {
        $invoice->update([
            'status' => $request->status
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Invoice status has been updated!',
        ])->isRedirect(route('invoice.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Invoice $invoice)
    {
        $invoice->delete();

        return response()->json([
            'status' => true,
            'message' => 'Invoice has been deleted!',
        ])->isRedirect(route('invoice.index'));
    }
}
