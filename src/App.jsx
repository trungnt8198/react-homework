import { useState } from 'react'
import './App.css'

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleAdd = () => {
    let newTodo = {value: todo.trim(), done: false};
    if(validateTodo(newTodo.value)) {
      const newTodos = [newTodo, ...todos];
      localStorage.setItem("tasks", JSON.stringify(newTodos));
      setTodos(newTodos);
      setTodo("");
    }
  }

  const handleUpdate = (index) => {
    const oldValue = todos[index].value;
    const updatedValue = prompt("Update To do: ", oldValue).trim();
    if(updatedValue !== oldValue && validateTodo(updatedValue)) {
      let newTodos = [...todos];
      newTodos[index].value = updatedValue;
      localStorage.setItem("tasks", JSON.stringify(newTodos));
      setTodos(newTodos);
    }
  }

  const handleUpdateStatus = (index) => {
    let newTodos = [...todos];
    newTodos[index].done = !newTodos[index].done;
    localStorage.setItem("tasks", JSON.stringify(newTodos));
    setTodos(newTodos);
  }

  const handleDelete = (index) => {
    const confirmDelete = confirm(`Do you really want to delete this todo: ${todos[index].value}`);
    if(confirmDelete) {
      let newTodos = todos.filter(t => t.value !== todos[index].value);
      localStorage.setItem("tasks", JSON.stringify(newTodos));
      setTodos(newTodos);
    }
  }

  function validateTodo(todo) {
    if(todo === "") {
      alert("To do must not be empty !");
      return false;
    }
    if(todo.length > 250) {
      alert("To do length must not greater than 250 characters !");
      return false;
    }
    if(todos.find(t => t.value === todo)) {
      alert("This To Do is existing, please try another !");
      return false;
    }
    return true;
  }

  return(
  <>
    <h3>Create your Todo-List</h3>
    <div className="input-group">
      <input value={todo} 
        onChange={(e) => setTodo(e.target.value)} 
        onKeyDown={(e) => {if(e.key === "Enter") handleAdd()}}
      />
      <button onClick={handleAdd} onMouseDown={(e) => e.preventDefault()}>ADD</button>
    </div>

    <ul>
        {todos.map((t,index) => 
          <li key={index} className={t.done ? "done" : ""}>{t.value}
            <div>
              <button style={{color: 'green'}} onClick={() => handleUpdate(index)}>EDIT</button>
              <button style={{color: 'orange'}} onClick={() => handleUpdateStatus(index)}>{t.done ? "MARK AS UNDONE" : "MARK AS DONE"}</button>
              <button style={{color: 'red'}} onClick={() => handleDelete(index)}>DELETE</button>
            </div>
          </li>)
        }
    </ul>
  </>)
}



export default App
