// js/upload-form.js

import { resetEditor } from './image-editor.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadCancel = uploadForm.querySelector('.img-upload__cancel');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');

// --- Управление открытием и закрытием ---

function closeUploadForm() {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  // Сброс значения поля выбора файла
  uploadInput.value = '';
  // Сброс остальных полей формы
  uploadForm.reset();
  // Сброс масштаба и эффектов
  resetEditor();
  // Снимаем обработчик Esc
  document.removeEventListener('keydown', onDocumentKeydown);
}

function onDocumentKeydown(evt) {
  // Если фокус в поле ввода, Esc не закрывает форму
  if (evt.key === 'Escape' && document.activeElement !== hashtagsInput && document.activeElement !== descriptionInput) {
    evt.preventDefault();
    closeUploadForm();
  }
}

const openUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  // Вешаем обработчик Esc
  document.addEventListener('keydown', onDocumentKeydown);
};

// Событие выбора файла
uploadInput.addEventListener('change', () => {
  openUploadForm();
});

// Событие клика по кнопке закрытия
uploadCancel.addEventListener('click', () => {
  closeUploadForm();
});


// --- Валидация хэш-тегов ---

const validateHashtags = (value) => {
  if (!value.trim()) {
    return true; // Хэш-теги необязательны
  }

  const hashtags = value.toLowerCase().split(' ').filter((tag) => tag !== '');
  if (hashtags.length > 5) {
    return false;
  }

  for (let i = 0; i < hashtags.length; i++) {
    const tag = hashtags[i];
    // Начинается с #, длина от 2 до 20, только буквы и цифры
    if (!/^#[a-zа-яё0-9]{1,19}$/i.test(tag)) {
      return false;
    }
    // Проверка на дубликаты
    if (hashtags.indexOf(tag) !== i) {
      return false;
    }
  }

  return true;
};


// --- Настройка Pristine ---

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
});

// Добавляем валидатор для хэш-тегов
pristine.addValidator(
  hashtagsInput,
  validateHashtags,
  'Неверный формат хэш-тегов (макс. 5 тегов, до 20 символов, без спецсимволов и дубликатов)'
);

// Валидация комментария (не более 140 символов)
const validateDescription = (value) => value.length <= 140;

pristine.addValidator(
  descriptionInput,
  validateDescription,
  'Комментарий не может быть длиннее 140 символов'
);

// Обработка отправки формы
uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault(); // Пока отменяем стандартную отправку (сетевую логику добавим позже)
  const isValid = pristine.validate();
  if (isValid) {
    // Здесь в будущем будет AJAX-запрос
    // uploadForm.submit(); // Если хотим стандартную отправку
  }
});
