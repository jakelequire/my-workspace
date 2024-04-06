'use client';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { links } from '../exampledata';

interface NavProps {
    isCollapsed: boolean;
    links: {
        title: string;
        label?: string;
        icon: LucideIcon;
        variant: 'default' | 'ghost';
    }[];
}

type VariantProps = "default" | "ghost" | "link" | "destructive" | "outline" | "secondary" | null | undefined;

export default function Nav(): JSX.Element {
    const isCollapsed = false;

    return (
        <div
            data-collapsed={isCollapsed}
            className='group flex justify-start w-full h-full flex-col gap-4 py-2 data-[collapsed=true]:py-2'>
            <nav className='grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2'>
                {links.map((link, index) =>
                    isCollapsed ? (
                        <Tooltip key={index} delayDuration={0}>
                            <TooltipTrigger asChild>
                                <Link
                                    href='#'
                                    className={cn(
                                        buttonVariants({ variant: link.variant as VariantProps, size: 'icon' }),
                                        'h-9 w-9',
                                        link.variant === 'default' &&
                                            'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white'
                                    )}>
                                    <link.icon className='h-4 w-4' />
                                    <span className='sr-only'>{link.title}</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side='right' className='flex items-center gap-4'>
                                {link.title}
                                {link.label && (
                                    <span className='ml-auto text-muted-foreground text-lg'>
                                        {link.label}
                                    </span>
                                )}
                            </TooltipContent>
                        </Tooltip>
                    ) : (
                        <Link
                            key={index}
                            href='#'
                            className={cn(
                                buttonVariants({ variant: link.variant as VariantProps, size: 'sm' }),
                                link.variant === 'default' &&
                                    'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
                                'justify-start text-sm'
                            )}>
                            <link.icon className='mr-2 h-4 w-4' />
                            {link.title}
                            {link.label && (
                                <span
                                    className={cn(
                                        'ml-auto',
                                        link.variant === 'default' &&
                                            'text-background dark:text-white'
                                    )}>
                                    {link.label}
                                </span>
                            )}
                        </Link>
                    )
                )}
            </nav>
        </div>
    );
}
