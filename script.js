// ================
// Selectors
// ================

const displayOperation = document.querySelector("#display-operation");
const displayCurrent = document.querySelector("#display-current");
const digits = document.querySelectorAll('[data-type="digit"]');
const operators = document.querySelectorAll('[data-type="operator"]');
const btnClear = document.querySelector("#btn-clear");
const btnDelete = document.querySelector("#btn-delete");
const btnEquals = document.querySelector("#btn-equals");

// Variables
let firstOperand;
let secondOperand;
let operator;

// ====================
// Functions
// ====================

// Arithmetic Functions
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
  let result = 0;
  switch (operator) {
    case "*": {
      result = multiply(firstOperand, secondOperand);
      break;
    }
    case "+": {
      result = add(firstOperand, secondOperand);
      break;
    }
    case "-": {
      result = substract(firstOperand, secondOperand);
      break;
    }
    case "/": {
      result = divide(firstOperand, secondOperand);
      break;
    }
    default: {
      break;
    }
  }
  return result;
}

// ====================
// Helper functions
// ====================

function parseOperation(str) {
  return str.replace(/[^0-9*\/*+-.]/g, "");
}

// ===================
// Event Listeners
// ===================

// Clear display and data

btnClear.addEventListener("click", function (e) {
  firstOperand = secondOperand = operator = "";
  displayOperation.textContent = "";
  displayCurrent.textContent = "";
});

// Listen for all button clicks
// btns.forEach((button) =>
//   button.addEventListener("click", function (e) {
//     if (e.target.dataset.type === "digit") {
//       displayOperation.textContent += `${e.target.dataset.value}`;
//     } else if (e.target.dataset.type === "operator") {
//       displayOperation.textContent += ` ${e.target.dataset.value} `;
//     }
//   })
// );

// Listen for digits
digits.forEach((digit) => {
  digit.addEventListener("click", function (e) {
    displayCurrent.textContent += `${e.target.dataset.value}`;
  });
});

// Listen for operators
operators.forEach((operatorSymbol) => {
  operatorSymbol.addEventListener("click", function (e) {
    // When an operator is clicked, save the value displayed as first operand
    firstOperand = +displayCurrent.textContent;
    // set the operand
    operator = e.target.dataset.value;
    // Update display
    displayOperation.textContent = `${displayCurrent.textContent} ${e.target.dataset.value} `;
    displayCurrent.textContent = "";
  });
});

btnEquals.addEventListener("click", function (e) {
  secondOperand = +displayCurrent.textContent;
  displayOperation.textContent += `${secondOperand} =`;
  console.table(firstOperand, secondOperand, operator);
  displayCurrent.textContent = operate(firstOperand, secondOperand, operator);
});
