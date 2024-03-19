'use client';
import { CheckIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { useTaskContext } from "../TaskContext";

export default function CompletedBtn({ id }: any): JSX.Element {
    const { deleteTodoItem } = useTaskContext()

    const onSubmit = async () => {
        deleteTodoItem(id)
    }

    return (
        <Button className="h-6 w-6 bg-none!important" variant='outline' size='icon' onClick={onSubmit}>
            <CheckIcon className='h-3 w-3' />
        </Button>
    );
}
