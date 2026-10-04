const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImg = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const commentsCountElement = bigPictureElement.querySelector('.comments-count');
const socialCaptionElement = bigPictureElement.querySelector('.social__caption');
const socialCommentsElement = bigPictureElement.querySelector('.social__comments');
const socialCommentCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const cancelButton = bigPictureElement.querySelector('.big-picture__cancel');

// Создание одного комментария по требуемой разметке
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

// Заполнение окна данными конкретной фотографии
const fillBigPicture = ({ url, description, likes, comments }) => {
  bigPictureImg.src = url;
  bigPictureImg.alt = description;

  likesCountElement.textContent = likes;
  commentsCountElement.textContent = comments.length;
  socialCaptionElement.textContent = description;

  // Перерисовываем список комментариев
  socialCommentsElement.innerHTML = '';
  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    fragment.append(createCommentElement(comment));
  });
  socialCommentsElement.append(fragment);

  // По заданию: прячем счётчик и кнопку загрузки
  socialCommentCountElement.classList.add('hidden');
  commentsLoaderElement.classList.add('hidden');
};

// Закрытие по Escape
const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
};

// Открытие окна
const openBigPicture = (photo) => {
  fillBigPicture(photo);
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

// Закрытие окна
function closeBigPicture() {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
}

cancelButton.addEventListener('click', closeBigPicture);

export { openBigPicture };
