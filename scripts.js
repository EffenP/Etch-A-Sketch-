const gridContainer = document.querySelector('#grid-container');
const controlsContainer = document.querySelector('#controls-container');
const colorPicker = document.querySelector('#color-select');
const progressBar = document.getElementById('progress-bar');


let rainbowActive = false;
let penActive = true;
let eraserActive = false;
let gridSize = 24;
let cell = [];
let currentColor = [];
let currentlyActive;

// Event Listeners...
gridContainer.addEventListener('click', function() { updatePen()});

const fillbtn = document.querySelector('#fill-btn');
fillbtn.addEventListener('click', () => {
	currentColor = getCurrentColour();
	cell.forEach(item => {
		item.style = `background-color: rgba(${currentColor})`;
		item.removeEventListener('mouseenter', draw);
		item.dataset.darken = 0; //reset # of steps needed to get to black
	  })
	  currentlyActive = false;});

const eraserToggle = document.querySelector('#erase-btn');
eraserToggle.addEventListener('click', () => {
	if (eraserActive) {
		eraserActive = false
		eraserToggle.classList.toggle("active");
	} else {
		eraserActive = true;
		rainbowActive = false;
		penActive = false;
		eraserToggle.classList.toggle("active");
}});

const clearbtn = document.querySelector('#clear-btn');
clearbtn.addEventListener('click', () => {
	cell.forEach(item => {
		item.style = 'background-color: rgba(255, 255, 255, 1)';
		item.removeEventListener('mouseenter', draw);
		item.dataset.darken = 0; //reset # of steps needed to get to black
	})
	currentlyActive = false;
});

const rainbowToggle = document.querySelector('#rainbow-btn');
rainbowToggle.addEventListener('click', () => {
	if (rainbowActive) {
		rainbowActive = false
		rainbowToggle.classList.toggle("active");
	} else {
		rainbowActive = true;
		eraserActive = false;
		penActive = false;
		rainbowToggle.classList.toggle("active");
}});


function createGrid(squaresPerSide) {
    removeCells();
    gridContainer.style.gridTemplateColumns = (`repeat(${squaresPerSide}, 1fr`);
    gridContainer.style.gridTemplateRows = (`repeat(${squaresPerSide}, 1fr`);
    let numberOfCells = squaresPerSide * squaresPerSide;
    for(let i = 0; i<numberOfCells; i++) {
      cell[i] = document.createElement('div');
      cell[i].classList.add('cell');
      //cell[i].dataset.darken = 0; //keeps track of current step (0-9) for 'Incrementally Darken'
      cell[i].style = 'background-color: rgba(255, 255, 255, 1)'; //redundant, but deals with override of css styling
      cell[i].addEventListener('click', draw);
      gridContainer.appendChild(cell[i]);
    }
}

// Function to draw with mouse movement, not individualy clicking squares. 
function updatePen() {
	if(!currentlyActive) {
	  cell.forEach(item => {
		item.addEventListener('mouseleave', draw);
	  })
	  currentlyActive = true;
	} else {
	  cell.forEach(item => {
		item.removeEventListener('mouseleave', draw);
	  })
	  currentlyActive = false;
	}
  }

function draw(e) {

	if (eraserActive && !penActive && !rainbowActive) {
		color = [255, 255, 255]
		e.target.style = `background-color: rgba(${color})`;
	} else if (rainbowActive && !penActive && !eraserActive) {
		e.target.style = `background-color: rgba(${getRandomColour()})`;
	} else {
		currentColor = getCurrentColour();
		color = [19, 123, 214, 0.95]
		e.target.style = `background-color: rgba(${currentColor})`;
	}
	
}

function rangeSlider(value) {
	let gridLabels = document.querySelectorAll('#range-value');
	progressBar.style.width = (value / 60) * 100 + '%';
	for (let i = 0; i < gridLabels.length; i++) {
	  gridLabels[i].textContent = value;
	}
	// document.querySelectorAll('#range-value').textContent = value;
	newGridSize = parseInt(value);
	removeCells();
	createGrid(newGridSize);
	
	// turn the grid button back on if it is off.
	
  }

function sliderValue(value) {
	let gridLabels = document.querySelectorAll('#range-value');
	for (let i = 0; i < gridLabels.length; i++) {
		gridLabels[i].textContent = value;
	}
	progressBar.style.width = (value / 60) * 100 + '%';
}

//Helper Functions .... 

function hex2rgb(hex) {
    var validHEXInput = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!validHEXInput) {
        return false;
    }
    var output = [parseInt(validHEXInput[1], 16),parseInt(validHEXInput[2], 16), parseInt(validHEXInput[3], 16)]

    return output;
}

function getRandomColour() {

	const r = Math.floor(Math.random() * 255);
	const g = Math.floor(Math.random() * 255);
	const b = Math.floor(Math.random() * 255);

	return [r,g,b]
}

function getCurrentColour() {
	return hex2rgb(colorPicker.value);
}

function removeCells(){
	while(gridContainer.firstChild) {
		gridContainer.removeChild(gridContainer.firstChild);
	}
}

 
createGrid(gridSize);