import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import React from 'react';

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
      <SheetContent side="right" sidebarWidth="103px" aria-describedby="sheet-content">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold">{title}</SheetTitle>
        </SheetHeader>

        <ScrollArea className="mt-4 h-[calc(100vh-200px)]">
          <div className="px-10 py-6 text-sm">{children}</div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
