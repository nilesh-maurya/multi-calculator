const DaysInYear = 365;

const metric = {
  century: {
    name: {
      singular: "Century",
      plural: "Centuries"
    },
    to_anchor: 100 * DaysInYear * 24 * 60 * 60
  },
  decade: {
    name: {
      singular: "Decade",
      plural: "Decades"
    },
    to_anchor: 10 * DaysInYear * 24 * 60 * 60
  },
  year: {
    name: {
      singular: "Year",
      plural: "Years"
    },
    to_anchor: DaysInYear * 24 * 60 * 60
  },
  month: {
    name: {
      singular: "Month",
      plural: "Months"
    },
    to_anchor: (DaysInYear / 12) * 24 * 60 * 60
  },
  week: {
    name: {
      singular: "Week",
      plural: "Weeks"
    },
    to_anchor: 7 * 24 * 60 * 60
  },
  day: {
    name: {
      singular: "Day",
      plural: "Days"
    },
    to_anchor: 24 * 60 * 60
  },
  hour: {
    name: {
      singular: "Hour",
      plural: "Hours"
    },
    to_anchor: 60 * 60
  },
  minute: {
    name: {
      singular: "minute",
      plural: "minutes"
    },
    to_anchor: 60
  },
  s: {
    name: {
      singular: "Second",
      plural: "Seconds"
    },
    to_anchor: 1
  },
  ms: {
    name: {
      singular: "Millisecond",
      plural: "Milliseconds"
    },
    to_anchor: 1 / 1000
  },
  us: {
    name: {
      singular: "Microsecond",
      plural: "Microseconds"
    },
    to_anchor: 1 / 1000000
  },
  ns: {
    name: {
      singular: "Nanosecond",
      plural: "Nanoseconds"
    },
    to_anchor: 1 / Math.pow(10, 9)
  },
  ps: {
    name: {
      singular: "Picosecond",
      plural: "Picoseconds"
    },
    to_anchor: 1 / Math.pow(10, 12)
  }
};

const time = {
  metric: metric,
  _anchors: {
    metric: {
      unit: "s",
      ratio: 1
    }
  }
};

export default time;
