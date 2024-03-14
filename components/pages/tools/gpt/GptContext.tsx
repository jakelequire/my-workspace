import React, { createContext, useContext, useState } from 'react';
import OpenAI from 'openai';

// Define the shape of the conversation object
interface Conversation {
    id: number;
    message: string;
    responses: string[];
    isLoading: boolean;
}

// Define the shape of the context's value
interface GPTContextType {
    conversations: Conversation[];
    sendMessage: (messageContent: string) => Promise<void>;
    gptError: Error | null;
}

// Initialize the context with a default value
const GPTContext = createContext<GPTContextType | undefined>(undefined);

const options = {
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
};

const openai = new OpenAI(options);

// Use GPT provider to encapsulate state and functions related to GPT interactions
const GPTProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [gptError, setGptError] = useState<Error | null>(null);

    const sendMessage = async (messageContent: string) => {
        const newId = Date.now(); // Use current timestamp for unique ID
        setConversations((prevConversations) => [
            ...prevConversations,
            { id: newId, message: messageContent, responses: [], isLoading: true },
        ]);

        try {
            const stream = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: messageContent }],
                stream: true,
            });

            for await (const chunk of stream) {
                setConversations((prevConversations) =>
                    prevConversations.map((conv) =>
                        conv.id === newId
                            ? {
                                  ...conv,
                                  responses: [
                                      ...conv.responses,
                                      chunk.choices[0]?.delta?.content || '',
                                  ],
                              }
                            : conv
                    )
                );
            }
        } catch (error) {
            setGptError(error instanceof Error ? error : new Error('An unknown error occurred'));
        } finally {
            setConversations((prevConversations) =>
                prevConversations.map((conv) =>
                    conv.id === newId ? { ...conv, isLoading: false } : conv
                )
            );
        }
    };

    return (
        <GPTContext.Provider value={{ conversations, sendMessage, gptError }}>
            {children}
        </GPTContext.Provider>
    );
};

// Custom hook to use the context
function useGptContext(): GPTContextType {
    const context = useContext(GPTContext);
    if (!context) {
        throw new Error('useGptContext must be used within a GPTProvider');
    }
    return context;
}

export { GPTProvider, useGptContext };
