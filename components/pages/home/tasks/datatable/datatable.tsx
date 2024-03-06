'use client';
import * as React from 'react';
import { CaretSortIcon, ChevronDownIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
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

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

export type TodoItem = {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    status: 'not started' | 'in-progress' | 'completed';
    started: string;
    due: string;
};

const exampleData: TodoItem[] = [
    {
        id: '1',
        title: 'Create a new website',
        description: 'Create a new website for the company.',
        completed: false,
        status: 'not started',
        started: '2022-01-01',
        due: '2022-01-31',
    },
    {
        id: '2',
        title: 'Update the blog',
        description: 'Update the blog with new content.',
        completed: false,
        status: 'not started',
        started: '2022-01-01',
        due: '2022-01-31',
    },
    {
        id: '3',
        title: 'Create a new website',
        description: 'Create a new website for the company.',
        completed: false,
        status: 'not started',
        started: '2022-01-01',
        due: '2022-01-31',
    },
    {
        id: '4',
        title: 'Create a new website',
        description: 'Create a new website for the company.',
        completed: false,
        status: 'not started',
        started: '2022-01-01',
        due: '2022-01-31',
    },
    {
        id: '5',
        title: 'Create a new website',
        description: 'Create a new website for the company.',
        completed: false,
        status: 'not started',
        started: '2022-01-01',
        due: '2022-01-31',
    },
];

export const columns: ColumnDef<TodoItem>[] = [
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
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label='Select row'
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'title',
        header: 'Title',
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("title")}</div>
        )
    },
    {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("description")}</div>
        )
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("status")}</div>
        )
    },
    {
        accessorKey: 'started',
        header: 'Started',
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("started")}</div>
        )
    },
    {
        accessorKey: 'due',
        header: 'Due',
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("due")}</div>
        )
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const todo = row.original;

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
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(todo.id)}>
                            Copy todo ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export function DataTable() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data: exampleData,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div className='w-full'>
            <div className='flex items-center py-4'>
                <Input
                    placeholder='Filter Tasks...'
                    value={(table.getColumn('task')?.getFilterValue() as string) ?? ''}
                    onChange={(event) =>
                        table.getColumn('task')?.setFilterValue(event.target.value)
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
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
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
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}>
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
