Number.prototype.mod = function (n) {
  "use strict";
  return ((this % n) + n) % n;
};

const MOBILE_WIDTH_MAX_NUM_PIXELS = 480;

const NUM_DAYS_IN_WEEK = 7;

const SYSTEM_DAYS_OF_THE_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const DISPLAYED_DAYS_OF_THE_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const DAY_INDEX_MAP = {
  Monday: 0,
  Tuesday: 1,
  Wednesday: 2,
  Thursday: 3,
  Friday: 4,
  Saturday: 5,
  Sunday: 6,
};

const DAILY_SPECIAL_MARGIN_PIXELS = 8;
const WINDOW_WIDTH = document.documentElement.clientWidth;
const DAILY_SPECIAL_SCROLL_AMOUNT = WINDOW_WIDTH - DAILY_SPECIAL_MARGIN_PIXELS;

const main = () => {
  enableTabs();
};

const enableTabs = () => {
  const todaysDate = new Date();
  const todaysDayOfTheWeek = SYSTEM_DAYS_OF_THE_WEEK[todaysDate.getDay()];

  if (WINDOW_WIDTH < MOBILE_WIDTH_MAX_NUM_PIXELS) {
    enableTabsForMobile(todaysDayOfTheWeek);
  } else {
    enableTabsForDesktop(todaysDayOfTheWeek);
  }
};

const enableTabsForMobile = (todaysDayOfTheWeek) => {
  const specialsTabContent = document.getElementById("specials-tab-content");

  const previousDayButtons = document.getElementsByClassName(
    "previous-day-button"
  );

  for (const previousDayButton of previousDayButtons) {
    previousDayButton.onclick = () => scrollLeftMobile(specialsTabContent);
  }

  const nextDayButtons = document.getElementsByClassName("next-day-button");

  for (const nextDayButton of nextDayButtons) {
    nextDayButton.onclick = () => scrollRightMobile(specialsTabContent);
  }

  const dailySpecialXCoordinates = getDailySpecialXCoordinates();
  const position = dailySpecialXCoordinates[todaysDayOfTheWeek];

  specialsTabContent.scrollTo(position, 0);
};

const scrollLeftMobile = (element) => {
  element.scrollBy(-DAILY_SPECIAL_SCROLL_AMOUNT, 0);
};

const scrollRightMobile = (element) => {
  element.scrollBy(DAILY_SPECIAL_SCROLL_AMOUNT, 0);
};

const getDailySpecialXCoordinates = () => {
  const offset = DAILY_SPECIAL_MARGIN_PIXELS / 2;
  const dailySpecialXCoordinate = {};

  for (let index = 0; index < NUM_DAYS_IN_WEEK; index++) {
    const dayOfTheWeek = DISPLAYED_DAYS_OF_THE_WEEK[index];

    dailySpecialXCoordinate[dayOfTheWeek] =
      offset + DAILY_SPECIAL_SCROLL_AMOUNT * index;
  }

  return dailySpecialXCoordinate;
};

const enableTabsForDesktop = (todaysDayOfTheWeek) => {
  const tabButtons = document.getElementsByClassName("tab-button");
  for (const tabButton of tabButtons) {
    const tabContentId = tabButton.id.replace("button", "content");
    tabButton.onclick = (event) => openTabById(event, tabContentId);
  }

  deactivateAllTabButtons();
  hideAllTabContents();

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
