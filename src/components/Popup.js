export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);

  }

  //функция закрытия попапа при нажатии Esc
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.closePopup();
    }
  }


  //универсальные функции закрытия и открытия попапа
  openPopup() {
    this._popupElement.classList.add('popup_open');
    document.addEventListener('keydown', this._handleEscClose);
  }

  closePopup() {
    this._popupElement.classList.remove('popup_open');
    document.removeEventListener('keydown', this._handleEscClose);

  }

  setEventListeners() {
    this._popupElement.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup__close-icon')
        || evt.target.classList.contains('popup_open')) {
        this.closePopup();
      }
    });
  }
}