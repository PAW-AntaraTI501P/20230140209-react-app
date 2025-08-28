import { useState } from "react";

const TodoItem = ({ todo, onToggleCompleted, onDeleteTodo, onEditingTodo }) => {
  const [edit, setEdit] = useState(false);
  const [newTask, setNewTask] = useState(todo.task);

  const onHandleEdit = () => {
    if (newTask.trim() !== "") {
      onEditingTodo(todo.id, newTask);
      setEdit(false);
    }
  };

  return (
    <li
      style={{
        marginBottom: "10px",
        border: "1px solid white",
        padding: "10px",
        borderRadius: "8px",
        backgroundColor: todo.completed ? "#2d3d3d" : "transparent",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        {edit ? (
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            style={{ flex: 1, marginRight: "10px", padding: "5px" }}
          />
        ) : (
          <h3
            style={{
              margin: 0,
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            {todo.task}
          </h3>
        )}

        <div style={{ display: "flex", gap: "5px" }}>
          {edit ? (
            <>
              <button
                onClick={onHandleEdit}
                style={{
                  padding: "5px 10px",
                  borderRadius: "4px",
                  backgroundColor: "lightblue",
                  color: "#282c34",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Simpan
              </button>
              <button
                onClick={() => setEdit(false)}
                style={{
                  padding: "5px 10px",
                  borderRadius: "4px",
                  backgroundColor: "gray",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Batal
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onToggleCompleted(todo.id, todo.completed)}
                style={{
                  padding: "5px 10px",
                  borderRadius: "4px",
                  backgroundColor: todo.completed ? "salmon" : "lightgreen",
                  color: "#282c34",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {todo.completed ? "Belum Selesai" : "Selesai"}
              </button>
              <button
                onClick={() => setEdit(true)}
                style={{
                  padding: "5px 10px",
                  borderRadius: "4px",
                  backgroundColor: "gold",
                  color: "#282c34",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Update
              </button>
              <button
                onClick={() => onDeleteTodo(todo.id)}
                style={{
                  padding: "5px 10px",
                  borderRadius: "4px",
                  backgroundColor: "tomato",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Hapus
              </button>
            </>
          )}
        </div>
      </div>
    </li>
  );
};

export default TodoItem;