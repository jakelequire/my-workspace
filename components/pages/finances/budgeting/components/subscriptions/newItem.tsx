import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState } from 'react';
import { useBudgetingContext } from '../../BudgetingContext';

const formSchema = z.object({
    company: z.string().min(2).max(50),
    amount: z.string().min(2).max(50),
    date: z.string().min(2).max(50),
    frequency: z.string().min(2).max(50),
    url: z.string().url().optional(),
});

export default function NewItem(): JSX.Element {
    const [file, setFile] = useState<File | null>(null);
    const { subscriptions, setSubscriptions } = useBudgetingContext();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            company: '',
            amount: '',
            date: '',
            frequency: '',
            url: '',
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
        setSubscriptions((prev) => [
            ...prev,
            {
                id: '',
                companyName: values.company as any,
                amount: values.amount as any,
                date: values.date.toString() as any,
                frequency: values.frequency || '',
                url: values.url || '',
                pfp: file || null,
            },
        ]);

        form.reset();

        console.log(subscriptions);
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setFile(files[0]);
        }
    };

    return (
        <div className='flex flex-col h-full w-full border-2 rounded-lg py-4 px-6'>
            <div className='flex flex-col w-full'>
                <h1 className='text-xl font-bold mb-6'>New Subscription</h1>
            </div>

            <div className='flex flex-row justify-start items-center w-full h-[30%] gap-4 pb-2'>
                <div className='flex h-full flex-row w-full gap-2 py-2 px-4 border'>

                    <div className='flex flex-col w-[35%] h-full gap-2'>
                        {file ? (
                            <Avatar className='h-20 w-20'>
                                <AvatarImage src={URL.createObjectURL(file)} className='' />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        ) : (
                            <Avatar className='h-20 w-20'>
                                <AvatarFallback />
                            </Avatar>
                        )}
                        <label className='button-label'>
                            <p className='py-1 text-xs/[6px] text-neutral-600 italic'>Upload Image</p>
                            <Input
                                type='file'
                                accept='image/*'
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                                className='self-start'
                            />
                        </label>
                    </div>

                    <div className='flex flex-col h-full w-full p-2'>
                        <div className='flex w-full'>
                            <p className='text-xl font-bold mb-1'>$0.00</p>
                        </div>

                        <div className='flex w-full'>
                            <p className='text-base font-semibold'>Netflix</p>
                        </div>

                        <div className='flex w-full gap-4 text-gray-400'>
                            <p className='text-xs'>Monthly</p>
                        </div>

                        <div className='flex w-full text-gray-400'>
                            <p className='text-xs'>Next Payment: 12/12/2022</p>
                        </div>
                    </div>
                    
                </div>
            </div>

            <div className='flex h-full w-full pt-2'>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-4 flex flex-col justify-start'>
                        <div className='flex w-full flex-row space-x-4'>
                            <FormField
                                control={form.control}
                                name='company'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Company</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Netflix' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='amount'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Amount</FormLabel>
                                        <FormControl>
                                            <Input placeholder='9.99' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className='flex justify-between w-full flex-row space-x-4'>
                            <FormField
                                control={form.control}
                                name='date'
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <FormLabel>Date</FormLabel>
                                        <FormControl>
                                            {/*//@ts-ignore */}
                                            <Input type='date' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='frequency'
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <FormLabel>Frequency</FormLabel>
                                        <FormControl>
                                            <Input
                                                className='w-full'
                                                placeholder='Monthly'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name='url'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder='https://netflix.com' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className='flex items-end w-full pt-4'>
                            <Button type='submit' className='w-32'>
                                Submit
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
