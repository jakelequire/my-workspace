"use client";
import HomepageInterface from "./homepage/homepageInterface";
import BankingInterface from "./banking/bankingInterface";
import CalendarInterface from "./calendar/calendarInterface";
import ToDoInterface from "./todo/todoInterface";
import StudyInterface from "./study/studyInterface";
import SignupInterface from "./auth/signupInterface";
import LoginInterface from "./auth/loginInterface";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePageStateContext } from "./PageStateContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { User } from "firebase/auth";

export default function PrimaryElement() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [requestedPage, setRequestedPage] = useState<string>("home");
  const { page, setPage } = usePageStateContext();
  const { data: session, status } = useSession();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // stop loading once we know the auth state
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      setRequestedPage("loggedout");
    } else {
      setRequestedPage("home");
    }
  }, [user, setRequestedPage]);

  useEffect(() => {
    if (session) {
      setPage(requestedPage);
    }
  }, [setRequestedPage]);

  console.log("<Render> Session-Data:", session);
  console.log("<Render> Session-Status:", status);

  if (loading) {
    return <div>Loading...</div>; // or a spinner or some other loading indicator
  }

  let currentPage;
  if (!loading) {
    // TODO:
    // Move this switch statement to a separate function
    switch (page) {
      case "home":
        currentPage = <HomepageInterface />;
        break;
      case "banking":
        currentPage = <BankingInterface />;
        break;
      case "calendar":
        currentPage = <CalendarInterface />;
        break;
      case "todo":
        currentPage = <ToDoInterface />;
        break;
      case "study":
        currentPage = <StudyInterface />;
        break;
      case "resources":
        currentPage = <></>;
        break;
      case "analytics":
        currentPage = <></>;
        break;
      case "loggedout":
        currentPage = <SignedoutInterface />;
        break;
    }
  }
  return <main style={styles}>{currentPage}</main>;
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
  );
}

const _styles = {
  display: "flex",
  height: "100%",
  width: "100%",
};
