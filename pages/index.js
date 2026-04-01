import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import TodoCounter from '../components/TodoCounter.js';

function renderTodo(data) {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView();
  const todoList = document.querySelector(".todos__list");
  todoList.append(todoElement);
}

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();

const section = new Section({
  items: initialTodos,

  renderer: (item) => {
    const element = generateTodo(item);
    return element;
  }, 
  containerSelector: ".todos__list",
});
 section.renderItems(); 

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup", 
  handleFormSubmit: (values) => {
    const id = uuidv4();
    const todoData = { ...values, id };
    const todoElement = generateTodo(todoData);
    section.addItem(todoElement);
    newTodoValidator.resetValidation();
    addTodoPopup.close();

  },
});
addTodoPopup.setEventListeners();

// const closeModal = (modal) => {
//   modal.classList.remove("popup_visible");
// };

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
if (completed) {
  todoCounter.updateCompleted(false);
}
}

function generateTodo(data) {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getView(); 
  return todoElement;
};

function handleEscapeClose(evt) {
if (evt.key === "Escape") {
    addTodoPopup.close();
}
}

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

// addTodoForm.addEventListener("submit", (evt) => {
//   evt.preventDefault();
//   const name = evt.target.name.value;
//   const dateInput = evt.target.date.value;

//   // Create a date object and adjust for timezone
//   const date = new Date(dateInput);
//   date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

//   const id = uuidv4();
//   const values = { name, date, id };
//   renderTodo(values);
//   newTodoValidator.resetValidation();
//   addTodoPopup.close();
// });

section.addItem = (element) => {
  todosList.append(element);
};
