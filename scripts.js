Number.prototype.mod = function (n) {
  "use strict";
  return ((this % n) + n) % n;
};

const NUM_DAYS_IN_WEEK = 7;

const DAYS_OF_THE_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const DAY_INDEX_MAP = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

const main = () => {
  enableTabs();
};

const enableTabs = () => {
  const specialsMobileNav = document.getElementById("specials-mobile-nav");
  const specialsTabGroup = document.getElementById("specials-tab-group");

  if (specialsMobileNav) {
    enableTabsForMobile();
  } else if (specialsTabGroup) {
    enableTabsForDesktop();
  } else {
    throw new Error("Unable to enable tabs for either mobile or desktop!");
  }
};

const enableTabsForMobile = () => {
  const previousDayButton = document.getElementById("previous-day-button");
  previousDayButton.onclick = () => activatePreviousSpecial();

  const nextDayButton = document.getElementById("next-day-button");
  nextDayButton.onclick = () => activateNextSpecial();
};

const activatePreviousSpecial = () => {
  const dayOfTheWeekContainer = document.getElementById("day-of-the-week");
  const currentDayOfTheWeek = dayOfTheWeekContainer.innerText;

  const currentIndex = DAY_INDEX_MAP[currentDayOfTheWeek];
  const previousIndex = (currentIndex - 1).mod(NUM_DAYS_IN_WEEK);

  const previousDayOfTheWeek = DAYS_OF_THE_WEEK[previousIndex];
  dayOfTheWeekContainer.innerText = previousDayOfTheWeek;

  hideAllTabContents();

  const tabContentId = `${previousDayOfTheWeek.toLowerCase()}-tab-content`;
  document.getElementById(tabContentId).style.display = "block";
};

const activateNextSpecial = () => {
  const dayOfTheWeekContainer = document.getElementById("day-of-the-week");
  const currentDayOfTheWeek = dayOfTheWeekContainer.innerText;

  const currentIndex = DAY_INDEX_MAP[currentDayOfTheWeek];
  const nextIndex = (currentIndex + 1).mod(NUM_DAYS_IN_WEEK);

  const nextDayOfTheWeek = DAYS_OF_THE_WEEK[nextIndex];
  dayOfTheWeekContainer.innerText = nextDayOfTheWeek;

  hideAllTabContents();

  const tabContentId = `${nextDayOfTheWeek.toLowerCase()}-tab-content`;
  document.getElementById(tabContentId).style.display = "block";
};

const enableTabsForDesktop = () => {
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
  hideAllTabContents();

  event.currentTarget.className += " active";
  document.getElementById(tabContentId).style.display = "block";
};

const deactivateAllTabButtons = () => {
  const tabButtons = document.getElementsByClassName("tab-button");
  for (const tabButton of tabButtons) {
    tabButton.className = tabButton.className.replace(" active", "");
  }
};

const hideAllTabContents = () => {
  const tabContents = document.getElementsByClassName("tab-content");
  for (const tabContent of tabContents) {
    tabContent.style.display = "none";
  }
};

main(); // code is ran here
