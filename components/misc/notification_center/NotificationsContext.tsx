'use client'
import React, { useContext, createContext, useState, useEffect, useMemo } from 'react';
import { NotificaionsContextType, Notification } from '@/types/client/notificationsApp';

const NotificaionsContext = createContext<NotificaionsContextType | undefined>(undefined);

function useNotificaionsProvider() {
    const [unreadNotifications, setUnreadNotifications] = useState<number>(0);

    const [emailNotification, setEmailNotification] = useState<Notification[]>()
    const [unreadEmails, setUnreadEmails] = useState<number>(0);



    const fetchNotifications = async () => {
        const res = await fetch('/api/firestore/notifications', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    const addNewNotification = async () => {
        const res = await fetch('/api/firestore/notifications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: 'EMAIL',
                subCategory: 'NEW',
                title: 'New email',
                body: 'You have a new email',
                date: new Date().toISOString(),
                read: false,
            }),
        });
        console.log("[NotificationContext] New Notification Added: \n", res);
        return res;
    }




    useEffect(() => {
        // addNewNotification();
    }, []);



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
    //@ts-ignore
    return <NotificaionsContext.Provider value={value}>{children}</NotificaionsContext.Provider>;
};


export const useNotificaionsContext = () => {
    const context = useContext(NotificaionsContext);
    if (context === undefined) {
        throw new Error('useTaskContext must be used within a TaskProvider');
    }
    return context;
};
