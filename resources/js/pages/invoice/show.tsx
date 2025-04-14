import TextLink from '@/components/text-link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';

export default function ShowInvoice() {
    const status = 'Paid';
    const isMobile = useIsMobile();

    return (
        <AppLayout>
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
                                <Badge variant={status === 'Paid' ? 'success' : 'pending'} className="flex items-center gap-2 font-bold">
                                    <span className={cn('h-2 w-2 rounded-full', status === 'Paid' ? 'bg-[#33D69F]' : 'bg-[#FF8F00]')} />

                                    <span>{status}</span>
                                </Badge>
                            </div>

                            <div className="hidden items-center gap-3 md:flex">
                                <Button className="text-tertiary rounded-3xl bg-[#f9fafe] py-6 font-semibold hover:bg-[#f9fafe] dark:text-[#888eb0]">
                                    Edit
                                </Button>

                                <Button className="rounded-3xl py-6 font-semibold" variant={'destructive'}>
                                    Delete
                                </Button>
                                <Button className="rounded-3xl py-6 font-semibold">Mark as Paid</Button>
                            </div>
                        </div>
                    </Card>

                    <Card className="space-y-6 border-none p-6">
                        <div className="flex flex-col items-start justify-between gap-y-8 md:flex-row md:items-center">
                            <div className="space-y-2">
                                <span className="flex items-center font-bold">
                                    <h1 className="text-[#7e88c3]">#</h1>
                                    <p>90210</p>
                                </span>{' '}
                                <p className="text-tertiary text-sm">Graphic design</p>
                            </div>

                            <div className="text-tertiary space-y-1 text-start text-sm md:text-end">
                                <h1>91 Bradford Way</h1>
                                <h1>London</h1>
                                <h1>E1342</h1>
                                <h1>United Kingdom</h1>
                            </div>
                        </div>

                        <div className="grid w-5/6 grid-cols-2 gap-y-5 md:grid-cols-3">
                            <div className="space-y-3">
                                <h1 className="text-tertiary text-sm">Invoice Date</h1>
                                <h1 className="font-semibold">21 Aug, 2025</h1>
                            </div>

                            <div className="space-y-3">
                                <h1 className="text-tertiary text-sm">Bill To</h1>
                                <h1 className="font-semibold">Alex Grim</h1>
                            </div>

                            <div className="space-y-3">
                                <h1 className="text-tertiary text-sm">Sent To</h1>
                                <h1 className="font-semibold">alexgrim@gmail.com</h1>
                            </div>
                        </div>

                        <div className="grid w-5/6 grid-cols-2 md:grid-cols-3">
                            <div className="space-y-3">
                                <h1 className="text-tertiary text-sm">Payment Due</h1>
                                <h1 className="font-semibold">21 Aug, 2025</h1>
                            </div>

                            <div className="text-tertiary space-y-1 text-sm">
                                <h1>91 Bradford Way</h1>
                                <h1>London</h1>
                                <h1>E1342</h1>
                                <h1>United Kingdom</h1>
                            </div>
                        </div>

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
                                            {[1, 2].map((_, index) => (
                                                <tr key={index} className="font-semibold">
                                                    <td className="py-1 text-left">Item {index}</td>
                                                    <td className="text-tertiary py-1 text-right">1</td>
                                                    <td className="text-tertiary py-1 text-right">£ 20.00</td>
                                                    <td className="py-1 text-right">£ 20.00</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </Card>
                            ) : (
                                <Card className="rounded-br-none rounded-bl-none border-none bg-[#f9fafe] p-6 shadow-none dark:bg-[#252945]">
                                    <div>
                                        {[1, 2].map((_, index) => (
                                            <div className="flex flex-col gap-6" key={index}>
                                                <div className="flex items-center justify-between">
                                                    <div className="space-y-1 py-2 font-semibold">
                                                        <h1>Item {index}</h1>
                                                        <h1 className="text-sm text-[#7e88c3]">1 x £ 20.00</h1>
                                                    </div>

                                                    <div>
                                                        <h1 className="font-semibold">£ 20.00</h1>
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
                                    <h1 className="text-xl font-semibold">£ 20.00</h1>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {isMobile && (
                        <div className="bg-card p-6">
                            <div className="flex gap-3">
                                <Button className="text-tertiary flex w-1/3 justify-center rounded-3xl bg-[#f9fafe] py-6 font-semibold hover:bg-[#f9fafe] dark:text-[#888eb0]">
                                    Edit
                                </Button>

                                <Button className="flex w-1/2 justify-center rounded-3xl py-6 font-semibold" variant={'destructive'}>
                                    Delete
                                </Button>
                                <Button className="flex w-1/2 justify-center rounded-3xl py-6 font-semibold">Mark as Paid</Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
