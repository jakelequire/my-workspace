'use client';
import { CheckIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { useTaskContext } from "../TaskContext";

export default function CompletedBtn({ id }: any): JSX.Element {
    const { deleteTodoItem } = useTaskContext()

    const onSubmit = async () => {
        console.log("[completedBtn] Completed Button Clicked. ID: ", id)
        const res = await sendToFirestore(id)
        if(res) {
            deleteTodoItem(id)
        } else {
            console.error('Error sending to Firestore')
        }
    }

    const sendToFirestore = async (id: string) => {
        return await fetch('/api/firestore', {
            method: 'DELETE',
            body: JSON.stringify({ id }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            return res.json()
        }).catch((error) => {
            console.error('Error:', error);
            throw new Error('Error sending to Firestore')
        });
    }

    return (
        <Button className="h-6 w-6" variant='outline' size='icon' onClick={onSubmit}>
            <CheckIcon className='h-3 w-3' />
        </Button>
    );
}
