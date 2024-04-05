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
import { Button } from '@/components/ui/button';
import { useGlobalContext } from '@/components/GlobalContext';
import { Todo } from '@/types/types';
import { ListBulletIcon, HamburgerMenuIcon } from '@radix-ui/react-icons';

export const columns: ColumnDef<Todo.TodoItem>[] = [
    {
        accessorKey: 'title',
        header: 'Title',
        cell: ({ row }) => <div className='capitalize text-sm'>{row.getValue('title')}</div>,
    },
    {
        accessorKey: 'priority',
        header: 'Priority',
        cell: ({ row }) => <div className='capitalize text-sm'>{row.getValue('priority')}</div>,
    },
    {
        accessorKey: 'category',
        header: 'Category',
        cell: ({ row }) => <div className='capitalize text-sm'>{row.getValue('category')}</div>,
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => <div className='capitalize text-sm'>{row.getValue('status')}</div>,
    },
    {
        accessorKey: 'due',
        header: 'Due',
        cell: ({ row }) => <div className='capitalize text-sm'>{row.getValue('due')}</div>,
    },
];

export function TodoWidget() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [tablePagination, setTablePagination] = React.useState({
        pageIndex: 0, //initial page index
        pageSize: 9, //default page size
    });

    const { todoList } = useGlobalContext();

    const table = useReactTable({
        data: todoList,
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
        pageCount: 1,
    });

    const isLastPage =
    table.getState().pagination.pageIndex >=
    Math.ceil(todoList.length / table.getState().pagination.pageSize) - 1;

    return (
        <div className='w-full h-full'>
            <div className='flex items-center justify-between w-full pl-8 pt-4'>
                <a href='/home/tasks' className='flex flex-row justify-center'>
                    <h1 className='text-xl font-bold'>Todo List</h1>
                    <ListBulletIcon className='w-5 h-5 ml-4 self-center' />
                </a>
                {/* TODO:
                    Implement a dropdown menu to choose from different widgets.
                    The idea is to make the UI more dynamic.
                */}
                <a className='flex items-center self-end w-fit h-full'>
                    <HamburgerMenuIcon color={'#636363'} className='w-5 h-5 mr-4' />
                </a>
            </div>

            <div className='rounded-md p-6'>
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
                    <TableBody className=''>
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
            <div className='flex items-center justify-end space-x-2 py-4 mr-5'>
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
