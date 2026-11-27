// js/render-pictures.js
import { openBigPicture } from './big-picture.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

const createPicture = (photo) => {
  const { url, description, likes, comments } = photo;
  const pictureElement = pictureTemplate.cloneNode(true);

  const image = pictureElement.querySelector('.picture__img');
  image.src = url;
  image.alt = description;

  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  pictureElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture(photo); // Передаем весь объект с сервера
  });

  return pictureElement;
};

const renderPictures = (photos) => {
  // Очищаем контейнер перед отрисовкой (если вызывается повторно)
  picturesContainer.querySelectorAll('.picture').forEach((el) => el.remove());

  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    fragment.append(createPicture(photo));
  });
  picturesContainer.append(fragment);
};

export { renderPictures };
