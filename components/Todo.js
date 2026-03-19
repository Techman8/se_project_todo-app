class Todo {
  constructor(data, selector) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
  }

  _setEventListeners() {
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    this._todoDeleteBtn.addEventListener("click", () => {
        this._todoElement.remove();
    });

    this._todoCheckboxEl.addEventListener("change", () => {
        this._data.completed = !this._data.completed;
    }); 
  }

  _generateCheckboxEl () {
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  getView() {
    this._todoNameEl.textContent = this._data.name;
    this._todoDateEl.textContent = this._data.date;

    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      this._todoDateEl.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    } else {
  this._todoDateEl.textContent = this._data.date;  
}

    this._generateCheckboxEl();
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;