import { useState } from "react";
import "./App.css";
function App() {
  const [toDos, setToDos] = useState([]);
  const [toDo, setToDo] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [currentTodo, setCurrentTodo] = useState("");

  let day = new Date().toLocaleString("en-us", { weekday: "long" });

  const deleteToDo = (id) => {
    const deleteItem = toDos.filter((todo) => {
      return todo.id !== id;
    });
    setToDos(deleteItem);
  };

  const toDoSumbmit = (e) => {
    e.preventDefault();
    if (toDo !== "") {
      setToDos([
        ...toDos,
        {
          id: Date.now(),
          text: toDo,
        },
      ]);
    }
    setToDo("");
  };

  const editTodo = (id) => {
    const updatedTodos = [...toDos].map((toDo) => {
      if (toDo.id === id) {
        toDo.text = currentTodo;
      }
      return toDo;
    });
    setToDos(updatedTodos);
    setIsEditing(null);
    setCurrentTodo("");
  };

  return (
    <div className="wrapper">
      <div className="app">
        <div className="mainHeading">
          <h1>ToDo List</h1>
          <hr />
        </div>
        <div className="subHeading">
          <br />
          <h2>Hey, it's {day} Make your day </h2>
        </div>
        <div className="input-box">
          <div className="input">
            <input
              value={toDo}
              onChange={(e) => setToDo(e.target.value)}
              type="text"
              placeholder="🖊️ Add item..."
            />
            <i onClick={toDoSumbmit} className="fas fa-plus"></i>
          </div>
        </div>

        <div className="todos">
          {toDos.map((todo) => {
            return (
              <div key={todo.id} className="todo">
                <div className="left">
                  <input type="checkbox" />
                  <div className="editing-input">
                    {isEditing === todo.id ? (
                      <input
                        type="text"
                        onChange={(e) => setCurrentTodo(e.target.value)}
                        value={currentTodo}
                      />
                    ) : (
                      <p>{todo.text}</p>
                    )}
                  </div>
                </div>
                <div className="right">
                  <i
                    onClick={() => deleteToDo(todo.id)}
                    className="fas fa-times"
                  ></i>

                  {isEditing === todo.id ? (
                    <i
                      onClick={() => editTodo(todo.id)}
                      className="fa fa-upload"
                    ></i>
                  ) : (
                    <i
                      onClick={() => setIsEditing(todo.id)}
                      className="fas fa-edit"
                    ></i>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
