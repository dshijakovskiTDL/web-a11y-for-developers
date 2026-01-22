const tabLists = document.querySelectorAll('[role="tablist"]');

tabLists.forEach((tabList) => {
  const tabs = tabList.querySelectorAll('[role="tab"]');

  tabs.forEach((currentTab, idx) => {
    currentTab.addEventListener('click', () => {
      // ? Go through each tab and toggle it appropriately
      tabs.forEach((tab) => {
        toggleTab(tab, tab === currentTab);
      });
    });

    currentTab.addEventListener('keydown', (e) => {
      let newIdx;

      if (e.key === 'ArrowRight') {
        newIdx = (idx + 1) % tabs.length;
      } else if (e.key === 'ArrowLeft') {
        newIdx = (idx - 1 + tabs.length) % tabs.length;
      } else {
        return;
      }

      tabs[idx].setAttribute('tabindex', '-1');

      tabs[newIdx].setAttribute('tabindex', '0');
      tabs[newIdx].focus();

      e.preventDefault();
    });
  });
});

function toggleTab(tab, active) {
  tab.setAttribute('aria-selected', String(active));
  tab.setAttribute('tabindex', active ? '0' : '-1');

  if (active) tab.focus();

  // ? Toggle the corresponding tab panel
  const panel = document.getElementById(tab.getAttribute('aria-controls'));
  panel.classList.toggle('hidden', !active);
}
