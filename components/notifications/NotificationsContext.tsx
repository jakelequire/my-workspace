import React, { useEffect, createContext } from 'react';



const NotificationsContext = createContext(undefined)


function useNotificationsProvider() {


    return {

    }
}


export const NotificationsProvider = ({ children }: { children: React.ReactNode }) => {
    const value = useNotificationsProvider();
    return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
};

export const useNotificationsContext = () => {
    const context = React.useContext(NotificationsContext);
    if (context === undefined) {
        throw new Error('useGlobalContext must be used within a GlobalProvider');
    }
    return context;
};

