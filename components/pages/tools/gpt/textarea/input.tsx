import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button';
import { useGptContext } from "../GptContext";
import { ChevronRightIcon } from '@radix-ui/react-icons';

export default function InputContainer(): JSX.Element {
    const { inputText, setInputText } = useGptContext();

    const handleSubmit = () => {
        // TODO - send inputText to API
        console.log('submitting');
        console.log(inputText)
    }

    return (
        <div className='flex flex-row h-full w-[100%] gap-2'>

            <Textarea
                placeholder='Message ChatGPT...'
                className='h-full w-[95%] border-none p-3 resize-none overflow-auto whitespace-pre-wrap break-words align-top'
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
            >
            </Textarea>

            <Button variant='outline' size='icon' className='h-full w-[5%]' onClick={handleSubmit}>
                <ChevronRightIcon className='h-6 w-6' />
            </Button>

        </div>
    );
}
