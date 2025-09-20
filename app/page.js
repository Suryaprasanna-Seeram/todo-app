"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Load from localStorage when page loads
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  // Save to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add or Update Task
  const addTask = () => {
    if (task.trim() === "") return;

    if (editIndex !== null) {
      // Editing existing task
      const updatedTodos = [...todos];
      updatedTodos[editIndex].text = task;
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      // Adding new task
      setTodos([...todos, { text: task, completed: false }]);
    }
    setTask("");
  };

  // Delete task
  const deleteTask = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  // Edit task
  const editTask = (index) => {
    setTask(todos[index].text);
    setEditIndex(index);
  };

  // Toggle complete
  const toggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 shadow-lg rounded-lg bg-white">
      <h1 className="text-2xl font-bold text-center mb-4">My To-Do List</h1>

      {/* Input and Button */}
      <div className="flex mb-4">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="flex-1 border p-2 rounded-l"
          placeholder="Enter a task..."
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded-r"
        >
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      {/* Task List */}
      <ul>
        {todos.map((t, index) => (
          <li
            key={index}
            className="flex justify-between items-center border-b py-2"
          >
            <span
              onClick={() => toggleComplete(index)}
              className={`cursor-pointer ${
                t.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {t.text}
            </span>
            <div className="space-x-2">
              <button
                onClick={() => editTask(index)}
                className="text-green-500 hover:text-green-700"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(index)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

