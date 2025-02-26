import Todo from "./todo-class";

const STORAGE_KEY = "myTodoArrays";

//save todos to local storage
export function saveTodosToLocalStorage(todos) {
    const todosString = JSON.stringify(todos);
    localStorage.setItem(STORAGE_KEY, todosString);
}

//get todos from local storage
export function loadTodosFromLocalStorage() {
    const todosString = localStorage.getItem(STORAGE_KEY);
    if (todosString) {
        const todos = JSON.parse(todosString);
        return todos.map(todo => new Todo(
            todo._title,
            todo._description,
            todo._dueDate,
            todo._priority,
            todo._notes
        ));
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