export function roundNumber(num, scale) {
  if (!("" + num).includes("e")) {
    return +(Math.round(num + "e+" + scale) + "e-" + scale);
  } else {
    var arr = ("" + num).split("e");
    var sig = "";
    if (+arr[1] + scale > 0) {
      sig = "+";
    }
    return +(
      Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) +
      "e-" +
      scale
    );
  }
}

var gcd = function(a, b) {
  if (b < 0.0000001) return a; // Since there is a limited precision we need to limit the value.

  return gcd(b, Math.floor(a % b)); // Discard any fractions due to limitations in precision.
};

export function evaluateDivision(fraction) {
  let len = fraction.toString().length - 2;

  let denominator = Math.pow(10, len);
  let numerator = fraction * denominator;

  let divisor = gcd(numerator, denominator);

  numerator = parseInt(numerator / divisor);
  denominator = parseInt(denominator / divisor);
  let quotient;
  if (numerator >= 2 * denominator) {
    quotient = parseInt(numerator / denominator);
    numerator = numerator % denominator;
  }

  return { quotient, numerator, denominator };
}

function getLang() {
  if (navigator.languages && navigator.languages.length) {
    return navigator.languages[0];
  } else {
    return (
      navigator.userLanguage ||
      navigator.language ||
      navigator.browserLanguage ||
      "en"
    );
  }
}

export function formatNumber(number) {
  const n = number.toString().split(".")[1];

  if (window.Intl && typeof window.Intl === "object") {
    number = new Intl.NumberFormat(getLang(), {
      maximumFractionDigits: 12
    }).format(number);
  }

  if (n === "") {
    number += ".";
  }

  return number;
}
