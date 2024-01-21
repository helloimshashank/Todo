import React, { useState } from "react";
import { useTodo } from "../Contexts/TodoContext";
import todoitemcss from "../Components/TodoItem.module.css";
function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const { updateTodo, deleteTodo, toggleComplete } = useTodo();

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg });
    setIsTodoEditable(false);
  };
  const toggleCompleted = () => {
    //console.log(todo.id);
    toggleComplete(todo.id);
  };
  const textBoxStyle = {
    textDecoration: "line-through",
  };
  const lineThrough = todo.completed ? textBoxStyle : {};
  return (
    <div className={todoitemcss.maindiv}>
      <div className={todoitemcss.todocard}>
        <input
          type="checkbox"
          className={todoitemcss.checkbox}
          checked={todo.completed}
          onChange={toggleCompleted}
        />
        <input
          type="text"
          className={todoitemcss.todos}
          style={lineThrough}
          value={todoMsg}
          onChange={(e) => setTodoMsg(e.target.value)}
          readOnly={!isTodoEditable}
        />
        {/* Edit, Save Button */}
        <button
          className={todoitemcss.editbtn}
          onClick={() => {
            if (todo.completed) return;

            if (isTodoEditable) {
              editTodo();
            } else setIsTodoEditable((prev) => !prev);
          }}
          disabled={todo.completed}
        >
          {isTodoEditable ? "📁" : "✏️"}
        </button>
        {/* Delete Todo Button */}
        <button
          className={todoitemcss.deletebtn}
          onClick={() => deleteTodo(todo.id)}
        >
          ⛔
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
