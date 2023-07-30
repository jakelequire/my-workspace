import { useState, useEffect } from "react";


export default function ToDoState() {
  const [todoList, setTodoList] = useState({
    id: 0,
    name: "",
    tasks: [
      {
        id: 0,
        name: "",
        description: "",
        dueDate: "",
        complete: false,
        priority: 0,
      },
    ],
  });


  useEffect(() => {
    
  },[])


  return {
    todoList,
    setTodoList,
  };
}
