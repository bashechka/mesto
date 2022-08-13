import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handlerPopupFormSubmit) {
        super(popupSelector);
        this._handlerPopupFormSubmit = handlerPopupFormSubmit;
        this._inputsList = this._popupElement.querySelectorAll('.popup__container-input');
        this._formElement = this._popupElement.querySelector('.popup__container');
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

    setEventListeners = () => {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault(); 
            this._handlerPopupFormSubmit(this._getInputValues());
     });
    }

    closePopup() {
        super.closePopup();
        this._formElement.reset();

    }

//    openPopup() {
//        super.openPopup();
//        if (this._handlerOpenPopup !== undefined) {
//         this._handlerOpenPopup();
//      }
//    }
   
  
}