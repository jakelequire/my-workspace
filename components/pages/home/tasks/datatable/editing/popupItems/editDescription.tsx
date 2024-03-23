import { Textarea } from '@/components/ui/textarea';
import { useTaskContext } from '../../../TaskContext';


export default function EditDescription(): JSX.Element {
    const { editedItem, setEditedItem } = useTaskContext();

    return (
        <Textarea
        value={editedItem.description}
        onChange={(e) => {
            setEditedItem({
                ...editedItem,
                description: e.target.value,
            });
        }}
        className='h-40 text-left p-2 resize-none'>
        </Textarea>
    )
}
