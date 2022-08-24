import Popup from "./Popup.js";

export default class PopupConfirmation extends Popup {
    constructor(popupSelector, handlePopupFormSubmit) {
        super(popupSelector);
        this._handlePopupFormSubmit = handlePopupFormSubmit;
        this._buttonElement = this._popupElement.querySelector('.popup__button');
    }

    setEventListeners = () => {
        super.setEventListeners();
        this._buttonElement.addEventListener('click', () => {
            this._handlePopupFormSubmit(this._target);
        });
    }

    setTarget(target) {
        this._target = target;
    }
}
