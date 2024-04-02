'use client';
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
import { CodespaceApp } from '@/types/types';
import { useCodeSpaceContext } from '../../CodeSpaceContext';
import { CheckIcon } from '@radix-ui/react-icons';
import { Cross2Icon } from '@radix-ui/react-icons';
import { format } from 'date-fns';


interface RecentDeployments {
    name: string;
    url: string;
    created: string;
    state: CodespaceApp.DeploymentStates;
    inspectorUrl: string;
    githubCommitMessage: string;
    githubRepo: string;
    githubRepoVisibility: string;
    target: string;
    created_at: string;
    building_at: string;
    ready_at: string;
}

export const columns: ColumnDef<RecentDeployments>[] = [
    {
        accessorKey: 'state',
        header: '',
        enableHiding: false,
        cell: ({ row }) => {
            const state: string = row.getValue('state');
            const IconToDisplay = () => {
                if (!state) return <CheckIcon className='text-gray-500 self-center' />;
                switch (state) {
                    case 'READY':
                        return <CheckIcon className='text-green-500 self-center' />;
                    case 'ERROR':
                        return <Cross2Icon className='text-red-500 ml-2 self-center' />;
                    default:
                        return <CheckIcon className='text-gray-500 ml-2 self-center' />;
                }
            };
            return (
                <div className={`capitalize flex justify-center text-sm h-10 px-4`}>
                    <IconToDisplay />
                </div>
            );
        },
    },
    {
        accessorKey: 'name',
        header: '',
        enableHiding: false,
        cell: ({ row }) => {
            const name: string = row.getValue('name');
            const createdAt: string = row.getValue('created');

            return (
                <div className='capitalize text-xs h-12 px-4 min-w-24 flex justify-center'>
                    <div className='flex flex-col justify-center'>
                        <div className='text-sm'>{name}</div>
                        <div className='text-gray-400 text-xs'>{createdAt}</div>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: 'created',
        id: 'created',
        enableHiding: true,
        cell: ({ row }) => <></>,
    },
    {
        accessorKey: 'githubCommitMessage',
        header: '',
        enableHiding: false,
        cell: ({ row }) => {
            const commit: string = row.getValue('githubCommitMessage');

            return (
                <div className='capitalize h-12 px-4 text-xs max-w-60 overflow-ellipsis line-clamp-2 text-start flex'>
                    <p className='self-center'>{commit}</p>
                </div>
            );
        },
    },
    {
        accessorKey: 'inspectorUrl',
        id: 'inspectorUrl',
        enableHiding: true,
        cell: ({ row }) => <></>,
    },
    {
        accessorKey: 'url',
        header: '',
        enableHiding: false,
        cell: ({ row }) => {
            const url: string = row.getValue('url');
            const inspectorUrl: string = row.getValue('inspectorUrl');
            const state: CodespaceApp.DeploymentStates = row.getValue('state');

            const LinkToDisplay = () => {
                switch (state) {
                    case 'READY':
                        return (
                            <span className='flex flex-row justify-center text-end gap-1'>
                                <Button size='sm' className='self-center bg-emerald-300'>
                                    <a
                                        href={url}
                                        target='_blank'
                                        rel='noreferrer'
                                        className='text-xs'>
                                        Live Site
                                    </a>
                                </Button>
                                <Button variant={'outline'} size='sm' className='self-center'>
                                    <a
                                        href={inspectorUrl}
                                        target='_blank'
                                        rel='noreferrer'
                                        className='text-xs'>
                                        Inspect
                                    </a>
                                </Button>
                            </span>
                        );
                    default:
                        return (
                            <span className='flex flex-row justify-center text-center gap-1'>
                                <Button size='sm' variant={'destructive'} className='self-center before:text-xs cursor-default'>
                                    Unavailable
                                </Button>
                                <Button variant={'outline'} size='sm' className='self-center'>
                                    <a
                                        href={inspectorUrl}
                                        target='_blank'
                                        rel='noreferrer'
                                        className='text-xs'>
                                        Inspect
                                    </a>
                                </Button>
                            </span>
                        );
                }
            };

            return (
                <div className='capitalize text-xs w-full h-12 px-4 flex justify-end'>
                    <LinkToDisplay />
                </div>
            );
        },
    },
];

export function RecentDeployments() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [tablePagination, setTablePagination] = React.useState({
        pageIndex: 0, //initial page index
        pageSize: 8, //default page size
    });

    const { recentBuild } = useCodeSpaceContext();

    const newRecentBuild = recentBuild.map((build) => {
        return {
            name: build.name,
            url: build.url,
            created: format(new Date(build.created_at), 'MM/dd/yy'),
            state: build.state,
            inspectorUrl: build.url,
            githubCommitMessage: build.meta.githubCommitMessage,
            githubRepo: build.meta.githubRepo,
            githubRepoVisibility: build.meta.githubRepoVisibility,
            target: build.target,
            createdAt: build.created_at,
            buildingAt: build.building_at,
            readyAt: build.ready_at,
        };
    });

    const table = useReactTable({
        //@ts-ignore
        data: newRecentBuild,
        //@ts-ignore
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
        Math.ceil(recentBuild.length / table.getState().pagination.pageSize) - 1;

    return (
        <div className='w-full'>
            <div className='rounded-md'>
                <Table>
                    <TableBody className='border-y'>
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
                <div className='flex items-center justify-end space-x-2 py-4 px-4'>
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
        </div>
    );
}
