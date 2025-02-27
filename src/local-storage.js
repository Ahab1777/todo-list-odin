import Todo from "./todo-class";
import ChecklistItem from "./checklist-class";

const TODOS_STORAGE_KEY = "myTodoArrays";
const PROJECT_LIST_KEY = "myProjectList";

//Todos
//save todos to local storage
export function saveTodosToLocalStorage(todos) {
    const todosString = JSON.stringify(todos);
    localStorage.setItem(TODOS_STORAGE_KEY, todosString);
} 

//get todos from local storage
export function loadTodosFromLocalStorage() {
    const todosString = localStorage.getItem(TODOS_STORAGE_KEY);
    if (todosString) {
        const todos = JSON.parse(todosString);
        return todos.map(todo => {
            const checklist = todo._checklist.map(checklistItem => {
                return new ChecklistItem(checklistItem._itemTitle, checklistItem._isDone);
            });
            return new Todo(
                todo._title,
                todo._description,
                todo._dueDate,
                todo._priority,
                todo._project,
                todo._notes,
                checklist,
                todo._creationDate
            );
        });
    }
    return [];
}

//Add new todo to local storage
export function addTodoToLocalStorage(todo) {
    const todosList = loadTodosFromLocalStorage();
    todosList.push(todo);
    saveTodosToLocalStorage(todosList);
}

//delete todo from local storage based on its index
export function deleteTodoFromLocalStorage(index) {
    const todosList = loadTodosFromLocalStorage();
    todosList.splice(index, 1);
    saveTodosToLocalStorage(todosList);
}


//Projects
//save projects to local storage
function saveProjectsToLocalStorage(projectArray) {
    const projectsString = JSON.stringify(projectArray);
    localStorage.setItem(PROJECT_LIST_KEY, projectsString);
}

//load projects from local storage
export function loadProjectsFromLocalStorage() {
    const projectListString = localStorage.getItem(PROJECT_LIST_KEY);
    if (projectListString) {
        return JSON.parse(projectListString);
    }
    return ['default'];
}

//add project to local storage
export function addProjectToLocalStorage(projectToBeAdded) {
    const projectList = loadProjectsFromLocalStorage();
    projectList.push(projectToBeAdded);
    saveProjectsToLocalStorage(projectList);
}


//delete project (and all todos within it) from local storage based on projects name
export function deleteProjectFromLocalStorage(projectName) {
    const todosList = loadTodosFromLocalStorage();
    //delete all todos within the project
    todosList.forEach((todo, todoIndex) => {
        if (todo.getProject() === projectName) {
            deleteTodoFromLocalStorage(todoIndex);
        }
    });
    //delete project from project list based on its name
    const projectList = loadProjectsFromLocalStorage();
    const projectIndex = projectList.indexOf(projectName);
    projectList.splice(projectIndex, 1);
    saveProjectsToLocalStorage(projectList);
    
    
}

