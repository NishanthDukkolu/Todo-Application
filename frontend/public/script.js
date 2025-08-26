let todos = [];

async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const res = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  if (data.token) {
    localStorage.setItem('token', data.token);
    document.querySelector('.login-form').style.display = 'none';
    document.querySelector('.todo-section').style.display = 'block';
    document.getElementById('logoutBtn').style.display = 'inline-block';
    fetchTodos();
  } else {
    alert('Login failed');
  }
}

function logout() {
  localStorage.removeItem('token');
  location.reload();
}

async function fetchTodos() {
  const res = await fetch('http://localhost:5000/api/todos', {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  });
  todos = await res.json();
  renderTodos();
}

async function addTodo() {
  const title = document.getElementById('todoInput').value;
  const res = await fetch('http://localhost:5000/api/todos', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, completed: false })
  });
  await res.json();
  document.getElementById('todoInput').value = '';
  fetchTodos();
}

async function toggleTodo(id) {
  const todo = todos.find(t => t._id === id);
  const res = await fetch('http://localhost:5000/api/todos/' + id, {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ completed: !todo.completed, title: todo.title })
  });
  await res.json();
  fetchTodos();
}

async function deleteTodo(id) {
  await fetch('http://localhost:5000/api/todos/' + id, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  });
  fetchTodos();
}

function renderTodos() {
  const list = document.getElementById('todoList');
  list.innerHTML = '';
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span style="cursor:pointer" onclick="toggleTodo('${todo._id}')">
        ${todo.title} - ${todo.completed ? '✅' : '❌'}
      </span>
      <button onclick="deleteTodo('${todo._id}')" style="margin-left:10px">❌</button>
    `;
    list.appendChild(li);
  });
}
