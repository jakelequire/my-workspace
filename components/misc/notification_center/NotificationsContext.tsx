'use client'
import React, { useContext, createContext, useState, useEffect, useMemo } from 'react';
import { NotificaionsContextType, Notification } from '@/types/client/notificationsApp';

const NotificaionsContext = createContext<NotificaionsContextType | undefined>(undefined);

function useNotificaionsProvider() {
    const [unreadNotifications, setUnreadNotifications] = useState<number>(0);
    
    const [emailNotification, setEmailNotification] = useState<Notification>()
    const [unreadEmails, setUnreadEmails] = useState<number>(0);

    return {
        unreadEmails,
        setUnreadEmails,
        unreadNotifications,
        setUnreadNotifications,
        emailNotification,
        setEmailNotification,
    };
}

export const NotificaionsProvider = ({ children }: { children: React.ReactNode }) => {
    const value = useNotificaionsProvider();
    return <NotificaionsContext.Provider value={value}>{children}</NotificaionsContext.Provider>;
};


export const useNotificaionsContext = () => {
    const context = useContext(NotificaionsContext);
    if (context === undefined) {
        throw new Error('useTaskContext must be used within a TaskProvider');
    }
    return context;
};

