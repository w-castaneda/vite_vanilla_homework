interface Todo {
    id: number;
    text: string;
    completed: boolean;
  }
  
  let todos: Todo[] = [];
  const form = document.getElementById('todo-form') as HTMLFormElement;
  const input = document.getElementById('todo-input') as HTMLInputElement;
  const todoList = document.getElementById('todo-list') as HTMLUListElement;
  
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    addTodo(input.value);
    input.value = '';
  });
  
  function addTodo(text: string) {
    const todo: Todo = {
        id: Date.now(),
        text,
        completed: false
    };
    todos.push(todo);
    renderTodos();
  }
  
  function deleteTodo(id: number) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
  }
  
  function toggleComplete(id: number) {
    todos = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
    renderTodos();
  }
  
  function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = todo.completed ? 'completed' : '';
        li.innerHTML = `
            <span>${todo.text}</span>
            <button onclick="deleteTodo(${todo.id})">Delete</button>
            <button onclick="toggleComplete(${todo.id})">Complete</button>
        `;
        todoList.appendChild(li);
    });
  }
  
  // @ts-ignore
  window.deleteTodo = deleteTodo;
  
  // @ts-ignore
  window.toggleComplete = toggleComplete;