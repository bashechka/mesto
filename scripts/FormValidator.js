//ВАЛИДАЦИЯ
export default class FormValidator {
  constructor(formElement, settings) {
    this._formElement = formElement;
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inputErrorClass = settings.inputErrorClass;
    this._inputErrorActiveClass = settings.inputErrorActiveClass;
    this._submitButtonInactiveClass = settings.submitButtonInactiveClass;
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
    errorElement.classList.remove(this._inputErrorActiveClass);
    errorElement.textContent = '';
  }
  
  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  setEventListeners = () => {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    console.log(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }
  
  _hasInvalidInput(inputList){
    return inputList.some((inputElement) => {
     return !inputElement.validity.valid;
    });  
   }

   _toggleButtonState (inputList, buttonElement) {
     console.log(this._hasInvalidInput(inputList));
    if (this._hasInvalidInput(inputList)) {
     buttonElement.classList.add(this._submitButtonInactiveClass);
     buttonElement.disabled = true;
   } else {
     buttonElement.classList.remove(this._submitButtonInactiveClass);
     buttonElement.disabled = false;
   }
 }
}