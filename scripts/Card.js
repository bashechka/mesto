//создание карточки с загрузкой информации из массива + обработчики лайков и корзины удаления
export default class Card {
  constructor(name, link, openPopup) {
    this._link = link;
    this._name = name;
    this._openPopup = openPopup;
  }

   //клонируем содержимое тега template
  _createTemplateItem() {
    const photoItem = document.querySelector('#photo__list-item').content.querySelector('.photo__list-item').cloneNode(true);
    return photoItem;
  }

  _generateCard() {
    this._element = this._createTemplateItem();
    this._setEventlisteners();
    //наполняем содержимым
    this._element.querySelector('.photo__list-image').src = this._link;
    this._element.querySelector('.photo__title').textContent = this._name;
    //подтягиваем alt
    this._element.querySelector('.photo__list-image').alt = this._name;
 
    return this._element;
  }
    
  _setEventlisteners() {
    //лайк
    const likeButton = this._element.querySelector('.photo__like-button');
    likeButton.addEventListener('click', this._activeLike);

    //корзина
    const deleteButton = this._element.querySelector('.photo__delete-button');
    deleteButton.addEventListener('click', this._deleteCard);

    //попап с фото
    const img = this._element.querySelector('.photo__list-image');
    img.addEventListener('click', this._openPopupPhoto);
  }

  //включение и выключение лайка
  _activeLike(evt) {
    evt.target.classList.toggle('photo__like-button_active');
  }

  //удаление карточки при клике на корзину 
  _deleteCard(evt) {
    const listItem = evt.target.closest('.photo__list-item');
    listItem.remove();
  }

  //попап с фото: открытие и закрытие
  _openPopupPhoto = (evt) => {
    const popupPhoto = document.querySelector('.popup_type_open-pic');
    const pic = document.querySelector('.popup__photo');
    const caption = document.querySelector('.popup__photo-caption');
    this._openPopup(popupPhoto);
    const src = evt.target.src;
    pic.src = src;
    const title = evt.target.closest('.photo__list-item').querySelector('.photo__title');
    caption.textContent = title.textContent;
    pic.alt = title.textContent;
  }
}


