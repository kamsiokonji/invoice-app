import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';

interface DeleteInvoiceProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading?: boolean;
    invoice_number: number;
}

export function DeleteInvoice({ open, onClose, onConfirm, loading, invoice_number }: DeleteInvoiceProps) {
    return (
        <Modal title={'Confirm Deletion'} isOpen={open} onClose={onClose}>
            <div className="flex flex-col gap-6">
                <h1>Are you sure you want to delete invoice #{invoice_number}? This action cannot be undone.</h1>

                <div className="flex items-center justify-end gap-3">
                    <Button
                        className="text-tertiary rounded-3xl bg-[#f9fafe] py-6 font-semibold hover:bg-[#f9fafe] dark:text-[#888eb0]"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>

                    <Button variant="destructive" disabled={loading} asChild>
                        <button type="submit" onClick={onConfirm}>
                            Delete
                        </button>
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
