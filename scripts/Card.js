import {popupPhoto, pic, caption} from './popup.js';

//создание карточки с загрузкой информации из массива + обработчики лайков и корзины удаления
export default class Card {
  constructor(name, link, openPopup) {
    this._link = link;
    this._name = name;
    this._openPopup = openPopup;
    this._element = this._createTemplateItem();
    this._likeButton = this._element.querySelector('.photo__like-button');
    this._image = this._element.querySelector('.photo__list-image');
    this._title = this._element.querySelector('.photo__title');
    this._deleteButton = this._element.querySelector('.photo__delete-button');

  }

   //клонируем содержимое тега template
  _createTemplateItem() {
    const photoItem = document.querySelector('#photo__list-item').content.querySelector('.photo__list-item').cloneNode(true);
    return photoItem;
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
    this._image.addEventListener('click', this._openPopupPhoto);
  }

  //включение и выключение лайка
  _activeLike = () => {
    this._likeButton.classList.toggle('photo__like-button_active');
  }

  //удаление карточки при клике на корзину 
  _deleteCard = () => {
    this._element.remove();
  }

  //попап с фото: открытие и закрытие
  _openPopupPhoto = () => {
    // const popupPhoto = document.querySelector('.popup_type_open-pic');
    // const pic = document.querySelector('.popup__photo');
    // const caption = document.querySelector('.popup__photo-caption');
    const src = this._image.src;
    pic.src = src;
    const title = this._element.closest('.photo__list-item').querySelector('.photo__title');
    caption.textContent = title.textContent;
    pic.alt = title.textContent;
    this._openPopup(popupPhoto);
  }
}


