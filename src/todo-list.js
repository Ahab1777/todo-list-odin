import { loadTodosFromLocalStorage, deleteTodoFromLocalStorage } from "./local-storage.js";
import editTodoModal from "./edit-todo-modal.js";

export default function displayTodos() {
    const todoList = document.querySelector(".todo-list-container");
    todoList.innerHTML = "";
    const todosList = loadTodosFromLocalStorage();
    todosList.forEach((todo, index) => {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        todoDiv.innerHTML = `
        <h3>${todo.getTitle()}</h3>
        <p>${todo.getDescription()}</p>
        <p>Due: ${todo.getDueDate()}</p>
        <p>Priority: ${todo.getPriority()}</p>
        <button class="delete-todo-btn" data-index="${index}">Delete</button>
        <button class="edit-todo-btn" data-index="${index}">Edit</button>
        `;
        // delete todo button logic
        todoDiv.querySelector(".delete-todo-btn").addEventListener("click", (event) => {
            const targetIndex = event.target.getAttribute("data-index");
            deleteTodoFromLocalStorage(targetIndex);
            displayTodos();
        });
        //edit todo button logic
        todoDiv.querySelector(".edit-todo-btn").addEventListener("click", (event) => {
            const targetIndex = event.target.getAttribute("data-index");
            const modal = editTodoModal(targetIndex);
            const newTodoContainer = document.querySelector(".new-todo-container");
            newTodoContainer.appendChild(modal);
            modal.showModal();
        });

        todoList.appendChild(todoDiv);
    });
}