'use client';
import Navigator from './navigator';
import { BarChartIcon, HamburgerMenuIcon } from '@radix-ui/react-icons';

export default function CommitsData(): JSX.Element {


    return (
        <div className='flex flex-col w-full h-full'>

            <div className='flex items-center justify-between w-full pl-8 pt-4'>
                <a href='/home/code' className='flex flex-row justify-center'>
                    <h1 className='text-xl font-bold'>Commits Data</h1>
                    <BarChartIcon className='w-5 h-5 ml-4 self-center' />
                </a>
                {/* TODO:
                    Implement a dropdown menu to choose from different widgets.
                    The idea is to make the UI more dynamic.
                */}
                <a className='flex items-center self-end w-fit h-full'>
                    <HamburgerMenuIcon color={'#636363'} className='w-5 h-5 mr-4' />
                </a>
            </div>

            <div className='flex items-center justify-end w-full h-full pr-8'>
                <Navigator />
            </div>
        </div>
    );
}
