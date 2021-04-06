const sum = (num1, num2) => {
  return num1 + num2;
};

const multiply = (num1, num2) => {
  return num1 * num2;
};

const subtract = (num1, num2) => {
  return num1 - num2;
};

const divide = (num1, num2) => {
  return num2 !== 0 ? num1 / num2 : "invalid division";
};

module.exports = {
  sum,
  multiply,
  subtract,
  divide,
};
