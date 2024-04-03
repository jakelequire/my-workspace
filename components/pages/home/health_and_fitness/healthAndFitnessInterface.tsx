import styles from './healthAndFitness.module.css';
import { ScrollArea } from '@/components/ui/scroll-area';
import Navbar from './navbar/navbar';


export default function HealthAndFitnessInterface(): JSX.Element {


    return (
        <ScrollArea className='w-[100%] h-[100%]'>
            <section className={styles.container}>
                <div className={styles.wrapper}>
                    <div className='flex flex-row justify-start min-h-screen h-max w-full gap-4'>
                        <div className='flex h-[50vh] w-[20%] border rounded-lg'>
                            <Navbar />
                        </div>
                        <div className='flex h-[100vh] w-[80%] border rounded-lg'>

                        </div>
                    </div>
                </div>
            </section>
        </ScrollArea>
    )
}
