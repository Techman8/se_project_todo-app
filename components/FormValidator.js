class FormValidator {
  constructor(settings, formElement) {
    this.settings = settings;
    this.submitButtonSelector = settings.submitButtonSelector;
    this.errorClass = settings.errorClass;
    this.inputErrorClass = settings.inputErrorClass;
    this.inactiveButtonClass = settings.inactiveButtonClass;   
    this._formElement = formElement;
    const inputs = Array.from(this._formElement.querySelectorAll(this.settings.inputSelector));
  }

    _showInputError(inputElement) {
        const errorElementId = `#${inputElement.id}-error`;
        const errorElement = this._formElement.querySelector(errorElementId);
        inputElement.classList.add(this._settings.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._settings.errorClass);
    }

      _hideInputError (inputElement) {
        const errorElementId = `#${inputElement.id}-error`;
        const errorElement = this._formElement.querySelector(errorElementId);
        inputElement.classList.remove(this._settings.inputErrorClass);
        errorElement.classList.remove(this._settings.errorClass);
        errorElement.textContent = "";
      }

    _checkInputValidity (inputElement) {
        if (!inputElement.validity.valid) {
        this._showInputError(
        this._formElement,
        inputElement,
        inputElement.validationMessage,
        this._settings,
    );
    } else {
    this._hideInputError(inputElement);
    }
    }

    _setEventListeners() {
        this._inputList = Array.from(
        this._formElement.querySelectorAll(this._settings.inputSelector)
      );

            const buttonElement = this._formElement.querySelector(
              this._settings.submitButtonSelector,
          );

          this._toggleButtonState(this._inputList, buttonElement, this._settings);

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
