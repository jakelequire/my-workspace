'use client';
import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { CarouselApi } from '@/components/ui/carousel';
import { useGlobalContext } from '@/components/GlobalContext';
import { ReaderIcon } from '@radix-ui/react-icons';

export default function MiniTodo(): JSX.Element {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
    const carouselContentRef = useRef<HTMLDivElement>(null);
    const { todoList } = useGlobalContext();

    const totalTodos = todoList.length;
    const inProgressTodos = todoList.filter((todo) => todo.status === 'in-progress').length;

    const importantTodos = todoList.filter((todo) => {
        return todo.priority === 'High' || todo.priority === 'Urgent';
    }).length;

    // due within 3 days
    const dueSoonTodos = todoList.filter((todo) => {
        const dueDate = new Date(todo.due);
        const today = new Date();
        const diff = dueDate.getTime() - today.getTime();
        const days = Math.ceil(diff / (1000 * 3600 * 24));
        return days <= 3;
    }).length;

    const todoStats = [
        {
            title: 'Total Tasks',
            value: totalTodos,
        },
        {
            title: 'In Progress',
            value: inProgressTodos,
        },
        {
            title: 'Important',
            value: importantTodos,
        },
        {
            title: 'Due Soon',
            value: dueSoonTodos,
        },
    ];

    const totalItems = todoStats.length;

    // Function to update the selected index
    const handleSelect = (index: number) => {
        setSelectedIndex(index);
        if (carouselApi) {
            carouselApi.scrollTo(index);
        }
    };

    useEffect(() => {
        const onSelect = () => {
            if (carouselApi) {
                // Use the `selectedScrollSnap` method to get the current index
                const currentIndex = carouselApi.selectedScrollSnap();
                setSelectedIndex(currentIndex);
            }
        };

        // Attach the event listener
        if (carouselApi) {
            carouselApi.on('select', onSelect);
        }

        // Cleanup function to remove the event listener
        return () => {
            if (carouselApi) {
                carouselApi.off('select', onSelect);
            }
        };
    }, [carouselApi]);

    return (
        <div className='flex justify-center flex-col h-full w-full'>
            <Carousel className='flex justify-between align-middle w-full h-full flex-col' setApi={setCarouselApi}>
                <a
                    href='/home/tasks'
                    className='flex items-center justify-start w-fit h-10 pl-8 pt-5'>
                    <h1 className='text-base font-bold'>Todo</h1>
                    <ReaderIcon className='w-6 h-6 ml-4' />
                </a>

                <CarouselContent className='w-full h-full ml-0' ref={carouselContentRef}>
                    {Array.from(todoStats).map(({ title, value }, index) => (
                        <CarouselItem
                            key={index}
                            className='w-[70%] h-[100%] flex items-center justify-center p-0 '>
                            <div className='flex items-center justify-center w-full h-full'>
                                <Card className='flex items-center justify-center w-[70%] h-full border-none'>
                                    <CardContent className='flex items-center justify-center p-6 w-full h-full gap-12'>
                                        <div className='flex items-start justify-between w-fit h-fit'>
                                            <h1 className='text-base font-normal'>{title}</h1>
                                        </div>
                                        <div className='flex items-center justify-center w-fit h-fit'>
                                            <h1 className='text-4xl font-bold'>{value}</h1>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className='flex items-center justify-end w-full h-10'>
                    <div className='flex justify-center content-center h-full w-full relative'>
                        <CarouselPrevious
                            variant={'ghost'}
                            className={'flex absolute h-8 w-8 left-8'}
                        />
                    </div>
                    <div className='flex justify-end w-full h-full'>
                        <CustomDotNavigation
                            totalItems={totalItems}
                            selectedIndex={selectedIndex}
                            onSelect={handleSelect}
                        />
                    </div>
                    <div className='flex h-full w-full relative'>
                        <CarouselNext
                            variant={'ghost'}
                            className={'flex absolute h-8 w-8 right-8'}
                        />
                    </div>
                </div>
            </Carousel>
        </div>
    );
}

type CustomDotProps = {
    totalItems: number;
    selectedIndex: number;
    onSelect: (index: number) => void;
};

const CustomDotNavigation: React.FC<CustomDotProps> = ({ totalItems, selectedIndex, onSelect }) => {
    return (
        <div className='flex items-center justify-center w-full h-10'>
            {Array.from({ length: totalItems }).map((_, index) => (
                <button
                    key={index}
                    onClick={() => onSelect(index)}
                    className={`embla__dot${
                        index === selectedIndex ? ' embla__dot--selected' : ''
                    }`}
                    aria-label={`Go to item ${index + 1}`}
                />
            ))}
        </div>
    );
};
