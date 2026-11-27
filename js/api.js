// js/api.js

const BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

// Получение данных с сервера
const getData = () =>
  fetch(`${BASE_URL}/data`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка получения данных: ${response.status}`);
      }
      return response.json();
    });

// Отправка данных на сервер
const sendData = (body) =>
  fetch(BASE_URL, {
    method: 'POST',
    body: body,
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Ошибка отправки данных: ${response.status}`);
    }
  });

export { getData, sendData };
