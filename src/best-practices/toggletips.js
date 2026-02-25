const toggletips = document.querySelectorAll('[data-toggletip]');

toggletips.forEach((toggletip) => {
  const liveRegion = toggletip.querySelector('[role="status"]');
  const content = toggletip.getAttribute('data-toggletip');

  toggletip.addEventListener('click', (e) => {
    liveRegion.textContent = e.target === toggletip ? content : '';
  });

  toggletip.addEventListener('blur', () => {
    liveRegion.textContent = '';
  });
});
