import LeftNavbar from "@/components/navbar/leftNavbar";
import TopNavbar from "@/components/navbar/topNavbar";
import LoginInterface from "@/components/auth/loginInterface";
import { PageStateProvider } from "@/components/PageStateContext";
import style from "../auth.module.css";

export default function Login() {
  return (
    <main className={style.main}>
      <div className={style.login}>
        <PageStateProvider>
          <TopNavbar />
          <div className={style.login_container}>
            <LeftNavbar />
            <LoginInterface />
          </div>
        </PageStateProvider>
      </div>
    </main>
  );
}
