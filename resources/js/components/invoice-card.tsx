import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface InvoiceCardProps {
    invoice_number: number;
    status: string;
    amount: number;
    due_date: string;
    name?: string;
}

export function InvoiceCard({ amount, due_date, invoice_number, status, name }: InvoiceCardProps) {
    return (
        <Card className="border-none p-6">
            <div className="flex items-center justify-between text-sm">
                <div className="flex items-center justify-around gap-10">
                    <span className="flex items-center">
                        <h1 className="text-[#7e88c3]">#</h1>
                        <p>{invoice_number}</p>
                    </span>

                    <span className="flex items-center gap-2">
                        <h1 className="text-[#7e88c3]">Due</h1>
                        <p>{due_date}</p>
                    </span>

                    <p className="text-[#858BB2]">{name}</p>
                </div>

                <div className="flex items-center gap-10">
                    <p className="font-extrabold">£ {amount.toFixed(2)}</p>

                    <Badge variant={status === 'Paid' ? 'success' : 'pending'} className="flex items-center gap-2 font-bold">
                        <span className={cn('h-2 w-2 rounded-full', status === 'Paid' ? 'bg-[#33D69F]' : 'bg-[#FF8F00]')} />

                        <span>{status}</span>
                    </Badge>
                </div>
            </div>
        </Card>
    );
}
