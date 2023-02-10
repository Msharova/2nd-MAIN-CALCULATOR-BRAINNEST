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
    //turn numbers into numbers from strings because we're have to be sure they're numbers
    num1 = Number(num1);
    num2 = Number(num2);
    // switch through operators
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
    //if there is this error on display - we shouldn't be able to do anything, so we clear 
    //(otherwise it shows calculations and NaN)
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
        display.value += value; //changed from display.value += secondNumber

        calculationString += value;
    }
};

const handleOperatorClick = (event) => {
    if (display.value === "Can't divide by 0") handleClearClick();
    //if display value and previous value is empty, ignore - doesn't show the operator
    if (display.value === ''  && previousOperand.value === '' && event.target.textContent!=='-') return;
    //if minus is fist operator
    if (display.value === ''  && previousOperand.value === '' && event.target.textContent==='-')
    {
        firstNumber = '0';
        operator = event.target.textContent;
        calculationString += '0'+operator;
        previousOperand.value = operator;
        display.value = '';
        return;
    }   
    //if operator was already there, calculate and then add NEW operator
    if (operator !== '')
    {
        firstNumber = operate(operator,firstNumber,secondNumber);
        secondNumber = '';
        calculationString = '';
    }

    operator = event.target.textContent;
    

    previousOperand.value = firstNumber + operator;
    //display.value = firstNumber + operator;
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
            display.value = secondNumber; //display.value = firstNumber + operator + secondNumber;
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
    
    /*
    if (displayValue) {
        if (displayValue.length <= 1) {
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
            display.value = secondNumber;   //display.value = firstNumber + operator + secondNumber;
        } else {
            result = '';
            firstNumber = firstNumber.toString();           //add tostring conversion, otherwise slice doesn't work
            firstNumber = firstNumber.slice(0, firstNumber.length - 1);
            display.value = firstNumber;
        }
    }*/


    if (displayValue.length === 0 && !operator) return;
    //means we have operator and first number
    if (secondNumber)
    {
        secondNumber = secondNumber.slice(0, secondNumber.length - 1);
        display.value = secondNumber;
    }
    else if (operator)  //means we have operator and first number
    {
        secondNumber = '';
        operator = '';
        previousOperand.value = '';

        display.value = firstNumber;
    }
    else //means we only have first number
    {
        secondNumber = '';
        operator = '';
        result = '';
        previousOperand.value = ''

        firstNumber = firstNumber.toString();  // working with numbers in fistNumber
        firstNumber = firstNumber.slice(0, firstNumber.length - 1);
        if (firstNumber === '-') firstNumber = '';  //working with erasing negative result

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
        firstNumber = result; //
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

decimalButton.addEventListener('click', handleDecimalClick);
clearButton.addEventListener('click', handleClearClick);
backspaceButton.addEventListener('click', handleBackspaceClick);
equalsButton.addEventListener('click', handleEqualsClick);


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