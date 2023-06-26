import style from '../styles/monthbar.module.css'


export default function MonthBar(): JSX.Element {

    return (
        <div className={style.monthbar_container}>
            <ol className={style.monthbar_list}>
                <a className={style.monthbar_item} >Jan</a>
                <a className={style.monthbar_item} >Feb</a>
                <a className={style.monthbar_item} >March</a>
                <a className={style.monthbar_item} >April</a>
                <a className={style.monthbar_item} >May</a>
                <a className={style.monthbar_item} >June</a>
                <a className={style.monthbar_item} >July</a>
                <a className={style.monthbar_item} >Aug</a>
                <a className={style.monthbar_item} >Sept</a>
                <a className={style.monthbar_item} >Oct</a>
                <a className={style.monthbar_item} >Nov</a>
                <a className={style.monthbar_item} >Dec</a>
            </ol>
        </div>
    )
}