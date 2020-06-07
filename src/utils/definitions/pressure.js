const metric = {
  Pa: {
    name: {
      singular: "pascal",
      plural: "pascals"
    },
    to_anchor: 1 / 1000
  },
  kPa: {
    name: {
      singular: "kilopascal",
      plural: "kilopascals"
    },
    to_anchor: 1
  },
  MPa: {
    name: {
      singular: "megapascal",
      plural: "megapascals"
    },
    to_anchor: 1000
  },
  hPa: {
    name: {
      singular: "hectopascal",
      plural: "hectopascals"
    },
    to_anchor: 1 / 10
  },
  bar: {
    name: {
      singular: "bar",
      plural: "bar"
    },
    to_anchor: 100
  },
  torr: {
    name: {
      singular: "torr",
      plural: "torr"
    },
    to_anchor: 101325 / 760000
  },
  atm: {
    name: {
      singular: "Atmosphere",
      plural: "Atmospheres"
    },
    to_anchor: 101.325
  }
};

const pressure = {
  metric: metric,
  _anchors: {
    metric: {
      unit: "kPa",
      ratio: 1
    }
  }
};

export default pressure;
