import { loadTodosFromLocalStorage, deleteTodoFromLocalStorage, saveTodosToLocalStorage } from "./local-storage.js";
import editTodoModal from "./edit-todo-modal.js";
import { loadProjectsFromLocalStorage } from "./local-storage.js";

export default function displayTodos(project = "default") {
    const todoList = document.querySelector(".todo-list-container");
    todoList.innerHTML = "";
    const todosObjectList = loadTodosFromLocalStorage();
    todosObjectList.forEach((todo, index) => {
        if (todo.getProject() !== project) {
            return;
        }
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        todoDiv.innerHTML = `
        <h3>${todo.getTitle()}</h3>
        <p>${todo.getDescription()}</p>
        <p>Due: ${todo.getDueDate()}</p>
        <p>Priority: ${todo.getPriority()}</p>
        <div class="set-project-container">
            <form id="set-project-form" action="submit">
                <select name="project-list" id="set-project-list" class="set-project-list"></select>
                <button type="submit" class="create-project-btn">Set project</button>
            </form>
        </div>
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

        //load project list into dropdown menu
        const projectList = todoDiv.querySelector("#set-project-list");
        const projects = loadProjectsFromLocalStorage();
        projects.forEach((project) => {
            const projectItemOption = document.createElement("option");
            projectItemOption.classList.add("project-item-option");
            projectItemOption.value = project;
            projectItemOption.selected = todo.getProject() === project;
            projectItemOption.innerHTML = `
                <span>${project}</span>
            `;
            projectList.appendChild(projectItemOption);
        });

        //set todo's project button logic
        todoDiv.querySelector("#set-project-form").addEventListener("submit", (e) => {
            e.preventDefault();
            const project = e.target.querySelector("#set-project-list").value;
            todosObjectList[index].setProject(project);
            saveTodosToLocalStorage(todosObjectList);
        });        


        todoList.appendChild(todoDiv);
    });
}