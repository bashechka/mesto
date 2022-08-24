import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._picElement = this._popupElement.querySelector('.popup__photo');
    this._captionElement = this._popupElement.querySelector('.popup__photo-caption');
  }

  //попап с фото: открытие и закрытие
  openPopup(name, link) {
    super.openPopup();
    this._picElement.src = link;
    this._captionElement.textContent = name;
    this._picElement.alt = name;
  }

}