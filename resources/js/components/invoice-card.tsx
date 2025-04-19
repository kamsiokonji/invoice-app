import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';

interface InvoiceCardProps {
    invoice_number: number;
    status: string;
    amount: number;
    due_date: string;
    name?: string;
    id?: number;
}

export function InvoiceCard({ amount, due_date, invoice_number, status, name, id }: InvoiceCardProps) {
    return (
        <Link href={route('invoice.show', id)}>
            <Card className="hover:border-primary cursor-pointer p-6">
                <div className="flex items-start justify-between text-sm md:items-center">
                    <div className="flex flex-col items-start justify-around gap-6 md:flex-row md:items-center">
                        <span className="flex items-center text-lg font-bold">
                            <h1 className="text-[#7e88c3]">#</h1>
                            <p>{invoice_number}</p>
                        </span>

                        <span className="flex items-center gap-2">
                            <h1 className="text-[#7e88c3] dark:text-[#dfe3fa]">Due</h1>
                            <p className="dark:text-[#dfe3fa]">{due_date}</p>
                        </span>

                        <p className="text-[#858BB2] capitalize dark:text-white">{name}</p>
                    </div>

                    <div className="flex flex-col items-center gap-10 md:flex-row">
                        <p className="text-lg font-extrabold">£ {amount.toFixed(2) ?? 0}</p>

                        <Badge variant={status === 'paid' ? 'success' : 'pending'} className="flex items-center gap-2 font-bold">
                            <span className={cn('h-2 w-2 rounded-full', status === 'paid' ? 'bg-[#33D69F]' : 'bg-[#FF8F00]')} />

                            <span className="capitalize">{status}</span>
                        </Badge>

                        <img src="/arrow.png" alt="right-arrrow" className="hidden md:block" />
                    </div>
                </div>
            </Card>
        </Link>
    );
}
