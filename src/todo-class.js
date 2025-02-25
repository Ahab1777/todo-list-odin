import { formatISO } from "date-fns";


export default class Todo {
    constructor(title, description, dueDate, priority, notes) {
        this._title = title;
        this._description = description;
        this._dueDate = dueDate;
        this._priority = priority;
        this._notes = notes;
        this._checklist = [];
        this._project = 'default';
        this._creationDate = formatISO(new Date());
    }

    getTitle() {
        return this._title;
    }

    getDescription() {
        return this._description;
    }

    getDueDate() {
        return this._dueDate;
    }

    getPriority() {
        return this._priority;
    }

    getNotes() {
        return this._notes;
    }

    getChecklist() {
        return this._checklist;
    }
}