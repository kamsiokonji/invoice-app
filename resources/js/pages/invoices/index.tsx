import { InvoiceCard } from '@/components/invoice-card';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Invoices',
        href: '/invoices',
    },
];

export default function Invoices() {
    const isMobile = useIsMobile();
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Invoices" />
            <div className="mx-auto mt-10 flex w-full max-w-3xl flex-col gap-18 p-4">
                <div className="flex items-center justify-between">
                    <span>
                        <h1 className="text-2xl font-extrabold">Invoices</h1>
                        <p className="text-sidebar-border text-xs">There are 7 total invoices</p>
                    </span>

                    <div className="flex items-center gap-2">
                        <Button className="h-12 rounded-3xl px-3 text-xs font-bold text-white">
                            <img src="/plus.png" alt="" />
                            {isMobile ? 'New' : 'New Invoice'}
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    {[1, 2, 3, 4, 5, 6, 7].map((_, index) => (
                        <InvoiceCard key={index} amount={2000} due_date="2023-06-01" invoice_number={90210} status={'Paid'} name="John Doe" />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
