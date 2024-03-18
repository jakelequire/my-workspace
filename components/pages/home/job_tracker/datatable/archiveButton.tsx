'use client';
import { Button } from '@/components/ui/button';
import { useJobTrackerContext } from '../jobTrackerContext';
import { JT } from '@/types/types';

type Props = {
    id: JT.JobItem['id'];
};

export default function ArchiveButton({ id }: Props): JSX.Element {
    const { jobItem, archiveJobItem } = useJobTrackerContext();
    const jobItemRef = jobItem.find((item: JT.JobItem) => item.id === id);

    const handleArchive = async () => {
        if (!jobItemRef) return;
        const updatedItem = archiveJobItem(id, { ...jobItemRef, status: 'Archived' });
        const response = await fetch('/api/firestore', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, updatedItem }),
        });
        if (!response.ok) {
            console.error('Failed to archive item');
        }
    };

    return (
        <Button className='text-xs' variant='outline' onClick={handleArchive}>
            X
        </Button>
    );
}
