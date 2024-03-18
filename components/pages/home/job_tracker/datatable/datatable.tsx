'use client';
import * as React from 'react';
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';

import { ChevronDownIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import ArchiveButton from './archiveButton';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { JT } from '@/types/types';
import { useGlobalContext } from '@/components/GlobalContext';


export const columns: ColumnDef<JT.JobItem>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label='Select all'
                className='border-input'
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label='Select row'
                className='border-input'
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'companyName',
        header: 'Company',
        cell: ({ row }) => <a className='capitalize'>{row.getValue('companyName')}</a>,
    },
    {
        accessorKey: 'position',
        header: 'Position',
        cell: ({ row }) => <div className='capitalize'>{row.getValue('position')}</div>,
    },
    {
        accessorKey: 'payRange',
        header: 'Pay Range',
        cell: ({ row }) => <div className='capitalize'>{row.getValue('payRange')}</div>,
    },
    {
        accessorKey: 'location',
        header: 'Location',
        cell: ({ row }) => <div className='capitalize'>{row.getValue('location')}</div>,
    },
    {
        accessorKey: 'applicationType',
        header: 'Type',
        cell: ({ row }) => <div className='capitalize'>{row.getValue('applicationType')}</div>,
    },
    {
        accessorKey: 'dateapplied',
        header: 'Date Applied',
        cell: ({ row }) => <div className='capitalize'>{row.getValue('dateapplied')}</div>,
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => <div className='capitalize'>{row.getValue('status')}</div>,
    },
    {
        accessorKey: 'jobLink',
        header: 'Link',
        cell: ({ row }) => (
            <a
                href={row.getValue('jobLink')}
                className='capitalize max-w-20 overflow-clip hover:underline '>
                View Job
            </a>
        ),
    },
    {
        accessorKey: 'archive',
        header: '',
        cell: ({ row }) => (
            <ArchiveButton id={row.original.id} />
        ),
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const job = row.original;
            const deleteItem = async () => {
                const response = await fetch('/api/firestore/jobs', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: job.id }),
                });
                if (!response.ok) {
                    console.error('Failed to delete job');
                }
            }

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='ghost' className='h-8 w-8 p-0'>
                            <span className='sr-only'>Open menu</span>
                            <DotsHorizontalIcon className='h-4 w-4' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => {}}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={deleteItem}>Delete</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(job.id)}>
                            Copy ID
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export function DataTable({ jobItem }: { jobItem: JT.JobItem[] }): JSX.Element {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [tablePagination, setTablePagination] = React.useState({
        pageIndex: 0, //initial page index
        pageSize: 7, //default page size
    });

    const table = useReactTable({
        data: jobItem,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setTablePagination,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination: {
                ...tablePagination,
            },
        },
        manualPagination: false, // Set to false if your data is client-side
        pageCount: -1,
    });

    const isLastPage =
        table.getState().pagination.pageIndex >=
        Math.ceil(jobItem.length / table.getState().pagination.pageSize) - 1;

    return (
        <div className='w-full'>
            <div className='flex items-end py-4 gap-2'>
                <Input
                    placeholder='Filter By Company...'
                    value={(table.getColumn('companyName')?.getFilterValue() as string) ?? ''}
                    onChange={(event) =>
                        table.getColumn('companyName')?.setFilterValue(event.target.value)
                    }
                    className='max-w-sm'
                />
                <Input
                    placeholder='Filter By Position...'
                    value={(table.getColumn('position')?.getFilterValue() as string) ?? ''}
                    onChange={(event) =>
                        table.getColumn('position')?.setFilterValue(event.target.value)
                    }
                    className='max-w-sm'
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='outline' className='ml-auto'>
                            Columns <ChevronDownIcon className='ml-2 h-4 w-4' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className='capitalize'
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value: any) =>
                                            column.toggleVisibility(!!value)
                                        }>
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className='rounded-md border'>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row, index) => (
                                <TableRow
                                    key={row.id}
                                    id={jobItem[index].id}
                                    data-state={row.getIsSelected() && 'selected'}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className='h-24 text-center'>
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className='flex items-center justify-end space-x-2 py-4'>
                <div className='flex-1 text-sm text-muted-foreground'>
                    {table.getFilteredSelectedRowModel().rows.length} of{' '}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className='space-x-2'>
                    <Button
                        variant='outline'
                        size='sm'
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}>
                        Previous
                    </Button>
                    <Button
                        variant='outline'
                        size='sm'
                        onClick={() => {
                            table.nextPage();
                        }}
                        disabled={isLastPage || !table.getCanNextPage()}>
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
