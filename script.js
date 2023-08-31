// Selectors
const displayOperation = document.querySelector("#displayOperation");
const displayTotal = document.querySelector("#displayTotal");
const btns = document.querySelectorAll("button");
const equals = document.querySelector("#equals");

// Variables
let firstOperand;
let secondOperand;
let operator;

// Functions
function add(x, y) {
  return x + y;
}

function substract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return Math.round((x / y) * 1000) / 1000;
}

function operate(firstOperand, secondOperand, operator) {
  switch (operator) {
    case "+": {
      return add(firstOperand, secondOperand);
    }
    case "-": {
      return substract(firstOperand, secondOperand);
    }
    case "*": {
      return multiply(firstOperand, secondOperand);
    }
    case "/": {
      return divide(firstOperand, secondOperand);
    }
    default: {
      break;
    }
  }
}

function parseOperation(str) {
  return str.replace(/[^0-9*\/*+-.]/g, "");
}

// Event Listeners
btns.forEach((button) =>
  button.addEventListener("click", function (e) {
    if (e.target.dataset.type === "digit") {
      displayOperation.textContent += `${e.target.dataset.value}`;
    } else if (e.target.dataset.type === "operator") {
      displayOperation.textContent += ` ${e.target.dataset.value} `;
    }
  })
);

equals.addEventListener("click", function (e) {
  const operation = parseOperation(displayOperation.textContent);
  //  find the operator
  // set the previous content that's not an argument as the first operand
  // set the next content that's not an argument as the second operand
  for (let index = 0; index < operation.length; index++) {
    if (operation[index] !== ("+" || "-" || "*" || "/")) {
      console.log(index, operation[index]);
      continue;
    } else {
      firstOperand = +operation.substring(0, index);
      secondOperand = +operation.substring(index);
      operator = operation[index];
      displayTotal.textContent = operate(firstOperand, secondOperand, operator);
    }
  }
});
