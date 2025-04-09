import { Sheet, SheetTrigger } from '@/components/ui/sheet';

interface InvoiceSheetProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

export function InvoiceSheet({ isOpen, onClose, children, title }: InvoiceSheetProps) {
    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    };

    return (
        <Sheet open={isOpen} onOpenChange={onChange}>
            <SheetTrigger asChild></SheetTrigger>
        </Sheet>
    );
}
