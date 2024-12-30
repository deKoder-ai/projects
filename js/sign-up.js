const formElement = document.getElementById('sign-up-form');

const firstNameInput = document.getElementById('first-name');
const lastNameInput = document.getElementById('last-name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const pass1Input = document.getElementById('password-1');
const pass2Input = document.getElementById('password-2');

document.addEventListener('input', (event) => {
    let target = event.target;
    switch(target.id) {
        case 'first-name':
            if (firstNameInput.invalid) {
                console.log(`${target.id} + is invalid`);
            } else {
                console.log(firstNameInput.value);
            }
            break;
        case 'last-name':
            console.log(target.id);
            break;        
        case 'email':
            console.log(target.id);
            break;        
        case 'phone':
            console.log(target.id);
            break;        
        case 'password-1':
            console.log(target.id);
            break;        
        case 'password-2':
            console.log(target.id);
            break;
    }
});


// formElement.addEventListener('input', () => {
//     const inputElements = formElement.querySelectorAll('input');

//     inputElements.forEach((inputElement) => {
//         const `${inputElement.id}` = 'xxx'
//         // if (inputElement.invalid) {
//         //     inputElement.classList.add('xxx)');
//         // } else {
//         //     inputElement.classList.remove('xxx');
//         // }
//         console.log(inputElement.id)
//     });
// });


// const firstNameInput = document.getElementById('sign-up-form');
// first-name
// javascript.js:12 last-name
// javascript.js:12 email
// javascript.js:12 phone
// javascript.js:12 password-1
// javascript.js:12 password-2