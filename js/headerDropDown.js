
const currentPage = location.pathname.split("/").pop();
function createPath(page) {
    if (currentPage === 'index.html') {
        path = `../html/${page}`;
    } else {
        path = `../html/${page}`;
    }
    return path;
}

// create header links
const headerLinksDiv = document.getElementById('header-links');
const headerLinks = [
    ['Dashboard', 'admin-dashboard.html'],
    ['About', '#'],
    ['Sign Up', 'sign-up.html'],
    ['Login', '#']
]
function addHeaderLink(name, page) {
    const link = document.createElement('a');
    link.textContent = name;
    link.href = createPath(page);
    headerLinksDiv.appendChild(link);
}
for (link of headerLinks) {
    addHeaderLink(link[0], link[1]);
}

// create menu contents
function addMenuItem(content, type, page) {
    function formatItem() {
        if (type === 'a') {
            item.href = path;
            item.classList.add('menu-item');
        } else if (type === 'h3') {
            item.classList.add('menu-heading');
        }
    }
    const menu = document.getElementById('header-dropdown-content');
    const item = document.createElement(type);
    path = createPath(page);
    item.textContent = content;
    formatItem();
    menu.appendChild(item);
}

menuContent = [
    ['Tools', 'h3', '#'],
    ['| Shopping List', 'a', 'shopping-list.html'],
    ['| Library', 'a', 'library.html'],
    ['| Calculator', 'a', 'calculator.html'],
    ['Games', 'h3', '#'],
    ['| Tic Tac Toe', 'a', 'tictactoe.html'],
    ['| Rock Paper Scissors', 'a', 'rps.html'],
    ['| Etch-a-Sketch', 'a', 'etch-a-sketch.html'],
    ['Pages', 'h3', '#'],
    ['| Landing Page', 'a', 'landing-page.html'],
]
// add items to menu
for (item of menuContent) {
    addMenuItem(item[0], item[1], item[2]);
}


const DropdownMenu = {
    body: document.querySelector('body'),
    dropdownBtn: document.getElementById('burger-menu-btn'),
    dropdownContent: document.getElementById('header-dropdown-content'),
    toggle: false,
    openMenu: function() {
        this.dropdownContent.style.display = 'block';
        this.toggle = true;
    },
    closeMenu: function() {
        this.dropdownContent.style.display = 'none';
        this.toggle = false;
    }
}

DropdownMenu.body.addEventListener('click', (e) => {
    let target = e.target;
    switch(target.id) {
        case 'burger-menu-btn':
            if (DropdownMenu.toggle === false) {
                DropdownMenu.openMenu();
            } else {
                DropdownMenu.closeMenu();
            }
            break;
        default:
            DropdownMenu.closeMenu();
    } 
});

window.addEventListener('keyup', (e) => {
    if (e.key === 'Escape') {
        if (DropdownMenu.toggle === true) {
            DropdownMenu.closeMenu();
        }
    }
});

