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
