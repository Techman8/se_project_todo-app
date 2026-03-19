class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this.submitButtonSelector = this._settings.submitButtonSelector;
    this.errorClass = this._settings.errorClass;
    this.inputErrorClass = this._settings.inputErrorClass;
    this.inactiveButtonClass = this._settings.inactiveButtonClass;
    this._formElement = formElement;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElementId = `#${inputElement.id}-error`;
    const errorElement = this._formElement.querySelector(errorElementId);
    inputElement.classList.add(this.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElementId = `#${inputElement.id}-error`;
    const errorElement = this._formElement.querySelector(errorElementId);
    inputElement.classList.remove(this.inputErrorClass);
    errorElement.classList.remove(this.errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState() {
    const hasInvalidInput = this._hasInvalidInput();

    if (hasInvalidInput) {
      this._submitButton.classList.add(this.inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this.inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((input) => !input.checkValidity());
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._settings.inputSelector),
    );
    this._submitButton = this._formElement.querySelector(
      this.submitButtonSelector,
    );

    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
export default FormValidator;

// resetValidation();
// {
//   this._formElement.reset();
//   this._inputList.forEach((input) => this._hideInputError(input));
//   this._toggleButtonState();
// }