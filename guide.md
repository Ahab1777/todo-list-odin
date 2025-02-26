# Project guidelines
https://www.theodinproject.com/lessons/node-path-javascript-todo-list

## TODOs as objects
Your ‘todos’ are going to be objects that you’ll want to dynamically create, which means either using factories or constructors/classes to generate them.

## Essential properties
- title
- description
- dueDate
- priority
- notes
- checklist

## Separate lists of TODOs
When a user first opens the app, there should be some sort of ‘default’ project to which all of their todos are put. Users should be able to create new projects and choose which project their todos go into.

## Separate logic and DOM-functionalities
Focus on creating different modules

## UX
User should be able to:
- View all projects.
- View all todos in each project (probably just the title and dueDate… perhaps changing color for different priorities).
- Expand a single todo to see/edit its details.
- Delete a todo.

## Handy tips
- Use date-fns to more easily use dates -> https://github.com/date-fns/date-fns
- use localStorage -> https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
    - Make sure your app doesn’t crash if the data you may want to retrieve from localStorage isn’t there!
    - You can inspect data you saved in localStorage using DevTools! To do this, open the Application tab in DevTools and click on the Local Storage tab under Storage. Every time you add, update and delete data from localStorage in your app, those changes will be reflected in DevTools.
    - localStorage uses JSON to send and store data, and when you retrieve the data, it will also be in JSON format. Keep in mind you cannot store functions in JSON, so you’ll have to figure out how to add methods back to your object properties once you fetch them. Good luck!

## WIP
- create checklist logic
- create project logic so that user can create new projects, which will become available at the newTodo form for selections