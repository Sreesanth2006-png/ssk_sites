async function fetchTodos() {
  const res = await fetch('/api/todos');
  return res.json();
}

async function addTodo(text) {
  const res = await fetch('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  return res.json();
}

async function toggleTodo(id, done) {
  const res = await fetch('/api/todos', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, done }),
  });
  return res.json();
}

async function deleteTodo(id) {
  const res = await fetch(`/api/todos?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  return res.json();
}

function renderTodos(todos) {
  const list = document.getElementById('todo-list');
  list.innerHTML = '';
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'todo-item';

    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.done;
    checkbox.addEventListener('change', async () => {
      await toggleTodo(todo.id, checkbox.checked);
      loadAndRender();
    });

    const span = document.createElement('span');
    span.textContent = todo.text;
    if (todo.done) span.classList.add('done');

    const del = document.createElement('button');
    del.textContent = 'Delete';
    del.className = 'danger';
    del.addEventListener('click', async () => {
      await deleteTodo(todo.id);
      loadAndRender();
    });

    label.appendChild(checkbox);
    label.appendChild(span);
    li.appendChild(label);
    li.appendChild(del);
    list.appendChild(li);
  });
}

async function loadAndRender() {
  const todos = await fetchTodos();
  renderTodos(todos);
}

document.getElementById('add-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const input = document.getElementById('todo-input');
  const text = input.value.trim();
  if (!text) return;
  await addTodo(text);
  input.value = '';
  loadAndRender();
});

loadAndRender();

