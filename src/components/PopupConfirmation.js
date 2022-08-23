import Popup from "./Popup.js";

export default class PopupConfirmation extends Popup {
    constructor(popupSelector, handlerPopupFormSubmit) {
        super(popupSelector);
        this._handlerPopupFormSubmit = handlerPopupFormSubmit;
        this._buttonElement = this._popupElement.querySelector('.popup__button');
    }

    setEventListeners = () => {
        super.setEventListeners();
        this._buttonElement.addEventListener('click', () => {
            this._handlerPopupFormSubmit(this._target);
        });
    }

    setTarget(target) {
        this._target = target;
    }
}
