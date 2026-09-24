const isStringLengthValid = (string, maxLength) => string.length <= maxLength;

const isPalindrome = (string) => {
  const normalized = string.toLowerCase().replaceAll(' ', '');
  let reversed = '';

  for (let i = normalized.length - 1; i >= 0; i--) {
    reversed += normalized[i];
  }

  return normalized === reversed;
};

const extractDigits = (value) => {
  const string = value.toString();
  let digits = '';

  for (let i = 0; i < string.length; i++) {
    const symbol = parseInt(string[i], 10);
    if (!Number.isNaN(symbol)) {
      digits += string[i];
    }
  }

  return parseInt(digits, 10);
};

export { isStringLengthValid, isPalindrome, extractDigits };
