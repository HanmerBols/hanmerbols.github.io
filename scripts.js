const main = () => {
  enableTabs();
};

const enableTabs = () => {
  const tabButtons = document.getElementsByClassName("tab-button");
  for (const tabButton of tabButtons) {
    const tabContentId = tabButton.id.replace("button", "content");
    tabButton.onclick = (event) => openTab(event, tabContentId);
  }

  const defaultOpenTabs = document.getElementsByClassName("default-open");
  if (defaultOpenTabs.length > 0) {
    defaultOpenTabs[0].click();
  }
};

const openTab = (event, tabContentId) => {
  deactivateAllTabButtons();
  hideAllTabs();

  event.currentTarget.className += " active";
  document.getElementById(tabContentId).style.display = "block";
  scrollToTop();
};

const deactivateAllTabButtons = () => {
  const tabButtons = document.getElementsByClassName("tab-button");
  for (const tabButton of tabButtons) {
    tabButton.className = tabButton.className.replace(" active", "");
  }
};

const hideAllTabs = () => {
  const tabContents = document.getElementsByClassName("tab-content");
  for (const tabContent of tabContents) {
    tabContent.style.display = "none";
  }
};

main(); // code is ran here
