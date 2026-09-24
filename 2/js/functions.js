const isStringLengthValid = (string, maxLength) => string.length <= maxLength;

const isPalindrome = (string) => {
  const normalized = string.toLowerCase().replaceAll(' ', '');
  let reversed = '';

  for (let i = normalized.length - 1; i >= 0; i--) {
    reversed += normalized[i];
  }

  return normalized === reversed;
};

console.log(isStringLengthValid('проверяемая строка', 20)); // true
console.log(isStringLengthValid('проверяемая строка', 18)); // true
console.log(isStringLengthValid('проверяемая строка', 10)); // false

console.log(isPalindrome('топот'));                      // true
console.log(isPalindrome('ДовОд'));                      // true
console.log(isPalindrome('Кекс'));                       // false
console.log(isPalindrome('Лёша на полке клопа нашёл ')); // true


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

console.log(extractDigits('2023 год'));            // 2023
console.log(extractDigits('ECMAScript 2022'));     // 2022
console.log(extractDigits('1 кефир, 0.5 батона')); // 105
console.log(extractDigits('агент 007'));           // 7
console.log(extractDigits('а я томат'));           // NaN

console.log(extractDigits(2023)); // 2023
console.log(extractDigits(-1));   // 1
console.log(extractDigits(1.5));  // 15
