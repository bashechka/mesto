const mainContent = document.querySelector('.main-content');

const photoItemTemplate = document.querySelector('#photo__list-item').content;
const photoList = document.querySelector('.photo__list');
// popup_type_profile
const popupProfile = document.querySelector('.popup_type_profile');
const editButton = mainContent.querySelector('.profile__edit-button');
const popupProfileCloseIcon = popupProfile.querySelector('.popup__close-icon');
const profileFormElement = popupProfile.querySelector('.popup__container');
const nameInput = popupProfile.querySelector('.popup__container-input_type_name');
const jobInput = popupProfile.querySelector('.popup__container-input_type_job');
const profileNameElement = mainContent.querySelector('.profile__name');
const profileJobElement = mainContent.querySelector('.profile__job');

// popup_type_add-pic
const popupAddPic = document.querySelector('.popup_type_add-pic');
const addPicFormElement = popupAddPic.querySelector('.popup__container');
const addPicButton = document.querySelector('.profile__add-button');
const popupAddPicCloseIcon = popupAddPic.querySelector('.popup__close-icon');
const placeInput = popupAddPic.querySelector('.popup__container-input_type_place');
const linkInput = popupAddPic.querySelector('.popup__container-input_type_link');

//попап с фото: открытие и закрытие
const popupPhoto = document.querySelector('.popup_type_open-pic')
const photoCloseButton = popupPhoto.querySelector('.popup__close-icon');
const pic = document.querySelector('.popup__photo');
const caption = document.querySelector('.popup__photo-caption');

//создание карточки с загрузкой информации из массива + обработчики лайков и корзины удаления
function createTemplateItem(imgValue, titleValue) {
  // клонируем содержимое тега template
  const photoItem = photoItemTemplate.querySelector('.photo__list-item').cloneNode(true);

  // наполняем содержимым
  photoItem.querySelector('.photo__list-image').src = imgValue;
  photoItem.querySelector('.photo__title').textContent = titleValue;
  //подтягиваем alt
  photoItem.querySelector('.photo__list-image').alt = titleValue;


  //лайк
  const likeButton = photoItem.querySelector('.photo__like-button');
  likeButton.addEventListener('click', activeLike);

  //корзина
  const deleteButton = photoItem.querySelector('.photo__delete-button');
  deleteButton.addEventListener('click', function(){
    const listItem = deleteButton.closest('.photo__list-item');
    listItem.remove();
  });

  //попап с фото
  const img = photoItem.querySelector('.photo__list-image');
  img.addEventListener('click', openPopupPhoto);

  return photoItem;
}

initialCards.forEach(function(item) {
  photoList.append(createTemplateItem(item.link, item.name)); 
});

//включение и выключение лайка
function activeLike(evt) {
  evt.target.classList.toggle('photo__like-button_active');
}
//функция закрытия попапа при нажатии Esc

function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const popups = document.querySelectorAll('.popup');
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

//функция закрытия попапа при клике на оверлей
 function closePopupOverlay(popup) {
   popup.addEventListener('click', function(e) {
     if (e.target === e.currentTarget) {
      closePopup(popup);
     }
   });
 }


//открытие и закрытие попапа на изменение профайла
function openPopupProfile() {
  openPopup(popupProfile);
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
}

editButton.addEventListener('click', openPopupProfile);

closePopupOverlay(popupProfile);
popupProfileCloseIcon.addEventListener('click', function() {
  closePopup(popupProfile);
});

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

//открытие и закрытие попапа на добавление фото
addPicButton.addEventListener('click', function() {
  openPopup(popupAddPic);
});

closePopupOverlay(popupAddPic);

popupAddPicCloseIcon.addEventListener('click', function() {
  closePopup(popupAddPic);
});
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет

//добавление новой карточки
function handlerAddPicFormSubmit(evt) {
  evt.preventDefault(); 
  const newTemplateItem = createTemplateItem(linkInput.value, placeInput.value);
  photoList.prepend(newTemplateItem);

  closePopup(popupAddPic);
  evt.target.reset();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
addPicFormElement.addEventListener('submit', handlerAddPicFormSubmit); 

//попап с фото: открытие и закрытие
function openPopupPhoto(evt) {
  openPopup(popupPhoto);
  const src = evt.target.src;
  pic.src = src;
  const title = evt.target.closest('.photo__list-item').querySelector('.photo__title');
  caption.textContent = title.textContent;
  pic.alt = title.textContent;
}

closePopupOverlay(popupPhoto);

photoCloseButton.addEventListener('click', function(){
  closePopup(popupPhoto);
});

