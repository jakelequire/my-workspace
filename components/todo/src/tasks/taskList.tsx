import style from "../../styles/tasks/taskList.module.css";

export default function TaskList(): JSX.Element {
  return (
    <div className={style.todo_container}>
        {exampleListData.map((item, index) => (
            <ListItem 
                key={index}
                title={item.title}
                description={item.description}
                createdDate={item.createdDate}
                dueDate={item.dueDate}
                priority={item.priority}
                completed={item.completed}
            />
        ))}
    </div>
  )
}

interface ListItemProps {
  title: string;
  description: string;
  createdDate: string;
  dueDate: string;
  priority: number;
  completed: boolean;
};

function ListItem({
    title,
    description,
    createdDate,
    dueDate,
    priority,
    completed,
}: ListItemProps): JSX.Element {

  return (
    <div className={style.list_item}>
        <div className={style.list_item_title}>
            <h3 className={style.title}>{title}</h3>
            <p className={style.description}>{description}</p>
            <p className={style.createDate}>{createdDate}</p>
        </div>
        <div className={style.list_item_sidebar}>
            <p className={style.priority}>{priority}</p>
            <p className={style.dueDate}>{dueDate}</p>
        </div>
        <div className={style.list_item_checkbox}>
            <input type="checkbox" checked={completed} className={style.checkbox} />
        </div>
    </div>
  )
};


const exampleListData = [
    {
        title: "Example Title",
        description: "Example Description",
        createdDate: "2021-10-10",
        dueDate: "2021-10-10",
        priority: 1,
        completed: false,
    },
    {
        title: "Example Title",
        description: "Example Description",
        createdDate: "2021-10-10",
        dueDate: "2021-10-10",
        priority: 1,
        completed: false,
    },
    {
        title: "Example Title",
        description: "Example Description",
        createdDate: "2021-10-10",
        dueDate: "2021-10-10",
        priority: 1,
        completed: false,
    },
]