'use client';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogClose,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useTaskContext } from '../../TaskContext';

import EditStatusBtn from './popupItems/editStatus';
import EditDate from './popupItems/editDate';
import EditCategory from './popupItems/editCategory';
import EditPriority from './popupItems/editPriority';
import EditTitle from './popupItems/editTitle';
import EditDescription from './popupItems/editDescription';

type Props = {
    id: string;
    children: React.ReactNode;
    className?: string;
}

export default function PopupEditor({ id, children, ...props }: Props) {
    const { todoItems, editedItem, setEditedItem, editTodoItem } = useTaskContext();
    const { className } = props;

    const item = todoItems.find((item) => item.id === id);

    const handleClick = () => {
        if (!item) {
            console.error('[PopupEditor]: Item not found');
            return;
        }
        setEditedItem(item);
    };

    const handleSave = () => {
        editTodoItem(id, editedItem);
    };

    return (
        <Dialog modal>
            <DialogTrigger asChild>
                <a className={`h-fit w-fit ${className}`} w-fit onClick={handleClick}>
                    {children}
                </a>
            </DialogTrigger>

            <DialogContent className='sm:max-w-[825px] max-h-[625px]'>
                <DialogHeader className=' mb-6'>
                    <DialogTitle>Edit Task</DialogTitle>
                    <DialogDescription>
                        Make changes to the task here. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>

                <div className='flex flex-col' onKeyDown={(e) => e.stopPropagation()}>
                    <div className='flex flex-row gap-6'>
                        <div className='flex flex-col w-1/2 gap-6'>
                            <div className='flex flex-col'>
                                <Label className='mb-2'>Title</Label>
                                <EditTitle />
                            </div>

                            <div className='flex flex-col'>
                                <Label className='mb-2'>Description</Label>
                                <EditDescription />
                            </div>
                        </div>

                        <div className='flex flex-col w-1/2 gap-6'>
                            <div className='flex flex-col'>
                                <Label className='mb-2'>Priority</Label>
                                <EditPriority />
                            </div>

                            <div className='flex flex-col'>
                                <Label className='mb-2'>Category</Label>
                                <EditCategory />
                            </div>

                            <div className='flex flex-row justify-between gap-6'>
                                <div className='flex flex-col w-[50%]'>
                                    <Label className='mb-2'>Status</Label>
                                    <EditStatusBtn id={id} />
                                </div>

                                <div className='flex flex-col justify-start w-[50%]'>
                                    <Label className='mb-2'>Due Date</Label>
                                    <EditDate />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button onClick={handleSave}>Save changes</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
