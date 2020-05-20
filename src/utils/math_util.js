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
