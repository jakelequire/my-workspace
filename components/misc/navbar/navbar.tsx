'use client';
import * as React from 'react';
import {
    navigationMenuTriggerStyle,
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuContent,
    NavigationMenuTrigger,
    NavigationMenuLink,
} from '../../ui/navigation-menu';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAuthContext } from '@/app/AuthContext';
import { cn } from '@/lib/utils';
import { getAuth, signOut } from 'firebase/auth';
import { firebase_app } from '@/lib/firebase-config';
import { useRouter } from 'next/navigation';
import ClearLocalData from './buttons/clearLocalData'
import NavbarNotifications from '../notification_center/components/navbarNotifications';

const auth = getAuth(firebase_app);

const home_life: { title: string; href: string; description: string, active: boolean }[] = [
    {
        title: 'Calendar',
        href: '/home/calendar',
        description: 'My personal calendar. Shows all my events, appointments, and reminders.',
        active: false,
    },
    {
        title: 'Email',
        href: '/home/email',
        description: 'Outlook email. Send, receive, and manage my email.',
        active: true,
    },
    {
        title: 'Tasks',
        href: '/home/tasks',
        description: 'My personal tasks / to-do list. Manage my tasks and deadlines.',
        active: true,
    },
    {
        title: 'Job Tracker',
        href: '/home/jobs',
        description: 'My personal job tracker. Manage my job applications and interviews.',
        active: true,
    },
    {
        title: 'Code Space',
        href: '/home/code',
        description: 'My personal code space. Data and information about my coding projects.',
        active: true,
    }, {
        title: 'Health & Fitness',
        href: '/home/healthandfitness',
        description: 'My personal health and fitness tracker. Manage my workouts and diet.',
        active: false,
    }
];

const finances: { title: string; href: string; description: string, active: boolean }[] = [
    {
        title: 'Banking',
        href: '/finances/banking',
        description: 'Manage my bank accounts, transactions, and payments.',
        active: false,
    },
    {
        title: 'Investments',
        href: '/finances/investments',
        description: 'Manage my investment portfolio and stock market.',
        active: false,
    },
    {
        title: 'Budgeting',
        href: '/finances/budgeting',
        description: 'Manage my personal budget and expenses.',
        active: false,
    },
];

const tools: { title: string; href: string; description: string, active: boolean }[] = [
    {
        title: 'GPT',
        href: '/tools/gpt',
        description: 'Generate text using OpenAI GPT.',
        active: true,
    },
    {
        title: 'Text Editor',
        href: '/tools/text-editor',
        description: 'Edit and save text documents.',
        active: false,
    },
    {
        title: 'Notes',
        href: '/tools/notes',
        description: 'Create and manage my personal notes.',
        active: true,
    },
    {
        title: 'Cloud Storage',
        href: '/tools/storage',
        description: 'Manage my personal cloud storage. Hosted by Firebase.',
        active: false,
    }
]

const docs: {  title: string; href: string; description: string, active: boolean }[] = [
    {
        title: 'Docs',
        href: '/docs',
        description: 'Programming documentation notes and resources.',
        active: false,
    }
]

export default function Navbar(): JSX.Element {
    const { isLoggedIn, setIsLoggedIn } = useAuthContext();
    const router = useRouter();

    const isUserLoggedIn: string = isLoggedIn ? 'Logged In' : 'Logged Out';
    console.log('Is user logged in? ', isUserLoggedIn);

    const handleSignOut = async () => {
        await signOut(auth);
        return fetch('/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // For cookies
        })
            .then((res) => {
                if (res.status === 200) {
                    /*DEBUG*/ console.log('[Navbar] Redirecting to { /login } ');
                    setIsLoggedIn(false);
                    router.push('/login');
                }
            })
            .catch((er) => {
                console.log('\n<!>Error in fetch /api/logout<!>\n', er);
            });
    };

    const LoginButton = () => {
        if (isLoggedIn) {
            return (
                <Link href='/login' legacyBehavior passHref>
                    <Button className={navigationMenuTriggerStyle()} onClick={handleSignOut}>
                        Logout
                    </Button>
                </Link>
            );
        } else {
            return (
                <Link href='/login' legacyBehavior passHref>
                    <Button className={navigationMenuTriggerStyle()}>Login</Button>
                </Link>
            );
        }
    };

    return (
        <div className='flex flex-row items-center  w-full h-12 border-b border-b-zinc-600'>
            <div className='flex justify-start w-[20%] h-full px-6'>
                <NavbarNotifications />
            </div>
            <div className='flex justify-center flex-grow h-full w-[60%]'>
                {isLoggedIn ? (
                    <NavigationMenu className='justify-center'>
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
                                        {home_life.map((component) => (
                                            <ListItem
                                                key={component.title}
                                                className={component.active ? '' : 'text-accent'}
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
                                                className={component.active ? '' : 'text-accent'}
                                                title={component.title}
                                                href={component.href}>
                                                {component.description}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] '>
                                        {tools.map((component) => (
                                            <ListItem
                                                key={component.title}
                                                className={component.active ? '' : 'text-accent'}
                                                title={component.title}
                                                href={component.href}>
                                                {component.description}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Docs</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] '>
                                        {docs.map((component) => (
                                            <ListItem
                                                key={component.title}
                                                className={component.active ? '' : 'text-accent'}
                                                title={component.title}
                                                href={component.href}>
                                                {component.description}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                        </NavigationMenuList>
                    </NavigationMenu>
                ) : null}
            </div>
            <div className='flex justify-end items-center h-full w-[20%] '>
                {(isLoggedIn ? <ClearLocalData className={navigationMenuTriggerStyle()}/> : null)}
                {(isLoggedIn ? <LoginButton /> : null)}
            </div>
        </div>
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
