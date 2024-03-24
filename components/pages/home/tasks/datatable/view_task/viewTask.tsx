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
import PopupEditor from '../editing/popupEditor';

export default function ViewTask({ id }: { id: string }): JSX.Element {
    const { todoItems } = useTaskContext();
    const task = todoItems.find((item) => item.id === id);
    const taskItem = task
        ? task
        : {
            id: '',
            title: 'Task not found',
            priority: 'Task not found',
            category: 'Task not found',
            description: 'Task not found',
            completed: false,
            status: 'Task not found',
            started: 'Task not found',
            due: 'Task not found',
        };

    return (
        <Dialog modal>
            <DialogTrigger asChild>
                <a className='h-full w-full'>View</a>
            </DialogTrigger>

            <DialogContent className='sm:max-w-[825px] max-h-[625px]'>
                <DialogHeader className=' mb-6'>
                    <DialogTitle>Viewing Task</DialogTitle>
                    <DialogDescription>
                        Here is the task you selected. Click anywhere outside this dialog to close it.
                    </DialogDescription>
                    <DialogDescription>
                        ID: {taskItem.id}
                    </DialogDescription>
                </DialogHeader>

                <div className='flex flex-col' onKeyDown={(e) => e.stopPropagation()}>
                    <div className='flex flex-row gap-6'>
                        <div className='flex flex-col w-1/2 gap-6'>
                            <div className='flex flex-col'>
                                <Label className='mb-2 text-base font-semibold'>Title</Label>
                                <p className='w-full justify-start text-start pl-1 pb-1 mt-1 border-b-2 border-primary-foreground'>
                                    {taskItem.title}
                                </p>
                            </div>

                            <div className='flex flex-col'>
                                <Label className='mb-2 text-base font-semibold'>Description</Label>
                                <p className='w-full min-h-52 justify-start text-start p-2 mt-1 border-2 border-primary-foreground'>
                                    {taskItem.description}
                                </p>
                            </div>
                        </div>

                        <div className='flex flex-col w-1/2 gap-6'>
                            <div className='flex flex-col'>
                                <Label className='mb-2 text-base font-semibold'>Priority</Label>
                                <p className='w-full justify-start text-start pl-1 pb-1 mt-1 border-b-2 border-primary-foreground'>
                                    {taskItem.priority}
                                </p>
                            </div>

                            <div className='flex flex-col'>
                                <Label className='mb-2 text-base font-semibold'>Category</Label>
                                <p className='w-full justify-start text-start pl-1 pb-1 mt-1 border-b-2 border-primary-foreground'>
                                    {taskItem.category}
                                </p>
                            </div>

                            <div className='flex flex-col'>
                                <Label className='mb-2 text-base font-semibold'>Status</Label>
                                <p className='w-full justify-start text-start pl-1 pb-1 mt-1 border-b-2 border-primary-foreground'>
                                    {taskItem.status}
                                </p>
                            </div>

                            <div className='flex flex-row justify-between gap-6'>
                                <div className='flex flex-col w-[50%]'>
                                    <Label className='mb-2 text-base font-semibold'>Started</Label>
                                    <p className='w-full justify-start text-start pl-1 pb-1 mt-1 border-b-2 border-primary-foreground'>
                                        {taskItem.started}
                                    </p>
                                </div>

                                <div className='flex flex-col justify-start w-[50%]'>
                                    <Label className='mb-2 text-base font-semibold'>Due Date</Label>
                                    <p className='w-full justify-start text-start pl-1 pb-1 mt-1 border-b-2 border-primary-foreground'>
                                        {taskItem.due}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <PopupEditor id={id}>
                        <Button variant="secondary">Edit</Button>
                    </PopupEditor>
                    <DialogClose asChild>
                        <Button variant="outline">Close</Button>
                    </DialogClose>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    );
}
