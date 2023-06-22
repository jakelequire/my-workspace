// usePageState.tsx
import { useState, useEffect } from 'react';
import useSessionState from './useSessionState';

export default function usePageState() {
    const { loggedIn } = useSessionState();
    const [page, setPage] = useState('home')

    useEffect(() => {
        if (loggedIn === false) {
            setPage('loggedout')
        } else {
            setPage('home')
        }
    }, [loggedIn])

    return {
        page,
        setPage
    }
}
