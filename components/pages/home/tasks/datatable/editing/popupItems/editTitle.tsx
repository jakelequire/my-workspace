import { Textarea } from '@/components/ui/textarea';
import { useTaskContext } from '../../../TaskContext';


export default function EditTitle(): JSX.Element {
    const { editedItem, setEditedItem } = useTaskContext();

    return (
        <Textarea
        className='h-8 text-left p-2 resize-none'
        value={editedItem.title}
        onChange={(e) => {
            setEditedItem({ ...editedItem, title: e.target.value });
        }}>
        </Textarea>
    )
}
