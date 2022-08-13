//ВАЛИДАЦИЯ
export default class FormValidator {
  constructor(formSelector, settings) {
    this._formElement = document.querySelector(formSelector);
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inputErrorClass = settings.inputErrorClass;
    this._inputErrorActiveClass = settings.inputErrorActiveClass;
    this._submitButtonInactiveClass = settings.submitButtonInactiveClass;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector('.popup__button');
  }

  _showInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._inputErrorActiveClass);
  }

  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._inputErrorActiveClass);
  }
  
  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  setEventListeners = () => {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this.toggleButtonState(this._inputList);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState(this._inputList);
      });
    });
  }
  
  _hasInvalidInput(){
    return this._inputList.some((inputElement) => {
     return !inputElement.validity.valid;
    });  
   }

   toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._submitButtonInactiveClass);
      this._buttonElement.disabled = true;
   } else {
      this._buttonElement.classList.remove(this._submitButtonInactiveClass);
      this._buttonElement.disabled = false;
   }
 }
}