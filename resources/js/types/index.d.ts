import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

interface Invoice {
    id: number;
    invoice_number: number;
    status: string;
    due_date: string;
    project_description: string;
    payment_terms: number;
    created_at?: string;
    updated_at?: string;
    customer: Customer;
    items: InvoiceItem[];
}

interface PaginationMeta {
    current_page: number;
    per_page: number;
    from: number | null;
    to: number | null;
    path: string;
    first_page_url: string;
    prev_page_url: string | null;
    next_page_url: string | null;
    total: number;
}

interface Customer {
    id: number;
    client_name: string;
    client_email: string;
    to_address: string;
    from_address: string;
    to_city: string;
    from_city: string;
    to_zipcode: string;
    from_zipcode: string;
    to_country: string;
    from_country: string;
}

interface InvoiceData {
    data: Invoice[];
    meta: PaginationMeta;
}

interface PageProps extends SharedData {
    data: InvoiceData;
}
interface InvoiceForm {
    status: string;
    due_date: string;
    project_description: string;
    payment_terms: string | number;
    items: InvoiceItem[];
    from_address: string;
    from_city: string;
    from_zipcode: string;
    from_country: string;
    to_address: string;
    to_city: string;
    to_zipcode: string;
    to_country: string;
    client_name: string;
    client_email: string;
    [key: string]: FormDataConvertible;
}

interface InvoiceItem {
    name: string;
    quantity: number;
    price: number;
    total?: number;
}
