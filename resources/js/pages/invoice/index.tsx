import { InvoiceCard } from '@/components/invoice-card';
import { Paginator } from '@/components/paginator';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useIsMobile } from '@/hooks/use-mobile';
import AppLayout from '@/layouts/app-layout';
import CreateInvoice from '@/pages/invoice/create';
import EditInvoice from '@/pages/invoice/edit';
import { PageProps, type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
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
    const meta = data?.meta;

    const handleStatusChange = (value: string) => {
        router.get(route('invoice.index'), {
            status: value === 'all' ? null : value,
            replace: true,
        });
    };

    const selectedStatus = data?.filters?.status || 'all';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Invoices" />
            <div className="mx-auto mt-10 flex w-full max-w-3xl flex-col gap-18 p-4">
                <div className="flex items-center justify-between">
                    <span>
                        <h1 className="text-2xl font-extrabold">Invoices</h1>
                        <p className="text-sidebar-border text-xs">{isMobile ? `${total} total invoices` : `There are ${total} total invoices`}</p>
                    </span>

                    <div className="flex items-center gap-6">
                        <Select value={selectedStatus ?? 'all'} onValueChange={handleStatusChange}>
                            <SelectTrigger className="w-32 border-0 border-none dark:bg-transparent">
                                <SelectValue placeholder={isMobile ? 'Filter' : 'Filter by status'}></SelectValue>{' '}
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="paid">Paid</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="draft">Draft</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button className="h-12 rounded-3xl px-3 text-xs font-bold text-white" onClick={() => setOpen(true)}>
                            <img src="/plus.png" alt="plus" />
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
                        <>
                            {invoices.map((invoice, index) => (
                                <InvoiceCard
                                    key={index}
                                    id={invoice.id}
                                    amount={invoice.total_amount}
                                    due_date={invoice.due_date}
                                    invoice_number={invoice.invoice_number}
                                    status={invoice.status}
                                    name={invoice?.client_name}
                                />
                            ))}
                            <div className="mt-4 flex">
                                <Paginator meta={meta} />
                            </div>
                        </>
                    )}
                </div>
            </div>

            <CreateInvoice isOpen={open} onClose={() => setOpen(false)} />
            <EditInvoice isOpen={edit} onClose={() => setEdit(false)} />
        </AppLayout>
    );
}
