import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handlePopupFormSubmit) {
        super(popupSelector);
        this._handlePopupFormSubmit = handlePopupFormSubmit;
        this._inputsList = this._popupElement.querySelectorAll('.popup__container-input');
        this._formElement = this._popupElement.querySelector('.popup__container');
        this._submitElement = this._popupElement.querySelector('.popup__button');
        // this._submitElementBtnText = this._submitElement.textContent;
    }

    //приватный метод, который собирает данные всех полей формы
    _getInputValues() {
        this._formValues = {};
        this._inputsList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;

    }

    setEventListeners = () => {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handlePopupFormSubmit(this._getInputValues());
        });
    }

    closePopup() {
        super.closePopup();
        this._formElement.reset();

    }

    //оставляю код для себя, тк хочу еще с ним поработать
    // renderLoading(isLoading, loadingText = 'Сохранение...') {
    //     if (isLoading) {
    //         this._submitElementBtnText.textContent = loadingText;
    //     } else {
    //         this._submitElementBtnText.textContent = this._submitElementBtnText;
    //     }
    // }

    setLoading() {
        this._submitElement.textContent = this._submitElement.textContent + "...";
    }

    disableLoading() {
        this._submitElement.textContent = this._submitElement.textContent.replace("...", "");
    }
}