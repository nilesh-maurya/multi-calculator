import moment from "moment";

// find how many days until next birthday
export function getNextBirthday(start, end) {
  let new_start = end.slice(0);
  let new_end = start.slice(0);

  new_end[0] = new_start[0];

  const check =
    new_start[1] > new_end[1] ||
    (new_start[1] === new_end[1] && new_start[2] === new_end[2]) ||
    (new_start[1] === new_end[1] && new_start[2] > new_end[2]);

  if (check) {
    new_end[0] = new_start[0] + 1;
  }

  const temp_next_date = [new_start, new_end];

  new_start = new Date(new_start[0], new_start[1], new_start[2]);
  new_end = new Date(new_end[0], new_end[1], new_end[2]);

  const next_summary = getSummary(new_start, new_end);

  const next = {};

  next.weekday = moment(new_end).format("dddd");

  if (next_summary.month !== 12) {
    next.month = next_summary.month - next_summary.year * 12;
  } else {
    next.month = 12;
  }

  next.day = findDay(temp_next_date[0], temp_next_date[1]);

  return next;
}

// returns total year, month, etc from start date to end date
export function getSummary(start, end) {
  const startMoment = moment(start);
  const endMoment = moment(end);

  const summary = {};

  summary.year = Math.abs(endMoment.diff(startMoment, "year"));
  summary.month = Math.abs(endMoment.diff(startMoment, "month"));
  summary.week = Math.abs(endMoment.diff(startMoment, "week"));
  summary.day = Math.abs(endMoment.diff(startMoment, "day"));
  summary.hour = Math.abs(endMoment.diff(startMoment, "hour"));
  summary.minute = Math.abs(endMoment.diff(startMoment, "minute"));

  return summary;
}

export function findDay(start, end) {
  const start_date = start[2];
  let start_month = start[1] + 1;
  // const start_year = start[0];
  const end_date = end[2];
  let end_month = end[1] + 1;
  const end_year = end[0];

  const months = {
    Jan: 31,
    Feb: 0,
    Mar: 31,
    Apr: 30,
    May: 31,
    Jun: 30,
    Jul: 31,
    Aug: 31,
    Sept: 30,
    Oct: 31,
    Nov: 30,
    Dec: 31
  };

  if (leapYear(end_year)) {
    months["Feb"] = 29;
  } else {
    months["Feb"] = 28;
  }

  const monthKeys = Object.keys(months);

  if (start_date > end_date) {
    start_month = end_month - 1;
    if (start_month === 0) {
      start_month = 12;
    }
    const currentMonth = monthKeys[start_month - 1];
    return end_date + (months[currentMonth] - start_date);
  }

  return end_date - start_date;
}

function leapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
