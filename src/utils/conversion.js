import length from "./definitions/length";
import area from "./definitions/area";
import angle from "./definitions/angle";
import volume from "./definitions/volume";
import temperature from "./definitions/temperature";
import speed from "./definitions/speed";
import time from "./definitions/time";
import mass from "./definitions/mass";
import pressure from "./definitions/pressure";
import energy from "./definitions/energy";
import frequency from "./definitions/frequency";
import digital from "./definitions/digital";

const measures = {
  length,
  area,
  angle,
  volume,
  temperature,
  speed,
  time,
  mass,
  pressure,
  energy,
  frequency,
  digital
};

const Converter = function(value, measure) {
  this.value = parseFloat(value);
  this.measure = measure;
};

const convert = function(value, measure) {
  return new Converter(value, measure);
};

Converter.prototype.getUnit = function(abbr) {
  let found;

  const currentMeasure = measures[this.measure];

  for (let [system, units] of Object.entries(currentMeasure)) {
    if (system === "_anchors") {
      break;
    }
    for (let [unitAbbr, unit] of Object.entries(units)) {
      if (unitAbbr === abbr) {
        found = {
          abbr: abbr,
          measure: this.measure,
          system: system,
          unit: unit
        };
        break;
      }
    }

    if (found) {
      break;
    }
  }

  return found;
};

Converter.prototype.from = function(from) {
  if (this.destination) {
    return null;
  }

  this.source = this.getUnit(from);

  return this;
};

Converter.prototype.to = function(to) {
  if (!this.source) {
    return null;
  }

  this.destination = this.getUnit(to);

  let result;

  // Don't change the value if source and destination are same
  if (this.source.abbr === this.destination.abbr) {
    return this.value;
  }

  // measure should be same eg. you can't go from length to volume
  if (this.source.measure !== this.destination.measure) {
    return null;
  }

  // convert from the source value to its anchor inside the system
  result = this.value * this.source.unit.to_anchor;

  /**
   * For some changes it's a simple shift (C to K)
   * So we'll add it when converting into the unit (later)
   * and subtract it when converting from the unit
   */
  if (this.source.unit.anchor_shift) {
    result -= this.source.unit.anchor_shift;
  }

  // convert from one system to another through anchor ratio eg. metric (km) to imperial (yd)
  // some conversions aren't ratio based or require more than simple shift
  // so we can provide custom transform function
  if (this.source.system !== this.destination.system) {
    const transform =
      measures[this.source.measure]._anchors[this.source.system].transform;

    if (typeof transform === "function") {
      result = transform(result);
    } else {
      result *=
        measures[this.source.measure]._anchors[this.source.system].ratio;
    }
  }

  // This shift has to be done after the system conversion logic
  if (this.destination.unit.anchor_shift) {
    result += this.destination.unit.anchor_shift;
  }

  /**  convert from its anchor to another unit
   * eg.Imperial anchor is ft => to convert to destination(like inch) divide by its anchor
   */
  return result / this.destination.unit.to_anchor;
};

export { convert };
