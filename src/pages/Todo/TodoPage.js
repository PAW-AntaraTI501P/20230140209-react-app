import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import TodoForm from "../../components/TodoForm.js";
import TodoList from "../../components/TodoList.js";
import SearchInput from "../../components/SearchInput.js";
import "../../App.css";
//import { Link } from "react-router-dom";
import authFetch from "../../utils/authFetch.js";

const backButtonStyle = {
  backgroundColor: "#9B177E",
  color: "white",
  border: "none",
  padding: "6px 12px",
  borderRadius: "6px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "6px",
  fontSize: "14px",
  fontWeight: "bold",
  marginBottom: "1rem",
};

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchTodos = useCallback((searchQuery) => {
    setLoading(true);
    const url = searchQuery
      ? `/api/todos?search=${encodeURIComponent(searchQuery)}`
      : "/api/todos";

    authFetch(url)
      .then((response) => {
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        console.log("Data dari backend:", data); // 👉 buat cek bentuk response
        const todosArray = Array.isArray(data) ? data : data.todos;
        setTodos(todosArray || []);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setTodos([]);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      fetchTodos(searchTerm);
    }, 500);
    return () => clearTimeout(timerId);
  }, [searchTerm, fetchTodos]);

  const handleAddTodo = (task) => {
    authFetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos([
          ...todos,
          { id: data.id, task: data.task, completed: false },
        ]);
      })
      .catch((err) => console.error("Error adding todo:", err));
  };

  const handleDeleteTodo = (id) => {
    authFetch(`/api/todos/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((err) => console.error("Error deleting todo:", err));
  };

  const handleToggleCompleted = (id, completed) => {
    authFetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: !completed }),
    })
      .then(() => {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !completed } : todo
          )
        );
      })
      .catch((err) => console.error("Error updating todo:", err));
  };

  const handleUpdateTodo = async (id, newTask) => {
    try {
      const response = await authFetch(`/api/todos/update-task/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: newTask }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Gagal update todo");
      }

      const updated = await response.json();

      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, task: updated.task } : t))
      );
    } catch (err) {
      console.error("Error updating todo:", err.message);
    }
  };

  // if (loading) {
  //   return <div style={{ textAlign: "center" }}>Loading...</div>;
  // }

  if (error) {
    return (
      <div style={{ textAlign: "center", color: "red" }}>Error: {error}</div>
    );
  }
  

  return (
    <div className="todo-page-container">
      <header className="todo-page-header">
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <button
            style={backButtonStyle}
            type="button"
            onClick={() => navigate("/home")}
          >
            ← Back
          </button>
        </div>
        <h1>Aplikasi Todo List</h1>
        <TodoForm onAddTodo={handleAddTodo} />
        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <h2>Daftar Tugas Anda</h2>
        <TodoList
          todos={todos}
          onToggleCompleted={handleToggleCompleted}
          onEditingTodo={handleUpdateTodo}
          onDeleteTodo={handleDeleteTodo}
        />
      </header>
    </div>
  );
};

export default TodoPage;
