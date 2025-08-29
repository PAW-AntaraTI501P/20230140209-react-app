import { useState } from "react";
import "../App.css"

const TodoForm = ({ onAddTodo }) => {
  const [newTask, setNewTask] = useState("");

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask) {
      onAddTodo(newTask);
      setNewTask("");
    }
  };

  return (
    <div
      style={{
        marginBottom: "20px",
        padding: "20px",
        border: "1px solid #fff",
        borderRadius: "8px",
      }}
    >
      <h2>Tambah Todo Baru</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="text"
          name="task"
          className="form-input"
          placeholder="Tambahkan tugas baru..."
          value={newTask}
          onChange={handleInputChange}
          required
          style={{ padding: "8px", borderRadius: "4px", border: "none", backgroundColor: "#FFEAEA"}}
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#9B177E",
            color: "#ffffff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Tambah
        </button>
      </form>
    </div>
  );
};

export default TodoForm;