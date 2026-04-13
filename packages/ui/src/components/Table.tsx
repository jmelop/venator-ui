import { forwardRef } from 'react';
import type { HTMLAttributes, TableHTMLAttributes, ThHTMLAttributes, TdHTMLAttributes } from 'react';

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className = '', ...props }, ref) => (
    <div className="w-full overflow-x-auto">
      <table
        ref={ref}
        className={`w-full text-sm text-neutral-700 border-collapse ${className}`}
        {...props}
      />
    </div>
  ),
);
Table.displayName = 'Table';

export interface TableHeaderProps extends HTMLAttributes<HTMLTableSectionElement> {}

export const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className = '', ...props }, ref) => (
    <thead ref={ref} className={className} {...props} />
  ),
);
TableHeader.displayName = 'TableHeader';

export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {}

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className = '', ...props }, ref) => (
    <tbody ref={ref} className={className} {...props} />
  ),
);
TableBody.displayName = 'TableBody';

export interface TableFooterProps extends HTMLAttributes<HTMLTableSectionElement> {}

export const TableFooter = forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className = '', ...props }, ref) => (
    <tfoot ref={ref} className={`bg-neutral-50 font-medium dark:bg-neutral-800 ${className}`} {...props} />
  ),
);
TableFooter.displayName = 'TableFooter';

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className = '', ...props }, ref) => (
    <tr
      ref={ref}
      className={`border-b border-neutral-200 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800 ${className}`}
      {...props}
    />
  ),
);
TableRow.displayName = 'TableRow';

export interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {}

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className = '', ...props }, ref) => (
    <th
      ref={ref}
      className={`px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider bg-neutral-50 dark:bg-neutral-800 dark:text-neutral-400 ${className}`}
      {...props}
    />
  ),
);
TableHead.displayName = 'TableHead';

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className = '', ...props }, ref) => (
    <td ref={ref} className={`px-4 py-3 text-neutral-700 dark:text-neutral-300 ${className}`} {...props} />
  ),
);
TableCell.displayName = 'TableCell';

export interface TableCaptionProps extends HTMLAttributes<HTMLTableCaptionElement> {}

export const TableCaption = forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  ({ className = '', ...props }, ref) => (
    <caption ref={ref} className={`mt-4 text-sm text-neutral-500 ${className}`} {...props} />
  ),
);
TableCaption.displayName = 'TableCaption';
