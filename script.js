// ================
// Selectors
// ================

const displayOperation = document.querySelector("#display-operation");
const displayCurrent = document.querySelector("#display-current");
const btns = document.querySelectorAll("[data-type]");
const digits = document.querySelectorAll('[data-type="digit"]');
const btnFloat = document.querySelector('[data-type="float"]');
const operators = document.querySelectorAll('[data-type="operator"]');
const btnClear = document.querySelector("#btn-clear");
const btnDelete = document.querySelector("#btn-delete");
const btnEquals = document.querySelector("#btn-equals");
const btnSign = document.querySelector("#btn-sign");
const illustrations = document.querySelectorAll(".illustration");

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
      if (secondOperand === 0) {
        return "Really 😒️?";
      }
      result = divide(firstOperand, secondOperand);
      break;
    }
    default: {
      break;
    }
  }
  if (Number.isInteger(result)) return result;
  else {
    return result.toFixed(3);
  }
}

// ====================
// Helper functions
// ====================

// function parseOperation(str) {
//   return str.replace(/[^0-9*\/*+-.]/g, "");
// }

function resolveOperation() {
  if (!displayCurrent.textContent && (operator === "/" || operator === "*"))
    secondOperand = 1;
  else {
    secondOperand = displayCurrent.textContent
      ? +displayCurrent.textContent
      : 0;
  }
  displayOperation.textContent += `${secondOperand} =`;
  console.log(firstOperand, operator, secondOperand);
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

// Listen for keyboard events
let path = document.querySelector("#btn-delete>svg>path");

document.addEventListener("keydown", function (e) {
  e.preventDefault();
  if (e.key === "Enter") {
    path = document.querySelector("#btn-equals>svg>path");
    btnEquals.classList.add("active");
    btnEquals.click();
    path.setAttribute("background-color", "#ff6d00");
  }
  if (e.key === "Backspace") {
    btnDelete.classList.add("active");
    btnDelete.click();
    path.setAttributeNS(null, "stroke", "#f4f5f9");
  }
  if (e.key === ".") {
    btnFloat.classList.add("active");
    btnFloat.click();
  }
  btns.forEach((button) => {
    if (e.key === button.dataset.value) {
      button.classList.add("active");
      button.click();
    }
  });
});

document.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    btnEquals.classList.remove("active");
    btnEquals.click();
    path.setAttribute("background-color", "#ff9b50");
  }
  if (e.key === "Backspace") {
    btnDelete.classList.remove("active");
    btnDelete.click();
    path.setAttributeNS(null, "stroke", "#ff9b50");
  }
  if (e.key === ".") {
    btnFloat.classList.remove("active");
    btnFloat.click();
  }
  btns.forEach((button) => {
    if (e.key === button.dataset.value) {
      button.classList.remove("active");
    }
  });
});

// const pathDelete = document.querySelector("#btn-delete>svg>path");

btnDelete.addEventListener("keydown", function (e) {
  path.setAttributeNS(null, "stroke", "#f4f5f9");
});
btnDelete.addEventListener("keyup", function (e) {
  path.setAttributeNS(null, "stroke", "#ff9b50");
});

btnDelete.addEventListener("click", function (e) {
  displayCurrent.textContent = displayCurrent.textContent.substring(
    0,
    displayCurrent.textContent.length - 1
  );
});

btnFloat.addEventListener("click", function (e) {
  if (displayCurrent.textContent.includes(".")) return;
  else {
    displayCurrent.textContent += ".";
  }
});

// Listen for digit clicks

digits.forEach((digit) => {
  digit.addEventListener("click", function (e) {
    displayCurrent.textContent += `${e.target.dataset.value}`;
  });
});

// Listen for operators
btnSign.addEventListener("click", function (e) {
  if (displayCurrent.textContent === "") return;
  if (displayCurrent.textContent) {
    if (displayCurrent.textContent.includes("-")) {
      displayCurrent.textContent = displayCurrent.textContent.replace("-", "");
    } else {
      displayCurrent.textContent = +`-${displayCurrent.textContent}`;
    }
  }
});

operators.forEach((operatorSymbol) => {
  operatorSymbol.addEventListener("click", function (e) {
    // If there's an ongoing operation
    // Set the result of that operation as the first operand
    // and the current value as the second operand
    if (displayOperation.textContent !== "") {
      console.log(
        `Ongoing operation ${(firstOperand, operator, secondOperand)}`
      );
      // if the last action/button was an operator
      // Update to the new operator
      firstOperand = resolveOperation();
    } else {
      firstOperand = +displayCurrent.textContent;
    }

    // When an operator is clicked and there's no ongoing operation
    // save the value displayed as first operand
    firstOperand = +displayCurrent.textContent;
    // set the operand
    operator = e.currentTarget.dataset.value;
    // Update display
    displayOperation.textContent = `${displayCurrent.textContent} ${e.currentTarget.dataset.value} `;
    displayCurrent.textContent = "";
  });
});

btnEquals.addEventListener("click", function (e) {
  if (!displayCurrent.textContent) return;
  if (
    displayOperation.textContent.charAt(
      displayOperation.textContent.length - 1
    ) === "="
  )
    return;
  resolveOperation();
  clearData();
});
