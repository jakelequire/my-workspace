'use client';
import { useCodeSpaceContext } from "../CodeSpaceContext";



export default function DeploymentData(): JSX.Element {
    const { deploymentData } = useCodeSpaceContext();

    const deploymentObject = deploymentData.map((deployment, index) => ({
        url: deployment.url,
        id: deployment.id,
        node_id: deployment.node_id,
        state: deployment.state,
        environment: deployment.environment,
        created_at: deployment.created_at,
        updated_at: deployment.updated_at,
        statuses_url: deployment.statuses_url,
    }))

    return (
        <div className='flex h-[90%] w-[50%] border overflow-y-scroll'>
            <h1>Deployment Data</h1>
            <div>
                {deploymentData.map((deployment, index) => (
                    <div key={index}>
                        <h2>Deployment {index + 1}</h2>
                        <p>URL: {deployment.url}</p>
                        <p>ID: {deployment.id}</p>
                        <p>Node ID: {deployment.node_id}</p>
                        <p>State: {deployment.state}</p>
                        <p>Environment: {deployment.environment}</p>
                        <p>Created At: {deployment.created_at}</p>
                        <p>Updated At: {deployment.updated_at}</p>
                        <p>Statuses URL: {deployment.statuses_url}</p>
                    </div>
                ))}
            </div>
        
        </div>
    )
}
