'use client';
import { useNotificaionsContext } from '../NotificationsContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    navigationMenuTriggerStyle,
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuContent,
    NavigationMenuTrigger,
    NavigationMenuLink,
} from '../../../ui/navigation-menu';
import { cn } from '@/lib/utils';
import NavTabs from './navTabs'
import React, { useState, useRef } from 'react';

export default function NavbarNotifications(): JSX.Element {
    return (
        <NavigationMenu className='justify-center'>
            <NavigationMenuList>

                <NavigationMenuItem>
                    <NavigationMenuTrigger>Notifications</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <NavTabs />
                    </NavigationMenuContent>
                </NavigationMenuItem>

            </NavigationMenuList> 
        </NavigationMenu>
    );
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
    ({ className, title, children, ...props }, ref) => {
        return (
            <li>
                <NavigationMenuLink asChild>
                    <a
                        ref={ref}
                        className={cn(
                            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                            className
                        )}
                        {...props}>
                        <div className='text-sm font-medium leading-none'>{title}</div>
                        <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
                            {children}
                        </p>
                    </a>
                </NavigationMenuLink>
            </li>
        );
    }
);
ListItem.displayName = 'ListItem';

/*
<div className='grid gap-4'>
    <div className='space-y-2'>
        <h4 className='font-medium leading-none'>Dimensions</h4>
        <p className='text-sm text-muted-foreground'>Set the dimensions for the layer.</p>
    </div>
    <div className='grid gap-2'>
        <div className='grid grid-cols-3 items-center gap-4'>
            <Label htmlFor='width'>Width</Label>
            <Input id='width' defaultValue='100%' className='col-span-2 h-8' />
        </div>
        <div className='grid grid-cols-3 items-center gap-4'>
            <Label htmlFor='maxWidth'>Max. width</Label>
            <Input id='maxWidth' defaultValue='300px' className='col-span-2 h-8' />
        </div>
        <div className='grid grid-cols-3 items-center gap-4'>
            <Label htmlFor='height'>Height</Label>
            <Input id='height' defaultValue='25px' className='col-span-2 h-8' />
        </div>
        <div className='grid grid-cols-3 items-center gap-4'>
            <Label htmlFor='maxHeight'>Max. height</Label>
            <Input id='maxHeight' defaultValue='none' className='col-span-2 h-8' />
        </div>
    </div>
</div>;
*/
