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
import DeleteItem from '../editing/inlineEditing/deleteItem';

type Props = {
    id: string;
    children: React.ReactNode;
    className?: string;
}

export default function ViewTask({ id, children, ...props }: Props): JSX.Element {
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
    
    const { className } = props;

    return (
        <Dialog modal>
            <DialogTrigger asChild>
                <a className={`${className}`}>
                    {children}
                </a>
            </DialogTrigger>

            <DialogContent className='sm:max-w-[825px] max-h-[625px]'>
                <DialogHeader className=' mb-6'>
                    <DialogTitle>Viewing Task</DialogTitle>
                    <DialogDescription>
                        Here is the task you selected. Click anywhere outside this dialog to close it.
                    </DialogDescription>
                    <DialogDescription className='text-xs'>
                        ID: {taskItem.id}
                    </DialogDescription>
                </DialogHeader>

                <div className='flex flex-col' onKeyDown={(e) => e.stopPropagation()}>
                    <div className='flex flex-row gap-6'>
                        <div className='flex flex-col w-1/2 gap-6'>
                            <div className='flex flex-col'>
                                <Label className='mb-2 text-base font-semibold text-muted-foreground'>Title</Label>
                                <p className='w-full justify-start text-start pl-1 pb-1 mt-1 border-b-2 border-primary-foreground'>
                                    {taskItem.title}
                                </p>
                            </div>

                            <div className='flex flex-col'>
                                <Label className='mb-2 text-base font-semibold text-muted-foreground'>Description</Label>
                                <p className='w-full min-h-52 justify-start text-start p-2 mt-1 border-2 border-primary-foreground'>
                                    {taskItem.description}
                                </p>
                            </div>
                        </div>

                        <div className='flex flex-col w-1/2 gap-6'>
                            <div className='flex flex-col'>
                                <Label className='mb-2 text-base font-semibold text-muted-foreground'>Priority</Label>
                                <p className='w-full justify-start text-start pl-1 pb-1 mt-1 border-b-2 border-primary-foreground'>
                                    {taskItem.priority}
                                </p>
                            </div>

                            <div className='flex flex-col'>
                                <Label className='mb-2 text-base font-semibold text-muted-foreground'>Category</Label>
                                <p className='w-full justify-start text-start pl-1 pb-1 mt-1 border-b-2 border-primary-foreground'>
                                    {taskItem.category}
                                </p>
                            </div>

                            <div className='flex flex-col'>
                                <Label className='mb-2 text-base font-semibold text-muted-foreground'>Status</Label>
                                <p className='w-full justify-start text-start pl-1 pb-1 mt-1 border-b-2 border-primary-foreground'>
                                    {taskItem.status}
                                </p>
                            </div>

                            <div className='flex flex-row justify-between gap-6'>
                                <div className='flex flex-col w-[50%]'>
                                    <Label className='mb-2 text-base font-semibold text-muted-foreground'>Started</Label>
                                    <p className='w-full justify-start text-start pl-1 pb-1 mt-1 border-b-2 border-primary-foreground'>
                                        {taskItem.started}
                                    </p>
                                </div>

                                <div className='flex flex-col justify-start w-[50%]'>
                                    <Label className='mb-2 text-base font-semibold text-muted-foreground'>Due Date</Label>
                                    <p className='w-full justify-start text-start pl-1 pb-1 mt-1 border-b-2 border-primary-foreground'>
                                        {taskItem.due}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter className="pt-4">
                    <DeleteItem id={id}>
                        <Button variant="destructive">Delete</Button>
                    </DeleteItem>
                    <PopupEditor id={id}>
                        <Button variant="outline">Edit</Button>
                    </PopupEditor>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    );
}
