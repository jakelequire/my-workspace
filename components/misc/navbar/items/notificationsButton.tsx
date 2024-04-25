'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
    Settings,
    LogOut,
    Eraser,
    UserRound,
    DatabaseBackup,
    Bell,
} from 'lucide-react';





export default function NotificationsButton(): JSX.Element {


    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className={`flex justify-end content-end items-end w-[20%] h-full p-3 brightness-75 hover:brightness-100 transition-all duration-200 ease-in-out
                    `}
                onClick={(event) => {
                    event.stopPropagation();
                }}
                asChild>
                <Bell className='flex self-end' />
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className='w-48'
                onMouseEnter={(event) => {
                    event.stopPropagation();
                }}
                onMouseOut={(event) => {
                    event.stopPropagation();
                }}>
                <div className='flex flex-col h-full w-full px-3 py-3 gap-4'>
                    <div className='flex w-full flex-col gap-2'>

                    </div>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
