import { useState } from "react";
import { RiDeleteBin5Line, RiEdit2Fill } from "react-icons/ri";
import { GrCheckmark, GrUndo } from "react-icons/gr";
import Add from "../components/add";
import styles from "../styles/task.css";
export const links = () => {
  return [{ rel: "stylesheet", href: styles }];
};
export default function Index() {
  const [AddSection, setAddSection] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      task: "First task",
      description: "Description 1",
      time: "01/02/2022",
      completed: false,
    },
    {
      id: 2,
      task: "Second task",
      description: "Description 2",
      time: "05/03/2022",
      completed: false,
    },
  ]);
  const [taskToEdit, setTaskToEdit] = useState({});
  // Add task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const completed = false;
    const newTask = { id, completed, ...task };
    setTasks([...tasks, newTask]);
    setTaskToEdit({});
  };
  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((tasks) => tasks.id !== id));
  };
  // get task according to id
  const getTaskWithID = (id) => {
    deleteTask(id);
    let task = tasks.filter((task) => task.id === id)[0];
    toggleShow();
    return task;
    // || JSON.stringify(tasks) !== '{}'
  };
  // complete task
  const completeTask = (id) => {
    let tasks_1 = [
      { id: 1, task: "", description: "", time: "", completed: false },
    ];
    tasks_1 = [];
    tasks.map((task) => {
      task.id !== id
        ? tasks_1.push(task)
        : tasks_1.push({ ...task, completed: !task.completed });
    });
    setTasks(tasks_1);
  };

  // Toggle add section
  const toggleShow = () => {
    setAddSection(!AddSection);
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Todo Application</h1>
        <button
          className="btn"
          style={
            AddSection
              ? { backgroundColor: "red" }
              : { backgroundColor: "green" }
          }
          onClick={toggleShow}
        >
          {AddSection ? "Close" : "Add"}
        </button>
      </header>
      {AddSection && (
        <Add onAdd={addTask} taskToEdit={taskToEdit} toggleShow={toggleShow} />
      )}
      {tasks.length > 0 ? (
        <div className="task-section">
          {tasks.map((task) => (
            <div
              className={`task ${task.completed ? "task-completed" : ""}`}
              key={task.id}
            >
              <h3 className="task-title">{task.task}</h3>
              <p className="task-description">{task.description}</p>
              <p className="task-time">{task.time}</p>
              <button
                className="delete-icon"
                onClick={() => deleteTask(task.id)}
              >
                <RiDeleteBin5Line />
              </button>
              <button
                className="delete-icon edit-icon"
                onClick={() =>
                  task.completed ? setTaskToEdit(getTaskWithID(task.id)) : null
                }
              >
                <RiEdit2Fill />
              </button>
              <button
                className="delete-icon edit-icon"
                onClick={() => completeTask(task.id)}
              >
                {!task.completed ? <GrCheckmark /> : <GrUndo />}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <h1>No Task</h1>
      )}
    </div>
  );
}
