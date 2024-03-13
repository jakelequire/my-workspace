'use client';
import React, { useState, useEffect, useContext } from 'react';

const GPTContext = React.createContext({
    gptResponse: null,
    setGptResponse: (value: any) => {},
    gptError: null,
    setGptError: (value: any) => {},
    inputText: '',
    setInputText: (value: string) => {},
    settings: {}, //! will need to change to the structure of the API object
    setSettings: (value: any) => {}, //! will need to change to the structure of the API object
});

export const GptContext = () => useContext(GPTContext);

function useGptProvider() {
    const [gptResponse, setGptResponse] = useState<any>(null);
    const [gptError, setGptError] = useState<any>(null);
    const [inputText, setInputText] = useState('');
    const [settings, setSettings] = useState({}); //! will need to change to the structure of the API object

    return {
        gptResponse,
        setGptResponse,
        gptError,
        setGptError,
        inputText,
        setInputText,
        settings,
        setSettings
    };
}

export const GptProvider = ({ children }: { children: React.ReactNode }) => {
    const gpt = useGptProvider();

    return <GPTContext.Provider value={gpt}>{children}</GPTContext.Provider>;
};

export function useGptContext() {
    const context = useContext(GPTContext);
    if (context === undefined) {
        throw new Error('useTaskContext must be used within a TaskProvider');
    }
    return context;
}
