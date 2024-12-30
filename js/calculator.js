// calculator project

// constants
const display = document.querySelector('#display_text');
const btnsContainer = document.querySelector('#btns_container');

// variables
let displayText = ''
let a = null;
let b = null;
let lastBtnEquals = false;

// functions
function decimalBtn() {
    if (displayText === '') {
        buildDisplayText('0.');
        display.textContent = displayText;
    } else if (!displayText.includes('.')) {
        buildDisplayText('.');
        display.textContent = displayText;
    }
}
function zeroBtn () {
    if (displayText) {
        buildDisplayText('0');
        display.textContent = displayText;
    } 
}
function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    if (a === 0 || b === 0) {
        return 'Infinity';
    } else {
        return a / b;
    }
}
function buildDisplayText(input) {
    displayText = displayText + input;
    return displayText;
}
function clear() {
    displayText = '';
    a = null;
    b = null;
    splitter = [];
    display.textContent = displayText;
    return displayText;
};
function invertBtn() {
    if (!displayText.includes('-')) {
        displayText = '-' + displayText;
        display.textContent = displayText;
    } else {
        displayText = displayText.substring(1);
        display.textContent = displayText;
    }
}
function funcSelect(x, y, func) {
    let result = null;
    if (func === '+') {
        result = add(x, y);
    } else if (func === '-') {
        result = subtract(x,y);
    } else if (func === '*') {
        result = multiply(x,y);
    } else if (func === '/') {
        result = divide(x,y);
    }
    return result;
}
function equalsBtn() {
    lastBtnEquals = true;
    equals();
}
function roundToXDigits(num, length) {
    let str = String(num);
    let splitStr = str.split('.');
    let remainder = null;
    let splitStrLen = splitStr[0].length;
    if (splitStr[1]) {
        remainder = '0.' + splitStr[1];
        splitStrLen += 1;
        remainder = Number(remainder);
        oo = length - splitStrLen[0];
        remainder = remainder.toFixed(oo);
        remainder = String(remainder).slice(2);
        result = splitStr[0] + '.' + remainder;
        console.log(result);
        result = Number(result);
        return result;
    } else {
        return num;
    }


}
function equals() {
    let split = displayText.split(' ');
    let x = Number(split[0]);
    let y = Number(split[2]);
    let func = split[1];
    // console.log(func);
    let result = funcSelect(x, y, func);
    
    // round result
    result = roundToXDigits(result, 13);

    displayText = String(result);
    display.textContent = displayText;
    a = result;
    b = null;
    
}
function operatorBtn(operator) {
    lastBtnEquals = false;
    operator = ` ${operator} `;
    let split = displayText.split(' ');
    // console.log(split);
    // if (displayText === '' || split.length === 2) {
        // console.log('aaa');
    if (a === null) {
        // console.log('bbb');
        a = Number(displayText);
        buildDisplayText(operator);
        display.textContent = displayText;
    } else if (split.length === 1) {
        // console.log('ccc');
        buildDisplayText(operator);
        display.textContent = displayText;
    } else if (split.length === 3) {
        // console.log('ddd');
        equals();
        buildDisplayText(operator);
        display.textContent = displayText;
    }
}
function clearAfterEquals() {
    if (lastBtnEquals === true) {
        clear();
        display.textContent = displayText;
        lastBtnEquals = false;
    }
}

// document.addEventListener('click', (event) => {
//     let target = event.target;
//     console.log(lastBtnEquals);
// });

btnsContainer.addEventListener('click', (event) => {
    let target = event.target;
    switch (target.id) {
        case 'btn_0':
            clearAfterEquals();
            zeroBtn();
            break;
        case 'btn_decimal':
            clearAfterEquals();
            decimalBtn();
            break;
        case 'btn_1':
            clearAfterEquals();
            buildDisplayText('1');
            display.textContent = displayText;
            break;
        case 'btn_2':
            clearAfterEquals();
            buildDisplayText('2');
            display.textContent = displayText;
            break;
        case 'btn_3':
            clearAfterEquals();
            buildDisplayText('3');
            display.textContent = displayText;
            break;
        case 'btn_4':
            clearAfterEquals();
            buildDisplayText('4');
            display.textContent = displayText;
            break;
        case 'btn_5':
            clearAfterEquals();
            buildDisplayText('5');
            display.textContent = displayText;
            break;
        case 'btn_6':
            clearAfterEquals();
            buildDisplayText('6');
            display.textContent = displayText;
            break;
        case 'btn_7':
            clearAfterEquals();
            buildDisplayText('7');
            display.textContent = displayText;
            break;
        case 'btn_8':
            clearAfterEquals();
            buildDisplayText('8');
            display.textContent = displayText;
            break;
        case 'btn_9':
            clearAfterEquals();
            buildDisplayText('9');
            display.textContent = displayText;
            break;
        case 'btn_clear':
            clear();
            display.textContent = displayText;
            break;
        case 'btn_cancel':
            displayText = displayText.slice(0, -1);
            display.textContent = displayText;
            break;
        case 'btn_invert':
        invertBtn();
            break;
        case 'btn_equals':
            equalsBtn();
            break;
        case 'btn_add':
            operatorBtn('+');
            break;
        case 'btn_minus':
            operatorBtn('-');
            break;
        case 'btn_multiply':
            operatorBtn('*');
            break;
        case 'btn_divide':
            operatorBtn('/');
            break;
    }
});
console.log(displayText);


// to do
// - round numbers to a total number of digits
// - fix invert bug
// - change font size if input becomes to big for display
// - fix bug that doesn't allow . if already on other side
//  of equation

// changed
// - change % button to C - removes last typed number
// - prevent user from inputting more digits after an equals operation
// - add linear-gradient style to buttons


