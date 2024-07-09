Number.prototype.mod = function (n) {
  "use strict";
  return ((this % n) + n) % n;
};

const MOBILE_WIDTH_MAX_NUM_PIXELS = 480;

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
  const todaysDate = new Date();
  const todaysDayOfTheWeek = DAYS_OF_THE_WEEK[todaysDate.getDay()];

  if (screen.width < MOBILE_WIDTH_MAX_NUM_PIXELS) {
    enableTabsForMobile(todaysDayOfTheWeek);
  } else {
    enableTabsForDesktop(todaysDayOfTheWeek);
  }
};

const enableTabsForMobile = (todaysDayOfTheWeek) => {
  const previousDayButton = document.getElementById("previous-day-button");
  if (previousDayButton) {
    previousDayButton.onclick = () => activatePreviousSpecial();
  }

  const nextDayButton = document.getElementById("next-day-button");
  if (nextDayButton) {
    nextDayButton.onclick = () => activateNextSpecial();
  }

  const dayOfTheWeekContainer = document.getElementById("day-of-the-week");
  if (dayOfTheWeekContainer) {
    dayOfTheWeekContainer.innerText = todaysDayOfTheWeek;
  }

  openTabByDayOfTheWeek(todaysDayOfTheWeek);
};

const activatePreviousSpecial = () => {
  const dayOfTheWeekContainer = document.getElementById("day-of-the-week");
  const currentDayOfTheWeek = dayOfTheWeekContainer.innerText;

  const currentIndex = DAY_INDEX_MAP[currentDayOfTheWeek];
  const previousIndex = (currentIndex - 1).mod(NUM_DAYS_IN_WEEK);

  const previousDayOfTheWeek = DAYS_OF_THE_WEEK[previousIndex];
  dayOfTheWeekContainer.innerText = previousDayOfTheWeek;

  openTabByDayOfTheWeek(previousDayOfTheWeek);
};

const activateNextSpecial = () => {
  const dayOfTheWeekContainer = document.getElementById("day-of-the-week");
  const currentDayOfTheWeek = dayOfTheWeekContainer.innerText;

  const currentIndex = DAY_INDEX_MAP[currentDayOfTheWeek];
  const nextIndex = (currentIndex + 1).mod(NUM_DAYS_IN_WEEK);

  const nextDayOfTheWeek = DAYS_OF_THE_WEEK[nextIndex];
  dayOfTheWeekContainer.innerText = nextDayOfTheWeek;

  openTabByDayOfTheWeek(nextDayOfTheWeek);
};

const openTabByDayOfTheWeek = (dayOfTheWeek) => {
  hideAllTabContents();

  const tabContentId = `${dayOfTheWeek.toLowerCase()}-tab-content`;
  const tabContent = document.getElementById(tabContentId);

  if (tabContent) {
    tabContent.style.display = "block";
  }
};

const enableTabsForDesktop = (todaysDayOfTheWeek) => {
  const tabButtons = document.getElementsByClassName("tab-button");
  for (const tabButton of tabButtons) {
    const tabContentId = tabButton.id.replace("button", "content");
    tabButton.onclick = (event) => openTabById(event, tabContentId);
  }

  const todaysTabButtonId = `${todaysDayOfTheWeek.toLowerCase()}-tab-button`;
  const todaysTabButton = document.getElementById(todaysTabButtonId);

  if (todaysTabButton) {
    todaysTabButton.click();
  }
};

const openTabById = (event, tabContentId) => {
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
