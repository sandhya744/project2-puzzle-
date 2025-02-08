var rows = 3;
var columns = 3;

var currTile;
var otherTile; //blank tile

var turns = 0;
var imgOrder = ["p4", "p2", "p8", "p5", "p1", "p6", "p7", "p9", "p3"];
window.onload = function () {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = imgOrder.shift() + ".jpg";
            
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);
            document.getElementById("board").append(tile);
        }
    }
     
    document.getElementById("scrambleButton").addEventListener("click", scramble);
}

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
    // if (!otherTile.src.includes("p3.jpg")) {
    //     return; // Only allow swapping with the blank tile
    // }
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

        // Check if the puzzle is solved
        checkWin();
    }
}

function scramble() {
    // Reset turns
    turns = 0;
    document.getElementById("turns").innerText = turns;

    // Clear win message and remove animations
    let winMessage = document.getElementById("winMessage");
    winMessage.innerText = "";
    winMessage.classList.remove("winAnimation"); // Remove animation class

    // Remove the fireworks background
    document.body.classList.remove("fireworks-bg");

    // Scramble the tiles
    imgOrder = ["p4", "p2", "p8", "p5", "p1", "p6", "p7", "p9", "p3"];
    imgOrder.sort(() => Math.random() - 0.5);

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.src = imgOrder.shift() + ".jpg";
        }
    }
}
  

function checkWin() {
    let correctOrder = ["p1.jpg", "p2.jpg", "p3.jpg", "p4.jpg", "p5.jpg", "p6.jpg", "p7.jpg", "p8.jpg", "p9.jpg"];
    let isCorrect = true;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            if (!tile.src.includes(correctOrder.shift())) {
                isCorrect = false;
                break;
            }
        }
    }

    if (isCorrect) {
        let winMessage = document.getElementById("winMessage");
        winMessage.innerText = "🎉🎊 YOU DID IT! 🥳🎊";
        winMessage.classList.add("winAnimation");

        // Fireworks Effect
        createFireworks();

        // Remove the animation after 7 seconds
        setTimeout(() => {
            winMessage.classList.remove("winAnimation");
            document.body.classList.remove("fireworks-bg");
        }, 7000);
    }
}

// Fireworks Effect
function createFireworks() {
    document.body.classList.add("fireworks-bg");
}



