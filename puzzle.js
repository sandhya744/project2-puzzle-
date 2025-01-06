var rows = 3;
var columns = 3;

var currTile;
var otherTile;

var turns = 0;
var timerInterval;
var remainingTime = 300; // Timer in seconds (5 minutes)

var originalOrder = ["p4", "p2", "p8", "p5", "p1", "p6", "p7", "p9", "p3"];
var imgOrder = [...originalOrder];

window.onload = function () {
    initializeBoard();
    document.getElementById("restart-button").addEventListener("click", restartGame);
};

function initializeBoard() {
    let board = document.getElementById("board");
    board.innerHTML = ""; // Clear the board
    turns = 0;
    document.getElementById("turns").innerText = turns;

    imgOrder = [...originalOrder];
    remainingTime = 300; // Reset timer to 5 minutes
    startTimer(); // Start the timer

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = imgOrder.shift() + ".jpg";

            // Add desktop drag-and-drop events
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            // Add mobile touch events
            tile.addEventListener("touchstart", touchStart);
            tile.addEventListener("touchmove", touchMove);
            tile.addEventListener("touchend", touchEnd);

            board.append(tile);
        }
    }
}

function restartGame() {
    clearInterval(timerInterval); // Stop the timer
    initializeBoard(); // Reinitialize the board
}

// Timer logic
function startTimer() {
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        remainingTime--;
        updateTimerDisplay();
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            alert("Time's up! Game over.");
            restartGame();
        }
    }, 1000);
}

function updateTimerDisplay() {
    let minutes = Math.floor(remainingTime / 60);
    let seconds = remainingTime % 60;
    document.getElementById("timer").innerText =
        minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0");
}

// Drag-and-drop handlers
function dragStart() {
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
    otherTile = this;
}

function dragEnd() {
    swapTiles();
}

// Touch handlers
function touchStart(e) {
    e.preventDefault();
    currTile = e.target;
}

function touchMove(e) {
    e.preventDefault();
    let touch = e.touches[0];
    let element = document.elementFromPoint(touch.clientX, touch.clientY);
    if (element && element.tagName === "IMG") {
        otherTile = element;
    }
}

function touchEnd() {
    swapTiles();
}

// Swap tiles logic
function swapTiles() {
    if (!currTile || !otherTile) return;

    let currCoords = currTile.id.split("-");
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = r == r2 && c2 == c - 1;
    let moveRight = r == r2 && c2 == c + 1;
    let moveUp = c == c2 && r2 == r - 1;
    let moveDown = c == c2 && r2 == r + 1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;

        turns += 1;
        document.getElementById("turns").innerText = turns;
    }

    currTile = null;
    otherTile = null;
}
