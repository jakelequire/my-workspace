import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getUserData } from "../api/apiService";

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

  // Debugging
  // Not able to get the user data from the database
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
    if(!user) {
      console.log("toDoState: no user")
      setTodoLists([]);
      setTasks([]);
    }
    if(user) {
      console.log("toDoState: user")
      getUserData(user.uid).then((userData) => {
        console.log("toDoState: userData", userData)
        setTodoLists(userData.todoLists);
        setTasks(userData.tasks);
      }).catch((error: null) => {
        console.log("todoState: !useEffect THROWN ERROR", error);
    })}
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
