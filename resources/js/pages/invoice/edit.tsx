import { DateRangePicker } from '@/components/date-range-picker';
import { InvoiceSheet } from '@/components/invoice-sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { paymentTerms } from '@/lib/constants';
import { useState } from 'react';

interface EditInvoiceProps {
    isOpen: boolean;
    onClose: () => void;
}
export default function EditInvoice({ isOpen, onClose }: EditInvoiceProps) {
    const [selectedValue, setSelectedValue] = useState('');

    const getDisplayValue = () => {
        const selected = paymentTerms.find((term) => term.value === selectedValue);
        return selected ? selected.name : '';
    };

    return (
        <InvoiceSheet title="Edit Invoice" isOpen={isOpen} onClose={onClose}>
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

                            <div className="col-sapn-2 flex flex-col gap-1">
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

                            <div className="flex flex-col gap-1">
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
                            <Input type="text" placeholder="Project Description" />
                        </div>

                        <div className="flex flex-col gap-4">
                            <div>
                                <h1 className="font-semibold text-[#777F98]">Item List</h1>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-2">
                        <Button className="text-tertiary rounded-3xl bg-[#f9fafe] py-6 font-semibold hover:bg-[#f9fafe] dark:text-[#888eb0]">
                            Cancel
                        </Button>{' '}
                        <Button className="rounded-3xl py-6 font-semibold">Save Changes</Button>
                    </div>
                </form>
            </div>
        </InvoiceSheet>
    );
}
