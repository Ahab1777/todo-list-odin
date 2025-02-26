import Todo from "./todo-class";
import createNewTodoModal from "./new-todo-modal";
import displayTodos from "./todo-list";
import editTodoModal from "./edit-todo-modal";
import { loadTodosFromLocalStorage, deleteTodoFromLocalStorage } from "./local-storage";

export const todos = [];

//new todo modal
const newTodoBtn = document.querySelector(".new-todo-btn");
const newTodoContainer = document.querySelector(".new-todo-container");
newTodoBtn.addEventListener("click", () => {
    const modal = createNewTodoModal();
    newTodoContainer.appendChild(modal);
    modal.showModal();
});

//new project button
const newProjectForm = document.querySelector(".new-project-form");



//display todo-list
displayTodos()


