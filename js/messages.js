// js/messages.js

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const onEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideMessage();
  }
};

const onDocumentClick = (evt) => {
  // Закрываем, если клик был вне блока сообщения
  if (!evt.target.closest('.success__inner') && !evt.target.closest('.error__inner')) {
    hideMessage();
  }
};

const onCloseButtonClick = () => hideMessage();

function hideMessage() {
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  if (messageElement) {
    messageElement.remove();
  }
  document.removeEventListener('keydown', onEscKeydown);
  document.removeEventListener('click', onDocumentClick);
}

const showMessage = (template) => {
  const element = template.cloneNode(true);
  document.body.append(element);
  const closeBtn = element.querySelector('button');
  closeBtn.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onEscKeydown);
  document.addEventListener('click', onDocumentClick);
};

export const showSuccessMessage = () => showMessage(successTemplate);
export const showErrorMessage = () => showMessage(errorTemplate);
