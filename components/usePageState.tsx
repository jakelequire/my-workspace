// usePageState.tsx
import { useState, useEffect } from 'react';

export default function usePageState() {
    const [page, setPage] = useState('home')

    return {
        page,
        setPage
    }
}
