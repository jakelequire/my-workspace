import FileExplorer from './fileExplorer/fileExplorer'
import FileUploader from './fileUploader/fileUploader'
import Navigation from './navigation/navigation'
import StorageUi from './storageUi/storageUi'
import styles from './storage.module.css'



export default function StorageInterface() {
    
    return (
        <section className={styles.storage_container}>
            <div className={styles.navbar}>
                <FileUploader />
                <FileExplorer />
            </div>
            <div className={styles.file_panel_container}>
                <Navigation />
                <StorageUi />
            </div>
        </section>
    )
}
