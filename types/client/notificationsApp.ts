

export type NotificationType = 'EMAIL' | 'TODO' | 'CODE' | 'REMINDER';
export type NotificaitonSubCategory = 'NEW' | 'URGENT' | 'UNREAD' | 'READ';


export interface Notification {
    id: string;
    type: NotificationType;
    subCategory: NotificaitonSubCategory;
    title: string;
    body: string;
    date: string;
    read: boolean;
}

export interface NotificaionsContextType {
    unreadEmails: number;
    setUnreadEmails: (data: number) => void;
    unreadNotifications: number;
    setUnreadNotifications: (data: number) => void;
    emailNotification: Notification;
    setEmailNotification: (data: Notification) => void;
}


