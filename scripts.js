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

const WINDOW_WIDTH = document.documentElement.clientWidth;

const main = () => {
  enableTabs();
};

const enableTabs = () => {
  const todaysDate = new Date();
  const todaysDayOfTheWeek = DAYS_OF_THE_WEEK[todaysDate.getDay()];

  if (WINDOW_WIDTH < MOBILE_WIDTH_MAX_NUM_PIXELS) {
    enableTabsForMobile(todaysDayOfTheWeek);
  } else {
    enableTabsForDesktop(todaysDayOfTheWeek);
  }
};

const enableTabsForMobile = (todaysDayOfTheWeek) => {
  const dailySpecialXCoordinates = getDailySpecialXCoordinates();

  viewTabByDayOfTheWeek(todaysDayOfTheWeek, dailySpecialXCoordinates);
};

const viewTabByDayOfTheWeek = (dayOfTheWeek, dailySpecialXCoordinates) => {
  const specialsTabContent = document.getElementById("specials-tab-content");
  const position = dailySpecialXCoordinates[dayOfTheWeek];

  specialsTabContent.scrollTo(position, 0);
};

const getDailySpecialXCoordinates = () => {
  const marginLeftPixels = 8;
  const offset = marginLeftPixels / 2;

  const cardSize = WINDOW_WIDTH - marginLeftPixels;

  const dailySpecialXCoordinate = {};

  for (let index = 0; index < NUM_DAYS_IN_WEEK; index++) {
    const dayOfTheWeek = DAYS_OF_THE_WEEK[index];

    dailySpecialXCoordinate[dayOfTheWeek] = offset + cardSize * index;
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
