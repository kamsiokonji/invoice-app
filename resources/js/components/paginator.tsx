import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from '@/components/ui/pagination';
import { Link } from '@inertiajs/react';

import { PaginationMeta } from '@/types';

interface PaginatorProps {
  meta: PaginationMeta;
  className?: string;
}

export function Paginator({ meta, className }: PaginatorProps) {
  // If there's only one page, don't show pagination
  if (meta.last_page === 1 || meta.total <= meta.per_page) {
    return null;
  }

  // Generate page numbers to show
  const generatePageNumbers = () => {
    const currentPage = meta.current_page;
    const lastPage = meta.last_page || Math.ceil(meta.total / meta.per_page);

    const pages = [];

    // Always include first page
    pages.push(1);

    // Calculate range around current page
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(lastPage - 1, currentPage + 1);

    // Add ellipsis after first page if needed
    if (startPage > 2) {
      pages.push('ellipsis-start');
    }

    // Add pages around current page
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add ellipsis before last page if needed
    if (endPage < lastPage - 1) {
      pages.push('ellipsis-end');
    }

    // Always include last page if it's not the first page
    if (lastPage > 1) {
      pages.push(lastPage);
    }

    return pages;
  };

  // Function to generate URL for a specific page
  const getPageUrl = (page: number) => {
    const baseUrl = meta.path;
    const separator = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${separator}page=${page}`;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <Pagination className={className}>
      <PaginationContent>
        {/* Previous Page Button - Use Link directly with styled className */}
        <PaginationItem>
          {meta.prev_page_url ? (
            <Link href={meta.prev_page_url} className="flex items-center gap-1 text-sm font-medium">
              <span className="sr-only">Previous page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              <span>Previous</span>
            </Link>
          ) : (
            <span className="pointer-events-none flex items-center gap-1 text-sm font-medium opacity-50" aria-disabled="true">
              <span className="sr-only">Previous page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              <span>Previous</span>
            </span>
          )}
        </PaginationItem>

        {/* Page Numbers */}
        {pageNumbers.map((page, index) => {
          if (page === 'ellipsis-start' || page === 'ellipsis-end') {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === meta.current_page;

          return (
            <PaginationItem key={pageNum}>
              <Link
                href={getPageUrl(pageNum)}
                className={`flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium ${
                  isActive
                    ? 'bg-secondary text-primary-foreground'
                    : 'ring-offset-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {pageNum}
              </Link>
            </PaginationItem>
          );
        })}

        {/* Next Page Button */}
        <PaginationItem>
          {meta.next_page_url ? (
            <Link href={meta.next_page_url} className="flex items-center gap-1 text-sm font-medium">
              <span>Next</span>
              <span className="sr-only">Next page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Link>
          ) : (
            <span className="pointer-events-none flex items-center gap-1 text-sm font-medium opacity-50" aria-disabled="true">
              <span>Next</span>
              <span className="sr-only">Next page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </span>
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
