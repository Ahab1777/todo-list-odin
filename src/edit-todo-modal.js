import Todo from "./todo-class";
import { todos } from "./index";
import displayTodos from "./todo-list";
import { saveTodosToLocalStorage, loadTodosFromLocalStorage, addTodoToLocalStorage } from "./local-storage";

export default function editTodoModal(todoIndex) {
    //load target todo
    const todosList = loadTodosFromLocalStorage();
    const targetTodo = todosList[todoIndex];
    console.log(targetTodo);

    //open filled todo modal
    const editTodoModal = document.createElement('dialog');
    editTodoModal.innerHTML = `<div>
                <button class="close-modal-btn">X</button>
                <form id="edit-todo-form">
                    <label for="title">Title:</label>
                    <input value="${targetTodo.getTitle()}" type="text" id="title" name="title" required>
                    
                    <label for="description">Description:</label>
                    <textarea id="description" name="description" required>${targetTodo.getDescription()}</textarea>
                    
                    <label for="due-date">Due Date:</label>
                    <input value="${targetTodo.getDueDate()}" type="date" id="due-date" name="due-date" required>
                    
                    <label for="priority">Priority:</label>
                    <select id="priority" name="priority" required>
                        <option value="low" ${targetTodo.getPriority() === 'low' ? 'selected' : ''}>Low</option>
                        <option value="medium" ${targetTodo.getPriority() === 'medium' ? 'selected' : ''}>Medium</option>
                        <option value="high" ${targetTodo.getPriority() === 'high' ? 'selected' : ''}>High</option>
                    </select>
                    
                    <button type="submit">Save TODO</button>
                </form>
            </div>`;

    //substitute old version of todo for the new edited one
    
    editTodoModal.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        const editTodoForm = editTodoModal.querySelector('form');
        const title = e.target.querySelector('#title').value;
        const description = e.target.querySelector('#description').value;
        const dueDate = e.target.querySelector('#due-date').value;
        const priority = e.target.querySelector('#priority').value;
        const notes = '';
        //const project = 'default';
        
        const newEditedTodo = new Todo(title, description, dueDate, priority, notes);
        todosList[todoIndex] = newEditedTodo;
        saveTodosToLocalStorage(todosList);
        displayTodos();
        editTodoForm.reset();
        editTodoModal.close();
    });

    //close modal btn logic
    editTodoModal.querySelector('.close-modal-btn').addEventListener('click', () => {
        editTodoModal.close();
    });

    return editTodoModal;
}