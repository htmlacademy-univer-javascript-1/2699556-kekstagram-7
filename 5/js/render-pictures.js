import { photos } from './data.js';

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const picturesContainer = document.querySelector('.pictures');

const createPicture = ({ url, description, likes, comments }) => {
  const pictureElement = pictureTemplate.cloneNode(true);

  const image = pictureElement.querySelector('.picture__img');
  image.src = url;
  image.alt = description;

  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  return pictureElement;
};

const renderPictures = (items) => {
  const fragment = document.createDocumentFragment();

  items.forEach((item) => {
    fragment.append(createPicture(item));
  });

  picturesContainer.append(fragment);
};

renderPictures(photos);
