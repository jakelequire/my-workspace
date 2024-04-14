
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

export interface NotificationApi {
    setUserId: (userId: string) => void;
    fetchNotifications: () => Promise<void>;
}

