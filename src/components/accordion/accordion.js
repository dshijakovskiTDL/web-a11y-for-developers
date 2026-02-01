const accordions = document.querySelectorAll('.accordion');

accordions.forEach((accordion) => {
  const triggerButton = accordion.querySelector('.trigger');

  triggerButton?.addEventListener('click', () => {
    toggleAccordion(triggerButton);
  });
});

function toggleAccordion(trigger) {
  const isOpen = trigger.getAttribute('aria-expanded') === 'true';
  trigger.setAttribute('aria-expanded', String(!isOpen));
}
