// Add the appropriate form validation such that the form does not allow:
//  - Empty "email" or "password" fields
//  - Emails that don't conform to the following RegEx pattern: https://uibakery.io/regex-library/email#:~:text=be%20IP%20address.-,/%5E%5Ba%2Dz0%2D9!%23%24%25%26%27*%2B/%3D%3F%5E_%60%7B%7C%7D~%2D%5D%2B(%3F%3A%5C.%5Ba%2Dz0%2D9!%23%24%25%26%27*%2B/%3D%3F%5E_%60%7B%7C%7D~%2D%5D%2B)*%40(%3F%3A%5Ba%2Dz0%2D9%5D(%3F%3A%5Ba%2Dz0%2D9%2D%5D*%5Ba%2Dz0%2D9%5D)%3F%5C.)%2B%5Ba%2Dz0%2D9%5D(%3F%3A%5Ba%2Dz0%2D9%2D%5D*%5Ba%2Dz0%2D9%5D)%3F%24/,-Test%20it!
//  - Emails that are not of the "company-domain.com" domain
//  - Passwords that contain less than 12 characters

const form = document.querySelector('#hw-2 form');

const emailInput = form.querySelector('input#hw-email');
const passwordInput = form.querySelector('input#hw-pwd');

const emailErrorRegion = form.querySelector('#hw-email-error');
const passwordErrorRegion = form.querySelector('#hw-pwd-error');
const successRegion = form.querySelector('#hw-success');

const EMAIL_REGEX =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const EMAIL_VALID_DOMAIN = 'company-domain.com';
const MIN_PASSWORD_LENGTH = 12;

form.addEventListener('submit', (e) => {
  e.preventDefault();

  emailErrorRegion.textContent = '';
  passwordErrorRegion.textContent = '';
  successRegion.textContent = '';

  const formData = new FormData(e.target);
  const email = formData.get('email') || '';
  const password = formData.get('pwd') || '';
  const emailDomain = email.split('@').pop();

  // Email validation
  if (email.trim().length === 0) {
    emailErrorRegion.textContent = 'Email cannot be empty!';
  } else if (!EMAIL_REGEX.test(email)) {
    emailErrorRegion.textContent = 'Please enter a valid email!';
  } else if (emailDomain !== EMAIL_VALID_DOMAIN) {
    emailErrorRegion.textContent = 'Company domain is unauthorized!';
  }

  // Password validation
  if (password.trim().length === 0) {
    passwordErrorRegion.textContent = 'Password cannot be empty!';
  } else if (password.length < MIN_PASSWORD_LENGTH) {
    passwordErrorRegion.textContent = `Password must have at least ${MIN_PASSWORD_LENGTH} characters!`;
  }

  emailInput.setAttribute('aria-invalid', String(!!emailErrorRegion.textContent));
  passwordInput.setAttribute('aria-invalid', String(!!passwordErrorRegion.textContent));

  if (emailErrorRegion.textContent || passwordErrorRegion.textContent) {
    return;
  }

  // Success scenario
  successRegion.textContent = 'Welcome to the Company portal!';
  form.reset();
});
