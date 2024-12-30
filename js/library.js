'use strict'

const myLibrary = [
    new Book('Prince of Thorns', 'Mark Lawrence', 336, true),
    new Book('Shantaram', 'Gregory David Roberts', 944, true),
    new Book('The Devil\'s Teeth', 'Susan Casey', 304, true),
    new Book('Prince of Thorns', 'Mark Lawrence', 336, true),
    new Book('Shantaram', 'Gregory David Roberts', 944, true),
    new Book('The Devil\'s Teeth', 'Susan Casey', 304, true),
    new Book('Prince of Thorns', 'Mark Lawrence', 336, true),
    new Book('Shantaram', 'Gregory David Roberts', 944, false),
    new Book('The Devil\'s Teeth', 'Susan Casey', 304, true),
    new Book('Prince of Thorns', 'Mark Lawrence', 336, true),
    new Book('Shantaram', 'Gregory David Roberts', 944, true),
    new Book('The Devil\'s Teeth', 'Susan Casey', 304, true),
    new Book('Prince of Thorns', 'Mark Lawrence', 336, true),
    new Book('Shantaram', 'Gregory David Roberts', 944, true),
    new Book('The Devil\'s Teeth', 'Susan Casey', 304, true)
];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.bookInfo = function() {
        let readText = null
        if (this.read === true) {
            readText = 'read';
        } else if (this.read === false) {
            readText = 'not read yet';
        }
        let info = `${this.title} by ${this.author}, ${this.pages} pages, ${readText}`;
        return info
    }
};

// display new book form
const NewBookForm = {
    body: document.querySelector('body'),
    newBookBtn: document.getElementById('new-book-btn'),
    newBookForm: document.getElementById('new-book-form'),
    toggle: false,
    openForm: function() {
        this.newBookForm.style.display = 'block';
        this.toggle = true;
    },
    closeForm: function() {
        this.newBookForm.style.display = 'none';
        this.toggle = false;
    }
}
NewBookForm.body.addEventListener('click', (e) => {
    let target = e.target;
    switch(target.id) {
        case 'new-book-btn':
            if (NewBookForm.toggle === false) {
                NewBookForm.openForm();
            } else {
                NewBookForm.closeForm();
            }
            break;
        case 'submit-book-btn':
            // get submitted form data
            const form = document.getElementById('new-book-data');
            // prevent form from submitting data
            e.preventDefault();
            const title = document.getElementById("title").value;
            const author = document.getElementById("author").value;
            const pages = document.getElementById("pages").value;
            if (title != '' && author != '' && pages != '') {
                const book = new Book(title, author, pages,
                    document.getElementById("read").value === 'true');
                myLibrary.push(book);
                addRow(book);            
                form.reset();
                NewBookForm.closeForm();
                console.log(book);
            } else { 
                alert('Please complete all fields')
            }

        case 'close-form':
            NewBookForm.closeForm();
        // default:
        //     NewBookForm.closeForm();
    } 
});

// open new book dialog
// function addNewBook() {
//     const newBookBtn = document.getElementById('new-book-btn');
//     const dialog = document.getElementById('new-book-dialog');
//     const body = document.querySelector('body');
//     newBookBtn.addEventListener("click", () => {
//         dialog.showModal();
//         body.addEventListener('click', (e) => {
//             let target = e.target;
//             switch(target.id) {
//             case 'submit-book-btn':
//                 // get submitted form data
//                 const form = document.getElementById('new-book-data');
//                 // prevent form from submitting data
//                 e.preventDefault();
//                 const book = new Book(document.getElementById("title").value,
//                     document.getElementById("author").value,
//                     document.getElementById("pages").value,
//                     document.getElementById("read").value === 'true');
//                 myLibrary.push(book);
//                 addRow(book);            
//                 form.reset();
//                 dialog.close();
//             case 'close-form':
//                 dialog.close();
//             }
//         });
//     });
// }
// addNewBook();


function createCheckbox(book) {
    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.name = "read";
    checkbox.value = "true";
    checkbox.id = "id";
    if (book.read === true) {
        checkbox.checked = true;
    } else {
        checkbox.checked = false;
    }
    return checkbox;
}
function createDeleteBtn() {
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.setAttribute('id', 'delete-btn');
    return deleteBtn;
}

function addRow(book) {
    const bookTable = document.getElementById('book-table');
    const newRow = document.createElement('tr');
    let column = []
    for (let i = 0; i < 5; i++) {column[i] = document.createElement('td');}
    column[2].setAttribute('class', 'column-3-data')
    column[3].setAttribute('class', 'column-4-data')
    const checkbox = createCheckbox(book);
    checkbox.setAttribute('class', 'check');
    const deleteBtn = createDeleteBtn();
    column[0].textContent = book.title;
    column[1].textContent = book.author;
    column[2].textContent = book.pages;
    column[3].appendChild(checkbox);
    column[4].appendChild(deleteBtn);
    for (let i = 0; i < 5; i++) {
        newRow.appendChild(column[i]);
    }
    bookTable.appendChild(newRow);
    deleteBtn.addEventListener('click', () => {
        newRow.remove();
    })
    // alter read value on change of checkbox
    checkbox.addEventListener('change', function(e) {
        if (e.target.checked) {
          book.read = true;
        } else {
          book.read= false;
        }
    });
}

// add books in array to DOM table
for (const book of myLibrary) {
    addRow(book);
}

