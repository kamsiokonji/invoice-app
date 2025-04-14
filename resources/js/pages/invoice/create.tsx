import { DateRangePicker } from '@/components/date-range-picker';
import { InvoiceSheet } from '@/components/invoice-sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { paymentTerms } from '@/lib/constants';
import { InvoiceItem } from '@/types';
import { useState } from 'react';

interface CreateInvoiceProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CreateInvoice({ isOpen, onClose }: CreateInvoiceProps) {
    const [selectedValue, setSelectedValue] = useState('');
    const [items, setItems] = useState<InvoiceItem[]>([]);

    const addNewItem = (e: React.FormEvent) => {
        e.preventDefault();
        setItems([...items, { name: '', quantity: 1, price: 0 }]);
    };

    const updateItem = (index: number, field: keyof InvoiceItem, value: string) => {
        const updatedItems = [...items];
        updatedItems[index] = { ...updatedItems[index], [field]: value };
        setItems(updatedItems);
    };

    const calculateTotal = (item: InvoiceItem) => {
        return item.quantity * item.price;
    };

    const getDisplayValue = () => {
        const selected = paymentTerms.find((term) => term.value === selectedValue);
        return selected ? selected.name : '';
    };

    function removeItem(index: number): void {
        setItems((prevItems) => prevItems.filter((_, i) => i !== index));
    }

    return (
        <InvoiceSheet title="New Invoice" isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-col gap-4">
                <form className="space-y-12">
                    <div className="flex flex-col gap-4">
                        <div>
                            <h1 className="text-primary-foreground font-semibold">Bill From</h1>
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label className="text-tertiary text-xs" htmlFor="address">
                                Street Address
                            </Label>
                            <Input type="text" placeholder="Street Address" />
                        </div>

                        <div className="grid-cols grid gap-4 md:grid-cols-3">
                            <div className="flex flex-col gap-1">
                                <Label className="text-tertiary text-xs" htmlFor="city">
                                    City
                                </Label>
                                <Input type="text" placeholder="City" />
                            </div>

                            <div className="flex flex-col gap-1">
                                <Label className="text-tertiary text-xs" htmlFor="postcode">
                                    Post Code
                                </Label>
                                <Input type="text" placeholder="Post Code" />
                            </div>

                            <div className="col-span-2 flex flex-col gap-1 md:col-span-1">
                                <Label className="text-tertiary text-xs" htmlFor="country">
                                    Country
                                </Label>
                                <Input type="text" placeholder="Country" />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div>
                            <h1 className="text-primary-foreground font-semibold">Bill To</h1>
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label className="text-tertiary text-xs" htmlFor="name">
                                Client's Name
                            </Label>
                            <Input type="text" placeholder="Client's Name" />
                        </div>

                        <div className="flex flex-col gap-1">
                            <Label className="text-tertiary text-xs" htmlFor="email">
                                Client's Email
                            </Label>
                            <Input type="text" placeholder="Client's Email" />
                        </div>

                        <div className="flex flex-col gap-1">
                            <Label className="text-tertiary text-xs" htmlFor="address">
                                Street Address
                            </Label>
                            <Input type="text" placeholder="Street Address" />
                        </div>

                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                            <div className="flex flex-col gap-1">
                                <Label className="text-tertiary text-xs" htmlFor="city">
                                    City
                                </Label>
                                <Input type="text" placeholder="City" />
                            </div>

                            <div className="flex flex-col gap-1">
                                <Label className="text-tertiary text-xs" htmlFor="postcode">
                                    Post Code
                                </Label>
                                <Input type="text" placeholder="Post Code" />
                            </div>

                            <div className="col-span-2 flex flex-col gap-1 md:col-span-1">
                                <Label className="text-tertiary text-xs" htmlFor="country">
                                    Country
                                </Label>
                                <Input type="text" placeholder="Country" />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="grid-cols grid gap-4 md:grid-cols-2">
                            <div className="flex flex-col gap-1">
                                <Label className="text-tertiary text-xs" htmlFor="invoice-date">
                                    Invoice Date
                                </Label>
                                <DateRangePicker />
                            </div>

                            <div className="flex flex-col gap-1">
                                <Label className="text-tertiary text-xs" htmlFor="payment-terms">
                                    Payment Terms
                                </Label>
                                <Select value={selectedValue} onValueChange={setSelectedValue}>
                                    <SelectTrigger className="w-full">
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
                            <Input type="text" placeholder="Project Description" />
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

                        {items.map((item, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <Input
                                    type="text"
                                    value={item.name}
                                    onChange={(e) => updateItem(index, 'name', e.target.value)}
                                    placeholder="Item name"
                                    className="w-2/3"
                                />

                                <div className="flex justify-center gap-4">
                                    <Input
                                        type="text"
                                        value={item.quantity}
                                        onChange={(e) => updateItem(index, 'quantity', (parseInt(e.target.value) || 0).toString())}
                                        min="1"
                                        className="w-1/3 text-center"
                                    />

                                    <Input
                                        type="text"
                                        value={item.price}
                                        onChange={(e) => updateItem(index, 'price', (parseFloat(e.target.value) || 0).toString())}
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
                        <Button className="text-tertiary rounded-3xl bg-[#f9fafe] py-6 font-semibold hover:bg-[#f9fafe] dark:text-[#888eb0]">
                            Discard
                        </Button>

                        <div className="flex gap-2">
                            <Button className="rounded-3xl bg-[#373b53] py-6 font-semibold text-[#888eb0] hover:bg-[#373b53]">Save as Draft</Button>
                            <Button className="rounded-3xl py-6 font-semibold">Save & Send</Button>
                        </div>
                    </div>
                </form>
            </div>
        </InvoiceSheet>
    );
}
