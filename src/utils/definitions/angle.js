const angle = {
  rad: {
    name: {
      singular: "Radian",
      plural: "Radians"
    },
    to_anchor: 180 / Math.PI
  },
  deg: {
    name: {
      singular: "Degree",
      plural: "Degrees"
    },
    to_anchor: 1
  },
  grad: {
    name: {
      singular: "Gradian",
      plural: "Gradians"
    },
    to_anchor: 9 / 10
  },
  arcmin: {
    name: {
      singular: "Minute of arc",
      plural: ""
    },
    to_anchor: 1 / 60
  },
  arcsec: {
    name: {
      singular: "Second of arc",
      plural: ""
    },
    to_anchor: 1 / 3600
  }
};

export default {
  metric: angle,
  _anchors: {
    metric: {
      unit: "deg",
      ratio: 1
    }
  }
};
