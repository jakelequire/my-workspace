import TopNavbar from "./navbar/topNavbar"
import LeftNavbar from "./navbar/leftNavbar"
import HomepageInterface from "./homepage/homepageInterface"


import style from "./render.module.css"

export default function Render() {

    return (
        <main className={style._main}>
            <TopNavbar />
            <div className={style._container}>
                <LeftNavbar />
                <HomepageInterface />
            </div>
        </main>
    )
}
