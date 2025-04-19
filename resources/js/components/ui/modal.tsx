import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';


interface ModalProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

export function Modal ({isOpen, onClose, children, title}: ModalProps) {
    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onChange}>
            <DialogContent>
                <DialogTitle className='text-2xl'>{title}</DialogTitle>
                    {children}
            </DialogContent>
        </Dialog>
    )
}
