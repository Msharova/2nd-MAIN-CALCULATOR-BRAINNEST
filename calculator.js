const previousOperand = document.querySelector('.previous-operand')
const display = document.querySelector('#display');
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
    num1 = Number(num1);
    num2 = Number(num2);

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

    if (display.value === "Can't divide by 0") handleClearClick();

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
        display.value += value;
        calculationString += value;
    }
};

const handleOperatorClick = (event) => {
    if (display.value === "Can't divide by 0") handleClearClick();

    if (display.value === ''  && previousOperand.value === '' && event.target.textContent!=='-') return;

    if (display.value === ''  && previousOperand.value === '' && event.target.textContent==='-')
    {
        firstNumber = '0';
        operator = event.target.textContent;
        calculationString += '0'+operator;
        previousOperand.value = operator;
        display.value = '';
        return;
    }   

    if (operator !== '')
    {
        firstNumber = operate(operator,firstNumber,secondNumber);
        if (firstNumber === "Can't divide by 0") {
            display.value = "Can't divide by 0";
            previousOperand.value = '';
            return;
        }
        secondNumber = '';
        calculationString = '';
    }

    operator = event.target.textContent;
    previousOperand.value = firstNumber + operator;
    display.value = '';
    decimalAdded = false;
    calculationString += operator;
};

const handleDecimalClick = () => {
    if (display.value === "Can't divide by 0") handleClearClick();

    if (!decimalAdded) {
        if (!operator) {
            if (result) {
                firstNumber = '';
                result = '';
            }
            if (firstNumber === '') firstNumber = '0';
            firstNumber += '.';
            display.value = firstNumber;
        } else {
            if (secondNumber === '') secondNumber = '0';
            secondNumber += '.';
            display.value = secondNumber; 
        }
        decimalAdded = true;
        calculationString += '.';
    }
};

const handleClearClick = () => {
    firstNumber = '';
    operator = '';
    secondNumber = '';
    result = '';
    display.value = '';
    previousOperand.value = '';
    decimalAdded = false;
    calculationString = '';
};

const handleBackspaceClick = () => {
    if (display.value === "Can't divide by 0") handleClearClick();

    let displayValue = display.value;
    
    if (displayValue.length === 0 && !operator) return;

    if (secondNumber) {
        secondNumber = secondNumber.slice(0, secondNumber.length - 1);
        display.value = secondNumber;
    }
    else if (operator) {
        secondNumber = '';
        operator = '';
        previousOperand.value = '';
        display.value = firstNumber;
    }
    else {
        secondNumber = '';
        operator = '';
        result = '';
        previousOperand.value = ''
        firstNumber = firstNumber.toString();
        firstNumber = firstNumber.slice(0, firstNumber.length - 1);
        if (firstNumber === '-') firstNumber = '';
        display.value = firstNumber;
    }

    if (displayValue[displayValue.length-1] === '.') decimalAdded = false;
};

const handleEqualsClick = () => {
    if (display.value === "Can't divide by 0") handleClearClick();
    
    if (firstNumber && operator && secondNumber) {
        result = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber));
        display.value = result;
        previousOperand.value = '';
        firstNumber = result;
        operator = '';
        secondNumber = '';
        decimalAdded = false;
        calculationString = '';
    }
};

numberButtons.forEach((button) => {
    button.addEventListener('click', handleNumberClick);
});

operatorButtons.forEach((button) => {
    button.addEventListener('click', handleOperatorClick);
});

document.addEventListener('keydown', function(event) {
    if (event.key === '1' || event.key === '2' || event.key === '3' || event.key === '4' || event.key === '5' || event.key === '6' || event.key === '7' || event.key === '8' || event.key === '9' || event.key === '0') {
        handleNumberClick({target: {textContent: event.key}});
    } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
        handleOperatorClick({target: {textContent: event.key}});
    } else if (event.key === '.' || event.key === 'Decimal') {
        handleDecimalClick();
    } else if (event.key === 'Backspace') {
        handleBackspaceClick();
    } else if (event.key === '=' || event.key === 'Enter') {
        handleEqualsClick();
    }
});

decimalButton.addEventListener('click', handleDecimalClick);
clearButton.addEventListener('click', handleClearClick);
backspaceButton.addEventListener('click', handleBackspaceClick);
equalsButton.addEventListener('click', handleEqualsClick);