

export interface Notification {
    /* Grab data from unpublished branch at home */
}

export interface NotificaionsContextType {
    unreadEmails: number;
    setUnreadEmails: (data: number) => void;
    unreadNotifications: number;
    setUnreadNotifications: (data: number) => void;
    emailNotification: Notification;
    setEmailNotification: (data: Notification) => void;
}


