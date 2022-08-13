import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";

//создание карточки с загрузкой информации из массива + обработчики лайков и корзины удаления
export default class Card {
  constructor(name, link, handleCardClick) {
    this._link = link;
    this._name = name;
    this._element = this._createTemplateItem();
    this._likeButton = this._element.querySelector('.photo__like-button');
    this._image = this._element.querySelector('.photo__list-image');
    this._title = this._element.querySelector('.photo__title');
    this._deleteButton = this._element.querySelector('.photo__delete-button');
    this._handleCardClick = handleCardClick;
    // this._popupWithImage = new PopupWithImage('.popup_type_open-pic', this._name, this._link);
  }

   //клонируем содержимое тега template
  _createTemplateItem() {
    return document
      .querySelector('#photo__list-item')
      .content
      .querySelector('.photo__list-item')
      .cloneNode(true);
  }

  _generateCard() {
    // this._element = this._createTemplateItem();
    this._setEventlisteners();
    //наполняем содержимым
    this._image.src = this._link;
    this._title.textContent = this._name;
    //подтягиваем alt
    this._image.alt = this._name;
 
    return this._element;
  }
    
  _setEventlisteners() {
    //лайк
    this._likeButton.addEventListener('click', this._activeLike);

    //корзина
    this._deleteButton.addEventListener('click', this._deleteCard);

    //попап с фото
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  //включение и выключение лайка
  _activeLike = () => {
    this._likeButton.classList.toggle('photo__like-button_active');
  }

  //удаление карточки при клике на корзину 
  _deleteCard = () => {
    this._element.remove();
  }
}


