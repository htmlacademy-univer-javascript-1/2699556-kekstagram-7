// js/main.js
import { getData } from './api.js';
import { renderPictures } from './render-pictures.js';
import { showErrorMessage } from './messages.js'; // Импортируем
import './upload-form.js';
import './image-editor.js';

getData()
  .then((photos) => {
    renderPictures(photos);
  })
  .catch(() => {
    showErrorMessage(); // Показываем красивое окно с ошибкой
  });
