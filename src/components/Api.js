export default class Api {
    constructor(options) {
      this._options = options;
    }

  getCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-48/cards', {
      method: 'GET',
      headers: {
        authorization: '0de73a47-ba0e-4616-b8f4-47dc11cfec5b',
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
      .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
}

  getUserInfo() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-48/users/me', {
      method: 'GET',
      headers: {
        authorization: '0de73a47-ba0e-4616-b8f4-47dc11cfec5b'
        // 'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    }); 
  }

  updateUserInfo(name, about) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-48/users/me', {
      method: 'PATCH',
      headers: {
        authorization: '0de73a47-ba0e-4616-b8f4-47dc11cfec5b',
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({
        name: name,
        about: about
    })
  })
  
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    }); 
  }

  createNewCard(name, link) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-48/cards', {
        method: 'POST',
        headers: {
          authorization: '0de73a47-ba0e-4616-b8f4-47dc11cfec5b',
          'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          name: name,
          link: link
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      }); 
  }
  
  setLike(cardId) {
   return fetch(`https://mesto.nomoreparties.co/v1/cohort-48/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: '0de73a47-ba0e-4616-b8f4-47dc11cfec5b',
        'Content-Type': 'application/json'
    }
   })
   .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  }); 
}

  deleteLike(cardId) {
   return fetch(`https://mesto.nomoreparties.co/v1/cohort-48/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: '0de73a47-ba0e-4616-b8f4-47dc11cfec5b',
        'Content-Type': 'application/json'
    }
   })
   .then((res) => {
    if (res.ok) {
      return res.json();
      
    }
    return Promise.reject(`Ошибка: ${res.status}`);
   })
   .catch((err) => {
    console.log(err); // выведем ошибку в консоль
   }); 
 }

 updateUserAvatar(avatarLink) {
 return fetch('https://mesto.nomoreparties.co/v1/cohort-48/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: '0de73a47-ba0e-4616-b8f4-47dc11cfec5b',
      'Content-Type': 'application/json'
  },
    body: JSON.stringify({
     avatar: avatarLink
  })
})
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  }); 
 }
 
 deleteCard(cardId) {
  return fetch(`https://mesto.nomoreparties.co/v1/cohort-48/cards/${cardId}`, {
     method: 'DELETE',
     headers: {
       authorization: '0de73a47-ba0e-4616-b8f4-47dc11cfec5b',
       'Content-Type': 'application/json'
   }
 })
   .then((res) => {
     if (res.ok) {
       return res.json();
     }
     return Promise.reject(`Ошибка: ${res.status}`);
   })
   .catch((err) => {
     console.log(err); // выведем ошибку в консоль
   }); 
  }
}

