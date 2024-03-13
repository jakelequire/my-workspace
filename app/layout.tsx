import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthContextProvider } from '@/app/AuthContext';
import { GlobalProvider } from '@/components/GlobalContext';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

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
                        <GlobalProvider>{children}</GlobalProvider>
                    </AuthContextProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
