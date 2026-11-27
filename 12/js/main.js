// js/main.js
import { getData } from './api.js';
import { renderPictures } from './render-pictures.js';
import { initFilters } from './filters.js'; // <-- Импортируем новый модуль
import { showErrorMessage } from './messages.js';
import './upload-form.js';
import './image-editor.js';

getData()
  .then((photos) => {
    // 1. Отрисовываем фото по умолчанию
    renderPictures(photos);
    // 2. Инициализируем фильтры (показываем блок и передаем данные)
    initFilters(photos);
  })
  .catch(() => {
    showErrorMessage();
  });
