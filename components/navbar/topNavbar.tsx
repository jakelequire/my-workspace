import Image from 'next/image'
import style from './styles/topnavbar.module.css'

// SVG
import _DOCUMENTS from '@/public/assets/documents.svg'


export default function TopNavbar(): JSX.Element {

    return (
        <nav className={style.topNavbar}>
            <div className={style.container}>
                <ol className={style.list}>
                    
                    <a className={style.navItem}>
                        <Image src={_DOCUMENTS} height={25} width={25} alt="docs" />
                        <p className={style.title}>Documents</p>
                    </a>
  
  
  
                </ol>

            </div>
        </nav>
    )
}