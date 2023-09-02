// ================
// Selectors
// ================

const displayOperation = document.querySelector("#display-operation");
const displayCurrent = document.querySelector("#display-current");
const btns = document.querySelectorAll("[data-type]");
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

function operate(firstOperand, operator, secondOperand) {
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

function resolveOperation() {
  secondOperand = +displayCurrent.textContent;
  displayOperation.textContent += `${secondOperand} =`;
  console.table(firstOperand, operator, secondOperand);
  displayCurrent.textContent = operate(firstOperand, operator, secondOperand);
}

function clearData() {
  firstOperand = secondOperand = operator = "";
}

function clearDisplay() {
  displayOperation.textContent = "";
  displayCurrent.textContent = "";
}

// ===================
// Event Listeners
// ===================

// Clear display and data

btnClear.addEventListener("click", function (e) {
  clearDisplay();
  clearData();
});

// Listen for digits

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") btnEquals.click();
  btns.forEach((button) => {
    if (e.key === button.dataset.value) {
      button.click();
    }
  });
});

digits.forEach((digit) => {
  digit.addEventListener("click", function (e) {
    displayCurrent.textContent += `${e.target.dataset.value}`;
  });
});

// Listen for operators
operators.forEach((operatorSymbol) => {
  operatorSymbol.addEventListener("click", function (e) {
    // If there's an ongoing operation
    // Set the result of that operation as the first operand
    // and the current value as the second operand
    if (displayOperation.textContent !== "") {
      console.log(
        `Ongoing operation ${console.table(
          firstOperand,
          secondOperand,
          operator
        )}`
      );
      firstOperand = resolveOperation();
    } else {
      firstOperand = +displayCurrent.textContent;
    }

    // When an operator is clicked and there's no ongoing operation
    // save the value displayed as first operand
    firstOperand = +displayCurrent.textContent;
    // set the operand
    operator = e.target.dataset.value;
    // Update display
    displayOperation.textContent = `${displayCurrent.textContent} ${e.target.dataset.value} `;
    displayCurrent.textContent = "";
  });
});

btnEquals.addEventListener("click", function (e) {
  resolveOperation();
  clearData();
});
