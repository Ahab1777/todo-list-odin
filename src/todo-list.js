import { todos } from "./index.js";

export default function displayTodos() {
    const todoList = document.querySelector(".todo-list-container");
    todoList.innerHTML = "";
    todos.forEach(todo => {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        todoDiv.innerHTML = `
            <h3>${todo.getTitle()}</h3>
            <p>${todo.getDescription()}</p>
            <p>Due: ${todo.getDueDate()}</p>
            <p>Priority: ${todo.getPriority()}</p>
            <button class="delete-todo">Delete</button>
        `;
        todoList.appendChild(todoDiv);
    });
}