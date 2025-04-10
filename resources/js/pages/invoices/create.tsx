import { InvoiceSheet } from '@/components/invoice-sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CreateInvoiceProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CreateInvoice({ isOpen, onClose }: CreateInvoiceProps) {
    return (
        <InvoiceSheet title="New Invoice" isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-col gap-4">
                <form className="space-y-9">
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
                </form>
            </div>
        </InvoiceSheet>
    );
}
