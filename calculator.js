const display = document.querySelector('#display');
const clearButton = document.querySelector('#clear');
const backspaceButton = document.querySelector('#backspace');
const decimalButton = document.querySelector('#decimal');
const equalsButton = document.querySelector('#equals');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const calculationDisplay = document.querySelector('#calculation-display');

let firstNumber = '';
let operator = '';
let secondNumber = '';
let result = '';
let decimalAdded = false;
let calculationString = '';

const add = (num1, num2) => {
    return num1 + num2;
};

const subtract = (num1, num2) => {
    return num1 - num2;
};

const multiply = (num1, num2) => {
    return num1 * num2;
};

const divide = (num1, num2) => {
    if (num2 === 0) {
        return "Can't divide by 0";
    }
    return num1 / num2;
};

const operate = (operator, num1, num2) => {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            return 'Invalid operator';
    }
};

const handleNumberClick = (event) => {
    const value = event.target.textContent;

    if (!operator) {
        if (result) {
            firstNumber = '';
            result = '';
        }
        firstNumber += value;
        display.value = firstNumber;
    } else {
        secondNumber += value;
        display.value = firstNumber + operator + secondNumber;

        calculationString += value;
        calculationDisplay.textContent = calculationString;
    }
};

const handleOperatorClick = (event) => {
    operator = event.target.textContent;
    display.value = firstNumber + operator;
    decimalAdded = false;

    calculationString += operator;
    calculationDisplay.textContent = calculationString;
};

const handleDecimalClick = () => {
    if (!decimalAdded) {
        if (!operator) {
            if (result) {
                firstNumber = '';
                result = '';
            }
            firstNumber += '.';
            display.value = firstNumber;
        } else {
            secondNumber += '.';
            display.value = firstNumber + operator + secondNumber;
        }
        decimalAdded = true;

        calculationString += '.';
        calculationDisplay.textContent = calculationString;
    }
};

const handleClearClick = () => {
    firstNumber = '';
    operator = '';
    secondNumber = '';
    result = '';
    display.value = '';
    decimalAdded = false;

    calculationString = '';
    calculationDisplay.textContent = calculationString;
};

const handleBackspaceClick = () => {
    let displayValue = display.value;
    if (displayValue) {
        if (displayValue.length === 1) {
            firstNumber = '';
            operator = '';
            secondNumber = '';
            result = '';
            display.value = '';
            decimalAdded = false;
        } else if (operator && !secondNumber) {
            operator = '';
            display.value = firstNumber;
        } else if (!operator && !result) {
            firstNumber = firstNumber.slice(0, firstNumber.length - 1);
            display.value = firstNumber;
        } else if (operator && secondNumber) {
            secondNumber = secondNumber.slice(0, secondNumber.length - 1);
            display.value = firstNumber + operator + secondNumber;
        } else {
            result = '';
            firstNumber = firstNumber.slice(0, firstNumber.length - 1);
            display.value = firstNumber;
        }
    }
};

const handleEqualsClick = () => {
    if (firstNumber && operator && secondNumber) {
        result = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber));
        display.value = result;
        firstNumber = result;
        operator = '';
        secondNumber = '';
        decimalAdded = false;

        calculationString = '';
        calculationDisplay.textContent = calculationString;
    }
};

document.addEventListener("click", function(event) {
    if (event.target.matches("button")) {
        calculationDisplay .textContent += event.target.textContent;
    }
  });

numberButtons.forEach((button) => {
    button.addEventListener('click', handleNumberClick);
});

operatorButtons.forEach((button) => {
    button.addEventListener('click', handleOperatorClick);
});

decimalButton.addEventListener('click', handleDecimalClick);
clearButton.addEventListener('click', handleClearClick);
backspaceButton.addEventListener('click', handleBackspaceClick);
equalsButton.addEventListener('click', handleEqualsClick);

//test test test

/////////


/* const display = document.querySelector('#display');
const clearButton = document.querySelector('#clear');
const backspaceButton = document.querySelector('#backspace');
const decimalButton = document.querySelector('#decimal');
const equalsButton = document.querySelector('#equals');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');

let firstNumber = '';
let operator = '';
let secondNumber = '';
let result = '';
let decimalAdded = false;

const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => (num2 === 0) ? "Can't divide by 0" : num1 / num2;
const operate = (op, num1, num2) => {
switch (op) {
case '+': return add(num1, num2);
case '-': return subtract(num1, num2);
case '': return multiply(num1, num2);
case '/': return divide(num1, num2);
default: return 'Invalid operator';
}
};
const handleNumberClick = (e) => {
const value = e.target.textContent;
!operator ? (firstNumber += value, display.value = firstNumber) : (secondNumber += value, display.value = firstNumber + operator + secondNumber);
};
const handleOperatorClick = (e) => {
operator = e.target.textContent;
display.value = firstNumber + operator;
decimalAdded = false;
};
const handleDecimalClick = () => {
if (!decimalAdded) {
!operator ? (firstNumber += '.', display.value = firstNumber) : (secondNumber += '.', display.value = firstNumber + operator + secondNumber);
decimalAdded = true;
}
};
const handleClearClick = () => {
firstNumber = '';
operator = '';
secondNumber = '';
result = '';
display.value = '';
decimalAdded = false;
};
const handleBackspaceClick = () => {
let displayValue = display.value;
displayValue = displayValue.slice(0, -1);
!operator ? (firstNumber = displayValue, display.value = firstNumber) : (secondNumber = displayValue, display.value = firstNumber + operator + secondNumber);
};
const handleEqualsClick = () => {
if (firstNumber && operator && secondNumber) {
let calculation = firstNumber + operator + secondNumber;
while (calculation.includes("+") || calculation.includes("-") || calculation.includes("") || calculation.includes("/")) {
let operatorIndex = -1;
if (calculation.includes("") || calculation.includes("/")) {
if (calculation.indexOf("") !== -1) {
operatorIndex = calculation.indexOf("*");
} else {
operatorIndex = calculation.indexOf("/

const handleEqualsClick = () => {
if (firstNumber && operator && secondNumber) {
let calculation = firstNumber + operator + secondNumber;
while (calculation.includes("+") || calculation.includes("-") || calculation.includes("") || calculation.includes("/")) {
let operatorIndex = -1;
if (calculation.includes("") || calculation.includes("/")) {
if (calculation.indexOf("") !== -1) {
operatorIndex = calculation.indexOf("");
} else {
operatorIndex = calculation.indexOf("/");
}
let left = calculation.slice(0, operatorIndex);
let right = calculation.slice(operatorIndex + 1);
right = right.split('+').join(' ').split('-').join(' -').split('').join(' ').split('/').join(' ').split(' ');
for (let i = 1; i < right.length; i++) {
if (right[i] === "-") {
right[i + 1] = -right[i + 1];
} else {
right[i - 1] = operate(right[i - 1], Number(right[i]), Number(right[i + 1]));
right.splice(i, 2);
i -= 2;
}
}
calculation = left + right[0];
} else {
if (calculation.indexOf("+") !== -1) {
operatorIndex = calculation.indexOf("+");
} else {
operatorIndex = calculation.indexOf("-");
}
let left = calculation.slice(0, operatorIndex);
left = left.split('+').join(' ').split('-').join(' -').split('').join(' ').split('/').join(' ').split(' ');
for (let i = 1; i < left.length; i++) {
if (left[i] === "-") {
left[i + 1] = -left[i + 1];
} else {
left[i - 1] = operate(left[i - 1], Number(left[i]), Number(left[i + 1]));
left.splice(i, 2);
i -= 2;
}
}
let right = calculation.slice(operatorIndex + 1);
right = right.split('+').join(' ').split('-').join(' -').split('*').join(' ').split('/').join(' ').split(' ');
for (let i = 1; i < right.length; i++) {
if (right[i] === "-") {
right[i + 1] = -right[i + 1];
} else {
right[i - 1] = operate(right[i - 1], Number(right[i]), Number(right[i + 1]));
right.splice(i, 2);
i -= 2;
}
}
calculation = operate(left[0], Number(left[left.length - 1]), Number(right[0]));
}
}
result = calculation;
display.value = result;
firstNumber = result;

const handleEqualsClick = () => {
if (firstNumber && operator && secondNumber) {
let calculation = firstNumber + operator + secondNumber;
while (calculation.includes("+") || calculation.includes("-") || calculation.includes("") || calculation.includes("/")) {
let operatorIndex = -1;
if (calculation.includes("") || calculation.includes("/")) {
if (calculation.indexOf("") !== -1) {
operatorIndex = calculation.indexOf("");
} else {
operatorIndex = calculation.indexOf("/");
}
let left = calculation.slice(0, operatorIndex);
let right = calculation.slice(operatorIndex + 1);
right = right.split('+').join(' ').split('-').join(' -').split('').join(' ').split('/').join(' ').split(' ');
for (let i = 1; i < right.length; i++) {
if (right[i] === "-") {
right[i + 1] = -right[i + 1];
} else {
right[i - 1] = operate(right[i - 1], Number(right[i]), Number(right[i + 1]));
right.splice(i, 2);
i -= 2;
}
}
calculation = left + right[0];
} else {
if (calculation.indexOf("+") !== -1) {
operatorIndex = calculation.indexOf("+");
} else {
operatorIndex = calculation.indexOf("-");
}
let left = calculation.slice(0, operatorIndex);
left = left.split('+').join(' ').split('-').join(' -').split('').join(' ').split('/').join(' ').split(' ');
for (let i = 1; i < left.length; i++) {
if (left[i] === "-") {
left[i + 1] = -left[i + 1];
} else {
left[i - 1] = operate(left[i - 1], Number(left[i]), Number(left[i + 1]));
left.splice(i, 2);
i -= 2;
}
}
calculation = left[0] + right;
}
}
result = Number(calculation);
display.value = result;
firstNumber = result;
operator = '';
secondNumber = '';
decimalAdded = false;
}
};

clearButton.addEventListener('click', handleClearClick);
backspaceButton.addEventListener('click', handleBackspaceClick);
decimalButton.addEventListener('click', handleDecimalClick);
equalsButton.addEventListener('click', handleEqualsClick);
numberButtons.forEach(button => button.addEventListener('click', handleNumberClick));
operatorButtons.forEach(button => button.addEventListener('click', handleOperatorClick)); */