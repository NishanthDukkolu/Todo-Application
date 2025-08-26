import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const fetchTodos = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:5000/api/todos', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTodos(res.data);
  };

  const addTodo = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.post('http://localhost:5000/api/todos', { title: newTodo, completed: false }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTodos([...todos, res.data]);
    setNewTodo('');
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <input value={newTodo} onChange={e => setNewTodo(e.target.value)} placeholder="New Task" />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>{todo.title} - {todo.completed ? '✅' : '❌'}</li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;