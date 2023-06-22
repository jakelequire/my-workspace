"use client"
import HomepageInterface from "./homepage/homepageInterface";
import BankingInterface from "./banking/bankingInterface";
import ToDoInterface from "./todo/todoInterface";
import SignupInterface from "./auth/signupInterface";
import LoginInterface from "./auth/loginInterface";
import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { usePageStateContext } from "./PageStateContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '@/lib/firebase';
import { User } from "firebase/auth";

export default function PrimaryElement() {
  const [user, setUser] = useState<User | null>(null);
  const [requestedPage, setRequestedPage] = useState<string>("home");
  const { setPage } = usePageStateContext();
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      setPage("loggedout");
    }
  }, [user, setPage]);
  
  
  const { data: session, status } = useSession();
  const { page } = usePageStateContext();

  console.log("<Render> Session-Data:", session);
  console.log("<Render> Session-Status:", status);

  let currentPage;
  switch (page) {
    case "home":
      currentPage = <HomepageInterface />;
      break;
    case "banking":
      currentPage = <BankingInterface />;
      break;
    case "todo":
      currentPage = <ToDoInterface />;
      break;
    case "reminders":
      currentPage = <></>;
      break;
    case "documents":
      currentPage = <></>;
      break;
  }

  if (!user) {
    // @ts-ignore 
    return <SignedoutInterface />;
  } else {
    return (
      <main style={styles}>
        {currentPage}
      </main>
    );
  }
}

const styles = {
  display: "flex",
  height: "100%",
  width: "100%",
};


function SignedoutInterface(): JSX.Element {

  return (
    <div style={_styles}>
      <LoginInterface />
      <SignupInterface />
    </div>
  )
}

const _styles = {
  display: "flex",
  height: "100%",
  width: "100%",
}