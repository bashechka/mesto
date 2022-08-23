import { data } from "autoprefixer";


//создание карточки с загрузкой информации из массива + обработчики лайков и корзины удаления
export default class Card {
  constructor(templateSelector, data, handleCardClick, handelDeletCard, handleLikeCard) {
    this._data = data;
    this._templateElement = document.querySelector(templateSelector).content.querySelector('.photo__list-item');
    this._element = this._templateElement.cloneNode(true);
    this._likeButton = this._element.querySelector('.photo__like-button');
    this._image = this._element.querySelector('.photo__list-image');
    this._title = this._element.querySelector('.photo__title');
    this._deleteButton = this._element.querySelector('.photo__delete-button');
    this._handleCardClick = handleCardClick;
    this._countElement = this._element.querySelector('.photo__like-count');
    this._handelDeletCard = handelDeletCard;
    this._handleLikeCard = handleLikeCard;
    
  }

  generateCard() {
    // this._element = this._createTemplateItem();
    this._setEventlisteners();
    //наполняем содержимым
    this._image.src = this._data.link;
    this._title.textContent = this._data.name;
    //подтягиваем alt
    this._image.alt = this._data.name;
    this._countElement.value = this._data.likes.length;

    return this._element;
  }

  _setEventlisteners() {
    //лайк
    this._likeButton.addEventListener('click', () => {
      this._handleLikeCard(this);
    });

    //корзина
    this._deleteButton.addEventListener('click', () => {
      this._handelDeletCard(this);
    });

    //попап с фото
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._data.name, this._data.link);
    });
  }

  //включение и выключение лайка
  showActiveLike = (userId) => {
    this._data.likes.forEach(like => {
      if (like._id === userId) {
        this.toggleLike();
      }
    });
  }

  toggleLike() {
    this._likeButton.classList.toggle('photo__like-button_active');
    this._countElement.value = this._data.likes.length;
  }

  isLiked() {
    return this._likeButton.classList.contains('photo__like-button_active');
  }

  //удаление карточки при клике на корзину 
  deleteCard = () => {
    this._element.remove();
  }

  updateData(data) {
    this._data = data;
  }

  hideDeleteButtun() {
    this._deleteButton.style.visibility = 'hidden';
  }

  getCardId() {
    return this._data._id;
  }

  getOwnerId() {
    return this._data.owner._id;
  }
  
}


