import Todo from "./todo-class";
import { todos } from "./index";
import displayTodos from "./todo-list";
import { loadProjectsFromLocalStorage } from "./local-storage";
import { saveTodosToLocalStorage, loadTodosFromLocalStorage, addTodoToLocalStorage } from "./local-storage";
import { formatISO } from 'date-fns';
import ChecklistItem from "./checklist-class";

export default function createNewTodoModal() {
    //create new todo modal
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

                    <label for="project">Project:</label>
                    <select class="select-project" name="project" required></select>

                    <label for="checklist">Checklist:</label>
                    <button type="button" class="add-checklist-item-btn">Add Checklist Item</button>
                    <div class="checklist-container"></div>

                    <label for="notes">Notes:</label>
                    <textarea id="notes" name="notes"></textarea>
                    
                    <button type="submit">Add TODO</button>
                </form>
            </div>`;

    //close modal
    newTodoModal.querySelector('.close').addEventListener('click', () => {
        newTodoModal.close();
    });

    //populate project dropdown
    const projectList = loadProjectsFromLocalStorage();
    const selectProject = newTodoModal.querySelector('.select-project');
    projectList.forEach(project => {
        const projectOption = document.createElement('option');
        projectOption.value = project;
        projectOption.innerHTML = project;
        selectProject.appendChild(projectOption);
    })


    //checklist logic
    const checklistContainer = newTodoModal.querySelector('.checklist-container');
    const addChecklistItemBtn = newTodoModal.querySelector('.add-checklist-item-btn');
    addChecklistItemBtn.addEventListener('click', () => {
            const checklistItemDiv = document.createElement('div');
            checklistItemDiv.innerHTML = `
                <input type="text" class="checklist-item-input" placeholder="Checklist Item">
                <button class="delete-checklist-item-btn">X</button>
            `;
            checklistItemDiv.querySelector('.delete-checklist-item-btn').addEventListener('click', () => {
                checklistItemDiv.remove();
            
            });
            checklistContainer.appendChild(checklistItemDiv);
    });

    //add new todo
    newTodoModal.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        const title = e.target.querySelector('#title').value;
        const description = e.target.querySelector('#description').value;
        const dueDate = e.target.querySelector('#due-date').value;
        const priority = e.target.querySelector('#priority').value;
        const notes = e.target.querySelector('#notes').value;
        const project = e.target.querySelector('.select-project').value;
        const creationDate = formatISO(new Date())
        
        //feed items into checklist
        const checklist = [];
        const checklistItems = checklistContainer.querySelectorAll('.checklist-item-input');
        checklistItems.forEach((item) => {
            const checklistItem = new ChecklistItem(item.value, false);
            checklist.push(checklistItem);
        });
        



        
        const newTodo = new Todo(title, description, dueDate, priority, project, notes, checklist, creationDate);
        addTodoToLocalStorage(newTodo);
        console.log(loadTodosFromLocalStorage());
        displayTodos();
        newTodoModal.close();

    });

    return newTodoModal;
}