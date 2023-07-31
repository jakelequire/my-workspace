import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, doc, getDoc } from "firebase/firestore";
import { auth } from "@/lib/firebase";
export default function ToDoState() {
  const [dropdownActive, setDropdownActive] = useState<boolean>(false);
  const [sessionLists, setSessionLists] = useState<Array<JSX.Element>>([]);
  const [sessionTasks, setSessionTasks] = useState([]);
  const [todoLists, setTodoLists] = useState([
    {
      id: "",
      name: "",
    },
  ]);

  const [tasks, setTasks] = useState([
    {
      id: 0,
      listId: 0, // This links the task to the todo list with id 0
      name: "",
      description: "",
      dueDate: "",
      complete: false,
      priority: 0,
    },
  ]);

  useEffect(() => {
    const db = getFirestore();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = doc(collection(db, "users"), user.uid);
        getDoc(userRef).then((doc) => {
          if (doc.exists()) {
            const data = doc.data();
            if (data) {
              setTodoLists(data.todoLists);
              setTasks(data.tasks);
            }
          }
        });
      }
    });
    return () => unsubscribe();
  }, []);



  return {
    todoLists,
    setTodoLists,
    tasks,
    setTasks,
    dropdownActive,
    setDropdownActive,
    sessionLists,
    setSessionLists,
    sessionTasks,
    setSessionTasks,
  };
}
