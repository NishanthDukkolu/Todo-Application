async function register() {
  const user = {
    user_fname: document.getElementById('fname').value,
    user_lname: document.getElementById('lname').value,
    user_id: document.getElementById('userid').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value
  };

  const res = await fetch('http://localhost:5000/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });

  const data = await res.json();
  if (res.status === 201) {
    alert('Registration successful! You can now log in.');
    window.location.href = 'index.html';
  } else {
    alert('Registration failed: ' + (data.message || 'Check fields.'));
  }
}
