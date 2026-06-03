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
      id: 2,
      text: "edit resume",
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

  const deleteTask = () => {
  
  };

  const toggleTask = () => {
  
  };

  const completedCount = tasks.filter(
    task => task.completed
  ).length;

  const uncompletedCount = tasks.length - completedCount;

  return (
    <div className="container">
      <div className="todo-box">
        <h1>To Do List</h1>

        <div className="input-section">
          <input
            type="text"
            placeholder="Enter task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button onClick={addTask}>
            Add
          </button>
        </div>

        <h2>Task List</h2>

        <div className="task-list">
          {tasks.map(task => (
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

                <button className="edit">
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