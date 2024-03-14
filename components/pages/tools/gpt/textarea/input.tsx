import { useState } from 'react';
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button';
import { useGptContext } from "../GptContext";
import { ChevronRightIcon } from '@radix-ui/react-icons';

export default function InputContainer(): JSX.Element {
    const { sendMessage } = useGptContext(); // Use the sendMessage function from context
    const [inputText, setInputText] = useState(''); // Local state for the input text

    // Function to handle the submission of the input
    const handleSubmit = async () => {
        if (inputText.trim()) { // Check if the inputText is not just whitespace
            await sendMessage(inputText); // Send the message using the context function
            setInputText(''); // Clear the input field after sending the message
        }
    };

    return (
        <div className='flex flex-row h-full w-[100%] gap-2'>
            <Textarea
                placeholder='Message ChatGPT...'
                className='h-full w-[95%] border-none p-3 resize-none overflow-auto whitespace-pre-wrap break-words align-top'
                value={inputText}
                onChange={(e) => setInputText(e.target.value)} // Update local state on change
            />

            <Button variant='outline' size='icon' className='h-full w-[5%]' onClick={handleSubmit}>
                <ChevronRightIcon className='h-6 w-6' />
            </Button>
        </div>
    );
}
