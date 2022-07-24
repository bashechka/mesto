import {initialCards} from './initial-cards.js';
import FormValidator from './FormValidator.js';
import Card from './Card.js';

const mainContent = document.querySelector('.main-content');
//const photoItemTemplate = document.querySelector('#photo__list-item').content;
const photoList = document.querySelector('.photo__list');
const popups = document.querySelectorAll('.popup');
//popup_type_profile
const popupProfile = document.querySelector('.popup_type_profile');
const editButton = mainContent.querySelector('.profile__edit-button');
//const popupProfileCloseIcon = popupProfile.querySelector('.popup__close-icon');
const profileFormElement = popupProfile.querySelector('.popup__container');
const nameInput = popupProfile.querySelector('.popup__container-input_type_name');
const jobInput = popupProfile.querySelector('.popup__container-input_type_job');
const profileNameElement = mainContent.querySelector('.profile__name');
const profileJobElement = mainContent.querySelector('.profile__job');
//popup_type_add-pic
const popupAddPic = document.querySelector('.popup_type_add-pic');
const addPicFormElement = popupAddPic.querySelector('.popup__container');
//const addPicButton = document.querySelector('.profile__add-button');
//const popupAddPicCloseIcon = popupAddPic.querySelector('.popup__close-icon');
const placeInput = popupAddPic.querySelector('.popup__container-input_type_place');
const linkInput = popupAddPic.querySelector('.popup__container-input_type_link');
   
//функция закрытия попапа при нажатии Esc

function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    popups.forEach((popup) => {
      if (popup.classList.contains('popup_open')) {
        closePopup(popup);
      }
    });
  }
}

//универсальные функции закрытия и открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_open');
  document.addEventListener('keydown', closePopupEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_open');
  document.removeEventListener('keydown', closePopupEsc);
}

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup__close-icon') 
    || evt.target.classList.contains('popup_open')) {
      closePopup(popup);
 }
    // if (evt.target.classList.contains('popup_open')) {
    // closePopup(popup);
    // }
    // if (evt.target.classList.contains('popup__close-icon')) {
    // closePopup(popup);
    // }
  });
});

//открытие и закрытие попапа на изменение профайла
function openPopupProfile() {
  openPopup(popupProfile);
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
}

editButton.addEventListener('click', openPopupProfile);

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); 

  profileNameElement.textContent = nameInput.value;
  profileJobElement.textContent = jobInput.value;
  closePopup(popupProfile);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
profileFormElement.addEventListener('submit', handleProfileFormSubmit); 

//универсальная функция по созданию новой карточки
function initialCard(name, link) {
  const card = new Card(name, link, openPopup);
  return card._generateCard();
}

//создание новой карточки
initialCards.forEach(function(item) {
  const cardElement = initialCard(item.name, item.link);
  photoList.append(cardElement); 
});

//добавление новой карточки через форму
function handlerAddPicFormSubmit(evt) {
  evt.preventDefault(); 
  const newTemplateItemElement = initialCard(placeInput.value, linkInput.value);
  photoList.prepend(newTemplateItemElement);
  closePopup(popupAddPic);
  evt.target.reset();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
addPicFormElement.addEventListener('submit', handlerAddPicFormSubmit); 

function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    const formValidator = new FormValidator(formElement, settings, openPopup);
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
