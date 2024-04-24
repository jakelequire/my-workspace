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
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import { firebase_app } from '@/lib/firebase-config';
import { getAuth, signOut } from 'firebase/auth';

const auth = getAuth(firebase_app);

interface ReusableLinkProps {
    onClick: () => void;
    text: string;
    Icon: LucideIcon;
}

type Props = {
    loggedIn: boolean;
}

export default function SettingsButton({ ...props }: Props): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();
    const { loggedIn } = props;

    useEffect(() => {
        console.log('Menu open state is now:', isOpen);
    }, [isOpen]);

    const handleSignOut = async () => {
        await signOut(auth);
        return fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // For cookies
        })
            .then((res) => {
                if (res.status === 200) {
                    /*DEBUG*/ console.log('[Navbar] Redirecting to { /login } ');
                    router.push('/login');
                    router.refresh();
                    window.history.pushState(null, '', '/login')
                }
            })
            .catch((err) => {
                console.log('\n<!>Error in fetch /api/auth/logout<!>\n', err);
                router.push('/login');
                router.refresh();
                window.history.pushState(null, '', '/login')
            });
    };

    const handleSignIn = () => {
        router.push('/login');
    }

    const loggedInLinks = [
        {
            text: 'Clear Local DB',
            Icon: DatabaseBackup,
            onClick: () => {},
        },
        {
            text: 'Clear Cache',
            Icon: Eraser,
            onClick: () => {},
        },
        {
            text: 'Logout',
            Icon: LogOut,
            onClick: handleSignOut,
        },
    ];

    const loggedOutLinks = [
        {
            text: 'Log In',
            Icon: UserRound,
            onClick: handleSignIn,
        },
        {
            text: 'Clear Cache',
            Icon: Eraser,
            onClick: () => {},
        },
    ]

    const ReusableLink = ({ onClick, text, Icon }: ReusableLinkProps) => {
        return (
            <a
                className='flex border border-transparent rounded-lg p-2 text-sm justify-end flex-row gap-4 w-full cursor-pointer brightness-75 hover:brightness-100 hover:border-gray-700 transition-all duration-200 ease-in-out'
                onClick={onClick}>
                <span className='text-sm'>{text}</span>
                <Icon className='w-5 h-5 self-center' />
            </a>
        );
    };

    const LoggedOutView = () => {
        return loggedOutLinks.map((link, index) => (
            <ReusableLink
                key={index}
                onClick={link.onClick}
                text={link.text}
                Icon={link.Icon}
            />
        ))
    }

    const LoggedInView = () => {
        return loggedInLinks.map((link, index) => (
            <ReusableLink
                key={index}
                onClick={link.onClick}
                text={link.text}
                Icon={link.Icon}
            />
        ))
    }


    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className={`flex justify-end content-end items-end w-[20%] h-full p-3 brightness-75 hover:brightness-100 transition-all duration-200 ease-in-out
                    ${isOpen ? 'brightness-100' : 'brightness-75'}
                    `}
                onClick={(event) => {
                    event.stopPropagation();
                    setIsOpen(!isOpen);
                }}
                asChild>
                <Settings className='flex self-end' />
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className='w-48 mr-10'
                onMouseEnter={(event) => {
                    event.stopPropagation();
                    setIsOpen(true);
                }}
                onMouseOut={(event) => {
                    event.stopPropagation();
                    setIsOpen(false);
                }}>
                <div className='flex flex-col h-full w-full px-3 py-3 gap-4'>
                    <div className='flex flex-col w-full gap-2'>
                        <p className='text-sm text-end font-mono font-bold tracking-widest text-gray-400'>
                            Settings
                        </p>
                        <Separator />
                    </div>

                    <div className='flex w-full flex-col gap-2'>
                        {loggedIn ? <LoggedInView /> : <LoggedOutView />}
                    </div>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
