'use client';
import {
    navigationMenuTriggerStyle,
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuContent,
    NavigationMenuTrigger,
    NavigationMenuLink,
} from '../../ui/navigation-menu';
import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const components: { title: string; href: string; description: string }[] = [
    {
        title: 'Calendar',
        href: '/home/calendar',
        description:
            'My personal calendar. Shows all my events, appointments, and reminders.',
    },
    {
        title: 'Email',
        href: '/home/email',
        description: 'Outlook email. Send, receive, and manage my email.',
    },
	{
		title: 'Tasks',
		href: '/home/tasks',
		description: 'My personal tasks / to-do list. Manage my tasks and deadlines.',
	}
];

const finances: { title: string; href: string; description: string }[] = [
	{
		title: 'Banking',
		href: '/finances/banking',
		description: 'Manage my bank accounts, transactions, and payments.'
	},
	{
		title: 'Investments',
		href: '/finances/investments',
		description: 'Manage my investment portfolio and stock market.'
	},
	{
		title: 'Budgeting',
		href: '/finances/budgeting',
		description: 'Manage my personal budget and expenses.'
	}
]

export default function Navbar(): JSX.Element {
    return (
        <NavigationMenu>
            <NavigationMenuList>

				<NavigationMenuItem>
                    <Link href='/' legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Dashboard
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger>Home Life</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] '>
                            {components.map((component) => (
                                <ListItem
                                    key={component.title}
                                    title={component.title}
                                    href={component.href}>
                                    {component.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

				<NavigationMenuItem>
                    <NavigationMenuTrigger>Finances</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] '>
                            {finances.map((component) => (
                                <ListItem
                                    key={component.title}
                                    title={component.title}
                                    href={component.href}>
                                    {component.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <Link href='/docs' legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Documentation
                        </NavigationMenuLink>
                    </Link>
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
