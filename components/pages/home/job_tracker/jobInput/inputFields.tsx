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
import { useJobTrackerContext } from '../jobTrackerContext';

/* ------------------------------------------ *
 * ##########   CompanyNameInput   ########## *
 * ------------------------------------------ */
export function CompanyNameInput() {
    const { newJobItem, setNewJobItem } = useJobTrackerContext();

    const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewJobItem({ ...newJobItem, companyName: e.target.value });
    }

    return (
        <Input
            name="companyName"
            placeholder="Company Name"
            value={newJobItem.companyName}
            onChange={handleCompanyNameChange}
            required
        />
    );
}

/* ------------------------------------------- *
 *   ##########   PositionInput   ##########   *
 * ------------------------------------------- */
export function PositionInput() {
    const { newJobItem, setNewJobItem } = useJobTrackerContext();

    const handlePositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewJobItem({ ...newJobItem, position: e.target.value });
    }

    return (
        <Input
            name="position"
            placeholder="Position"
            value={newJobItem.position}
            onChange={handlePositionChange}
            required
        />
    );
}

/* ------------------------------------------- *
 *   ##########   PayRangeInput   ##########   *
 * ------------------------------------------- */
export function PayRangeInput() {
    const { newJobItem, setNewJobItem } = useJobTrackerContext();

    const handlePayRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewJobItem({ ...newJobItem, payRange: e.target.value });
    }

    return (
        <Input
            name="payRange"
            placeholder="Pay Range"
            value={newJobItem.payRange}
            onChange={handlePayRangeChange}
            required
        />
    );
}

/* ------------------------------------------- *
 *   ##########   LocationInput   ##########   *
 * ------------------------------------------- */
export function LocationInput() {
    const { newJobItem, setNewJobItem } = useJobTrackerContext();

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewJobItem({ ...newJobItem, location: e.target.value });
    }

    return (
        <Input
            name="location"
            placeholder="Location"
            value={newJobItem.location}
            onChange={handleLocationChange}
            required
        />
    );
}

/* ----------------------------------------- *
 *   ##########   SourceInput   ##########   *
 * ----------------------------------------- */
export function SourceInput() {
    const { newJobItem, setNewJobItem } = useJobTrackerContext();

    const handleSourceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewJobItem({ ...newJobItem, source: e.target.value });
    }

    return (
        <Input
            name="source"
            placeholder="Source"
            value={newJobItem.source}
            onChange={handleSourceChange}
            required
        />
    );
}

/* ---------------------------------------- *
 *   ##########   StatusInput   ##########  *
 * ---------------------------------------- */
export function StatusInput() {
    const { newJobItem, setNewJobItem } = useJobTrackerContext();

    const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewJobItem({ ...newJobItem, status: e.target.value });
    }

    return (
        <Input
            name="status"
            placeholder="Status"
            value={newJobItem.status}
            onChange={handleStatusChange}
            required
        />
    );
}

export function ApplicationTypeInput() {
    const { newJobItem, setNewJobItem } = useJobTrackerContext();

    const handleApplicationTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewJobItem({ ...newJobItem, applicationType: e.target.value });
    }

    return (
        <Input
            name="applicationType"
            placeholder="Application Type"
            value={newJobItem.applicationType}
            onChange={handleApplicationTypeChange}
            required
        />
    );
}