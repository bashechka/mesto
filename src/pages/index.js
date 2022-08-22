import './index.css'; // добавьте импорт главного файла стилей 
import {initialCards} from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage';
import Card from '../components/Card.js';
import {photoListSelector, editButton, profileButtonElement, avatarInput, nameInput, jobInput, settings, avatarEditButtonElement} from '../utils/constants.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Userinfo from '../components/UserInfo.js';
import Popup from '../components/Popup.js';
import Api from '../components/Api.js'
import { data } from 'autoprefixer';

//API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-48',
  headers: {
    authorization: '0de73a47-ba0e-4616-b8f4-47dc11cfec5b',
    'Content-Type': 'application/json'
  }
});

function createCard(data) {
  const card = new Card(data, handleCardClick, handelDeletCard, handleLikeCard);
  const userId = userInfo.getUserInfo().userId;
  card.showActiveLike(userId);
  if(card._data.owner._id !== userId) {
   card.hideDeleteButtun();
  }
  return card.generateCard();
}

function errorHandler(err) {
  console.log(err); // выведем ошибку в консоль
}

const cardList = new Section ({
  items: initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
}, photoListSelector);

api.getUserInfo().then((data) => {
  userInfo.setUserInfo(data);
  api.getCards().then((data) => {
    cardList.setItems(data);
    cardList.renderItems();
  }).catch(errorHandler);  
}).catch(errorHandler);
  
const popupAddPic = new PopupWithForm('.popup_type_add-pic', handlerAddPicFormSubmit);
popupAddPic.setEventListeners();
profileButtonElement.addEventListener('click', () => {
  formAddPicValidator.toggleButtonState();
  popupAddPic.openPopup();
});

const popupProfile = new PopupWithForm('.popup_type_profile', handleProfileFormSubmit);
popupProfile.setEventListeners();
editButton.addEventListener('click', () => {
  popupProfile.openPopup();
  handlerOpenPopup();
});

const popupUpdateAvatar = new PopupWithForm('.popup_type_update-avatar', handlerAvatarProfileFormSubmit);
popupUpdateAvatar.setEventListeners();
avatarEditButtonElement.addEventListener('click', () => {
  formPopupUpdateAvatarValidator.toggleButtonState();
  popupUpdateAvatar.openPopup();
});

const popupWithImage = new PopupWithImage('.popup_type_open-pic');
popupWithImage.setEventListeners();

function handleCardClick(name, link) {
  popupWithImage.setImageContent(name, link); 
  popupWithImage.openPopup();
}

let deletingCard;
const popupConfirmDelete = new Popup('.popup_type_delete');
const popupConfirmDeleteButtonElement = popupConfirmDelete._popupElement.querySelector('.popup__container-confirm-button');
popupConfirmDelete.setEventListeners();
popupConfirmDeleteButtonElement.addEventListener('click', () => {
  api.deleteCard(deletingCard._data._id).then(() => {
    deletingCard._deleteCard();
    popupConfirmDelete.closePopup();
   })
   .catch(errorHandler);
});

function handelDeletCard(card) {
  deletingCard = card;
  popupConfirmDelete.openPopup();
}

function handleLikeCard(card) {
  if(card.isLiked()) {
    api.deleteLike(card._data._id).then((data) => {
      card.updateData(data);
      card.toggleLike();
    })
    .catch(errorHandler);
  } else {
    api.setLike(card._data._id).then((data) => {
      card.updateData(data);
      card.toggleLike();
    })
    .catch(errorHandler);
  }
}

const userInfo = new Userinfo({nameSelector: '.profile__name', jobSelector: '.profile__job', avatarSelector: '.profile__avatar'});

function handleProfileFormSubmit(formValues) {
  popupProfile.setLoading();
  api.updateUserInfo(formValues['form__item-name'], formValues['form__item-job']).then((data) => {
    userInfo.setUserInfo(data);
    popupProfile.closePopup(popupProfile);
  })
  .finally(() => popupProfile.disableLoading())
  .catch(errorHandler);
 
}

function handlerAvatarProfileFormSubmit() {
  popupUpdateAvatar.setLoading();
  api.updateUserAvatar(avatarInput.value).then((data) => {
    userInfo.setUserInfo(data);
    popupUpdateAvatar.disableLoading();
    popupUpdateAvatar.closePopup();
  })
  .catch(errorHandler);
}

function handlerOpenPopup() {
  const infoUser = userInfo.getUserInfo();
  nameInput.value = infoUser.name;
  jobInput.value = infoUser.job;
}

//добавление новой карточки через форму

function handlerAddPicFormSubmit(formValues) {
  api.createNewCard(formValues['form__item-place'], formValues['form__item-link']).then((item) => {
    cardList.addItemFirst(createCard(item));
  })
  .catch(errorHandler);
  popupAddPic.closePopup();
}

const formProfileValidator = new FormValidator("form[name='popup-profile']", settings);
formProfileValidator.setEventListeners();


const formAddPicValidator = new FormValidator("form[name='popup-add-pic']", settings);
formAddPicValidator.setEventListeners();

const formPopupUpdateAvatarValidator = new FormValidator("form[name='popup-update-avatar']", settings);
formPopupUpdateAvatarValidator.setEventListeners();

