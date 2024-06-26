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
import { useTaskContext } from '../TaskContext';
import { Todo } from '@/types/types';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

import { SkeletonDemo } from './skeleton';
import CompletedBtn from './editing/inlineEditing/completedBtn';
import EditStatusBtn from './editing/inlineEditing/statusBtn';
import PopupEditor from './editing/popupEditor';
import ViewTask from './view_task/viewTask';

const menuHeaderStyle = 'text-font-semibold text-sm text-muted-foreground tracking-wider';

export const columns: ColumnDef<Todo.TodoItem>[] = [
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
        accessorKey: 'complete',
        header: '',
        cell: ({ row }) => {
            const id = row.original.id;
            return <CompletedBtn id={id} />;
        },
    },
    {
        accessorKey: 'title',
        header: 'Title',
        cell: ({ row }) => (
            <p className='capitalize'>
                <ViewTask id={row.original.id} className="cursor-default">
                    {row.getValue('title')}
                </ViewTask>
            </p>
        ),
    },
    {
        accessorKey: 'priority',
        header: 'Priority',
        cell: ({ row }) => (
            <div className='capitalize flex'>
                <ViewTask id={row.original.id} className="cursor-default">
                    {row.getValue('priority')}
                </ViewTask>
            </div>
        ),
    },
    {
        accessorKey: 'category',
        header: 'Category',
        cell: ({ row }) => (
            <div className='capitalize'>
                <ViewTask id={row.original.id} className="cursor-default">
                    {row.getValue('category')}
                </ViewTask>
            </div>
        ),
    },
    {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) => (
            <div className='capitalize line-clamp-2 max-w-80 overflow-ellipsis'>
                <ViewTask
                    id={row.original.id}
                    className='h-fit max-w-80 line-clamp-2 overflow-ellipsis cursor-default'>
                    {row.getValue('description')}
                </ViewTask>
            </div>
        ),
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const id = row.original.id;
            const status = row.getValue('status');
            return <EditStatusBtn id={id} currentStatus={status as Todo.Status} />;
        },
    },
    {
        accessorKey: 'started',
        header: 'Started',
        cell: ({ row }) => (
            <div className='capitalize'>
                <ViewTask id={row.original.id} className="cursor-default">
                    {row.getValue('started')}
                </ViewTask>
            </div>
        ),
    },
    {
        accessorKey: 'due',
        header: 'Due',
        cell: ({ row }) => (
            <div className='capitalize'>
                <ViewTask id={row.original.id} className="cursor-default">
                    {row.getValue('due')}
                </ViewTask>
            </div>
        ),
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
                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                            onClick={(e) => {
                                e.preventDefault();
                            }}>
                            <ViewTask id={todo.id} className='w-full h-full'>
                                <p className='text-white'>View</p>
                            </ViewTask>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            onClick={(e) => {
                                e.preventDefault();
                            }}>
                            <PopupEditor id={todo.id} className='w-full h-full'>
                                <p className='text-white'>Edit</p>
                            </PopupEditor>
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => {}}>Delete</DropdownMenuItem>
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
    const [categoryFilter, setCategoryFilter] = React.useState('Category');
    const [priorityFilter, setPriorityFilter] = React.useState('Priority');
    const [statusFilter, setStatusFilter] = React.useState('Status');
    const [tablePagination, setTablePagination] = React.useState({
        pageIndex: 0, //initial page index
        pageSize: 12, //default page size
    });

    const { todoItems } = useTaskContext();

    const table = useReactTable({
        data: todoItems,
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
        Math.ceil(todoItems.length / table.getState().pagination.pageSize) - 1;

    return (
        <div className='w-full'>
            <div className='flex items-end py-4'>
                <Input
                    placeholder='Filter By Title...'
                    value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
                    onChange={(event) =>
                        table.getColumn('title')?.setFilterValue(event.target.value)
                    }
                    className='max-w-sm'
                />
                {/* ------------------------------------- */}
                {/* Filter Button (filtering by category) */}
                {/* ------------------------------------- */}
                <div className='pl-6 flex flex-col'>
                    <p className='text-muted-foreground pb-2 text-xs text-center'>
                        Filter by Category
                    </p>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant='outline' className='w-fit'>
                                {categoryFilter}
                                {/* TODO: Need to figure out how to implement animation */}
                                <ChevronDownIcon
                                    className='relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180'
                                    aria-hidden='true'
                                />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='w-56'>
                            <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup value={``}>
                                <DropdownMenuRadioItem
                                    value='Reset'
                                    onClick={() => {
                                        table.getColumn('category')?.setFilterValue('');
                                        setCategoryFilter('Category');
                                    }}>
                                    <span className={menuHeaderStyle}>Reset Filter</span>
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem
                                    value='Personal'
                                    onClick={() => {
                                        table.getColumn('category')?.setFilterValue('Personal');
                                        setCategoryFilter('Personal');
                                    }}>
                                    Personal
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem
                                    value='Appointment'
                                    onClick={() => {
                                        table.getColumn('category')?.setFilterValue('Appointment');
                                        setCategoryFilter('Appointment');
                                    }}>
                                    Appointment
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem
                                    value='Project'
                                    onClick={() => {
                                        table.getColumn('category')?.setFilterValue('Project');
                                        setCategoryFilter('Project');
                                    }}>
                                    Project
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem
                                    value='Work'
                                    onClick={() => {
                                        table.getColumn('category')?.setFilterValue('Work');
                                        setCategoryFilter('Work');
                                    }}>
                                    Work
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem
                                    value='Other'
                                    onClick={() => {
                                        table.getColumn('category')?.setFilterValue('Other');
                                        setCategoryFilter('Other');
                                    }}>
                                    Other
                                </DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                {/* ------------------------------------- */}

                {/* ------------------------------------- */}
                {/* Filter Button (filtering by priority) */}
                {/* ------------------------------------- */}
                <div className='pl-6 flex flex-col'>
                    <p className='text-muted-foreground pb-2 text-xs text-center'>
                        Filter by Priority
                    </p>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant='outline' className='w-fit'>
                                {priorityFilter}
                                {/* TODO: Need to figure out how to implement animation */}
                                <ChevronDownIcon
                                    className='relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180'
                                    aria-hidden='true'
                                />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='w-56'>
                            <DropdownMenuLabel>Filter by Priority</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup value={``}>
                                <DropdownMenuRadioItem
                                    value='Reset'
                                    onClick={() => {
                                        table.getColumn('priority')?.setFilterValue('');
                                        setPriorityFilter('Priority');
                                    }}>
                                    <span className={menuHeaderStyle}>Reset Filter</span>
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem
                                    value='Personal'
                                    onClick={() => {
                                        table.getColumn('priority')?.setFilterValue('Low');
                                        setPriorityFilter('Low');
                                    }}>
                                    Low
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem
                                    value='Appointment'
                                    onClick={() => {
                                        table.getColumn('priority')?.setFilterValue('Medium');
                                        setPriorityFilter('Medium');
                                    }}>
                                    Medium
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem
                                    value='Appointment'
                                    onClick={() => {
                                        table.getColumn('priority')?.setFilterValue('High');
                                        setPriorityFilter('High');
                                    }}>
                                    High
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem
                                    value='Appointment'
                                    onClick={() => {
                                        table.getColumn('priority')?.setFilterValue('Urgent');
                                        setPriorityFilter('Urgent');
                                    }}>
                                    Urgent
                                </DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                {/* ------------------------------------- */}

                {/* ------------------------------------- */}
                {/*  Filter Button (filtering by status)  */}
                {/* ------------------------------------- */}
                <div className='pl-6 flex flex-col'>
                    <p className='text-muted-foreground pb-2 text-xs text-center'>
                        Filter by Status
                    </p>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant='outline' className='w-fit'>
                                {statusFilter}
                                {/* TODO: Need to figure out how to implement animation */}
                                <ChevronDownIcon
                                    className='relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180'
                                    aria-hidden='true'
                                />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='w-56'>
                            <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup value={``}>
                                <DropdownMenuRadioItem
                                    value='Reset'
                                    onClick={() => {
                                        table.getColumn('status')?.setFilterValue('');
                                        setStatusFilter('Status');
                                    }}>
                                    <span className={menuHeaderStyle}>Reset Filter</span>
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem
                                    value='Personal'
                                    onClick={() => {
                                        table.getColumn('status')?.setFilterValue('not started');
                                        setStatusFilter('not started');
                                    }}>
                                    not started
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem
                                    value='Appointment'
                                    onClick={() => {
                                        table.getColumn('status')?.setFilterValue('in-progress');
                                        setStatusFilter('in-progress');
                                    }}>
                                    in-progress
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem
                                    value='Appointment'
                                    onClick={() => {
                                        table.getColumn('status')?.setFilterValue('completed');
                                        setStatusFilter('completed');
                                    }}>
                                    completed
                                </DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                {/* ------------------------------------- */}

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
                        {table.getRowModel().rows?.length
                            ? table.getRowModel().rows.map((row, index) => (
                                  <TableRow
                                      key={row.id}
                                      id={todoItems[index].id}
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
                            : [...Array(todoItems.length >= 7 ? todoItems.length : 7)].map(
                                  (_, index) => (
                                      <TableRow key={index}>
                                          {/* Assuming you want to span across all columns */}
                                          <TableCell
                                              colSpan={columns.length}
                                              className='text-center'>
                                              <SkeletonDemo />
                                          </TableCell>
                                      </TableRow>
                                  )
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
