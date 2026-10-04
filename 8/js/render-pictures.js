import { photos } from './data.js';
import { openBigPicture } from './big-picture.js';

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

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
    openBigPicture(photo);
  });

  return pictureElement;
};

const renderPictures = (items) => {
  const fragment = document.createDocumentFragment();
  items.forEach((item) => fragment.append(createPicture(item)));
  picturesContainer.append(fragment);
};

export { renderPictures };

renderPictures(photos);
