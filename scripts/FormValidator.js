//ВАЛИДАЦИЯ
export default class FormValidator {
  constructor(formElement, settings, openPopup) {
    this._formElement = formElement;
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inputErrorClass = settings.inputErrorClass;
    this._inputErrorActiveClass = settings.inputErrorActiveClass;
    this._submitButtonInactiveClass = settings.submitButtonInactiveClass;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._openPopup = openPopup;
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
    const addPicButtonSelector = document.querySelector('.profile__add-button');
    const popupAddPic = document.querySelector('.popup_type_add-pic');

    //блокировка кнопки попапа на добавление новой карточки
    addPicButtonSelector.addEventListener('click', () => {
      const buttonElement = popupAddPic.querySelector('.popup__button');
      buttonElement.classList.add('popup__button_inactive');
      buttonElement.disabled = true;
      this._openPopup(popupAddPic);
    });

    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    
    this._toggleButtonState(this._inputList, buttonElement);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList, buttonElement);
      });
    });
  }
  
  _hasInvalidInput(inputList){
    return inputList.some((inputElement) => {
     return !inputElement.validity.valid;
    });  
   }

   _toggleButtonState (inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
     buttonElement.classList.add(this._submitButtonInactiveClass);
     buttonElement.disabled = true;
   } else {
     buttonElement.classList.remove(this._submitButtonInactiveClass);
     buttonElement.disabled = false;
   }
 }
}