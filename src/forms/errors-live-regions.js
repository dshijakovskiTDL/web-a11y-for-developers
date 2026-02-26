const liveRegionsForm = document.querySelector('form#live-regions');
liveRegionsForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const emailError = e.target.querySelector('[type="email"] + [aria-live]');
  const passwordError = e.target.querySelector('[type="password"] + [aria-live]');

  emailError.textContent = 'There is an email error!';
  passwordError.textContent = 'There is a password error!';
});

const summaryErrorsForm = document.querySelector('form#summary-errors');
summaryErrorsForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const errors = e.target.querySelector('[role="alert"] .errors-content');
  errors.classList.remove('hidden');
});
