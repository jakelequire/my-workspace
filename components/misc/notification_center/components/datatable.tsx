"use client";
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
    TableRow,
} from '@/components/ui/table';
import { useGlobalContext } from '@/components/GlobalContext';
import { Notification } from '@/types/client/notificationsApp';

type Props = {
    data: Notification[];
}


export const columns: ColumnDef<Notification>[] = [
    {
        accessorKey: 'title',
        header: 'Title',
        cell: ({ row }) => <div className='capitalize text-sm'>{row.getValue('title')}</div>,
    },
    {
        accessorKey: 'body',
        header: 'Body',
        cell: ({ row }) => <div className='capitalize text-sm'>{row.getValue('body')}</div>,
    }
];

export default function DataTable( { data }: Props ): JSX.Element {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [tablePagination, setTablePagination] = React.useState({
        pageIndex: 0, //initial page index
        pageSize: 9, //default page size
    });


    const table = useReactTable({
        data: data,
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
        manualPagination: false,
        pageCount: 1,
    });


    return (
        <div className='w-full h-full'>
            <div className='rounded-md p-6'>
                <Table>
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
        </div>
    );
}
