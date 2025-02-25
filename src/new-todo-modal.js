import Todo from "./todo-class";
import { todos } from "./index";
import displayTodos from "./todo-list";

export default function createNewTodoModal() {
    const newTodoModal = document.createElement('dialog');
    newTodoModal.innerHTML = `<div>
                <button class="close">X</button>
                <form id="new-todo-form">
                    <label for="title">Title:</label>
                    <input type="text" id="title" name="title" required>
                    
                    <label for="description">Description:</label>
                    <textarea id="description" name="description" required></textarea>
                    
                    <label for="due-date">Due Date:</label>
                    <input type="date" id="due-date" name="due-date" required>
                    
                    <label for="priority">Priority:</label>
                    <select id="priority" name="priority" required>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    
                    <button type="submit">Add TODO</button>
                </form>
            </div>`;

    newTodoModal.querySelector('.close').addEventListener('click', () => {
        newTodoModal.close();
    });

    newTodoModal.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        const title = e.target.querySelector('#title').value;
        const description = e.target.querySelector('#description').value;
        const dueDate = e.target.querySelector('#due-date').value;
        const priority = e.target.querySelector('#priority').value;
        const notes = '';
        //const project = 'default';
        
        const newTodo = new Todo(title, description, dueDate, priority, notes);
        todos.push(newTodo);
        console.log(todos);
        displayTodos();
        newTodoModal.close();

    });

    return newTodoModal;
}