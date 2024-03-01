import Dashboard from './dashboard/dashboard'
import styles from './index.module.css'



export default function IndexInterface(): JSX.Element {


    return (
        <section className={styles.index_container}>
            <Dashboard />
        
        </section>
    )
}
