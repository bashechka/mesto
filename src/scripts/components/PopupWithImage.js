import {pic, caption} from '../utils/constants.js';
import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector, name, link) {
        super(popupSelector);
        this._link = link;
        this._name = name;
    }
 
    //попап с фото: открытие и закрытие
    openPopup() {
 
    pic.src = this._link;
 
    caption.textContent = this._name;
    pic.alt = this._name;
    super.openPopup();
  }
}