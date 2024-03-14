'use client';
import * as React from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import { useGptContext, GPTModel } from '../GptContext';

import styles from './gptSettings.module.css';

const modelTokenMapping = {
    'gpt-3.5-turbo': 16385,
    'gpt-3.5-turbo-0125': 16385,
    'gpt-3.5-turbo-1106': 16385,
    'gpt-4': 8192,
    'gpt-4-32k': 32768,
    'gpt-4-0125-preview': 128000,
};

export default function GPTSettings(): JSX.Element {
    const { settings, setSettings, clearConversations } = useGptContext();
    const defaultModel = settings.model;
    const maxTokens = modelTokenMapping[settings.model] || 16385;

    const handleModelChange = (selectedModel: GPTModel) => {
        const max_tokens = modelTokenMapping[selectedModel];
        setSettings((prevSettings) => ({
            ...prevSettings,
            model: selectedModel,
            max_tokens,
        }));
    };

    return (
        <div className={styles.settings_container}>
            <div className={styles.settings_header}>
                <h1 className='text-lg font-semibold'>Settings</h1>
            </div>
            <div className={styles.settings_body}>
                <div className={styles.model_settings}>
                    <h2 className='text-md font-semibold pb-2'>Model</h2>
                    <Select>
                        <SelectTrigger className='w-[100%]'>
                            <SelectValue placeholder={defaultModel} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Model</SelectLabel>
                                <SelectItem
                                    onClick={() => handleModelChange('gpt-3.5-turbo')}
                                    value='gpt-3.5-turbo'>
                                    gpt-3.5-turbo
                                </SelectItem>
                                <SelectItem
                                    onClick={() => handleModelChange('gpt-3.5-turbo-0125')}
                                    value='gpt-3.5-turbo-0125'>
                                    gpt-3.5-turbo-0125
                                </SelectItem>
                                <SelectItem
                                    onClick={() => handleModelChange('gpt-3.5-turbo-1106')}
                                    value='gpt-3.5-turbo-1106'>
                                    gpt-3.5-turbo-1106
                                </SelectItem>
                                <SelectItem
                                    onClick={() => handleModelChange('gpt-4')}
                                    value='gpt-4'>
                                    gpt-4
                                </SelectItem>
                                <SelectItem
                                    onClick={() => handleModelChange('gpt-4-32k')}
                                    value='gpt-4-32k'>
                                    gpt-4-32k
                                </SelectItem>
                                <SelectItem
                                    onClick={() => handleModelChange('gpt-4-0125-preview')}
                                    value='gpt-4-0125-preview'>
                                    gpt-4-0125-preview
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className={styles.slider_settings}>
                    <div className='flex flex-row align-center align-end w-full gap-4 pb-2'>
                        <h2 className='text-md font-semibold'>Temperature</h2>
                        <p className='text-xs text-gray-400 pt-1'>0 - 100</p>
                    </div>
                    <Slider
                        defaultValue={[50]}
                        max={100}
                        step={1}
                        className={cn('w-[100%]')}
                        onValueChange={(value) => {
                            const [temperature] = value;
                            setSettings((prev) => ({ ...prev, temperature }));
                        }}
                    />
                    <div className='flex justify-between gap-4 pt-1'>
                        <p className='text-sm font-semibold text-gray-300'>
                            {settings.temperature}
                        </p>
                    </div>
                </div>

                <div className={styles.slider_settings}>
                    <div className='flex flex-row align-center align-end w-full gap-4 pb-2'>
                        <h2 className='text-md font-semibold'>Max Tokens</h2>
                        <p className='text-xs text-gray-400 pt-1'>0 - {maxTokens}</p>
                    </div>
                    <Slider
                        key={settings.model}
                        defaultValue={[settings.max_tokens]}
                        max={maxTokens}
                        step={1}
                        className={cn('w-[100%]')}
                        onValueChange={(value) => {
                            const [max_tokens] = value;
                            setSettings((prev) => ({ ...prev, max_tokens }));
                        }}
                    />
                    <div className='flex justify-between gap-4 pt-1'>
                        <p className='text-sm font-semibold text-gray-300'>{settings.max_tokens}</p>
                    </div>
                </div>

                <div className={styles.slider_settings}>
                    <div className='flex flex-row align-center align-end w-full gap-4 pb-2'>
                        <h2 className='text-md font-semibold'>Top P</h2>
                        <p className='text-xs text-gray-400 pt-1'>0 - 100</p>
                    </div>
                    <Slider
                        defaultValue={[50]}
                        max={100}
                        step={1}
                        className={cn('w-[100%]')}
                        onValueChange={(value) => {
                            const [top_p] = value;
                            setSettings((prev) => ({ ...prev, top_p }));
                        }}
                    />
                    <div className='flex justify-between gap-4 pt-1'>
                        <p className='text-sm font-semibold text-gray-300'>{settings.top_p}</p>
                    </div>
                </div>

                <div className={styles.slider_settings}>
                    <div className='flex flex-row align-center align-end w-full gap-4 pb-2'>
                        <h2 className='text-md font-semibold'>Frequency Penalty</h2>
                        <p className='text-xs text-gray-400 pt-1'>0 - 100</p>
                    </div>
                    <Slider
                        defaultValue={[50]}
                        max={100}
                        step={1}
                        className={cn('w-[100%]')}
                        onValueChange={(value) => {
                            const [frequency_penalty] = value;
                            setSettings((prev) => ({ ...prev, frequency_penalty }));
                        }}
                    />
                    <div className='flex justify-between gap-4 pt-1'>
                        <p className='text-sm font-semibold text-gray-300'>
                            {settings.frequency_penalty}
                        </p>
                    </div>
                </div>

                <div className={styles.slider_settings}>
                    <div className='flex flex-row align-center align-end w-full gap-4 pb-2'>
                        <h2 className='text-md font-semibold'>Presence Penalty</h2>
                        <p className='text-xs text-gray-400 pt-1'>0 - 100</p>
                    </div>
                    <Slider
                        defaultValue={[50]}
                        max={100}
                        step={1}
                        className={cn('w-[100%]')}
                        onValueChange={(value) => {
                            const [presence_penalty] = value;
                            setSettings((prev) => ({ ...prev, presence_penalty }));
                        }}
                    />
                    <div className='flex justify-between gap-4 pt-1'>
                        <p className='text-sm font-semibold text-gray-300'>
                            {settings.presence_penalty}
                        </p>
                    </div>
                </div>

                <div className={styles.buttons_container}>
                    <Button
                        variant='destructive'
                        className={styles.clear_conversations}
                        onClick={clearConversations}>
                        Clear Conversation
                    </Button>
                </div>

            </div>
        </div>
    );
}
