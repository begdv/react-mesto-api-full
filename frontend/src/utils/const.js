export const configApi = {
    url: 'https://mesto.nomoreparties.co/v1/cohort-41/',
    headers: {
      "content-type": "application/json",
      "authorization": '927f2c34-eed2-41a5-b205-b051cad1964c'
    }
};

export const configApiAuth = {
  url: 'https://auth.nomoreparties.co/',
  headers: {
    "content-type": "application/json",
  }
};

export const typeInfoMessage = {
  ok: 'Вы успешно зарегистрировались!',
  error: 'Что-то пошло не так! Попробуйте еще раз.'
}

export const cardSelector = '.cards';
export const cardTemplateSelector = '.card-template';