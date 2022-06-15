const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function createTemplateItem(imgValue, titleValue) {
  const photoItemTemplate = document.querySelector('#photo__list-item').content;
  // клонируем содержимое тега template
  const photoItem = photoItemTemplate.querySelector('.photo__list-item').cloneNode(true);

  // наполняем содержимым
  photoItem.querySelector('.photo__list-image').src = imgValue;
  photoItem.querySelector('.photo__title').textContent = titleValue;

  return photoItem;
};

const photoList = document.querySelector('.photo__list');

initialCards.forEach(function(item) {
  photoList.append(createTemplateItem(item.link, item.name)); 
});


let mainContent = document.querySelector('.main-content');

// popup1
let popup = document.querySelector('.popup');
let editButton = mainContent.querySelector('.profile__edit-button');
let popupCloseIcon = document.querySelector('.popup__close-icon');
// Находим форму в DOM
let formElement = document.querySelector('.popup__container'); 
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__container-input_type_name');
let jobInput = document.querySelector('.popup__container-input_type_job');
let name = mainContent.querySelector('.profile__name');
let job = mainContent.querySelector('.profile__job');

// popup2
const popupAdd = document.querySelector('.popup-add');
const addButton = mainContent.querySelector('.profile__add-button');
const popupAddCloseIcon = document.querySelector('.popup-add__close-icon');
// Находим форму в DOM
const addFormElement = document.querySelector('.popup-add__container');
// Находим поля формы в DOM
const addPlaceInput = document.querySelector('.popup-add__container-input_type_place');
const addLinkInput = document.querySelector('.popup-add__container-input_type_link');

//открытие и закрытие попапа на изменение профайла

function popupOpen() {
  popup.classList.add('popup_open');
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
}

function popupClose() {
  popup.classList.remove('popup_open');
}

editButton.addEventListener('click', popupOpen);
popupCloseIcon.addEventListener('click', popupClose);
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); 

  // Выберите элементы, куда должны быть вставлены значения полей
  // Вставьте новые значения с помощью textContent
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  popup.classList.remove('popup_open');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 

//открытие и закрытие попапа на добавление фото
function popupAddOpen() {
  popupAdd.classList.add('popup_open');
}

function popupAddClose() {
  popupAdd.classList.remove('popup_open');
}

addButton.addEventListener('click', popupAddOpen);
popupAddCloseIcon.addEventListener('click', popupAddClose);
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет

//добавление новой карточки

function addFormSubmitHandler(evt) {
  evt.preventDefault(); 
  const placeInput = document.querySelector('.popup-add__container-input_type_place');
  const linkInput = document.querySelector('.popup-add__container-input_type_link');

  let newItem = {
    name: placeInput.value,
    link: linkInput.value,
  };

  initialCards.unshift(newItem);
  
  const newTemplateItem = createTemplateItem(linkInput.value, placeInput.value);
  photoList.prepend(newTemplateItem);

  popupAdd.classList.remove('popup_open');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
addFormElement.addEventListener('submit', addFormSubmitHandler); 

//включение и выключение лайка
const likeButtons = document.querySelectorAll('.photo__like-button');

function activeLike(evt) {
  evt.target.classList.toggle('photo__like-button_active');
}

likeButtons.forEach(function(element) {
  element.addEventListener('click', activeLike);
});

//удаление карточки

const deleteButtons = document.querySelectorAll('.photo__delete-button');

function deleteItem(evt) {
  evt.target.parentNode.remove();
}

deleteButtons.forEach(function(element) {
  element.addEventListener('click', deleteItem);
});

//попап с фото открытие и закрытие
const popupPhoto = document.querySelector('.popup-photo')
const imgList = document.querySelectorAll('.photo__list-image');
const photoDeleteButton = document.querySelector('.popup-photo__close-icon');

function popupImgOpen(evt) {
  popupPhoto.classList.add('popup_open');
  const src = evt.target.src;
  const pic = document.querySelector('.popap-photo__picture');
  pic.src = src;
  const title = evt.target.nextElementSibling.querySelector('.photo__title');
  let caption = document.querySelector('.popup-photo__caption');
  caption.textContent = title.textContent;
}

function popupImgClose() {
  popupPhoto.classList.remove('popup_open');
}

imgList.forEach(function(element) {
  element.addEventListener('click', popupImgOpen);
});

photoDeleteButton.addEventListener('click', popupImgClose);



