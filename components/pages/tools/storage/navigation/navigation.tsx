import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList } from '@/components/ui/breadcrumb';
import { ChevronDownIcon } from '@radix-ui/react-icons';

export default function Navigation(): JSX.Element {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>Home</BreadcrumbItem>
                <BreadcrumbItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger className='flex items-center gap-1'>
                            Components
                            <ChevronDownIcon />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='start'>
                            <DropdownMenuItem>Documentation</DropdownMenuItem>
                            <DropdownMenuItem>Themes</DropdownMenuItem>
                            <DropdownMenuItem>GitHub</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </BreadcrumbItem>
                
            </BreadcrumbList>
        </Breadcrumb>
    );
}
