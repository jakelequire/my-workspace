"use client"
import { useState, useEffect } from 'react';

const handleFetch = async () => {
    const res = await fetch('http://localhost:3005');
    const data = await res.json();
    console.log(data);
}

export default function Test() {
    const [data, setData] = useState<Promise<void>>();

    useEffect(() => {
        const fetchData = async () => {
            await handleFetch();
        }
        const data = fetchData();
        setData(data);
    }, []);

    return (
        <div style={style}>
        
        </div>
    )
}

const style = {
    display: 'flex',
    FlexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
}
