// Set up homework toggles
const homeworkToggles = document.querySelectorAll('[hw-toggle]');
homeworkToggles.forEach((toggle) => {
  const homeworkId = toggle.getAttribute('hw-toggle');
  const homework = document.getElementById(homeworkId);

  const homeworkRevealed = !!sessionStorage.getItem(homeworkId);

  homework.hidden = !homeworkRevealed;
  toggle.hidden = homeworkRevealed;

  toggle.addEventListener('click', () => {
    homework.hidden = false;
    toggle.hidden = true;
    homework.querySelector('input')?.focus();

    sessionStorage.setItem(homeworkId, true);
  });
});

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

const loadingSuccessForm = document.querySelector('form#loading-success');
loadingSuccessForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const spinner = e.target.querySelector('.loading[aria-live="polite"] .spinner');
  const success = e.target.querySelector('.success[aria-live="polite"]');

  const submitBtn = e.target.querySelector('button[type="submit"]');

  submitBtn.disabled = true;
  spinner.classList.remove('hidden');
  success.textContent = '';

  setTimeout(() => {
    submitBtn.disabled = false;
    spinner.classList.add('hidden');
    success.textContent = 'Welcome to your dashboard!';
  }, 3000);
});

const autocompleteForm = document.querySelector('form#autocomplete');
autocompleteForm.addEventListener('submit', (e) => {
  e.preventDefault();
});
