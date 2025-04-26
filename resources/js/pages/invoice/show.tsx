import { DeleteInvoice } from '@/components/delete-invoice';
import TextLink from '@/components/text-link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import AppLayout from '@/layouts/app-layout';
import { cn, formatDate } from '@/lib/utils';
import EditInvoice from '@/pages/invoice/edit';
import { SharedData } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

export default function ShowInvoice() {
    const isMobile = useIsMobile();
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);

    const { data } = usePage<SharedData>().props;

    const { delete: destroy, processing } = useForm({
        id: data?.id,
    });

    const { patch, processing: processingStatus } = useForm({
        status: 'paid',
    });

    const deleteInvoice: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('invoice.destroy', data?.id), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
        });
    };

    const updateStatus: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('invoice.update.status', data?.id), {
            preserveScroll: true,
        });
    };

    const closeModal = () => {
        setOpen(false);
    };

    return (
        <AppLayout>
            <Head title={String(data?.invoice_number)} />
            <div className="mx-auto mt-10 flex w-full max-w-3xl flex-col gap-4 p-4">
                <TextLink href={route('invoice.index')} className="flex cursor-pointer items-center gap-3 text-sm no-underline hover:underline">
                    <img src="/arrow.png" alt="back-arrow" className="rotate-180" />
                    <h1 className="font-semibold">Go Back</h1>
                </TextLink>
                <div className="flex flex-col gap-6">
                    <Card className="border-none p-6">
                        <div className={isMobile ? '' : 'flex items-center justify-between'}>
                            <div className="flex items-center justify-between gap-3">
                                <h1 className="text-tertiary text-sm">Status</h1>
                                <Badge
                                    variant={data?.status === 'paid' ? 'success' : data?.status === 'draft' ? 'draft' : 'pending'}
                                    className="flex items-center gap-2 font-bold"
                                >
                                    <span
                                        className={cn(
                                            'h-2 w-2 rounded-full',
                                            data?.status === 'paid'
                                                ? 'bg-[#33D69F]'
                                                : data?.status === 'pending'
                                                  ? 'bg-[#FF8F00]'
                                                  : 'bg-[#373B53] dark:bg-[#dfe3fa]',
                                        )}
                                    />
                                    <span className="capitalize">{data?.status}</span>
                                </Badge>
                            </div>

                            <div className="hidden items-center gap-3 md:flex">
                                <Button
                                    onClick={() => setEdit(true)}
                                    className="text-tertiary rounded-3xl bg-[#f9fafe] py-6 font-semibold hover:bg-[#f9fafe] dark:text-[#888eb0]"
                                >
                                    Edit
                                </Button>

                                <Button className="rounded-3xl py-6 font-semibold" variant={'destructive'} onClick={() => setOpen(true)}>
                                    Delete
                                </Button>
                                <Button
                                    className="rounded-3xl py-6 font-semibold"
                                    disabled={processingStatus || data?.status === 'paid'}
                                    onClick={updateStatus}
                                >
                                    {processingStatus && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    Mark as Paid
                                </Button>
                            </div>
                        </div>
                    </Card>

                    <Card className="space-y-6 border-none p-6">
                        <div className="flex flex-col items-start justify-between gap-y-8 md:flex-row md:items-center">
                            <div className="space-y-2">
                                <span className="flex items-center font-bold">
                                    <h1 className="text-[#7e88c3]">#</h1>
                                    <p>{data?.invoice_number}</p>
                                </span>{' '}
                                <p className="text-tertiary text-sm capitalize">{data?.project_description}</p>
                            </div>

                            <div className="text-tertiary space-y-1 text-start text-sm md:text-end">
                                <h1 className="capitalize">{data?.from_address}</h1>
                                <h1 className="capitalize">{data?.from_city}</h1>
                                <h1>{data?.from_zipcode}</h1>
                                <h1 className="capitalize">{data?.from_country}</h1>
                            </div>
                        </div>

                        <div className="grid w-5/6 grid-cols-2 gap-y-5 md:grid-cols-3">
                            <div className="space-y-3">
                                <h1 className="text-tertiary text-sm">Invoice Date</h1>
                                <h1 className="font-semibold">{formatDate(data.created_at)}</h1>
                            </div>

                            <div className="space-y-3">
                                <h1 className="text-tertiary text-sm">Bill To</h1>
                                <h1 className="font-semibold capitalize">{data?.client_name}</h1>
                            </div>

                            <div className="space-y-3">
                                <h1 className="text-tertiary text-sm">Sent To</h1>
                                <h1 className="font-semibold">{data?.client_email}</h1>
                            </div>
                        </div>

                        <div className="grid w-5/6 grid-cols-2 md:grid-cols-3">
                            <div className="space-y-3">
                                <h1 className="text-tertiary text-sm">Payment Due</h1>
                                <h1 className="font-semibold">{formatDate(data.due_date)}</h1>
                            </div>

                            <div className="text-tertiary space-y-1 text-sm">
                                <h1 className="capitalize">{data?.to_address}</h1>
                                <h1 className="capitalize">{data?.to_city}</h1>
                                <h1>{data?.to_zipcode}</h1>
                                <h1 className="capitalize">{data?.to_country}</h1>
                            </div>
                        </div>

                        {data?.items && data?.items.length > 0 && (
                            <div>
                                {!isMobile ? (
                                    <Card className="rounded-br-none rounded-bl-none border-none bg-[#f9fafe] p-6 shadow-none dark:bg-[#252945]">
                                        <table className="w-full border-separate border-spacing-y-3">
                                            <thead>
                                                <tr className="text-tertiary text-sm">
                                                    <th className="pb-4 text-left">Item Name</th>
                                                    <th className="pb-4 text-right">QTY.</th>
                                                    <th className="pb-4 text-right">Price</th>
                                                    <th className="pb-4 text-right">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.items.map((item, index) => (
                                                    <tr key={index} className="font-semibold">
                                                        <td className="py-1 text-left capitalize">{item.name}</td>
                                                        <td className="text-tertiary py-1 text-right">{item.quantity}</td>
                                                        <td className="text-tertiary py-1 text-right">£ {item.price.toFixed(2)}</td>
                                                        <td className="py-1 text-right">£ {item?.total?.toFixed(2)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </Card>
                                ) : (
                                    <Card className="rounded-br-none rounded-bl-none border-none bg-[#f9fafe] p-6 shadow-none dark:bg-[#252945]">
                                        <div>
                                            {data.items.map((item, index) => (
                                                <div className="flex flex-col gap-6" key={index}>
                                                    <div className="flex items-center justify-between">
                                                        <div className="space-y-1 py-2 font-semibold">
                                                            <h1 className="capitalize">{item.name}</h1>
                                                            <h1 className="text-sm text-[#7e88c3]">
                                                                {item.quantity} x £ {item.price.toFixed(2)}
                                                            </h1>
                                                        </div>

                                                        <div>
                                                            <h1 className="font-semibold">£ {item?.total?.toFixed(2)}</h1>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </Card>
                                )}

                                <div className="rounded-br-xl rounded-bl-xl bg-[#373b53] p-6 dark:bg-[#0c0e16]">
                                    <div className="flex items-center justify-between text-white">
                                        <h1 className="text-sm">Amount Due</h1>
                                        <h1 className="text-xl font-semibold">£ {data?.total_amount.toFixed(2)}</h1>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Card>

                    {isMobile && (
                        <div className="bg-card p-6">
                            <div className="flex gap-3">
                                <Button
                                    onClick={() => setEdit(true)}
                                    className="text-tertiary w-1/3 rounded-3xl bg-[#f9fafe] py-6 font-semibold hover:bg-[#f9fafe] dark:text-[#888eb0]"
                                >
                                    Edit
                                </Button>

                                <Button className="w-1/2 rounded-3xl py-6 font-semibold" variant={'destructive'} onClick={() => setOpen(true)}>
                                    Delete
                                </Button>
                                <Button
                                    className="w-1/2 rounded-3xl py-6 font-semibold"
                                    disabled={processingStatus || data?.status === 'paid'}
                                    onClick={updateStatus}
                                >
                                    Mark as Paid
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <DeleteInvoice
                open={open}
                onClose={closeModal}
                onConfirm={(e) => {
                    deleteInvoice(e);
                }}
                invoice_number={data.invoice_number}
                loading={processing}
            />

            <EditInvoice isOpen={edit} onClose={() => setEdit(false)} />
        </AppLayout>
    );
}
