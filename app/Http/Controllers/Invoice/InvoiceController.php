<?php

namespace App\Http\Controllers\Invoice;

use App\Http\Controllers\Controller;
use App\Http\Requests\Invoice\CreateInvoiceRequest;
use App\Http\Requests\Invoice\UpdateInvoiceRequest;
use App\Models\Invoice;
use App\Models\InvoiceItem;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $status = $request->query('status');

        $query = Invoice::with('items')->latest();

        if ($status) {
            $query->where('status', $status);
        }

        $paginator = $query->paginate(10);

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
                'total' => $paginator->total(),
                'last_page' => $paginator->lastPage(),
                'links' => $paginator->linkCollection()
            ],
            'filters' => [
                'status' => $status
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

        $invoiceTotal = 0;
        foreach ($data['items'] as $item) {
            $invoiceTotal += $item['quantity'] * $item['price'];
        }

        $invoice = Invoice::create([
            ...$data,
            'invoice_number' => Carbon::now()->format('vsih'),
            'total_amount' => $invoiceTotal,
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

        return redirect()->route('invoice.index')->with('success', 'Invoice has been created!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Invoice $invoice)
    {
        $invoice->load('items'); // Proper way to load relation

        return inertia('invoice/show', [
            'data' => $invoice
        ]);
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

        DB::transaction(function () use ($data, $invoice) {
            $invoiceTotal = 0;

            // Collect incoming item IDs (if any)
            $incomingItemIds = collect($data['items'] ?? [])
                ->pluck('id')
                ->filter()
                ->toArray();

            // Delete items that were removed
            $invoice->items()->whereNotIn('id', $incomingItemIds)->delete();

            // Loop through incoming items to update or create
            foreach ($data['items'] ?? [] as $item) {
                $quantity = $item['quantity'] ?? 0;
                $price = $item['price'] ?? 0;
                $total = $quantity * $price;

                if (isset($item['id'])) {
                    // Update existing item
                    InvoiceItem::where('id', $item['id'])->update([
                        'name' => $item['name'],
                        'quantity' => $quantity,
                        'price' => $price,
                        'total' => $total,
                    ]);
                } else {
                    // Create new item
                    $invoice->items()->create([
                        'name' => $item['name'],
                        'quantity' => $quantity,
                        'price' => $price,
                        'total' => $total,
                    ]);
                }

                $invoiceTotal += $total;
            }

            // Update invoice total
            $data['total_amount'] = $invoiceTotal;

            // Update invoice fields
            $invoice->update($data);
        });

        return redirect()->route('invoice.index')->with('success', 'Invoice has been updated!');
    }


    public function updateInvoiceStatus(Request $request, Invoice $invoice)
    {
        $invoice->update([
            'status' => $request->status
        ]);

        return redirect()->route('invoice.index')->with('success', 'Invoice status has been updated!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Invoice $invoice)
    {
        $invoice->delete();

        return redirect()->route('invoice.index')->with('success', 'Invoice has been deleted!');
    }
}
