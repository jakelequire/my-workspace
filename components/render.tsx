// render.tsx
import TopNavbar from "./navbar/topNavbar"
import LeftNavbar from "./navbar/leftNavbar"
import PrimaryElement from "./primaryElement"
import { PageStateProvider } from "./PageStateContext"

import style from "./render.module.css"

export default function Render() {

    return (
        <PageStateProvider>
            <main className={style._main}>
                <TopNavbar />
                <div className={style._container}>
                    <LeftNavbar />
                    <PrimaryElement />
                </div>
            </main>
        </PageStateProvider>
    )
}
