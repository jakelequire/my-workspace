import React, { createContext, useContext, useState, useEffect } from 'react';
import OpenAI from 'openai';

/*
gpt-3.5-turbo {default} [16,385 tokens]
    Currently points to gpt-3.5-turbo-0125.

gpt-3.5-turbo-0125 [16,385 tokens]
    Updated GPT 3.5 Turbo
    The latest GPT-3.5 Turbo model with higher accuracy at responding in requested formats and a fix for a bug which caused a text encoding issue for non-English language function calls. Returns a maximum of 4,096 output tokens

gpt-3.5-turbo-1106 [16,385 tokens]
    GPT-3.5 Turbo model with improved instruction following, JSON mode, reproducible outputs, parallel function calling, and more. Returns a maximum of 4,096 output tokens.

gpt-4 [8,192 tokens]
    Currently points to gpt-4-0613.

gpt-4-32k [32,768 tokens]
    Currently points to gpt-4-32k-0613. This model was never rolled out widely in favor of GPT-4 Turbo.
    
gpt-4-0125-preview [128,000 tokens]
    GPT-4 Turbo The latest GPT-4 model intended to reduce cases of “laziness” where the model doesn’t complete a task. Returns a maximum of 4,096 output tokens
*/

export type GPTModel =
    | 'gpt-3.5-turbo' // default [16,385 tokens]
    | 'gpt-3.5-turbo-0125' // [16,385 tokens]
    | 'gpt-3.5-turbo-1106' // [16,385 tokens]
    | 'gpt-4' // [8,192 tokens]
    | 'gpt-4-32k' // [32,768 tokens]
    | 'gpt-4-0125-preview'; // [128,000 tokens]

interface Conversation {
    id: number;
    message: string;
    responses: string[];
    isLoading: boolean;
}

interface OpenAiSettings {
    model: GPTModel;
    temperature: number;
    max_tokens: number;
    top_p: number;
    frequency_penalty: number;
    presence_penalty: number;
}

interface GPTContextType {
    conversations: Conversation[];
    sendMessage: (messageContent: string) => Promise<void>;
    gptError: Error | null;
    settings: OpenAiSettings;
    setSettings: React.Dispatch<React.SetStateAction<OpenAiSettings>>;
    maxTokens: number;
    clearConversations: () => void;
}

const GPTContext = createContext<GPTContextType | undefined>(undefined);

const options = {
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
};

const openai = new OpenAI(options);

const GPTProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [gptError, setGptError] = useState<Error | null>(null);
    const [maxTokens, setMaxTokens] = useState<number>(0); // [16,385 tokens
    const [settings, setSettings] = useState<OpenAiSettings>({
        model: 'gpt-3.5-turbo',
        temperature: 0.5,
        max_tokens: 16385,
        top_p: 1,
        frequency_penalty: 0, // -2.0 and 2.0
        presence_penalty: 0, // -2.0 and 2.0
    });

    const clearConversations = () => {
        setConversations([]);
    };

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
        <GPTContext.Provider
            value={{
                conversations,
                sendMessage,
                gptError,
                settings,
                setSettings,
                maxTokens,
                clearConversations,
            }}>
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
