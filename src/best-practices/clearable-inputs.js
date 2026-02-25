const clearableInput = document.querySelector('.clearable-input input');
const clearInputButton = clearableInput.nextElementSibling;

clearableInput.addEventListener('input', () => {
  clearInputButton.classList.toggle('invisible', clearableInput.value.length === 0);
});

clearInputButton.addEventListener('click', () => {
  clearInputButton.classList.add('invisible');

  clearableInput.value = '';
  clearableInput.focus();
});
