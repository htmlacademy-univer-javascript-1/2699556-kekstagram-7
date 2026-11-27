// js/filters.js
import { renderPictures } from './render-pictures.js';
import { debounce, shuffleArray } from './util.js';

const filtersContainer = document.querySelector('.img-filters');
const filtersForm = document.querySelector('.img-filters__form');
const filterButtons = filtersForm.querySelectorAll('.img-filters__button');

const RANDOM_PHOTOS_COUNT = 10;
const ACTIVE_CLASS = 'img-filters__button--active';

let currentPhotos = []; // Будем хранить исходный массив с сервера

// Функция отрисовки в зависимости от выбранного фильтра
const applyFilter = (filterId) => {
  let filteredPhotos = [];

  switch (filterId) {
    case 'filter-random':
      // Перемешиваем копию массива и берем 10 штук
      filteredPhotos = shuffleArray([...currentPhotos]).slice(0, RANDOM_PHOTOS_COUNT);
      break;
    case 'filter-discussed':
      // Сортируем по убыванию количества комментариев
      filteredPhotos = [...currentPhotos].sort((a, b) => b.comments.length - a.comments.length);
      break;
    case 'filter-default':
    default:
      // Изначальный порядок
      filteredPhotos = [...currentPhotos];
      break;
  }

  renderPictures(filteredPhotos);
};

// Обертываем функцию фильтрации в debounce (задержка 500мс)
const debouncedApplyFilter = debounce(applyFilter, 500);

// Обработчик клика по кнопкам фильтра
const onFilterClick = (evt) => {
  const targetButton = evt.target.closest('.img-filters__button');
  if (!targetButton) {
    return;
  }

  // Если кнопка уже активна, ничего не делаем
  if (targetButton.classList.contains(ACTIVE_CLASS)) {
    return;
  }

  // Переключаем активный класс
  filterButtons.forEach((btn) => btn.classList.remove(ACTIVE_CLASS));
  targetButton.classList.add(ACTIVE_CLASS);

  // Вызываем отрисовку с задержкой
  debouncedApplyFilter(targetButton.id);
};

// Инициализация модуля фильтров
const initFilters = (photos) => {
  currentPhotos = photos;
  // Показываем блок фильтров
  filtersContainer.classList.remove('img-filters--inactive');
  // Вешаем обработчик
  filtersForm.addEventListener('click', onFilterClick);
};

export { initFilters };
