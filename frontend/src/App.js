import React from 'react';
import TodoList from './components/TodoList';
import Login from './components/Login';
import './App.css';

function App() {
  return (
    <div className="App">
      <h2>Todo App</h2>
      <Login />
      <TodoList />
    </div>
  );
}
export default App;