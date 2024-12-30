// TOP 004 Etch-a-Sketch Project

// constants
const body = document.querySelector('body');
const gridContainer = document.querySelector('#grid_container');
const gridSquareClass = document.querySelector('.grid_square');

// variables
let gridSize = null;
let squareSize = null;

// functions
// popup to input number of squares per side in grid
function clearPreviousGrid() {
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
}
function gridSizeF(){
    let numOfSquares = Number(prompt("Squares per side:", 16));
    if (typeof numOfSquares !== 'number'){
        numOfSquares = 16;  
    }
    numOfSquares = Math.max(16, numOfSquares);
    numOfSquares = Math.min(50, numOfSquares);
    gridSize = numOfSquares
    return gridSize;
}
function resetGridContainerSize() {
    gridContainer.style.width = '39%';
}
function getSquareSize() {
    let containerWidth = getWidthOf(gridContainer);
    let pixelNumber = Math.floor(containerWidth / gridSize);
    // console.log(pixelNumber);
    let pixelString = `${Math.floor(containerWidth / gridSize)}px`;
    let output = [pixelNumber, pixelString];
    return output;
}
function createRowOfDivs(size, rowNum) {
    const rowDiv = document.createElement('div');
    rowDiv.setAttribute('class', `row`);
    for (i = 0; i < size; i++) {
        const div = document.createElement('div');
        div.setAttribute('id', `div_${rowNum}_${i}`);
        div.setAttribute('class', `grid_square`);
        div.style.width = squareSize;
        div.style.height = squareSize;
        rowDiv.appendChild(div);
    }
    gridContainer.appendChild(rowDiv);
}
function createGrid(size) {
    for (x = 0; x < size; x++) {
        createRowOfDivs(size, x);
    }
}
function getWidthOf(container) {
    let width = container.clientWidth;
    return width
}
function adjustGridContainerSize() {
    let containerSide = getSquareSize()[0] * Number(gridSize);
    gridContainer.style.width = `${containerSide}px`;
    gridContainer.style.height = `${containerSide}px`;
    gridContainer.style.backgroundColor = 'white';
}

// click event listener
body.addEventListener('click', (event) => {
    let target = event.target;
    switch(target.id) {
        case 'num_of_squares_btn':
            clearPreviousGrid();
            resetGridContainerSize();
            gridSizeF();
            squareSize = getSquareSize()[1];
            gss = getSquareSize[0];
            createGrid(gridSize);
            adjustGridContainerSize();
            break;
    }
});




let bbb = false;
function handleEvent(event) {
    if (event.type === "mousedown") {
      bbb = true;
    } else if (event.type === 'mouseup') {
      bbb = false;
    }
}

function getColor(bool) {
    let backgroundColor = null
    if (bool === true) {
        a = Math.floor(Math.random() * 255);
        b = Math.floor(Math.random() * 255);
        c = Math.floor(Math.random() * 255);
        d = Math.random();
        backgroundColor = `rgba(${a}, ${b}, ${c}, ${d})`;
    } else {
        backgroundColor = `rgba(0, 0, 0, 0.1`;
    }
    return
}

gridContainer.addEventListener('mouseover', (event) => {
    let target = event.target;
    switch(target.id) {
        case (target.id):
            if (target !== gridContainer) {
                let y = target;
                const backgroundColor = y.style.backgroundColor;
                if (backgroundColor == '') {
                    y.style.backgroundColor = `rgba(0, 0, 0, 0.1`;
                } else {
                    let kk = backgroundColor.split(',');
                    let zz = kk.pop();
                    zz = Number(zz.slice(0, -1));
                    zz += 0.1;
                    zz = Math.min(0.99, zz);
                    zz = `rgba(0, 0, 0, ${zz})`;
                    y.style.backgroundColor = zz;
                }                
            }
        break
    }
    
});


// to do
// - figure out how draw only when left mouse button is clicked



// changes
// - fixed a bug that meant the grid size shrunk every time the grid size was
//   increased by resetting the gridContainer width to 39% - resetGridContainerSize();
