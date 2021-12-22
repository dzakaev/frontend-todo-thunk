const initialState = {
  todos: [],
  loading: false,
};

export const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    case "todos/load/fulfilled":
      return {
        ...state,
        todos: action.payload,
        loading: false,
      };
    case "todos/load/pending":
      return {
        ...state,
        loading: true,
      };
    case "start/deleting":
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo._id === action.payload) {
            todo.deleting = true;
          }
          return todo;
        }),
      };
    case "check":
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo._id === action.payload) {
            todo.completed = !todo.completed;
          }
          return todo;
        }),
      };
    case "todo/delete":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== action.payload),
      };
    case "todo/add":
      return {
        ...state,
        todos: [...state.todos, action.payload],
        loading: false,
      };
    case "todo/add/pending":
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};

export const loadTodos = () => {
  return async (dispatch) => {
    dispatch({ type: "todos/load/pending" });
    try {
      const res = await fetch("http://localhost:3003/todos");
      const json = await res.json();
      dispatch({ type: "todos/load/fulfilled", payload: json });
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const removeTodo = (id) => {
  return async (dispatch) => {
    dispatch({ type: "start/deleting", payload: id });
    try {
      const res = await fetch(`http://localhost:3003/todos/${id}`, {
        method: "DELETE",
      });
      await res.json();
      dispatch({ type: "todo/delete", payload: id });
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const checkTodo = (id, completed) => {
  return async (dispatch) => {
    try {
      const res = await fetch(`http://localhost:3003/todos/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ completed: !completed }),
        headers: {
          "Content-type": "application/json",
        },
      });
     await res.json();
      dispatch({ type: "check", payload: id });
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const todoAdd = (text) => {
  return async (dispatch) => {
    dispatch({ type: "todo/add/pending" });
    try {
      const res = await fetch("http://localhost:3003/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ text: text }),
      });
      const json = await res.json();
      dispatch({ type: "todo/add", payload: json });
    } catch (e) {
      console.log(e.message);
    }
  };
};
