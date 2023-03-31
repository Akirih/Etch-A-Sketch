

function setWorkspace (size = 8){
    workspace.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    workspace.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    // console.log(workspace);
}

function createGrid (size = 8){
    
    workspace.innerHTML = '';  
    for (i = 1; i <= (size*size); i++){
        const div = document.createElement('div');
        workspace.appendChild(div).className= 'grid-element';
    }
    const grid = document.querySelectorAll('.grid-element');
    grid.forEach(square => square.addEventListener('mouseenter', paint));
    
}

function sliderGrid(e) {
    setWorkspace(e.target.value);
    createGrid(e.target.value);
    
    const sliderValue = document.getElementById ('slider-value');
    sliderValue.innerHTML = e.target.value + "x" + e.target.value;
}

function paint(){
    const rainbowCheck = document.getElementById('rainbow-button');
    if (isPainting == true){
        if (rainbowCheck.checked){
            this.style.backgroundColor = unicornVomit();
        }else this.style.backgroundColor = paintColor;
    } 
}

function updateColor (e){
    paintColor = e.target.value;
}

function unicornVomit(){
    return ("rgb("+(Math.floor(Math.random()*256))+","+(Math.floor(Math.random()*256))+","+(Math.floor(Math.random()*256))+")")
}

const etsContainer = document.getElementById('ets-container');
let isPainting = false;
let paintColor = 'black';

document.addEventListener('DOMContentLoaded', function(){
    etsContainer.innerHTML = '<div id="workspace" ondragstart="return false;"></div><div id="toolbox"><ul><li><div id="tool-1"><p>Color Picker</p><input type="color" value="#000000" id="color-picker"></div></li><li><div id="tool-2"><p id="slider-value">8x8</p><input type="range" id="grid-size" min="2" max="64" value="8" step="2"></div></li><li><div id="tool-3"><p>Rainbow?</p><label class="switch"><input type="checkbox" id="rainbow-button" value="Rainbow"><span class="slider round"></span></label></div></li><li><div id="tool-4"><input type="button" id="reset-button" value="Clear"></div></li></ul></div>';
    
    const workspace = document.getElementById ('workspace');
    setWorkspace();
    createGrid();
    let colorPicker = document.querySelector('#color-picker');
    colorPicker.value = paintColor;
    colorPicker.addEventListener('change', updateColor);
    let gridSize = document.querySelector('#grid-size');
    const resetButton = document.getElementById('reset-button')
    gridSize.addEventListener('change', sliderGrid);
    workspace.addEventListener('mousedown', () => isPainting = true);
    workspace.addEventListener('mouseup', () => isPainting = false);
    workspace.addEventListener('mouseleave', () => isPainting = false);
    resetButton.addEventListener('click', ()=> {
        setWorkspace(gridSize.value);
        createGrid(gridSize.value);
    });
}, false)