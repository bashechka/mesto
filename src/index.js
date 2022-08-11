import './index.css'; // добавьте импорт главного файла стилей 
import {initialCards} from './scripts/utils/constants.js';
import FormValidator from './scripts/utils/FormValidator.js';
import Card from './scripts/components/Card.js';
import {photoListSelector, editButton, profileFormElement, profileButtonElement, nameInput, jobInput, profileJobElement, profileNameElement} from './scripts/utils/constants.js';
import Section from './scripts/components/Section.js';
import PopupWithForm from './scripts/components/PopupWithForm.js';
import Userinfo from './scripts/components/UserInfo.js';

const cardList = new Section ({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item.name, item.link);
    const cardElement = card._generateCard();

    cardList.addItem(cardElement);
  }
}, photoListSelector);

  
const popupAddPic = new PopupWithForm('.popup_type_add-pic', handlerAddPicFormSubmit);
profileButtonElement.addEventListener('click', popupAddPic.openPopup.bind(popupAddPic));


const popupProfile = new PopupWithForm('.popup_type_profile', handleProfileFormSubmit, handlerOpenPopup);
editButton.addEventListener('click', popupProfile.openPopup.bind(popupProfile));

// profileFormElement.addEventListener('submit', handleProfileFormSubmit); 

// //открытие и закрытие попапа на изменение профайла
// function openPopupProfile() {
//   openPopup(popupProfile);
//   Userinfo.getUserInfo ();
// }

const userInfo = new Userinfo({nameSelector: '.profile__name', jobSelector: '.profile__job'});

function handleProfileFormSubmit(formValues) {
  userInfo.setUserInfo(formValues['form__item-name'], formValues['form__item-job']);
  popupProfile.closePopup(popupProfile);
}

function handlerOpenPopup() {
  const infoUser = userInfo.getUserInfo();
  nameInput.value = infoUser.name;
  jobInput.value = infoUser.job;
}

//добавление новой карточки через форму

function handlerAddPicFormSubmit(formValues) {
  const card = new Card(formValues['form__item-place'], formValues['form__item-link']);
  const cardElement = card._generateCard();
  cardList.addItemFirst(cardElement);
  popupAddPic.closePopup();
}

function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    const formValidator = new FormValidator(formElement, settings);
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    
    formValidator.setEventListeners();
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__container-input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__container-input_type_error',
  inputErrorActiveClass: 'popup__container-input_error-active',
  submitButtonInactiveClass: 'popup__button_inactive',
});

cardList.renderItems();