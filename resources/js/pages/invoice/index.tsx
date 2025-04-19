import { InvoiceCard } from '@/components/invoice-card';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import AppLayout from '@/layouts/app-layout';
import CreateInvoice from '@/pages/invoice/create';
import EditInvoice from '@/pages/invoice/edit';
import { PageProps, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Invoices',
        href: '/',
    },
];

export default function Invoices() {
    const isMobile = useIsMobile();
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);

    const { data } = usePage<PageProps>().props;

    const invoices = data?.data || [];
    const total = data?.meta.total || 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Invoices" />
            <div className="mx-auto mt-10 flex w-full max-w-3xl flex-col gap-18 p-4">
                <div className="flex items-center justify-between">
                    <span>
                        <h1 className="text-2xl font-extrabold">Invoices</h1>
                        <p className="text-sidebar-border text-xs">{isMobile ? `${total} total invoices` : `There are ${total} total invoices`}</p>
                    </span>

                    <div className="flex items-center gap-2">
                        <Button className="h-12 rounded-3xl px-3 text-xs font-bold text-white" onClick={() => setOpen(true)}>
                            <img src="/plus.png" alt="" />
                            {isMobile ? 'New' : 'New Invoice'}
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    {invoices.length === 0 ? (
                        <div className="flex flex-col items-center gap-6">
                            <img src="/empty-invoices.png" alt="empty-invoice" className="mx-auto size-60 object-contain" />
                            <h1 className="text-lg font-semibold">There is nothing here</h1>
                            <p className="text-tertiary text-xs">Create an invoice by clicking the New Invoice button and get started</p>
                        </div>
                    ) : (
                        invoices.map((invoice, index) => (
                            <InvoiceCard
                                key={index}
                                id={invoice.id}
                                amount={invoice.total_amount}
                                due_date={invoice.due_date}
                                invoice_number={invoice.invoice_number}
                                status={invoice.status}
                                name={invoice?.client_name}
                            />
                        ))
                    )}
                </div>
            </div>

            <CreateInvoice isOpen={open} onClose={() => setOpen(false)} />
            <EditInvoice isOpen={edit} onClose={() => setEdit(false)} />
        </AppLayout>
    );
}
