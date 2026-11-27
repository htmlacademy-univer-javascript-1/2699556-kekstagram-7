// js/image-editor.js

const imgUploadPreview = document.querySelector('.img-upload__preview img');
const scaleControlValue = document.querySelector('.scale__control--value');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const effectsList = document.querySelector('.effects__list');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelSlider = document.querySelector('.effect-level__slider');

const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

// --- ЛОГИКА МАСШТАБА ---

let currentScale = DEFAULT_SCALE;

const updateScale = () => {
  scaleControlValue.value = `${currentScale}%`;
  imgUploadPreview.style.transform = `scale(${currentScale / 100})`;
};

scaleControlSmaller.addEventListener('click', () => {
  if (currentScale > MIN_SCALE) {
    currentScale -= SCALE_STEP;
    updateScale();
  }
});

scaleControlBigger.addEventListener('click', () => {
  if (currentScale < MAX_SCALE) {
    currentScale += SCALE_STEP;
    updateScale();
  }
});

const resetScale = () => {
  currentScale = DEFAULT_SCALE;
  updateScale();
};

// --- ЛОГИКА ЭФФЕКТОВ ---

const EFFECTS = {
  none: { min: 0, max: 100, step: 1, filter: '', unit: '' },
  chrome: { min: 0, max: 1, step: 0.1, filter: 'grayscale', unit: '' },
  sepia: { min: 0, max: 1, step: 0.1, filter: 'sepia', unit: '' },
  marvin: { min: 0, max: 100, step: 1, filter: 'invert', unit: '%' },
  phobos: { min: 0, max: 3, step: 0.1, filter: 'blur', unit: 'px' },
  heat: { min: 1, max: 3, step: 0.1, filter: 'brightness', unit: '' },
};

let currentEffect = 'none';

// Инициализация слайдера
noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

// Функция обновления уровня эффекта (вызывается слайдером)
const updateEffectLevel = (value) => {
  const effect = EFFECTS[currentEffect];
  effectLevelValue.value = value;
  if (currentEffect === 'none') {
    imgUploadPreview.style.filter = '';
  } else {
    imgUploadPreview.style.filter = `${effect.filter}(${value}${effect.unit})`;
  }
};

// Обработчик изменения слайдера
effectLevelSlider.noUiSlider.on('update', (values, handle) => {
  updateEffectLevel(values[handle]);
});

// Обработчик переключения эффектов
effectsList.addEventListener('change', (evt) => {
  if (evt.target.matches('.effects__radio')) {
    currentEffect = evt.target.value;
    const effect = EFFECTS[currentEffect];
    // 1. Скрываем/показываем слайдер
    if (currentEffect === 'none') {
      effectLevelContainer.classList.add('hidden');
    } else {
      effectLevelContainer.classList.remove('hidden');
    }
    // 2. Обновляем настройки слайдера
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: effect.min,
        max: effect.max,
      },
      step: effect.step,
      start: effect.max, // Сброс до начального значения (100%)
    });
    // 3. Принудительно обновляем CSS (так как updateOptions может не вызвать on('update') при равном значении)
    updateEffectLevel(effect.max);
  }
});

// Сброс эффектов (при закрытии формы)
const resetEffects = () => {
  currentEffect = 'none';
  // Сбрасываем радио-кнопку на "Оригинал"
  const noneRadio = effectsList.querySelector('#effect-none');
  if (noneRadio) {
    noneRadio.checked = true;
  }
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: EFFECTS.none.min,
      max: EFFECTS.none.max,
    },
    step: EFFECTS.none.step,
    start: EFFECTS.none.max,
  });
  effectLevelContainer.classList.add('hidden');
  imgUploadPreview.style.filter = '';
  effectLevelValue.value = '';
};

// --- ЭКСПОРТ ФУНКЦИЙ ДЛЯ СБРОСА ---
const resetEditor = () => {
  resetScale();
  resetEffects();
};

export { resetEditor };
effectLevelContainer.classList.add('hidden');
