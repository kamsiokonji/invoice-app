import InputError from '@/components/input-error';
import { InvoiceSheet } from '@/components/invoice-sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { paymentTerms } from '@/lib/constants';
import { InvoiceForm, InvoiceItem } from '@/types';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import React, { FormEventHandler } from 'react';

interface CreateInvoiceProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CreateInvoice({ isOpen, onClose }: CreateInvoiceProps) {
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm<InvoiceForm>({
        due_date: '',
        project_description: '',
        payment_terms: '',
        items: [] as InvoiceItem[],
        from_address: '',
        from_city: '',
        from_zipcode: '',
        from_country: '',
        to_address: '',
        to_city: '',
        to_zipcode: '',
        to_country: '',
        client_name: '',
        client_email: '',
    });

    // When adding a new item
    const addNewItem = (e: React.FormEvent) => {
        e.preventDefault();

        const currentItems = data.items || [];

        const updatedItems = [...currentItems, { name: '', quantity: 1, price: 0 }];

        setData('items', updatedItems);
    };

    // When updating an item field
    const updateItem = (index: number, field: string, value: string | number) => {
        const updatedItems = [...data.items];

        updatedItems[index] = {
            ...updatedItems[index],
            [field]: value,
        };

        setData('items', updatedItems);
    };

    // When removing an item
    const removeItem = (index: number) => {
        const updatedItems = data.items.filter((_, i) => i !== index);

        setData('items', updatedItems);
    };

    const calculateTotal = (item: { quantity: number; price: number }) => {
        return item.quantity * item.price;
    };

    const getDisplayValue = () => {
        const selected = paymentTerms.find((term) => term.value === String(data.payment_terms));
        return selected ? selected.name : '';
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('invoice.store'), {
            onSuccess: () => closeForm(),
            replace: true,
        });
    };

    const closeForm = () => {
        reset();
        clearErrors();
        onClose();
    };

    return (
        <InvoiceSheet title="New Invoice" isOpen={isOpen} onClose={closeForm}>
            <div className="flex flex-col gap-4">
                <form className="space-y-12" onSubmit={submit}>
                    <div className="flex flex-col gap-6">
                        <div>
                            <h1 className="text-primary-foreground font-semibold">Bill From</h1>
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label className="text-tertiary flex items-center justify-between text-xs" htmlFor="address">
                                Street Address
                                <InputError message={errors.from_address} />
                            </Label>
                            <Input
                                type="text"
                                placeholder="Street Address"
                                id="from_address"
                                onChange={(e) => setData('from_address', e.target.value)}
                                value={data.from_address}
                                className={errors.from_address ? 'border-destructive' : ''}
                            />
                        </div>

                        <div className="grid-cols grid gap-4 md:grid-cols-3">
                            <div className="flex flex-col gap-1">
                                <Label className="text-tertiary flex items-center justify-between text-xs" htmlFor="city">
                                    City
                                    <InputError message={errors.from_city} />
                                </Label>
                                <Input
                                    type="text"
                                    placeholder="City"
                                    id="from_city"
                                    onChange={(e) => setData('from_city', e.target.value)}
                                    value={data.from_city}
                                    className={errors.from_city ? 'border-destructive' : ''}
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <Label className="text-tertiary flex items-center justify-between text-xs" htmlFor="postcode">
                                    Post Code
                                    <InputError message={errors.from_zipcode} />
                                </Label>
                                <Input
                                    type="text"
                                    placeholder="Post Code"
                                    id="from_zipcode"
                                    onChange={(e) => setData('from_zipcode', e.target.value)}
                                    value={data.from_zipcode}
                                    className={errors.from_zipcode ? 'border-destructive' : ''}
                                />
                            </div>

                            <div className="col-span-2 flex flex-col gap-1 md:col-span-1">
                                <Label className="text-tertiary flex items-center justify-between text-xs" htmlFor="country">
                                    Country
                                    <InputError message={errors.from_country} />
                                </Label>
                                <Input
                                    type="text"
                                    placeholder="Country"
                                    id="from_country"
                                    value={data.from_country}
                                    className={errors.from_country ? 'border-destructive' : ''}
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
                            <Label className="text-tertiary flex items-center justify-between text-xs" htmlFor="name">
                                Client's Name
                                <InputError message={errors.client_name} />
                            </Label>
                            <Input
                                type="text"
                                placeholder="Client's Name"
                                onChange={(e) => setData('client_name', e.target.value)}
                                value={data.client_name}
                                className={errors.client_name ? 'border-destructive' : ''}
                                id="client_name"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <Label className="text-tertiary flex items-center justify-between text-xs" htmlFor="email">
                                Client's Email
                                <InputError message={errors.client_email} />
                            </Label>
                            <Input
                                type="email"
                                placeholder="Client's Email"
                                id="client_email"
                                value={data.client_email}
                                className={errors.client_email ? 'border-destructive' : ''}
                                onChange={(e) => setData('client_email', e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <Label className="text-tertiary flex items-center justify-between text-xs" htmlFor="address">
                                Street Address
                                <InputError message={errors.to_address} />
                            </Label>
                            <Input
                                type="text"
                                placeholder="Street Address"
                                className={errors.to_address ? 'border-destructive' : ''}
                                onChange={(e) => setData('to_address', e.target.value)}
                                value={data.to_address}
                                id="to_address"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                            <div className="flex flex-col gap-1">
                                <Label className="text-tertiary flex items-center justify-between text-xs" htmlFor="city">
                                    City
                                    <InputError message={errors.to_city} />
                                </Label>
                                <Input
                                    type="text"
                                    placeholder="City"
                                    className={errors.to_city ? 'border-destructive' : ''}
                                    onChange={(e) => setData('to_city', e.target.value)}
                                    value={data.to_city}
                                    id="to_city"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <Label className="text-tertiary flex items-center justify-between text-xs" htmlFor="postcode">
                                    Post Code
                                    <InputError message={errors.to_zipcode} />
                                </Label>
                                <Input
                                    type="text"
                                    placeholder="Post Code"
                                    className={errors.to_zipcode ? 'border-destructive' : ''}
                                    id="to_zipcode"
                                    value={data.to_zipcode}
                                    onChange={(e) => setData('to_zipcode', e.target.value)}
                                />
                            </div>

                            <div className="col-span-2 flex flex-col gap-1 md:col-span-1">
                                <Label className="text-tertiary flex items-center justify-between text-xs" htmlFor="country">
                                    Country
                                    <InputError message={errors.to_country} />
                                </Label>
                                <Input
                                    type="text"
                                    placeholder="Country"
                                    id="to_country"
                                    value={data.to_country}
                                    onChange={(e) => setData('to_country', e.target.value)}
                                    className={errors.to_country ? 'border-destructive' : ''}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="grid-cols grid gap-4 md:grid-cols-2">
                            <div className="flex flex-col gap-1">
                                <Label className="text-tertiary flex items-center justify-between text-xs" htmlFor="invoice-date">
                                    Invoice Due Date
                                    <InputError message={errors.due_date} />
                                </Label>
                                <Input
                                    type="date"
                                    placeholder="Invoice Date"
                                    className={`${errors.due_date} ? 'border-destructive' : ''`}
                                    onChange={(e) => setData('due_date', e.target.value)}
                                    value={data.due_date}
                                    id="due_date"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <Label className="text-tertiary flex items-center justify-between text-xs" htmlFor="payment-terms">
                                    Payment Terms
                                    <InputError message={errors.payment_terms} />
                                </Label>
                                <Select value={String(data.payment_terms)} onValueChange={(value) => setData('payment_terms', parseInt(value))}>
                                    <SelectTrigger className={errors.payment_terms ? 'border-destructive' : ''}>
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
                            <Label className="text-tertiary flex items-center justify-between text-xs" htmlFor="project-description">
                                Project Description
                                <InputError message={errors.project_description} />
                            </Label>
                            <Input
                                type="text"
                                placeholder="Project Description"
                                onChange={(e) => setData('project_description', e.target.value)}
                                value={data.project_description}
                                id="project-description"
                                className={errors.project_description ? 'border-destructive' : ''}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h1 className="font-semibold text-[#777F98]">Item List</h1>
                            {errors.items && <InputError message={errors.items} />}
                        </div>

                        <div className="flex items-center justify-between">
                            <h1 className="text-tertiary w-2/3">Item Name</h1>

                            <div className="flex w-2/3 justify-center gap-8">
                                <h1 className="text-tertiary">Qty.</h1>
                                <h1 className="text-tertiary w-2/3">Price</h1>
                            </div>

                            <h1 className="text-tertiary mr-2 w-1/3">Total</h1>
                        </div>

                        {data.items.map((item, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <Input
                                    type="text"
                                    value={data.items[index]?.name || ''}
                                    onChange={(e) => updateItem(index, 'name', e.target.value)}
                                    placeholder="Item name"
                                    className="w-2/3"
                                />

                                <div className="flex justify-center gap-4">
                                    <Input
                                        type="text"
                                        value={data.items[index]?.quantity || 0}
                                        onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 0)}
                                        min="1"
                                        className="w-1/3 text-center"
                                    />

                                    <Input
                                        type="text"
                                        value={data.items[index]?.price || 0}
                                        onChange={(e) => updateItem(index, 'price', parseInt(e.target.value) || 0)}
                                        min="0"
                                        step="0.01"
                                        className="w-2/3"
                                    />
                                </div>

                                <div className="w-1/3">
                                    <span className="font-medium">${calculateTotal(item).toFixed(2)}</span>
                                </div>

                                <img src="/trash.png" alt="delete" className="cursor-pointer" onClick={() => removeItem(index)} />
                            </div>
                        ))}

                        <Button
                            className="text-tertiary dark:text-tertiary rounded-4xl bg-[#f9fafe] py-7 font-semibold hover:bg-[#f9fafe] dark:bg-[#252945]"
                            onClick={addNewItem}
                        >
                            + Add New Item
                        </Button>
                    </div>

                    <div className="flex items-center justify-between">
                        <Button
                            className="text-tertiary rounded-3xl bg-[#f9fafe] py-6 font-semibold hover:bg-[#f9fafe] dark:text-[#888eb0]"
                            onClick={closeForm}
                            type="button"
                        >
                            Discard
                        </Button>

                        <div className="flex gap-2">
                            <Button
                                className="rounded-3xl bg-[#373b53] py-6 font-semibold text-[#888eb0] hover:bg-[#373b53]"
                                type="submit"
                                onClick={() => setData('status', 'draft')}
                                disabled={processing}
                            >
                                {/* {processing && <LoaderCircle className="h-4 w-4 animate-spin" />} */}
                                Save as Draft
                            </Button>
                            <Button className="rounded-3xl py-6 font-semibold" type="submit" disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Save & Send
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </InvoiceSheet>
    );
}
