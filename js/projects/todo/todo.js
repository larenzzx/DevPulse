// === Global State ===
let todo = []; // stores all todo
let currentFilter = "all" | active | completed;
let searchQuery = ""; // for search string
let editingId = null; // track which todo is being edited

// === DOM Elements ===
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

function initializeEventListeners() {
  addBtn.addEventListener("click", addTodo);
  todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTodo();
  });

  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderTodos();
  });

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentFilter = btn.datasets.filter;
      updateFilterButtons();
      renderTodos();
    });
  });

  markAllBtn.addEventListener("click", markAllComplete);
  clearCompletedBtn.addEventListener("click", clearCompleted);

  todoList.addEventListener("click", handleTodoClick);
  todoList.addEventListener("change", handleTodoChange);
  todoList.addEventListener("keypress", handleTodoKeypress);
}

function addTodo() {
    const text = todoInput.value.trim();
    if (!text) {
        showInputError();
        return;
    }

    const newTodo = {
        id: Date.now(),
        text,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
}