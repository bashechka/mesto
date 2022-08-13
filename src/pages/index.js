import './index.css'; // добавьте импорт главного файла стилей 
import {initialCards} from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage';
import Card from '../components/Card.js';
import {photoListSelector, editButton, profileButtonElement, nameInput, jobInput, settings} from '../utils/constants.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Userinfo from '../components/UserInfo.js';


function createCard(name, link) {
  const card = new Card(name, link, handleCardClick);
  return card._generateCard();
}

const cardList = new Section ({
  items: initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item.name, item.link));
  }
}, photoListSelector);

  
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

const popupWithImage = new PopupWithImage('.popup_type_open-pic');
popupWithImage.setEventListeners();

function handleCardClick(name, link) {
  popupWithImage.setImageContent(name, link); 
  popupWithImage.openPopup();
}


//  //попап с фото

// function handleCardClick(images) {
//   const images = Array.from(document.querySelectorAll('.photo__list-image'));
//   images.forEach((image) => {
//     image.addEventListener('click', popupWithImage.openPopup());
//    });
// }
//  handleCardClick();



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
  cardList.addItemFirst(createCard(formValues['form__item-place'], formValues['form__item-link']));
  popupAddPic.closePopup();
}


const formProfileValidator = new FormValidator("form[name='popup-profile']", settings);
formProfileValidator.setEventListeners();


const formAddPicValidator = new FormValidator("form[name='popup-add-pic']", settings);
formAddPicValidator.setEventListeners();


cardList.renderItems();