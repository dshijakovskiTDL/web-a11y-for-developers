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
