"use client"
import { useJobTrackerContext } from '../jobTrackerContext';


export default function DeleteItem({id}: {id: string}) {
    const { deleteJobItem } = useJobTrackerContext();

    const deleteItem = () => {
        deleteJobItem(id);
    }

    return (
        <a className='w-full h-full' onClick={deleteItem}>
            Delete
        </a>
    )
}