import { useState } from "react";
export default function Add({ onAdd, taskToEdit, toggleShow }) {
  const [task, setTask] = useState(taskToEdit.task ? taskToEdit.task : "");
  const [description, setDescription] = useState(
    taskToEdit.description ? taskToEdit.description : ""
  );
  const [time, setTime] = useState(taskToEdit.time ? taskToEdit.time : "");
  const submit = (e) => {
    e.preventDefault();
    if (!task || !time) {
      alert("You can't submit an empty task or time!");
      return;
    }
    onAdd({ task, description, time });
    setTask("");
    setDescription("");
    setTime("");
    if (taskToEdit.task) {
        toggleShow();
    }
  };
  const cancel = (e) => {
    onAdd({ task, description, time });
    setTask("");
    setDescription("");
    setTime("");
    toggleShow();
  };
  return (
    <div>
      <h2>Add Task</h2>
      <form className="add-form">
        <div className="form-control">
          <label>Task</label>
          <input
            type="text"
            value={task}
            placeholder="Add Task"
            onChange={(e) => setTask(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label>Description</label>
          <input
            type="text"
            value={description}
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label>Set Day & Time</label>
          <input
            type="datetime"
            value={time}
            placeholder="Day & Time"
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <button className="btn btn-block" onClick={submit}>
          Save task
        </button>
        {taskToEdit.task && (
          <button className="btn cancel-block" onClick={cancel}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}
