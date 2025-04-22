import { InvoiceSheet } from '@/components/invoice-sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { paymentTerms } from '@/lib/constants';
import { InvoiceForm, SharedData } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

interface EditInvoiceProps {
    isOpen: boolean;
    onClose: () => void;
}
export default function EditInvoice({ isOpen, onClose }: EditInvoiceProps) {
    const { data: invoice } = usePage<SharedData>().props;

    const { data, setData, put, processing, clearErrors } = useForm<InvoiceForm>({
        due_date: invoice.due_date,
        project_description: invoice.project_description,
        payment_terms: invoice.payment_terms,
        items: invoice.items,
        from_address: invoice.from_address,
        from_city: invoice.from_city,
        from_zipcode: invoice.from_zipcode,
        from_country: invoice.from_country,
        to_address: invoice.to_address,
        to_city: invoice.to_city,
        to_zipcode: invoice.to_zipcode,
        to_country: invoice.to_country,
        client_name: invoice.client_name,
        client_email: invoice.client_email,
        status: invoice.status,
    });

    const getDisplayValue = () => {
        const selected = paymentTerms.find((term) => term.value === String(data.payment_terms));
        return selected ? selected.name : '';
    };

    const calculateTotal = (item: { quantity: number; price: number }) => {
        return item.quantity * item.price;
    };

    const removeItem = (index: number) => {
        const updatedItems = data.items.filter((_, i) => i !== index);

        setData('items', updatedItems);
    };

    const updateItem = (index: number, field: string, value: string | number) => {
        const updatedItems = [...data.items];

        // Update the specific field first
        if (field === 'quantity' || field === 'price') {
            const numValue = typeof value === 'string' ? parseFloat(value) : value;
            updatedItems[index] = {
                ...updatedItems[index],
                [field]: isNaN(numValue) ? 0 : numValue,
            };
        } else {
            updatedItems[index] = {
                ...updatedItems[index],
                [field]: value,
            };
        }

        // Calculate and update the total for this item
        const item = updatedItems[index];
        const quantity = item.quantity || 0;
        const price = item.price || 0;
        updatedItems[index].total = quantity * price;

        setData('items', updatedItems);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('invoice.update', invoice?.id), {
            onSuccess: () => closeForm(),
        });
    };

    const addNewItem = (e: React.FormEvent) => {
        e.preventDefault();

        const currentItems = data.items || [];

        const updatedItems = [...currentItems, { name: '', quantity: 1, price: 0 }];

        setData('items', updatedItems);
    };

    const closeForm = () => {
        clearErrors();
        onClose();
    };

    return (
        <InvoiceSheet title="Edit Invoice" isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-col gap-4">
                <form className="space-y-12" onSubmit={submit}>
                    <div className="flex flex-col gap-6">
                        <div>
                            <h1 className="text-primary-foreground font-semibold">Bill From</h1>
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label className="text-tertiary text-xs" htmlFor="address">
                                Street Address
                            </Label>
                            <Input
                                type="text"
                                placeholder="Street Address"
                                id="from_address"
                                onChange={(e) => setData('from_address', e.target.value)}
                                value={data.from_address}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                            <div className="flex flex-col gap-1">
                                <Label className="text-tertiary text-xs" htmlFor="city">
                                    City
                                </Label>
                                <Input
                                    type="text"
                                    placeholder="City"
                                    id="from_city"
                                    onChange={(e) => setData('from_city', e.target.value)}
                                    value={data.from_city}
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <Label className="text-tertiary text-xs" htmlFor="postcode">
                                    Post Code
                                </Label>
                                <Input
                                    type="text"
                                    placeholder="Post Code"
                                    id="from_zipcode"
                                    onChange={(e) => setData('from_zipcode', e.target.value)}
                                    value={data.from_zipcode}
                                />
                            </div>

                            <div className="col-sapn-2 flex flex-col gap-1">
                                <Label className="text-tertiary text-xs" htmlFor="country">
                                    Country
                                </Label>
                                <Input
                                    type="text"
                                    placeholder="Country"
                                    id="from_country"
                                    value={data.from_country}
                                    onChange={(e) => setData('from_country', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div>
                            <h1 className="text-primary-foreground font-semibold">Bill To</h1>
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label className="text-tertiary text-xs" htmlFor="name">
                                Client's Name
                            </Label>
                            <Input
                                type="text"
                                placeholder="Client's Name"
                                onChange={(e) => setData('client_name', e.target.value)}
                                value={data.client_name}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <Label className="text-tertiary text-xs" htmlFor="email">
                                Client's Email
                            </Label>
                            <Input
                                type="text"
                                placeholder="Client's Email"
                                id="client_email"
                                value={data.client_email}
                                onChange={(e) => setData('client_email', e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <Label className="text-tertiary text-xs" htmlFor="address">
                                Street Address
                            </Label>
                            <Input
                                type="text"
                                placeholder="Street Address"
                                onChange={(e) => setData('to_address', e.target.value)}
                                value={data.to_address}
                                id="to_address"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                            <div className="flex flex-col gap-1">
                                <Label className="text-tertiary text-xs" htmlFor="city">
                                    City
                                </Label>
                                <Input
                                    type="text"
                                    placeholder="City"
                                    onChange={(e) => setData('to_city', e.target.value)}
                                    value={data.to_city}
                                    id="to_city"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <Label className="text-tertiary text-xs" htmlFor="postcode">
                                    Post Code
                                </Label>
                                <Input
                                    type="text"
                                    placeholder="Post Code"
                                    id="to_zipcode"
                                    value={data.to_zipcode}
                                    onChange={(e) => setData('to_zipcode', e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <Label className="text-tertiary text-xs" htmlFor="country">
                                    Country
                                </Label>
                                <Input
                                    type="text"
                                    placeholder="Country"
                                    id="to_country"
                                    value={data.to_country}
                                    onChange={(e) => setData('to_country', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="grid-cols grid gap-4 md:grid-cols-2">
                            <div className="flex flex-col gap-1">
                                <Label className="text-tertiary text-xs" htmlFor="invoice-date">
                                    Invoice Due Date
                                </Label>
                                <Input
                                    type="date"
                                    placeholder="Invoice Date"
                                    id="due_date"
                                    onChange={(e) => setData('due_date', e.target.value)}
                                    value={data.due_date}
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <Label className="text-tertiary text-xs" htmlFor="payment-terms">
                                    Payment Terms
                                </Label>
                                <Select value={String(data.payment_terms)} onValueChange={(value) => setData('payment_terms', parseInt(value))}>
                                    <SelectTrigger className="w-full font-bold">
                                        <SelectValue placeholder="Select a payment term">
                                            {getDisplayValue() || 'Select a payment term'}
                                        </SelectValue>{' '}
                                    </SelectTrigger>
                                    <SelectContent>
                                        {paymentTerms.map((paymentTerm) => (
                                            <SelectItem key={paymentTerm.id} value={paymentTerm.value} className="font-bold">
                                                {paymentTerm.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <Label className="text-tertiary text-xs" htmlFor="project-description">
                                Project Description
                            </Label>
                            <Input
                                type="text"
                                placeholder="Project Description"
                                onChange={(e) => setData('project_description', e.target.value)}
                                value={data.project_description}
                                id="project-description"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div>
                            <h1 className="font-semibold text-[#777F98]">Item List</h1>
                        </div>

                        <div className="flex items-center justify-between">
                            <h1 className="text-tertiary w-2/3">Item Name</h1>

                            <div className="flex w-2/3 justify-center gap-8">
                                <h1 className="text-tertiary">Qty.</h1>
                                <h1 className="text-tertiary w-2/3">Price</h1>
                            </div>

                            <h1 className="text-tertiary mr-2 w-1/3">Total</h1>
                        </div>

                        {data?.items?.length > 0
                            ? data?.items.map((item, index) => (
                                  <div key={index} className="flex items-center gap-4">
                                      <Input
                                          type="text"
                                          placeholder="Item Name"
                                          onChange={(e) => updateItem(index, 'name', e.target.value)}
                                          value={item.name}
                                          className="w-2/3"
                                      />

                                      <div className="flex justify-center gap-4">
                                          <Input
                                              type="text"
                                              placeholder="Qty."
                                              onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
                                              value={item.quantity}
                                              className="w-1/3"
                                          />

                                          <Input
                                              type="text"
                                              placeholder="Price"
                                              onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value))}
                                              value={item.price}
                                              className="w-2/3"
                                          />
                                      </div>

                                      <div className="w-1/3">
                                          <span className="font-medium">${calculateTotal(item).toFixed(2)}</span>
                                      </div>

                                      <img src="/trash.png" alt="delete" className="cursor-pointer" onClick={() => removeItem(index)} />
                                  </div>
                              ))
                            : 'No items found'}

                        <Button
                            className="text-tertiary dark:text-tertiary rounded-4xl bg-[#f9fafe] py-7 font-semibold hover:bg-[#f9fafe] dark:bg-[#252945]"
                            onClick={addNewItem}
                        >
                            + Add New Item
                        </Button>
                    </div>

                    <div className="flex items-center justify-end gap-2">
                        <Button
                            onClick={closeForm}
                            className="text-tertiary rounded-3xl bg-[#f9fafe] py-6 font-semibold hover:bg-[#f9fafe] dark:text-[#888eb0]"
                            type="button"
                        >
                            Cancel
                        </Button>{' '}
                        <Button className="rounded-3xl py-6 font-semibold" disabled={processing} type="submit">
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Save Changes
                        </Button>
                    </div>
                </form>
            </div>
        </InvoiceSheet>
    );
}
