import { useState } from "react";
import { MdOutlineDone } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa";

function App() {
  let [todolist, setTodolist] = useState([]);
  let saveTodolist = (event) => {
    let toName = event.target.toName.value.trim();
    if (toName === "") {
      alert("Cannot add an empty or space-only todo");
      return;
    }
    if (!todolist.some((todo) => todo.name === toName)) {
      let finalDolist = [...todolist, { name: toName, completed: false }];
      setTodolist(finalDolist);
    } else {
      alert("Todo name already exists...");
    }
    event.preventDefault();
    event.target.toName.value = "";
  };

  const deleteitem = (itemToDelete) => {
    setTodolist(todolist.filter((todo) => todo.name !== itemToDelete));
  };

  const checkStatus = (itemToToggle) => {
    setTodolist((prevTodolist) =>
      prevTodolist.map((todo) =>
        todo.name === itemToToggle
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  return (
    <div className="app">
      <div className="content">
        <FaRegCalendarCheck className="icon-calendar" />
        <h1>To-Do List</h1>
        <form onSubmit={saveTodolist}>
          <input type="text" name="toName" />
          <button type="submit">Add</button>
        </form>

        <div className="outerDiv">
          <ul>
            {todolist.map((todo, index) => (
              <li
                key={index}
                className={todo.completed ? "completeTodo" : ""}
                onClick={() => checkStatus(todo.name)}
              >
                {todo.completed ? (
                  <MdOutlineDone className="icon-done" />
                ) : null}
                {todo.name}{" "}
                <span
                  style={{ cursor: "pointer", color: "black" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteitem(todo.name);
                  }}
                >
                  &times;
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
