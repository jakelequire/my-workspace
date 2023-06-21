"use client"
import HomepageInterface from "./homepage/homepageInterface";
import BankingInterface from "./banking/bankingInterface";
import ToDoInterface from "./todo/todoInterface";
import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { usePageStateContext } from "./PageStateContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '@/lib/firebase';
import SignupInterface from "./auth/signupInterface";
import { User } from "firebase/auth";

export default function PrimaryElement() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);
  
  const { data: session, status } = useSession();
  console.log("<Render> Session-Data:", session);
  console.log("<Render> Session-Status:", status);
  const { page } = usePageStateContext();



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
    return <SignupInterface />;
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
