// Add the missing functionality needed to have only 1 Accordion open at a time
const accordionGroups = document.querySelectorAll('.accordion-group');

accordionGroups.forEach((accordionGroup) => {
  const triggerButtons = accordionGroup.querySelectorAll('.trigger');

  triggerButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      triggerButtons.forEach((trigger) => {
        if (e.target === trigger) {
          toggleAccordion(trigger);
        } else {
          trigger.setAttribute('aria-expanded', 'false');
        }
      });
    });
  });
});

function toggleAccordion(trigger) {
  const isOpen = trigger.getAttribute('aria-expanded') === 'true';
  trigger.setAttribute('aria-expanded', String(!isOpen));
}
