const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImg = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const commentsCountElement = bigPictureElement.querySelector('.comments-count');
const socialCaptionElement = bigPictureElement.querySelector('.social__caption');
const socialCommentsElement = bigPictureElement.querySelector('.social__comments');
const socialCommentCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const cancelButton = bigPictureElement.querySelector('.big-picture__cancel');

const COMMENTS_PER_PORTION = 5;

let currentComments = [];      // массив комментариев текущей фотографии
let shownCommentsCount = 0;    // сколько уже показано

// --- Создание одного комментария ---

const createCommentElement = ({ avatar, name, message }) => {
  const li = document.createElement('li');
  li.classList.add('social__comment');

  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = avatar;
  img.alt = name;
  img.width = 35;
  img.height = 35;

  const p = document.createElement('p');
  p.classList.add('social__text');
  p.textContent = message;

  li.append(img, p);
  return li;
};

// --- Отрисовка следующей порции комментариев ---

const renderNextCommentsPortion = () => {
  const fragment = document.createDocumentFragment();
  const nextPortion = currentComments.slice(
    shownCommentsCount,
    shownCommentsCount + COMMENTS_PER_PORTION
  );

  nextPortion.forEach((comment) => {
    fragment.append(createCommentElement(comment));
  });

  socialCommentsElement.append(fragment);
  shownCommentsCount += nextPortion.length;

  // Обновляем счётчик «N из M комментариев»
  socialCommentCountElement.innerHTML =
    `${shownCommentsCount} из <span class="comments-count">${currentComments.length}</span> комментариев`;

  // Если показали все — прячем кнопку
  if (shownCommentsCount >= currentComments.length) {
    commentsLoaderElement.classList.add('hidden');
  }
};

// --- Обработчик кнопки «Загрузить ещё» ---

const onCommentsLoaderClick = () => {
  renderNextCommentsPortion();
};

commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);

// --- Заполнение окна ---

const fillBigPicture = ({ url, description, likes, comments }) => {
  bigPictureImg.src = url;
  bigPictureImg.alt = description;

  likesCountElement.textContent = likes;
  commentsCountElement.textContent = comments.length;
  socialCaptionElement.textContent = description;

  // Сбрасываем состояние перед показом новой фотографии
  currentComments = comments;
  shownCommentsCount = 0;
  socialCommentsElement.innerHTML = '';

  // Показываем блоки счётчика и загрузчика
  socialCommentCountElement.classList.remove('hidden');
  commentsLoaderElement.classList.remove('hidden');

  // Если комментариев меньше порции — сразу прячем кнопку
  if (comments.length <= COMMENTS_PER_PORTION) {
    commentsLoaderElement.classList.add('hidden');
  }

  // Рисуем первую порцию
  renderNextCommentsPortion();
};

// --- Открытие/закрытие окна ---

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
};

const openBigPicture = (photo) => {
  fillBigPicture(photo);
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

function closeBigPicture() {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

cancelButton.addEventListener('click', closeBigPicture);

export { openBigPicture };
