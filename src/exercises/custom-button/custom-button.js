// Add the proper click event handlers to the custom button

const customButtons = document.querySelectorAll('div[role="button"]');

const onClick = () => alert('The custom button is working!');

customButtons.forEach((button) => {
  button.addEventListener('click', onClick);

  button.addEventListener('keyup', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      onClick();
    }
  });
});
