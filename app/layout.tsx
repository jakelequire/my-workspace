import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthContextProvider } from '@/app/AuthContext';
import { GlobalProvider } from '@/components/GlobalContext';
import { ThemeProvider } from '@/components/theme-provider';
import { NotificaionsProvider } from '@/components/misc/notification_center/NotificationsContext';
import { Toaster } from 'sonner';

import './globals.css';
import '@/styles/embla.css';
import './sample.css'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Jakes Workspace',
    description: 'A personal dashboard for managing my life and finances.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <ThemeProvider
                    attribute='class'
                    defaultTheme='dark'
                    enableSystem
                    disableTransitionOnChange>
                    <AuthContextProvider>
                        <GlobalProvider>
                            <NotificaionsProvider>
                                {children}
                            </NotificaionsProvider>
                        </GlobalProvider>
                    </AuthContextProvider>
                <Toaster richColors />
                </ThemeProvider>
            </body>
        </html>
    );
}
