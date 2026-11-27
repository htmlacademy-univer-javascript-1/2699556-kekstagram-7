export const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
};

export const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

export const shuffleArray = (elements) => {
  const result = elements.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = getRandomInteger(0, i);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};
