const nativeTriggers = document.querySelectorAll('[aria-haspopup="dialog"][data-native-modal]');

nativeTriggers.forEach((trigger) => {
  const modalId = trigger.getAttribute('data-native-modal');
  const nativeModal = document.getElementById(modalId);
  const closeButtons = nativeModal.querySelectorAll('[data-dismiss]');

  closeButtons.forEach((closeButton) => {
    closeButton.addEventListener('click', () => nativeModal.close());
  });

  trigger.addEventListener('click', () => nativeModal.showModal());
});
