// js/upload-form.js

import { resetEditor } from './image-editor.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadCancel = uploadForm.querySelector('.img-upload__cancel');
const submitButton = uploadForm.querySelector('.img-upload__submit');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');

// Элементы для предпросмотра
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const effectPreviews = document.querySelectorAll('.effects__preview');

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
  // Возвращаем стандартную картинку-заглушку
  imgUploadPreview.src = 'img/upload-default-image.jpg';
  // Очищаем превью эффектов
  effectPreviews.forEach((preview) => {
    preview.style.backgroundImage = '';
  });
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

// --- Логика загрузки и отображения выбранного файла ---

const onFileInputChange = () => {
  const file = uploadInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      // Подставляем картинку в окно предпросмотра
      imgUploadPreview.src = reader.result;
      // Подставляем картинку в миниатюры эффектов
      effectPreviews.forEach((preview) => {
        preview.style.backgroundImage = `url('${reader.result}')`;
      });
    });
    reader.readAsDataURL(file);
  }
};

// Событие выбора файла
uploadInput.addEventListener('change', () => {
  onFileInputChange();
  openUploadForm();
});

// Событие клика по кнопке закрытия
uploadCancel.addEventListener('click', closeUploadForm);


// --- Валидация хэш-тегов ---

const validateHashtags = (value) => {
  if (!value.trim()) {
    return true;
  }

  const hashtags = value.toLowerCase().split(' ').filter((tag) => tag !== '');
  if (hashtags.length > 5) {
    return false;
  }

  for (let i = 0; i < hashtags.length; i++) {
    const tag = hashtags[i];
    if (!/^#[a-zа-яё0-9]{1,19}$/i.test(tag)) {
      return false;
    }
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

pristine.addValidator(
  hashtagsInput,
  validateHashtags,
  'Неверный формат хэш-тегов (макс. 5 тегов, до 20 символов, без спецсимволов и дубликатов)'
);

const validateDescription = (value) => value.length <= 140;

pristine.addValidator(
  descriptionInput,
  validateDescription,
  'Комментарий не может быть длиннее 140 символов'
);

// --- Отправка формы ---

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    const formData = new FormData(uploadForm);
    sendData(formData)
      .then(() => {
        closeUploadForm();
        showSuccessMessage();
      })
      .catch(() => {
        showErrorMessage();
      })
      .finally(() => {
        unblockSubmitButton();
      });
  }
});
