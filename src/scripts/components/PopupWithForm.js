import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handlerPopupFormSubmit, handlerOpenPopup) {

        super(popupSelector);
        this._handlerPopupFormSubmit = handlerPopupFormSubmit;
        this._handlerOpenPopup = handlerOpenPopup;
        this._inputsList = this._popupElement.querySelectorAll('.popup__container-input');
        this._formElement = this._popupElement.querySelector('.popup__container');
        this._setEventListeners();
    }

    //приватный метод, который собирает данные всех полей формы
    _getInputValues() {
        this._formValues = {};
        this._inputsList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;

    }

    //Перезаписывает родительский метод 
    //Метод setEventListeners класса PopupWithForm должен не только
    //добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы

    _setEventListeners = () => {
        super._setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault(); 
            this._handlerPopupFormSubmit(this._getInputValues());
     });
    }

    closePopup() {
        super.closePopup();
        this._formElement.reset();

    }

   openPopup() {
       super.openPopup();
       if (this._handlerOpenPopup !== undefined) {
        this._handlerOpenPopup();
       }
   }
}