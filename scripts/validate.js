//ВАЛИДАЦИЯ
const showInputError = (settings, formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.inputErrorActiveClass);
  };
  
  const hideInputError = (settings, formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.inputErrorActiveClass);
    errorElement.textContent = '';
  };
  
  const checkInputValidity = (settings, formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(settings, formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(settings, formElement, inputElement);
    }
  };
  
  const setEventListeners = (settings, formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
    toggleButtonState(settings, inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(settings, formElement, inputElement);
        toggleButtonState(settings, inputList, buttonElement);
      });
    });
  };
  
  function enableValidation(settings) {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(settings, formElement);
    });
  }
  
  function hasInvalidInput(inputList){
    return inputList.some((inputElement) => {
     return !inputElement.validity.valid;
    });  
   }
   
   function toggleButtonState(settings, inputList, buttonElement) {
     if (hasInvalidInput(inputList)) {
       buttonElement.classList.add(settings.submitButtonInactiveClass);
       buttonElement.disabled = true;
     } else {
       buttonElement.classList.remove(settings.submitButtonInactiveClass);
       buttonElement.disabled = false;
     }
   }

   enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__container-input',
    submitButtonSelector: '.popup__button',
    inputErrorClass: 'popup__container-input_type_error',
    inputErrorActiveClass: 'popup__container-input_error-active',
    submitButtonInactiveClass: 'popup__button_inactive',
  });