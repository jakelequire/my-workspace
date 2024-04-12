

export interface NotificaionsContextType {
    unreadEmails: number;
    setUnreadEmails: (data: number) => void;
    unreadNotifications: number;
    setUnreadNotifications: (data: number) => void;
}