// -------------------------- //
//       { /ToDo/ }
// Index of the ToDo component
// -------------------------- //
import Index from "./src";
import styles from "./styles/todo.module.css";

export default function ToDoInterface(): JSX.Element {

    return (
        <main className={styles.todo}>
            <Index />
        </main>
    )
}