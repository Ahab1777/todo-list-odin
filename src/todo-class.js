import { formatISO } from "date-fns";


export default class Todo {
    constructor(title, description, dueDate, priority, project, notes) {
        this._title = title;
        this._description = description;
        this._dueDate = dueDate;
        this._priority = priority;
        this._notes = notes;
        this._checklist = [];
        this._project = project;
        this._creationDate = formatISO(new Date());
    }

    setProject(project) {
        this._project = project;
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

    getProject() {
        return this._project;
    }
}