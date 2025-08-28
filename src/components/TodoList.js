import TodoItem from "./TodoItem";

const TodoList = ({ todos, onToggleCompleted, onEditingTodo, onDeleteTodo }) => {
  if (todos.length === 0) {
    return <p>Tidak ada tugas yang ditemukan. Silakan tambahkan satu.</p>;
  }

  return (
    <ul style={{ listStyleType: "none", padding: 0 }}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleCompleted={onToggleCompleted}
          onDeleteTodo={onDeleteTodo}
          onEditingTodo={onEditingTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;