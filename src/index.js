import Todo from "./todo-class";
import createNewTodoModal from "./new-todo-modal";
import displayTodos from "./todo-list";
import editTodoModal from "./edit-todo-modal";
import { addProjectToLocalStorage, loadProjectsFromLocalStorage, deleteProjectFromLocalStorage } from "./local-storage";
export const todos = [];
import indexStyles from "./index.css";

//new todo modal
const newTodoBtn = document.querySelector(".new-todo-btn");
const newTodoContainer = document.querySelector(".new-todo-container");
newTodoBtn.addEventListener("click", () => {
    const modal = createNewTodoModal();
    newTodoContainer.appendChild(modal);
    modal.showModal();
});

//new project button
const newProjectForm = document.querySelector("#new-project-form");
newProjectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const projectInput = e.target.querySelector("#project-name").value;
    console.log(projectInput);
    addProjectToLocalStorage(projectInput);
});

//list all projects for deletion
const projectList = document.querySelector("#project-list");
const projects = loadProjectsFromLocalStorage();
projects.forEach((project) => {
    const projectItemOption = document.createElement("option");
    projectItemOption.classList.add("project-item");
    projectItemOption.value = project;
    projectItemOption.innerHTML = `
        <span>${project}</span>
    `;
    projectList.appendChild(projectItemOption);
});

//delete project form submit logic
const deleteProjectForm = document.querySelector("#delete-project-form");
deleteProjectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const projectToDelete = e.target.querySelector("#project-list").value;
    deleteProjectFromLocalStorage(projectToDelete);
});

//display todo-list
const currentProject = document.querySelector("#project-list");
currentProject.addEventListener("change", () => {
    const targetProject = currentProject.value;
    displayTodos(targetProject);
});


//display todo-list
displayTodos()


