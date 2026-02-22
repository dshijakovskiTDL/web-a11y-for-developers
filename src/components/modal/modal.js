const modalTriggers = document.querySelectorAll('[data-modal]');

window.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;

  const openBackdrop = document.querySelector('.modal-backdrop:not(.hidden)');
  if (!openBackdrop) return;

  const modalId = openBackdrop.firstElementChild.id;
  const activeTrigger = document.querySelector(`[data-modal="${modalId}"]`);

  e.preventDefault();
  toggleModal(activeTrigger, false);
});

modalTriggers.forEach((trigger) => {
  // ? Setup Modal trigger buttons
  trigger.addEventListener('click', () => toggleModal(trigger, true));

  const backdrop = getBackdrop(trigger);
  if (!backdrop) return;

  // ? Setup click-away listener
  backdrop.addEventListener('click', (e) => {
    if (e.target !== backdrop) return;

    e.preventDefault();
    toggleModal(trigger, false);
  });

  // ? Setup focus trapping
  const modal = backdrop.firstElementChild;

  modal.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;

    const focusables = getFocusables(modal);
    const firstFocusable = focusables[0];
    const lastFocusable = focusables[focusables.length - 1];

    if (e.shiftKey) {
      // Going backward
      if (e.target === firstFocusable) {
        // Move focus to last focusable element
        e.preventDefault();
        lastFocusable.focus();
      }
    } else {
      // Going forward
      if (e.target === lastFocusable) {
        // Move focus to first focusable element
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  });

  const closeButtons = backdrop.querySelectorAll('[data-dismiss]');

  // ? Setup Modal close buttons
  closeButtons.forEach((closeButton) => {
    closeButton.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleModal(trigger, false);
    });
  });
});

function getBackdrop(trigger) {
  const modal = document.getElementById(trigger.getAttribute('data-modal'));
  return modal?.closest('.modal-backdrop');
}

function toggleModal(trigger, open) {
  const backdrop = getBackdrop(trigger);
  if (!backdrop) return;

  backdrop.classList.toggle('hidden', !open);

  if (open) {
    backdrop.firstElementChild?.focus();
  } else {
    trigger.focus();
  }
}

function getFocusables(container) {
  return container.querySelectorAll(
    'a[href], area[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable], audio[controls], video[controls], summary, [tabindex^="0"], [tabindex^="1"], [tabindex^="2"], [tabindex^="3"], [tabindex^="4"], [tabindex^="5"], [tabindex^="6"], [tabindex^="7"], [tabindex^="8"], [tabindex^="9"]',
  );
}
