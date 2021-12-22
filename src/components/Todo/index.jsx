import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  checkTodo,
  loadTodos,
  removeTodo,
  todoAdd,
} from "../../redux/features/reducer";
import styles from "../styles.module.css";

const Todo = () => {
  const todos = useSelector((state) => state.todos);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  const [text, setText] = useState("");

  useEffect(() => {
    dispatch(loadTodos());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(removeTodo(id));
  };

  const handleCheck = (id, completed) => {
    dispatch(checkTodo(id, completed));
  };

  const handleAdd = (e) => {
    setText(e.target.value);
  };

  const handleAddTodo = () => {
    dispatch(todoAdd(text));
    setText("");
  };
  return (
    <div className={styles.todos}>
      <div className={styles.todoList}>Список дел</div>
      <div className={styles.add}>
        <input
          type="text"
          value={text}
          onChange={handleAdd}
          placeholder="Введите текст..."
        />
        <button onClick={handleAddTodo}>Добавить</button>
      </div>
      {loading ? (
        "..."
      ) : (
        <>
          {todos.map((todo) => {
            return (
              <div key={todo._id} className={styles.todo}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleCheck(todo._id, todo.completed)}
                />
                <div className={styles.textTodo}>{todo.text}</div>
                <button
                  disabled={todo.deleting}
                  onClick={() => handleDelete(todo._id)}
                >
                  Удалить
                </button>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Todo;
