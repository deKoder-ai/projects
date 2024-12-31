'use strict'
const BOOK = {
    id: 0,
    library: []
}

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.deleteBtn = null
        this.bookInfo = function() {
            let readText = null
            if (this.read === true) {
                readText = 'read';
            } else if (this.read === false) {
                readText = 'not read yet';
            }
            let info = `${this.title} by ${this.author}, ${this.pages} pages, ${readText}`;
            return info
        };
        this.addReadCheck = function() {
            this.checkbox = document.createElement('input');
            this.checkbox.type = "checkbox";
            this.checkbox.name = "read";
            this.checkbox.value = this.read;
            this.checkbox.id = `check-${BOOK.id}`;
            this.checkbox.setAttribute('class', 'check');
            if (this.read === true) {
                this.checkbox.checked = true;
            } else {
                this.checkbox.checked = false;
            }
            return this.checkbox;
        }
        this.addReadCheck();

        this.deleteBtn = function() {
            this.deleteBtn = document.createElement('button');
            this.deleteBtn.id = `delete-${BOOK.id}`;
            this.deleteBtn.textContent = 'Delete';
            this.deleteBtn.setAttribute('class', 'delete-btn');
        }
        this.deleteBtn();
    }
};

(function initialiseLibrary() {
    const lib = [
        ['Prince of Thorns', 'Mark Lawrence', 336, true],
        ['Shantaram', 'Gregory David Roberts', 944, true],
        ['The Devil\'s Teeth', 'Susan Casey', 304, true],
        ['The Dice Man', 'Luke Rhinehart', 430, true],
        ['Six of Crows', 'Leigh Bardugo.', 465, true],
        ['Beauty Is a Wound', 'Eka Kurniawan', 384, true],
        ['The Passage', 'Justin Cronin', 766, true],
        ['City of Dreaming Books', 'Walter Moerse', 432, true],
        ['Metro 2033', 'Dmitry Glukhovsky', 458, true]
    ];
    for (let i = 0; i < lib.length; i++) {
        let item = new Book(lib[i][0], lib[i][1], lib[i][2], lib[i][3], i);
        item.id = BOOK.id;
        addRow(item);
        BOOK.library.push(item);
    }
})();

function addRow(book) {
    const bookTable = document.getElementById('book-table');
    const newRow = document.createElement('tr');
    newRow.id = `row-${BOOK.id}`;
    const column = []
    for (let i = 0; i < 5; i++) {
        column[i] = document.createElement('td');
    }
    column[2].setAttribute('class', 'column-3-data')
    column[3].setAttribute('class', 'column-4-data')
    column[0].textContent = book.title;
    column[1].textContent = book.author;
    column[2].textContent = book.pages;
    column[3].appendChild(book.checkbox);
    column[4].appendChild(book.deleteBtn);
    for (let i = 0; i < 5; i++) {
        newRow.appendChild(column[i]);
    }
    bookTable.appendChild(newRow);
    BOOK.id++;
}

const NewBookForm = {
    form: document.getElementById('new-book-data'),
    newBookBtn: document.getElementById('new-book-btn'),
    newBookFormContainer: document.getElementById('new-book-form-container'),
    toggle: false,
    openForm: function() {
        this.newBookFormContainer.style.display = 'block';
        this.toggle = true;
        document.getElementById('title').focus();
    },
    closeForm: function() {
        this.newBookFormContainer.style.display = 'none';
        this.toggle = false;
    }
}

function addBook() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").value;
    if (title != '' && author != '' && pages != '') {
        const book = new Book(title, author, pages, read, BOOK.id);
        BOOK.library.push(book);
        addRow(book);            
        NewBookForm.form.reset();
        NewBookForm.closeForm();
        console.log(book);
    } else { 
        alert('Please complete all fields')
    }
}

(function formEvents() {
    document.body.addEventListener('click', (e) => {
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
                // prevent form from submitting data
                e.preventDefault();
                addBook();
            case 'close-form':
                NewBookForm.closeForm();
        } 
    });
    document.body.addEventListener('keyup', function(e) {
        if (e.key == "Escape") {
            NewBookForm.form.reset();
            NewBookForm.closeForm();
        }
    });
})();

(function changeReadStatus() {
    document.body.addEventListener('change', (e) => {
        const targetID = e.target.id;
        const checkID = targetID.split('-')[1];
        switch(targetID) {
            case `check-${checkID}`:
                const checkbox = document.getElementById(`check-${checkID}`);
                for (const book of BOOK.library) {
                    if (book.id == checkID) {
                        if (checkbox.checked) {
                            book.read = true;
                        } else {
                            book.read = false;
                        }
                    break;
                    }
                }
        }
    });
})();

(function deleteBook(){
    document.body.addEventListener('click', (e) => {
        const targetID = e.target.id;
        const delID = targetID.split('-')[1];
        switch(targetID) {
            case `delete-${delID}`:
                const delRow = document.getElementById(`row-${delID}`);
                delRow.remove();
                BOOK.library.splice(delID, 1);
                break;
            }
    });
})();