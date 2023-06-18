import Image from 'next/image'

import style from './styles/leftnavbar.module.css'

// SVGs
import _HOME from '@/public/assets/home.svg'
import _BANKING from '@/public/assets/banking.svg'
import _TODO from '@/public/assets/todo.svg'

export default function LeftNavbar(): JSX.Element {

    return (
        <nav className={style.leftNavbar}>
            <div className={style.dashboard_container}>
                <ol className={style.dashboard_items}>
                    <li className={style.listItem} data-active="true">
                        <Image src={_HOME} height={25} width={25} alt="home" />
                        <h1 className={style.header}>Home</h1>
                    </li>
                    <li className={style.listItem} data-active="false">
                        <Image src={_BANKING} height={25} width={25} alt="Banking" />
                        <h1 className={style.header}>Banking</h1>
                    </li>
                    <li className={style.listItem} data-active="false">
                        <Image src={_TODO} height={25} width={25} alt="To-Do" />
                        <h1 className={style.header}>To-Do</h1>
                    </li>
                </ol>

            </div>


        </nav>
    )
}