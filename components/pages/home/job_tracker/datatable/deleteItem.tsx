"use client"
import { useGlobalContext } from '@/components/GlobalContext';


export default function DeleteItem({id}: {id: string}) {
    const { submissionCount, setSubmissionCount } = useGlobalContext();
    const deleteItem = async () => {
        setSubmissionCount(submissionCount + 1);

        console.log("[DeleteItem] Item Deleted")

        const response = await fetch('/api/firestore/jobs', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id }),
        });
        if (!response.ok) {
            console.error('Failed to delete job');
        }
    }

    return (
        <a className='w-full h-full' onClick={deleteItem}>
            Delete
        </a>
    )
}