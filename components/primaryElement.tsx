"use client"
import HomepageInterface from "./homepage/homepageInterface";
import BankingInterface from "./banking/bankingInterface";
import ToDoInterface from "./todo/todoInterface";
import LoggedOutInterface from "./loggedout/loggedoutInterface";
import { useSession, signIn, signOut } from "next-auth/react";
import { usePageStateContext } from "./PageStateContext";

export default function PrimaryElement() {

  const { data: session, status } = useSession();

  console.log("<Render> Session-Data:", session);
  console.log("<Render> Session-Status:", status);

  const { page } = usePageStateContext();

  if(status === 'unauthenticated') {
    return <LoggedOutInterface />
  }

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

  return (
    <main style={styles}>
        {currentPage}
    </main>
  );
}

const styles = {
  display: "flex",
  height: "100%",
  width: "100%",
};
