let mainContent = document.querySelector('.main-content');
let popup = document.querySelector('.popup');
let editButton = mainContent.querySelector('.profile__edit-button');
let popupCloseIcon = document.querySelector('.popup__close-icon');
// Находим форму в DOM
let formElement = document.querySelector('.popup__container') // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__container-form_type_name')// Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.popup__container-form_type_job')// Воспользуйтесь инструментом .querySelector()
let name = mainContent.querySelector('.profile__name');
let job = mainContent.querySelector('.profile__job');

function popupOpen() {
  // popup.classList.add('popup_opened');
  popup.classList.remove('popup_close');
  // let name = mainContent.querySelector('.profile__name');
  // let job = mainContent.querySelector('.profile__job');
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
}

function popupClose() {
  // popup.classList.remove('popup_opened');
  popup.classList.add('popup_close');
}

editButton.addEventListener('click', popupOpen);
popupCloseIcon.addEventListener('click', popupClose);


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет

function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Выберите элементы, куда должны быть вставлены значения полей
 
  // Вставьте новые значения с помощью textContent
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  popup.classList.add('popup_close');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 