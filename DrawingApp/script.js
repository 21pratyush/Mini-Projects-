const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const clearButton = document.getElementById('clearButton');
const eraserButton = document.getElementById('eraserButton');
let isDrawing = false;
let eraseMode = false;

canvas.width = 800;
canvas.height = 500;

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 5;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', endDrawing);
canvas.addEventListener('mouseout', endDrawing);
colorPicker.addEventListener('input', changeColor);
clearButton.addEventListener('click', clearCanvas);
eraserButton.addEventListener('click', toggleEraser);

function startDrawing(e) {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function draw(e) {
    if (!isDrawing) return;
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;

    if (eraseMode) {
        ctx.clearRect(x, y, 40, 40); // Use your desired eraser size
    } else {
        ctx.lineTo(x, y);
        ctx.strokeStyle = colorPicker.value;
        ctx.stroke();
    }
}

function endDrawing() {
    isDrawing = false;
    ctx.closePath();
}

function changeColor() {
    ctx.strokeStyle = colorPicker.value;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

eraserButton.addEventListener('click', toggleEraser);

function toggleEraser() {
    eraseMode = !eraseMode;
    if (eraseMode) {
        eraserButton.classList.add('active');
        eraserButton.style.backgroundColor = 'green';
        eraserButton.style.color = "white";
        canvas.style.cursor = 'alias';
    } else {
        eraserButton.classList.remove('active');
        eraserButton.style.backgroundColor = '';
        canvas.style.cursor = 'crosshair';
    }
}
