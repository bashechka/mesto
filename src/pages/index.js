import './index.css'; // добавьте импорт главного файла стилей 
import { initialCards } from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage';
import Card from '../components/Card.js';
import { photoListSelector, editButton, profileButtonElement, avatarInput, nameInput, jobInput, settings, avatarEditButtonElement } from '../utils/constants.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Userinfo from '../components/UserInfo.js';
import Popup from '../components/Popup.js';
import Api from '../components/Api.js'
import { data } from 'autoprefixer';
import PopupConfirmation from '../components/PopupConfirmation';

//API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-48',
  headers: {
    authorization: '0de73a47-ba0e-4616-b8f4-47dc11cfec5b',
    'Content-Type': 'application/json'
  }
});

function createCard(data) {
  const card = new Card('#photo__list-item', data, handleCardClick, handelDeletCard, handleLikeCard);
  const userId = userInfo.getUserInfo().userId;
  card.showActiveLike(userId);
  if (card.getOwnerId() !== userId) {
    card.hideDeleteButtun();
  }
  return card.generateCard();
}

function handlerError(err) {
  console.log(err); // выведем ошибку в консоль
}

const cardList = new Section({
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
  }).catch(handlerError);
}).catch(handlerError);

const popupAddPic = new PopupWithForm('.popup_type_add-pic', handlerAddPicFormSubmit);
popupAddPic.setEventListeners();
profileButtonElement.addEventListener('click', () => {
  formAddPicValidator.toggleButtonState();
  popupAddPic.openPopup();
  formAddPicValidator.resetValidation();
});

const popupProfile = new PopupWithForm('.popup_type_profile', handleProfileFormSubmit);
popupProfile.setEventListeners();
editButton.addEventListener('click', () => {
  popupProfile.openPopup();
  handlerOpenPopup();
  formProfileValidator.resetValidation();
});

const popupUpdateAvatar = new PopupWithForm('.popup_type_update-avatar', handlerAvatarProfileFormSubmit);
popupUpdateAvatar.setEventListeners();
avatarEditButtonElement.addEventListener('click', () => {
  formPopupUpdateAvatarValidator.toggleButtonState();
  popupUpdateAvatar.openPopup();
  formPopupUpdateAvatarValidator.resetValidation();
});

const popupWithImage = new PopupWithImage('.popup_type_open-pic');
popupWithImage.setEventListeners();

function handleCardClick(name, link) {
  popupWithImage.setImageContent(name, link);
  popupWithImage.openPopup();
}

const popupConfirmDelete = new PopupConfirmation('.popup_type_delete', handlerConfirmPopupFormSubmit);
popupConfirmDelete.setEventListeners();

function handlerConfirmPopupFormSubmit(card) {
  api.deleteCard(card.getCardId()).then(() => {
    card.deleteCard();
    popupConfirmDelete.closePopup();
  })
    .catch(handlerError);
}
function handelDeletCard(card) {
  popupConfirmDelete.setTarget(card);
  popupConfirmDelete.openPopup();
}

function handleLikeCard(card) {
  if (card.isLiked()) {
    api.deleteLike(card.getCardId()).then((data) => {
      card.updateData(data);
      card.toggleLike();
    })
      .catch(handlerError);
  } else {
    api.setLike(card.getCardId()).then((data) => {
      card.updateData(data);
      card.toggleLike();
    })
      .catch(handlerError);
  }
}

const userInfo = new Userinfo({ nameSelector: '.profile__name', jobSelector: '.profile__job', avatarSelector: '.profile__avatar' });

function handleProfileFormSubmit(formValues) {
  popupProfile.setLoading();
  api.updateUserInfo(formValues['form__item-name'], formValues['form__item-job'])
    .then((data) => {
      userInfo.setUserInfo(data);
      popupProfile.closePopup(popupProfile);
    })
    .finally(() => popupProfile.disableLoading())
    .catch(handlerError);
}

function handlerAvatarProfileFormSubmit(formValues) {
  popupUpdateAvatar.setLoading();
  api.updateUserAvatar(formValues['form__item-avatar-link']).then((data) => {
    userInfo.setUserInfo(data);
    popupUpdateAvatar.closePopup();
  })
    .finally(() => popupUpdateAvatar.disableLoading())
    .catch(handlerError);
}

function handlerOpenPopup() {
  const infoUser = userInfo.getUserInfo();
  nameInput.value = infoUser.name;
  jobInput.value = infoUser.job;
}

//добавление новой карточки через форму

function handlerAddPicFormSubmit(formValues) {
  popupAddPic.setLoading();
  api.createNewCard(formValues['form__item-place'], formValues['form__item-link'])
    .then((item) => {
      cardList.addItemFirst(createCard(item));
      popupAddPic.closePopup();
    })
    .finally(() => popupAddPic.disableLoading())
    .catch(handlerError);
}

const formProfileValidator = new FormValidator("form[name='popup-profile']", settings);
formProfileValidator.setEventListeners();


const formAddPicValidator = new FormValidator("form[name='popup-add-pic']", settings);
formAddPicValidator.setEventListeners();

const formPopupUpdateAvatarValidator = new FormValidator("form[name='popup-update-avatar']", settings);
formPopupUpdateAvatarValidator.setEventListeners();

