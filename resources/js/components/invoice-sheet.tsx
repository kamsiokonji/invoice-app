import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';

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
            <SheetContent side="right" sidebarWidth="103px">
                <div>
                    <SheetHeader>
                        <SheetTitle className="text-xl font-bold">{title}</SheetTitle>
                    </SheetHeader>

                    <SheetDescription>{children}</SheetDescription>
                </div>
            </SheetContent>
        </Sheet>
    );
}
