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

const parseTimeToMinutes = (time) => {
  const [hours, minutes] = time.split(':').map((part) => parseInt(part, 10));
  return hours * 60 + minutes;
};

const isMeetingInWorkDay = (workStart, workEnd, meetingStart, duration) => {
  const workStartMinutes = parseTimeToMinutes(workStart);
  const workEndMinutes = parseTimeToMinutes(workEnd);
  const meetingStartMinutes = parseTimeToMinutes(meetingStart);
  const meetingEndMinutes = meetingStartMinutes + duration;

  return meetingStartMinutes >= workStartMinutes
    && meetingEndMinutes <= workEndMinutes;
};

isStringLengthValid('проверка', 10);
isPalindrome('топот');
extractDigits('2023 год');
isMeetingInWorkDay('08:00', '17:30', '14:00', 90);
