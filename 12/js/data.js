import {
  getRandomInteger,
  getRandomArrayElement,
  shuffleArray,
} from './util.js';

const DESCRIPTIONS = [
  'Отдых на берегу моря',
  'Закат над океаном',
  'Прогулка по пляжу',
  'Вкусный обед',
  'Поездка на природу',
  'Встреча с друзьями',
  'Утро в горах',
  'Городские огни',
  'Домашний уют',
  'Путешествие мечты',
  'Любимый питомец',
  'Спортивные выходные',
  'Концерт вживую',
  'Уютный вечер',
  'Летний пикник',
  'Зимние каникулы',
  'Кофе с утра',
  'Прогулка по парку',
  'Новый рецепт',
  'Забавный случай',
  'Красивый вид из окна',
  'Пляжный волейбол',
  'Автомобильная прогулка',
  'Семейный ужин',
  'Фотосессия на закате',
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Артём',
  'Мария',
  'Иван',
  'Ольга',
  'Дмитрий',
  'Анна',
  'Сергей',
  'Екатерина',
  'Никита',
  'Полина',
];

let commentIdCounter = 1;

const createComment = () => {
  const sentencesCount = getRandomInteger(1, 2);
  const usedIndexes = [];

  while (usedIndexes.length < sentencesCount) {
    const index = getRandomInteger(0, COMMENTS.length - 1);
    if (!usedIndexes.includes(index)) {
      usedIndexes.push(index);
    }
  }

  const message = usedIndexes.map((i) => COMMENTS[i]).join(' ');

  return {
    id: commentIdCounter++,
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message,
    name: getRandomArrayElement(NAMES),
  };
};

const createPhoto = (id) => {
  const commentsCount = getRandomInteger(0, 30);
  const comments = Array.from({ length: commentsCount }, createComment);

  return {
    id,
    url: `photos/${id}.jpg`,
    description: DESCRIPTIONS[id - 1],
    likes: getRandomInteger(15, 200),
    comments,
  };
};

const createPhotos = () => {
  const ids = shuffleArray(
    Array.from({ length: 25 }, (_, i) => i + 1)
  );

  return ids.map((id) => createPhoto(id));
};

export const photos = createPhotos();
