'use client';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useTaskContext } from '../../TaskContext';
import EditStatusBtn from './popupItems/editStatus';
import EditDate from './popupItems/editDate';
import EditCategory from './popupItems/editCategory';
import EditPriority from './popupItems/editPriority';
import { useCallback } from 'react';

export default function PopupEditor({ id }: { id: string }) {
    const { todoItems, editedItem, setEditedItem } = useTaskContext();

    const item = todoItems.find((item) => item.id === id);

    const handleClick = () => {
        if (!item) return;
        setEditedItem(item);
    };

    const Calendar = useCallback(() => {
        return <EditDate />;
    }, []);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <a className='h-full w-full' onClick={handleClick}>
                    Edit
                </a>
            </DialogTrigger>

            <DialogContent className='sm:max-w-[825px] max-h-[625px]'>
                <DialogHeader className=' mb-6'>
                    <DialogTitle>Edit Task</DialogTitle>
                    <DialogDescription>
                        Make changes to the task here. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>

                <div className='flex flex-col'>
                    <div className='flex flex-row gap-6'>
                        <div className='flex flex-col w-1/2 gap-6'>
                            <div className='flex flex-col'>
                                <Label className='mb-2'>Title</Label>
                                <Input
                                    value={editedItem.title}
                                    onChange={(e) => {
                                        setEditedItem({ ...editedItem, title: e.target.value });
                                    }}></Input>
                            </div>

                            <div className='flex flex-col'>
                                <Label className='mb-2'>Description</Label>
                                <Textarea
                                    value={editedItem.description}
                                    onChange={(e) => {
                                        setEditedItem({
                                            ...editedItem,
                                            description: e.target.value,
                                        });
                                    }}
                                    className='h-40 text-left p-2 resize-none'></Textarea>
                            </div>
                        </div>

                        <div className='flex flex-col w-1/2 gap-6'>
                            <div className='flex flex-col'>
                                <EditPriority />
                            </div>

                            <div className='flex flex-col'>
                                <EditCategory />
                            </div>

                            <div className='flex flex-row justify-between gap-6'>
                                <div className='flex flex-col w-[50%]'>
                                    <Label className='mb-2'>Status</Label>
                                    <EditStatusBtn id={id} />
                                </div>

                                <div className='flex flex-col justify-start w-[50%]'>
                                    <Calendar />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button type='submit'>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
