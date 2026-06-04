import { useState } from "react";
import "./App.css";

interface Task {
id: number;
text: string;
completed: boolean;
}

function App() {
const [input, setInput] = useState<string>("");

const [tasks, setTasks] = useState<Task[]>([
  {
    id: 1,
    text: "watch lecture",
    completed: false,
  },
]);

const addTask = () => {
  if (input.trim() === "") return;

  const newTask: Task = {
    id: Date.now(),
    text: input,
    completed: false,
  };

  setTasks([...tasks, newTask]);
  setInput("");
};

const deleteTask = (id: number) => {
  setTasks(tasks.filter((task) => task.id !== id));
};

const toggleTask = (id: number) => {
  setTasks(
    tasks.map((task) =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    )
  );
};

const editTask = (id: number) => {
  const taskToEdit = tasks.find(
    (task) => task.id === id
  );

  if (!taskToEdit) return;

  const newText = prompt(
    "Edit Task:",
    taskToEdit.text
  );

  if (newText === null || newText.trim() === "")
    return;

  setTasks(
    tasks.map((task) =>
      task.id === id
        ? { ...task, text: newText }
        : task
    )
  );
};

const completedCount = tasks.filter(
  (task) => task.completed
).length;

const uncompletedCount =
  tasks.length - completedCount;

return (
  <div className="container">
    <div className="todo-box">
      <h1>To Do List</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter task"
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
        />

        <button onClick={addTask}>
          Add
        </button>
      </div>

      <h2>Task List</h2>

      <div className="task-list">
        {tasks.map((task) => (
          <div
            className="task-item"
            key={task.id}
          >
            <div className="left">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() =>
                  toggleTask(task.id)
                }
              />

              <span
                className={
                  task.completed
                    ? "completed"
                    : ""
                }
              >
                {task.text}
              </span>
            </div>

            <div className="actions">
              <button
                className="delete"
                onClick={() =>
                  deleteTask(task.id)
                }
              >
                Delete
              </button>

              <button
                className="edit"
                onClick={() =>
                  editTask(task.id)
                }
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="stats">
        Completed: {completedCount} |
        Uncompleted: {uncompletedCount}
      </p>
    </div>
  </div>
);
}

export default App;
