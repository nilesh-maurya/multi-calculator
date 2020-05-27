const metric = {
  m3: {
    name: {
      singular: "Cubic meter",
      plural: "Cubic meters"
    },
    to_anchor: 1000
  },
  dm3: {
    name: {
      singular: "Cubic decimeter",
      plural: "Cubic decimeter"
    },
    to_anchor: 1
  },
  cm3: {
    name: {
      singular: "Cubic centimeter",
      plural: "Cubic centimeters"
    },
    to_anchor: 1 / 1000
  },
  mm3: {
    name: {
      singular: "Cubic millimeter",
      plural: "Cubic millimeters"
    },
    to_anchor: 1 / 1000000
  },
  l: {
    name: {
      singular: "Liter",
      plural: "Liters"
    },
    to_anchor: 1
  },
  dl: {
    name: {
      singular: "Deciliter",
      plural: "Deciliters"
    },
    to_anchor: 1 / 10
  },
  cl: {
    name: {
      singular: "Centiliter",
      plural: "Centiliters"
    },
    to_anchor: 1 / 100
  },
  ml: {
    name: {
      singular: "Milliliter",
      plural: "Milliliters"
    },
    to_anchor: 1 / 1000
  },
  hl: {
    name: {
      singular: "Hectoliter",
      plural: "Hectoliters"
    },
    to_anchor: 100
  }
};

const imperial = {
  "fl-oz": {
    name: {
      singular: "Imperial Fluid ounce",
      plural: "Imperial Fluid ounces"
    },
    to_anchor: 1
  },
  tsp: {
    name: {
      singular: "Teaspoon",
      plural: "Teaspoons"
    },
    to_anchor: 1 / 4.8
  },
  tbp: {
    name: {
      singular: "Tablespoon",
      plural: "Tablespoons"
    },
    to_anchor: 1 / 1.6
  },
  cup: {
    name: {
      singular: "Cup",
      plural: "Cups"
    },
    to_anchor: 10
  },
  pnt: {
    name: {
      singular: "Pint",
      plural: "Pints"
    },
    to_anchor: 20
  },
  qt: {
    name: {
      singular: "Quart",
      plural: "Quarts"
    },
    to_anchor: 40
  },
  gal: {
    name: {
      singular: "Gallon",
      plural: "Gallons"
    },
    to_anchor: 160
  },
  ft3: {
    name: {
      singular: "Cubic Foot",
      plural: "Cubic Feet"
    },
    to_anchor: 996.614
  },
  in3: {
    name: {
      singular: "Cubic inch",
      plural: "Cubic inches"
    },
    to_anchor: 0.576744
  }
  // yd3: {
  //   name: {
  //     singular: "Cubic yard",
  //     plural: "Cubic yards"
  //   },
  //   to_anchor: ""
  // }
};

const volume = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: {
      unit: "l",
      ratio: 35.1951
    },
    imperial: {
      unit: "fl-oz",
      ratio: 1 / 35.1951
    }
  }
};

export default volume;
