
export type NotificationType = 'EMAIL' | 'TODO' | 'CODE' | 'REMINDER';
export type NotificaitonSubCategory = 'NEW' | 'URGENT' | 'UNREAD' | 'READ';

export interface NotificationApi {
    setUserId: (userId: string) => void;
}

