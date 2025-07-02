// ============ APPLICATION STATE (Global Variables) ============
let todos = []; // Array to store all todos
let currentFilter = "all"; // Current filter: 'all', 'active', 'completed'
let searchQuery = ""; // Current search query
let editingId = null; // ID of todo being edited

// ============ DOM ELEMENT REFERENCES ============
// Get references to HTML elements we'll manipulate
const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const searchInput = document.getElementById("searchInput");
const todoList = document.getElementById("todoList");
const emptyState = document.getElementById("emptyState");
const filterBtns = document.querySelectorAll(".filter-btn");
const totalCount = document.getElementById("totalCount");
const activeCount = document.getElementById("activeCount");
const completedCount = document.getElementById("completedCount");
const markAllBtn = document.getElementById("markAllBtn");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");

// ============ EVENT LISTENERS ============
// Set up all event listeners when the page loads
function initializeEventListeners() {
  // Add todo button and Enter key
  addBtn.addEventListener("click", addTodo);
  todoInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      addTodo();
    }
  });

  // Search functionality - fires every time user types
  searchInput.addEventListener("input", function (e) {
    searchQuery = e.target.value.toLowerCase().trim();
    renderTodos();
  });

  // Filter buttons (All, Active, Completed)
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      currentFilter = e.target.dataset.filter;
      updateFilterButtons();
      renderTodos();
    });
  });

  // Bulk action buttons
  markAllBtn.addEventListener("click", markAllComplete);
  clearCompletedBtn.addEventListener("click", clearCompleted);

  // Event delegation for todo list - handles clicks on dynamic content
  todoList.addEventListener("click", handleTodoClick);
  todoList.addEventListener("change", handleTodoChange);
  todoList.addEventListener("keypress", handleTodoKeypress);
}

// ============ EVENT HANDLERS ============
// Handle clicks anywhere in the todo list
function handleTodoClick(e) {
  const todoItem = e.target.closest(".todo-item");
  if (!todoItem) return; // Click wasn't on a todo item

  const todoId = parseInt(todoItem.dataset.id);

  // Check what was clicked
  if (e.target.classList.contains("delete-btn")) {
    deleteTodo(todoId);
  } else if (e.target.classList.contains("edit-btn")) {
    startEdit(todoId);
  }
}

// Handle checkbox changes
function handleTodoChange(e) {
  if (e.target.classList.contains("todo-checkbox")) {
    const todoId = parseInt(e.target.closest(".todo-item").dataset.id);
    toggleTodo(todoId);
  }
}

// Handle keyboard events in todo list
function handleTodoKeypress(e) {
  if (e.key === "Enter" && e.target.classList.contains("edit-input")) {
    const todoId = parseInt(e.target.closest(".todo-item").dataset.id);
    saveEdit(todoId, e.target.value.trim());
  } else if (e.key === "Escape" && e.target.classList.contains("edit-input")) {
    cancelEdit();
  }
}

// ============ CRUD OPERATIONS ============

// CREATE - Add a new todo
function addTodo() {
  const text = todoInput.value.trim();

  // Validation - don't add empty todos
  if (!text) {
    showInputError();
    return;
  }

  // Create new todo object
  const newTodo = {
    id: Date.now(), // Simple ID generation using timestamp
    text: text,
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Add to beginning of array (newest first)
  todos.unshift(newTodo);

  // Clear input and re-render
  todoInput.value = "";
  renderTodos();

  // Keep focus on input for easy continuous adding
  todoInput.focus();
}

// READ - Get filtered todos based on current filter and search
function getFilteredTodos() {
  let filtered = todos.slice(); // Create a copy of todos array

  // Apply search filter first
  if (searchQuery) {
    filtered = filtered.filter(function (todo) {
      return todo.text.toLowerCase().includes(searchQuery);
    });
  }

  // Apply status filter
  if (currentFilter === "active") {
    filtered = filtered.filter(function (todo) {
      return !todo.completed;
    });
  } else if (currentFilter === "completed") {
    filtered = filtered.filter(function (todo) {
      return todo.completed;
    });
  }
  // If currentFilter is 'all', we don't filter anything

  return filtered;
}

// UPDATE - Toggle todo completion status
function toggleTodo(id) {
  // Find the todo by ID
  const todo = todos.find(function (t) {
    return t.id === id;
  });

  if (todo) {
    todo.completed = !todo.completed;
    todo.updatedAt = new Date().toISOString();
    renderTodos(); // Re-render to show changes
  }
}

// UPDATE - Start editing a todo
function startEdit(id) {
  editingId = id;
  renderTodos();

  // Focus the edit input after render (setTimeout ensures DOM is updated)
  setTimeout(function () {
    const editInput = document.querySelector(".edit-input");
    if (editInput) {
      editInput.focus();
      editInput.select(); // Select all text for easy editing
    }
  }, 0);
}

// UPDATE - Save edited todo
function saveEdit(id, newText) {
  // If empty text, delete the todo
  if (!newText) {
    deleteTodo(id);
    return;
  }

  // Find and update the todo
  const todo = todos.find(function (t) {
    return t.id === id;
  });

  if (todo && todo.text !== newText) {
    todo.text = newText;
    todo.updatedAt = new Date().toISOString();
  }

  editingId = null;
  renderTodos();
}

// UPDATE - Cancel editing
function cancelEdit() {
  editingId = null;
  renderTodos();
}

// DELETE - Remove a todo
function deleteTodo(id) {
  // Find index of todo to delete
  const index = todos.findIndex(function (t) {
    return t.id === id;
  });

  if (index > -1) {
    todos.splice(index, 1); // Remove 1 item at index
    renderTodos();
  }
}

// ============ BULK OPERATIONS ============
function markAllComplete() {
  // Check if there are any incomplete todos
  const hasIncomplete = todos.some(function (todo) {
    return !todo.completed;
  });

  // If there are incomplete todos, mark all as complete
  // If all are complete, mark all as incomplete
  todos.forEach(function (todo) {
    todo.completed = hasIncomplete;
    todo.updatedAt = new Date().toISOString();
  });

  renderTodos();
}

function clearCompleted() {
  const initialLength = todos.length;

  // Keep only incomplete todos
  todos = todos.filter(function (todo) {
    return !todo.completed;
  });

  // Only re-render if something was actually removed
  if (todos.length !== initialLength) {
    renderTodos();
  }
}

// ============ DOM MANIPULATION & RENDERING ============

// Main render function - updates the entire todo display
function renderTodos() {
  const filteredTodos = getFilteredTodos();

  renderTodoList(filteredTodos);
  renderStats();
  renderEmptyState(filteredTodos.length === 0);
}

// Render the list of todos
function renderTodoList(todosToRender) {
  // Clear existing todos
  todoList.innerHTML = "";

  if (todosToRender.length === 0) return;

  // Create document fragment for better performance
  // (avoids multiple DOM reflows)
  const fragment = document.createDocumentFragment();

  todosToRender.forEach(function (todo) {
    const todoElement = createTodoElement(todo);
    fragment.appendChild(todoElement);
  });

  todoList.appendChild(fragment);
}

// Create a single todo element
function createTodoElement(todo) {
  const li = document.createElement("li");
  li.className = "todo-item" + (todo.completed ? " completed" : "");
  li.dataset.id = todo.id;

  // Different HTML based on whether we're editing this todo
  if (editingId === todo.id) {
    li.innerHTML = `
            <input type="checkbox" class="todo-checkbox" ${
              todo.completed ? "checked" : ""
            }>
            <input type="text" class="edit-input" value="${escapeHtml(
              todo.text
            )}">
        `;
    li.classList.add("editing");
  } else {
    li.innerHTML = `
            <input type="checkbox" class="todo-checkbox" ${
              todo.completed ? "checked" : ""
            }>
            <span class="todo-text">${escapeHtml(todo.text)}</span>
            <div class="todo-actions">
                <button class="edit-btn" title="Edit">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="m18.5 2.5-8 8v4h4l8-8a2 2 0 0 0 0-2.828l-1.172-1.172a2 2 0 0 0-2.828 0z"></path>
                    </svg>
                </button>
                <button class="delete-btn" title="Delete">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3,6 5,6 21,6"></polyline>
                        <path d="m19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1,2-2h4a2,2 0 0,1,2,2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                </button>
            </div>
        `;
  }

  // Add animation class for new todos
  if (todos.length > 0 && todo.id === todos[0].id && !todo.completed) {
    li.classList.add("new");
  }

  return li;
}

// Update the statistics display
function renderStats() {
  const total = todos.length;
  const active = todos.filter(function (t) {
    return !t.completed;
  }).length;
  const completed = total - active;

  totalCount.textContent = total + (total === 1 ? " item" : " items");
  activeCount.textContent = active + " active";
  completedCount.textContent = completed + " completed";
}

// Show/hide empty state message
function renderEmptyState(show) {
  emptyState.classList.toggle("show", show);
  todoList.style.display = show ? "none" : "block";
}

// Update active filter button styling
function updateFilterButtons() {
  filterBtns.forEach(function (btn) {
    btn.classList.toggle("active", btn.dataset.filter === currentFilter);
  });
}

// ============ UTILITY FUNCTIONS ============

// Prevent XSS attacks by escaping HTML
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Show error when trying to add empty todo
function showInputError() {
  todoInput.style.borderColor = "#ef4444";
  todoInput.placeholder = "Please enter a todo item";

  setTimeout(function () {
    todoInput.style.borderColor = "";
    todoInput.placeholder = "What needs to be done?";
  }, 2000);
}

// ============ INITIALIZATION ============
// Start the app when the page loads
document.addEventListener("DOMContentLoaded", function () {
  initializeEventListeners();
  renderTodos(); // Initial render (will show empty state)
});
