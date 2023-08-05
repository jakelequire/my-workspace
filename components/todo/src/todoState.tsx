import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { UserData } from "@/db/types/userData";
import useSessionState from "@/components/useSessionState";
import newList from "../api/newList";

const NewList = newList;

export default function ToDoState() {
  const { uid } = useSessionState();
  const [dropdownActive, setDropdownActive] = useState<boolean>(false);

  const [sessionLists, setSessionLists] = useState<UserData.List>();

  const [newList, setNewList] = useState<UserData.NewList>({
    title: "Example",
    items: [],
  });

  const [todoLists, setTodoLists] = useState<UserData.List>({
    id: "",
    title: "",
    items: [
      {
        id: "",
        title: "",
        description: "",
        creationDate: "",
        dueDate: "",
        priority: 0,
        completed: false,
      },
    ],
  });

  useEffect(() => {
    const list = async () => {
      /**/ console.log("<ToDoState> uid", uid, "<ToDoState> newList", newList);
      return await NewList(uid, newList);
    };
    list();
  }, [newList, uid]);

  // !Debugging
  // Not able to get the user data from the database
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {});
    return () => unsubscribe();
  }, []);

  return {
    todoLists,
    setTodoLists,
    newList,
    setNewList,
    dropdownActive,
    setDropdownActive,
    sessionLists,
    setSessionLists,
  };
}
