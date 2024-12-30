// shopping list
// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents#active_learning_basic_dom_manipulation

// create 3 variables that reference ul, input and button
const ul = document.querySelector('ul');
const input = document.getElementById('item-input');
const addListButton = document.getElementById('add-list-btn')

// create a function that runs when the add button is clicked
function newListItem() {
    const inputVal = input.value; // get value from input box
    // only run if input box has content
    if (inputVal !== '') {
        const listItem = document.createElement('li'); // add list item
        // list_item.setAttribute('id', 'list_item'); // add id to delete button
        const span = document.createElement('span'); // add span for input text
        // span.setAttribute('id', 'list_item');
        span.textContent = `- ${inputVal}`; // add input text to span
        const deleteBtn = document.createElement('button'); // add btn to delete list item
        deleteBtn.textContent = 'Delete'; // add button text
        deleteBtn.setAttribute('id', 'delete-btn'); // add id to delete button
        // append span and button to list item
        listItem.appendChild(span);
        listItem.appendChild(deleteBtn);
        ul.appendChild(listItem); // append list item to ul
        // function to delete list item when delete button clicked
        deleteBtn.addEventListener('click', () => {
            listItem.remove();
        })
        input.value = ''; // clear input box
    }
    input.focus(); // focus cursor back to input box
}

// run newListItem on click of add to list button
addListButton.addEventListener('click', newListItem);
// run newListItem if input box is selected and enter
// key pressed
input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        newListItem();
    }
});