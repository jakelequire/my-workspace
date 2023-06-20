
import ToDo from './todo'
import style from '../styles/index.module.css'

export default function Index(): JSX.Element {

    return (
        <div className={style.index}>
            <div className={style.primary_container}>
                
                <div className={style.todo_container}>
                    <ToDo />
                </div>

                <div className={style.wrapper}>
                    
                    <div className={style.upcoming_container}>


                    </div>

                    <div className={style.completed_container}>


                    </div>

                </div>
                

            </div>
        </div>
    )
}