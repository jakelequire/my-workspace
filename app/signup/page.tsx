import LeftNavbar from "@/components/navbar/leftNavbar";
import TopNavbar from "@/components/navbar/topNavbar";
import SignupInterface from "@/components/auth/signupInterface";
import { PageStateProvider } from "@/components/PageStateContext";
import style from "../auth.module.css";

export default function SignUp() {
  return (
      <main className={style.main}>
        <div className={style.signup}>
            <PageStateProvider>
                <TopNavbar />
                <div className={style.signup_container}>
                    <LeftNavbar />
                    <SignupInterface />
                </div>
            </PageStateProvider>
        </div>
      </main>
  );
}
