import { useState,useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState([]);
  const BASE_URL = "https://todo-app-30vz.onrender.com"

  useEffect(() => {
    axios.get(`$https://todo-app-30vz.onrender.com/todos`)
      .then(res => setTodos(res.data))
      .catch(err => console.error(err));
  }, []);


  const handleAddTodo = () => {
    if (title.trim() === '') return;
    axios.post(`$https://todo-app-30vz.onrender.com/todos`, { title })
      .then(res => {
        setTodos([...todos, res.data]);
        setTitle('');
      })
    };

  const handleDelete = (id) => {
    axios.delete(`$https://todo-app-30vz.onrender.com/todos/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id));
      })
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>📝 My TODO App (Connected to Backend)</h2>

      <input
        type="text"
        placeholder="Enter todo"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add</button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title}
            <button onClick={() => handleDelete(todo.id)} style={{ marginLeft: '10px' }}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
