import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._picElement = document.querySelector('.popup__photo');
        this._captionElement = document.querySelector('.popup__photo-caption');
    }
 
    //попап с фото: открытие и закрытие
    setImageContent(name, link) {
      this._picElement.src = link;
      this._captionElement.textContent = name;
      this._picElement.alt = name;
  }


}