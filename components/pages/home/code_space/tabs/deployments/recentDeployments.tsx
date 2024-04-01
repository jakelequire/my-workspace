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

import styles from './recentDeployments.module.css';
/*
    export interface VercelDeploymentResponse {
        name: string;
        url: string;
        created: string;
        state: string;
        inspectorUrl: string;
        meta : {
            githubCommitMessage: string;
            githubRepo: string;
            githubRepoVisibility: string;
        };
        target: string;
        created_at: string;
        building_at: string;
        ready_at: string;
    }
*/

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
        cell: ({ row }) => {
            const name: string = row.getValue('name');
            const createdAt: string = row.getValue('created');

            return (
                <div className='capitalize text-xs h-10 px-4'>
                    <div className='flex flex-col'>
                        <div>{name}</div>
                        <div className='text-gray-400 text-xs'>{createdAt}</div>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: 'githubCommitMessage',
        header: '',
        cell: ({ row }) => {
            const commit: string = row.getValue('githubCommitMessage');

            return (
                <div className='capitalize h-10 px-4 text-xs max-w-52 overflow-ellipsis line-clamp-2'>
                    {commit}
                </div>
            );
        },
    },
    {
        accessorKey: 'url',
        header: '',
        cell: ({ row }) => {
            const url: string = row.getValue('url');
            const inspectorUrl: string = row.getValue('inspectorUrl');
            const state: CodespaceApp.DeploymentStates = row.getValue('state');

            const LinkToDisplay = () => {
                switch (state) {
                    case 'READY':
                        return (
                            <span className='flex flex-col justify-center text-end gap-1'>
                                <a
                                    href={url}
                                    target='_blank'
                                    rel='noreferrer'
                                    className='h-full w-full self-center hover:underline-offset-2 hover:underline '>
                                    Live Site
                                </a>
                                <a
                                    href={inspectorUrl}
                                    target='_blank'
                                    rel='noreferrer'
                                    className='h-full w-full self-center hover:underline-offset-2 hover:underline '>
                                    View Build
                                </a>
                            </span>
                        );
                    default:
                        return (
                            <span className='flex flex-col justify-center text-center gap-1'>
                                <p className='h-full w-full self-center text-red-500 font-semibold'>
                                    Unavailable
                                </p>
                                <a
                                    href={inspectorUrl}
                                    target='_blank'
                                    rel='noreferrer'
                                    className='h-full w-full self-center hover:underline-offset-2 hover:underline '>
                                    View Build
                                </a>
                            </span>
                        );
                }
            };

            return (
                <div className='capitalize text-xs h-10 px-4'>
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
        pageSize: 9, //default page size
    });

    const { recentBuild } = useCodeSpaceContext();

    const newRecentBuild = recentBuild.map((build) => {
        return {
            name: build.name,
            url: build.url,
            created: format(new Date(build.created_at), 'MMM dd, yyyy'),
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
