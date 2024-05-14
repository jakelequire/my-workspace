'use client';
import { FilePlus, UploadCloud } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button";
import { pages } from "../pages/pages";
import { useDocsContext } from "../../DocsContext";

export default function NewItemContainer(): JSX.Element {
    const { currentDoc, setCurrentDoc } = useDocsContext();



    const handleClick = () => {
        setCurrentDoc(pages.newItemPage.page)
    }

    return (
        <div className='flex h-full w-full border p-3 gap-3'>

            <div className='flex w-[80%] h-full border'>
                <div className='flex w-full h-full items-center px-4'>
                    <Tooltip>
                        <TooltipTrigger className='flex w-full h-full justify-center'>
                            <div className='flex w-full h-full justify-start'>
                                <UploadCloud size={32} color="#999" className='bg-transparent self-center'/>
                                <span className='sr-only'>Upload</span>
                            </div>

                            <div className='flex'>

                            </div>
                        </TooltipTrigger>
                        <TooltipContent>Upload New Item</TooltipContent>
                    </Tooltip>
                </div>
            </div>

            <div className='flex justify-center items-center w-[20%] h-full rounded-lg border'>
                <Tooltip>
                    <TooltipTrigger asChild className='flex w-full h-full justify-center'>
                        <Button 
                            variant='ghost' 
                            size='icon' 
                            className='bg-transparent'
                            onClick={handleClick}
                        >
                            <FilePlus size={36} className='bg-transparent'/>
                            <span className='sr-only'>New</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>New</TooltipContent>
                </Tooltip>
            </div>

        </div>
    )
}

