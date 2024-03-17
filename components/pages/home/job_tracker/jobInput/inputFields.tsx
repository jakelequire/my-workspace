/*    
    export type JobItem = {
        id: string,
        companyName: string,
        position: string,
        payRange: string,
        location: string,
        dateApplied: string,
        origination: string,
        status: string,
    }
*/
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useJobTrackerContext } from '../jobTrackerContext';
import { JT } from '@/types/types';

const job_locations = [
    "Tacoma, WA",
    "Lakewood, WA",
    "Puyallup, WA",
    "Federal Way, WA",
    "Edgewood, WA",
    "Auburn, WA",
    "Covington, WA",
    "Kent, WA",
    "Renton, WA",
    "Bonney Lake, WA",
    "Remote",
    "Other",
]

const job_sources = [
    "Indeed",
    "LinkedIn",
    "Glassdoor",
    "Monster",
    "Company Website",
    "Other",
]

const job_statuses = [
    "Applied",
    "Saved",
    "Pending Interview",
    "Interviewed",
    "Waiting for Response",
]

const job_application_types = [
    "Job",
    "Internship",
    "Freelance",
    "Contract",
    "Other",
]

const job_pay_ranges = [
    "0-20k",
    "20k-40k",
    "40k-60k",
    "60k-80k",
    "80k-100k",
    "100k+",
]

/* ------------------------------------------ *
 * ##########   CompanyNameInput   ########## *
 * ------------------------------------------ */
export function CompanyNameInput() {
    const { newJobItem, setNewJobItem } = useJobTrackerContext();

    const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewJobItem({ ...newJobItem, companyName: e.target.value });
    };

    return (
        <div className={`w-[100%]`}>
            <h2 className='text-sm font-semibold text-gray-500 mb-2'>Company Name</h2>
            <Input
                name='companyName'
                placeholder='Company Name'
                value={newJobItem.companyName}
                onChange={handleCompanyNameChange}
                required
            />
        </div>
    );
}

/* ------------------------------------------- *
 *   ##########   PositionInput   ##########   *
 * ------------------------------------------- */
export function PositionInput() {
    const { newJobItem, setNewJobItem } = useJobTrackerContext();

    const handlePositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewJobItem({ ...newJobItem, position: e.target.value });
    };

    return (
        <div className={`w-[100%]`}>
            <h2 className='text-sm font-semibold text-gray-500 mb-2'>Position</h2>
            <Input
                name='position'
                placeholder='Position'
                value={newJobItem.position}
                onChange={handlePositionChange}
                required
            />
        </div>
    );
}

/* ------------------------------------------- *
 *   ##########   PayRangeInput   ##########   *
 * ------------------------------------------- */
export function PayRangeInput() {
    const { newJobItem, setNewJobItem } = useJobTrackerContext();

    const handlePayRangeChange = (payRange: string) => {
        setNewJobItem({ ...newJobItem, payRange: payRange });
    };

    return (
        <div className={`w-[100%]`}>
            <h2 className='text-sm font-semibold text-gray-500 mb-2'>Pay Range</h2>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className={`w-[100%]`} variant='outline'>
                        {newJobItem.payRange}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56'>
                    <DropdownMenuLabel>Set Pay Range</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={newJobItem.payRange}>
                        {job_pay_ranges.map((payRange, index) => (
                            <DropdownMenuRadioItem
                                key={index}
                                value={payRange}
                                onSelect={(_) => {
                                    handlePayRangeChange(payRange);
                                }}>
                                {payRange}
                            </DropdownMenuRadioItem>
                        ))}
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

/* ------------------------------------------- *
 *   ##########   LocationInput   ##########   *
 * ------------------------------------------- */
export function LocationInput() {
    const { newJobItem, setNewJobItem } = useJobTrackerContext();

    const handleLocationChange = (location: string) => {
        setNewJobItem({ ...newJobItem, location: location });
    };

    return (
        <div className={`w-[100%]`}>
            <h2 className='text-sm font-semibold text-gray-500 mb-2'>Location</h2>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className={`w-[100%]`} variant='outline'>
                        {newJobItem.location}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56'>
                    <DropdownMenuLabel>Set Location</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={newJobItem.location}>
                        {job_locations.map((location, index) => (
                            <DropdownMenuRadioItem
                                key={index}
                                value={location}
                                onSelect={(_) => {
                                    handleLocationChange(location);
                                }}>
                                {location}
                            </DropdownMenuRadioItem>
                        ))}
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

/* ----------------------------------------- *
 *   ##########   SourceInput   ##########   *
 * ----------------------------------------- */
export function SourceInput() {
    const { newJobItem, setNewJobItem } = useJobTrackerContext();

    const handleSourceChange = (source: string) => {
        setNewJobItem({ ...newJobItem, source: source as JT.Source });
    };

    return (
        <div className={`w-[100%]`}>
            <h2 className='text-sm font-semibold text-gray-500 mb-2'>Source</h2>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className={`w-[100%]`} variant='outline'>
                        {newJobItem.source}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56'>
                    <DropdownMenuLabel>Set Source</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={newJobItem.source}>
                        {job_sources.map((source, index) => (
                            <DropdownMenuRadioItem
                                key={index}
                                value={source}
                                onSelect={(_) => {
                                    handleSourceChange(source);
                                }}>
                                {source}
                            </DropdownMenuRadioItem>
                        ))}
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

/* ---------------------------------------- *
 *   ##########   StatusInput   ##########  *
 * ---------------------------------------- */
export function StatusInput() {
    const { newJobItem, setNewJobItem } = useJobTrackerContext();

    const handleStatusChange = (status: string) => {
        setNewJobItem({ ...newJobItem, status: status as JT.Status });
    };

    return (
        <div className={`w-[100%]`}>
            <h2 className='text-sm font-semibold text-gray-500 mb-2'>Status</h2>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className={`w-[100%]`} variant='outline'>
                        {newJobItem.status}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56'>
                    <DropdownMenuLabel>Set Status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={newJobItem.status}>
                        {job_statuses.map((status, index) => (
                            <DropdownMenuRadioItem
                                key={index}
                                value={status}
                                onSelect={(_) => {
                                    handleStatusChange(status);
                                }}>
                                {status}
                            </DropdownMenuRadioItem>
                        ))}
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

/* ------------------------------------------------- *
 *   ##########   ApplicationTypeInput   ##########  *
 * ------------------------------------------------- */
export function ApplicationTypeInput() {
    const { newJobItem, setNewJobItem } = useJobTrackerContext();

    const handleApplicationTypeChange = (applicationType: string) => {
        setNewJobItem({ ...newJobItem, applicationType: applicationType as JT.ApplicationType });
    };

    return (
        <div className={`w-[100%]`}>
            <h2 className='text-sm font-semibold text-gray-500 mb-2'>Application Type</h2>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className={`w-[100%]`} variant='outline'>
                        {newJobItem.applicationType}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56'>
                    <DropdownMenuLabel>Set Application Type</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={newJobItem.applicationType}>
                        {job_application_types.map((applicationType, index) => (
                            <DropdownMenuRadioItem
                                key={index}
                                value={applicationType}
                                onSelect={(_) => {
                                    handleApplicationTypeChange(applicationType);
                                }}>
                                {applicationType}
                            </DropdownMenuRadioItem>
                        ))}
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

/* ------------------------------------ *
 *   ##########   JobLink   ##########  *
 * ------------------------------------ */
export function JobLinkInput() {
    const { newJobItem, setNewJobItem } = useJobTrackerContext();

    const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewJobItem({ ...newJobItem, jobLink: e.target.value });
    };

    return (
        <div className={`w-[100%]`}>
            <h2 className='text-sm font-semibold text-gray-500 mb-2'>Link</h2>
            <Input
                name='link'
                placeholder='Link'
                value={newJobItem.jobLink}
                onChange={handleLinkChange}
                required
            />
        </div>
    );
}
