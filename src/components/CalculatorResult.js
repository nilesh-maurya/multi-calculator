export default {
  name: "calculator-result",
  functional: true,
  props: {
    result: {
      type: String | Object
    },
    wasEnterPress: {
      type: Boolean
    }
  },
  render: function(createElement, context) {
    console.log(context);
    let CSSClass = ["calculator__result"];
    if (context.props.wasEnterPress) {
      CSSClass.push("big");
    }
    if (typeof context.props.result === "string") {
      let childElement;
      if (context.props.result === "") {
        childElement = "";
      } else {
        childElement = `= ${context.props.result}`;
      }
      return createElement("div", { class: CSSClass }, childElement);
    } else if (typeof context.props.result === "object") {
      const childElements = [];
      childElements.push(
        createElement(
          "span",
          { class: ["calculator__result--quotient"] },
          `= ${context.props.result.quotient}`
        )
      );
      childElements.push(
        createElement(
          "span",
          { class: ["calculator__result--div"] },
          `${context.props.result.numerator}/${context.props.result.denominator}`
        )
      );
      return createElement("div", { class: CSSClass }, childElements);
    }
  }
};
