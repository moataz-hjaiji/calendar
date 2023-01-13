let Month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let monthShortcut = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let dayweek = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
let dayweek2 = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
// Month Selected
let year = new Date().getFullYear();
let month = new Date().getMonth();
let date = new Date().getDate();
let currentDate = new Date(year, month, date);
let dateSelect = document.querySelector(".dateselect");
let monthYearCalendar = document.querySelector(".monthyear");
// select div with .daydate
let calendarDay = document.querySelectorAll(".daydate");
// update current Month
updateCalendar(year, month, date);

//Next / previous Month
let prevMonth = document.querySelector("#prevmonth");
let nextMonth = document.querySelector("#nextmonth");
// Update Next Month
nextMonth.addEventListener("click", () => {
  month++;
  if (month > 11) {
    year++;
    month = 0;
  }
  //currentDate = new Date(year, month, date= 0 tO return to first day in month);

  calendarDay.forEach((e) => {
    e.classList.remove("clicked");
    e.classList.remove("current-day");
  });
  updateCalendar(year, month, 0);
});
// Previous Month
prevMonth.addEventListener("click", () => {
  month--;
  if (month < 0) {
    year--;
    month = 11;
  }

  //currentDate = new Date(year, month, 0);

  calendarDay.forEach((e) => {
    e.classList.remove("clicked");
    e.classList.remove("current-day");
  });
  updateCalendar(year, month, 0);
});
//

function updateCalendar(year, month, date) {
  //remove class from excluded the dar in other month
  calendarDay.forEach((e) => {
    e.classList.remove("excluded");
  });
  // display month in calendar in .dateselect
  /*dateSelect.innerHTML = `${monthShortcut[month]} ${
    date === 0 ? 1 : date
  }, ${year}`;*/
  dateSelect.value = `${monthShortcut[month]} ${
    date === 0 ? 1 : date
  }, ${year}`;
  // display year and month in calendar
  monthYearCalendar.innerHTML = `${Month[month]}, ${year}`;

  let daystartMonth = new Date(year, month, 1).getDay();

  indexMondayStartMonth = daystartMonth === 0 ? 6 : daystartMonth - 1;
  for (let i = 0; i < daysInMonth(month, year); i++) {
    // console.log(indexMondayStartMonth);
    calendarDay[i + indexMondayStartMonth].innerHTML = i + 1;
  }
  // before day1 in month
  let m = 0;
  for (let j = indexMondayStartMonth - 1; j >= 0; j--) {
    let prevmonth = month - 1 == -1 ? 11 : month - 1;
    calendarDay[j].innerHTML = daysInMonth(prevmonth, year) - m;
    m++;
    calendarDay[j].classList.add("excluded");
  }
  // after day 1 in month
  let dayOneAfter = indexMondayStartMonth + daysInMonth(month, year);

  let range =
    calendarDay.length - (indexMondayStartMonth + daysInMonth(month, year));
  for (let j = 0; j < range; j++) {
    calendarDay[j + dayOneAfter].innerHTML = j + 1;
    calendarDay[j + dayOneAfter].classList.add("excluded");
  }
  // select current Day in Month
  calendarDay.forEach((e) => {
    if (
      e.innerHTML == new Date().getDate() &&
      month == new Date().getMonth() &&
      year == new Date().getFullYear()
    ) {
      e.classList.add("current-day");
    }
  });
}
// function to calculate Leap year or not
function leapYear(year) {
  if ((0 == year % 4 && 0 != year % 100) || 0 == year % 400) {
    return 29;
  } else {
    return 28;
  }
}
// function to find number of days in month
function daysInMonth(N, year) {
  N++;
  if (N == 1 || N == 3 || N == 5 || N == 7 || N == 8 || N == 10 || N == 12) {
    return 31;
  } // Check for 30 Days
  else if (N == 4 || N == 6 || N == 9 || N == 11) {
    return 30;
  } // Check for 28/29 Days
  else if (N == 2) {
    return leapYear(year);
  }
}
//day clicked
calendarDay.forEach((e) => {
  e.addEventListener("click", (e) => {
    calendarDay.forEach((e) => {
      e.classList.remove("clicked");
    });
    e.target.classList.add("clicked");
    //dateSelect.innerHTML = `${monthShortcut[month]} ${e.target.innerHTML}, ${year}`;
    dateSelect.value = `${monthShortcut[month]} ${e.target.innerHTML}, ${year}`;
  });
});
dateSelect.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    let regexdate = /\d{2}|\d[^\d{4}]/gi;
    let regexyear = /\d{4}/gi;
    let regexmonth = /\w{3}[^\d{4}]/gi;
    test = dateSelect.value;
    // console.log(test.match(regexdate));
    // console.log(test.match(regexyear));
    console.log(test.match(regexmonth));
    let year = test.match(regexyear)[0];
    let month = test.match(regexmonth)[0];
    let date = test.match(regexdate)[0];
    month = month.slice(0, month.length - 1);
    const Month = month.charAt(0).toUpperCase() + month.slice(1, month.length);

    updateCalendar(
      parseInt(year),
      monthShortcut.indexOf(Month),
      parseInt(date.slice(0, date.length - 1))
    );
    calendarDay.forEach((e) => {
      e.classList.remove("clicked");
      e.classList.remove("current-day");
    });
  }
});
