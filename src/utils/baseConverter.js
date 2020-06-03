function getValue(char) {
  if (char >= "0" && char <= "9") {
    return char.charCodeAt(0) - "0".charCodeAt(0);
  } else {
    return char.charCodeAt(0) - "A".charCodeAt(0) + 10;
  }
}

function getCharValue(num) {
  if (num >= 0 && num <= 9) {
    return String.fromCharCode(num + "0".charCodeAt(0));
  } else {
    return String.fromCharCode(num - 10 + "A".charCodeAt(0));
  }
}

function toDecimal(value, base) {
  let [integer, fraction = ""] = value.toString().split(".");

  const len = integer.length;
  let power = 1;
  let num = 0;

  for (let i = len - 1; i >= 0; i--) {
    if (getValue(integer[i]) >= base) {
      // each digit should not be greater than base
      return null;
    }

    num += getValue(integer[i]) * power;
    power = power * base;
  }

  if (fraction === "") {
    return num.toString();
  }

  const lengthOfFraction = fraction.length;
  power = base;
  let frac = 0;
  for (let i = 0; i < lengthOfFraction; i++) {
    frac += getValue(fraction[i]) / power;
    power = power * base;
  }

  return num + frac;
}

function toResult(decimal, to) {
  let [integer, fraction = ""] = decimal.toString().split(".");

  // integral part
  integer = Number(integer);
  let remainder = "";
  while (integer > 0) {
    remainder += getCharValue(integer % to);
    integer = Math.floor(integer / to);
  }

  remainder = remainder
    .split("")
    .reverse()
    .join("");

  if (fraction === "") {
    return remainder.toString();
  }

  // fractional part
  fraction = parseFloat("0." + fraction);
  let frac = "";

  while (fraction > 0) {
    fraction = fraction * to;

    let fraction_bit = Math.floor(fraction);
    frac += fraction_bit;

    fraction = fraction - fraction_bit;
  }

  return remainder.toString() + "." + frac.toString();
}

function baseConverter(value, from, to) {
  if (from == to) {
    return value;
  }

  // convert from any base to decimal
  const decimal = toDecimal(value, from);

  // convert decimal to any base
  const result = toResult(decimal, to);

  // return the converted result
  return result.toString() === "" ? "0" : result.toString();
}

export default baseConverter;
