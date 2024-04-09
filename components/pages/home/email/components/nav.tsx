'use client';
import Link from 'next/link';
import { Archive, ArchiveX, File, Inbox, Send, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { links } from '../exampledata';
import { useEmailContext } from '../EmailContext';

type VariantProps =
    | 'default'
    | 'ghost'
    | 'link'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | null
    | undefined;


export default function Nav(): JSX.Element {
    const isCollapsed = false;
    const { folders, changeFolder } = useEmailContext();

    let folderConfig = [
        { displayName: 'Inbox', icon: Inbox, variant: 'ghost' },
        { displayName: 'Drafts', icon: File, variant: 'ghost' },
        { displayName: 'Sent Items', icon: Send, variant: 'ghost' },
        { displayName: 'Junk Email', icon: ArchiveX, variant: 'ghost' },
        { displayName: 'Deleted Items', icon: Trash2, variant: 'ghost' },
    ];
    
    const _links = folderConfig.map(config => {
        const folder = folders.find(folder => folder.displayName === config.displayName);
        return {
            title: config.displayName,
            label: folder ? folder.unreadItemCount.toString() : '',
            icon: config.icon,
            variant: folder?.isOpen ? 'default' : config.variant,
        };
    });

    const handleFolderChange = (folder: string) => {
        changeFolder(folder);
    }

    return (
        <div
            data-collapsed={isCollapsed}
            className='group flex justify-start w-full h-full flex-col gap-4 py-2 data-[collapsed=true]:py-2'>
            <nav className='grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2'>
                {_links.map((link, index) =>
                    isCollapsed ? (
                        <Tooltip key={index} delayDuration={0}>
                            <TooltipTrigger asChild>
                                <Link
                                    href='#'
                                    onClick={() => handleFolderChange(link.title)}
                                    className={cn(
                                        buttonVariants({
                                            variant: link.variant as VariantProps,
                                            size: 'icon',
                                        }),
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
                            onClick={() => handleFolderChange(link.title)}
                            className={cn(
                                buttonVariants({
                                    variant: link.variant as VariantProps,
                                    size: 'sm',
                                }),
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
