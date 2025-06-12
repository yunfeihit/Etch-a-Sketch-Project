//------------FUNCTION------------
//Create grid in canvas
function createGrid(n=16) {
    const canvas = document.querySelector('.canvas');
    //FIRST STEP: use loop to create horizonal bar(name:'horBar') in column direction
    //The amount is 'n', which can be modified after
    //The direction of container is already set to 'column'
    for (let i = 0; i < n; i++) {
        const horBar = document.createElement('div');
        horBar.classList.add('horBar');
        canvas.appendChild(horBar);
        //SECOND STEP: use loop to create grid in horizonal bar in row direction
        //The amount is 'n', which can be modified after
        for (let i = 0; i < n; i++) {
            const grid = document.createElement('div');
            grid.classList.add('grid');
            grid.setAttribute('gray-counter','1');//create a counter to memerize how much gray the grid should be, initial '1'
            horBar.appendChild(grid);
            //CHANGE GRID COLOR on event listener
            grid.addEventListener('mouseover', changeGridColor);
        }
    }
}

//Change grid color (default: black)
function changeGridColor(event) {
    if (mouseDown) {
        if(ifRainbow) {
            changeGridToRainbow(event);
        } else if (ifEraser) {
            changeGridToEraser(event);
        } else if (ifGray) {
            changeGridMoreGray(event);
        } else {
            changeGridToBlack(event);
        }
    }
}


function changeGridToRainbow(event) {
    let randomBgColor = getRandomColor();
    event.target.style.backgroundColor = randomBgColor;
}

function changeGridToEraser(event) {
    event.target.style.backgroundColor = '';
}

function changeGridMoreGray(event) {
    let grayCounter = event.target.getAttribute('gray-counter');
    if (grayCounter < 10) {
        grayCounter++;
        event.target.setAttribute('gray-counter',grayCounter);
    };
    event.target.style.backgroundColor = `rgba(0,0,0,${(grayCounter/10)})`;
}

function changeGridToBlack(event) {
    event.target.style.backgroundColor = 'black';
}





//Get a random color
function getRandomColor() {
    return `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`;
}
//------------FUNCTION------------



//make the color change ONLYIF the mouse is held down 
//ACHIEVEMENT: define a 'mouseDown' value
document.querySelector('.canvas').addEventListener('mousedown',() => mouseDown = true);
document.querySelector('.canvas').addEventListener('mouseup', () => mouseDown = false);



//------------SIZE INPUT------------
//define the size value and the automatic show the choosed size
const sizeInput = document.querySelector('#sizeInput');
let currentSize = sizeInput.value;
//everytime rechange the selector, do followings to reset the grids:
// 1. update the 'currentSize' value;
// 2. show the size choosed in the '.showSize' textContent
// 3. clear the canvas
// 4. bulid new grid based on the size choosed
sizeInput.addEventListener('click', () => {
    currentSize = sizeInput.value;
    document.querySelector('#showSize').textContent = `${currentSize} X ${currentSize}`;
    document.querySelector('.canvas').innerHTML = '';
    createGrid(currentSize);
})


//BUTTON VALUE
let mouseDown = false;
let ifRainbow = false;
let ifEraser = false;
let ifGray = false;

//------------RAINBOW BUTTON(1)------------
//change the 'ifRainbow' value from the 'Rainbow Button'
const rainbowBtn = document.querySelector('#rainbowBtn')
document.querySelector('#rainbowBtn').addEventListener('mousedown',() => {
    //change: 
    ifRainbow = !ifRainbow;
    rainbowBtn.style.backgroundColor = ifRainbow ? "white" : "black";
    rainbowBtn.style.color = ifRainbow ? "black" : "white";

    //set: Eraser Button--not choosen
    ifEraser = false;
    eraserBtn.style.backgroundColor = 'black';
    eraserBtn.style.color = 'white';

    //set: Gray Button--not choosen
    ifGray = false;
    grayBtn.style.backgroundColor = 'black';
    grayBtn.style.color = 'white';

})

//------------ERASER BUTTON(2)------------
//change the 'ifEraser' value from the 'Eraser Button'
const eraserBtn = document.querySelector('#eraserBtn')
document.querySelector('#eraserBtn').addEventListener('mousedown',() => {
    //change: 
    ifEraser = !ifEraser;
    eraserBtn.style.backgroundColor = ifEraser ?  "white" : "black";
    eraserBtn.style.color = ifEraser ? "black" : "white";

    //set: Rainbow Button--not choosen
    ifRainbow = false;
    rainbowBtn.style.backgroundColor = 'black';
    rainbowBtn.style.color = 'white';

    //set: Gray Button--not choosen
    ifGray = false;
    grayBtn.style.backgroundColor = 'black';
    grayBtn.style.color = 'white';
})

//------------GRAY BUTTON(3)------------
//change the 'ifGray' value from the 'Gray Button'
const grayBtn = document.querySelector('#grayBtn')
document.querySelector('#grayBtn').addEventListener('mousedown',() => {
    //change: 
    ifGray = !ifGray;
    grayBtn.style.backgroundColor = ifGray ? "white" : "black";
    grayBtn.style.color = ifGray ? "black" : "white";

    //set: Rainbow Button--not choosen
    ifRainbow = false;
    rainbowBtn.style.backgroundColor = 'black';
    rainbowBtn.style.color = 'white';

    //set: Eraser Button--not choosen
    ifEraser = false;
    eraserBtn.style.backgroundColor = 'black';
    eraserBtn.style.color = 'white';
})





//disable all drag 
document.addEventListener('dragstart', (event) => event.preventDefault());




//------------INITIAL------------
createGrid();//run once when the page is loaded to initial the grids