// Add the missing functionality needed to have disabled and animating Tabs

const tabLists = document.querySelectorAll('[role="tablist"]');

tabLists.forEach((tabList) => {
  const tabs = Array.from(tabList.querySelectorAll('[role="tab"]'));

  // Make sure disabled tabs have a correct tabIndex - just in case
  tabs.forEach((tab) => {
    if (tab.disabled) {
      tab.setAttribute('tabindex', '-1');
    }
  });

  // Use event delegation - no need for a click listener on every Tab
  tabList.addEventListener('click', (e) => {
    const tab = e.target.closest('[role="tab"]');
    if (!tab || tab.disabled) return;

    toggleTab(tab, tabs);
  });

  tabList.addEventListener('keydown', (e) => {
    const currentTab = e.target.closest('[role="tab"]');
    if (!tabs.includes(currentTab)) return;

    const enabledTabs = tabs.filter((tab) => !tab.disabled);
    const currentIdx = enabledTabs.indexOf(currentTab);

    if (currentIdx === -1) return;

    let newIdx;

    if (e.key === 'ArrowRight') {
      newIdx = (currentIdx + 1) % enabledTabs.length;
    } else if (e.key === 'ArrowLeft') {
      newIdx = (currentIdx - 1 + enabledTabs.length) % enabledTabs.length;
    } else {
      return;
    }

    enabledTabs[currentIdx].setAttribute('tabindex', '-1');
    enabledTabs[newIdx].setAttribute('tabindex', '0');
    enabledTabs[newIdx].focus();

    e.preventDefault();
  });
});

function toggleTab(targetTab, allTabs) {
  allTabs.forEach((tab) => {
    if (tab.disabled) return;

    const active = tab === targetTab;
    tab.setAttribute('aria-selected', String(active));
    tab.setAttribute('tabIndex', active ? '0' : '-1');

    // ? Toggle the corresponding tab panel
    const panelId = tab.getAttribute('aria-controls');
    const panel = document.getElementById(panelId);

    panel?.classList.toggle('invisible', !active);
  });
}
