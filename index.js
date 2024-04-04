const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const score = document.querySelector("#score");
const resetButton = document.querySelector("#resetButton");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
const snakeColor = "purple";
const snakeBorder = "black";
const foodColor = "red";
const unitSize = 25;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let scoring = 0;
let snake = [
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 },
    { x: 0, y: 0 }
];

window.addEventListener("keydown", changeDirection);
resetButton.addEventListener("click", resetGame);

gameStart();

function gameStart() {
    running = true;
    score.textContent = scoring;
    createFood();
    drawFood();
    nextTick();
};
function nextTick() {
    if (running) {
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 75);
    }
    else {
        displayGameOver();
    }
};
function createFood() {
    function randomFood(min, max) {
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum
    }
    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameWidth - unitSize);
};
function clearBoard() {
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight)
};
function drawFood() {
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
};
function moveSnake() {
    const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };
    snake.unshift(head);
    //if food is eaten
    if (snake[0].x == foodX && snake[0].y == foodY) {
        //if the food is overlapping with the head of the snake it is eaten
        scoring+=1;
        score.textContent = scoring;
        //increases the score for the player when point is eaten and creates a new "Food"
        createFood();
    }
    else {
        snake.pop();
        //gets rid of the tail end when the player moves
    }
};
function drawSnake() {
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })
};
function changeDirection(event) { //is listening for the "keydown" event
    const keyPressed = event.keyCode;
    const Left = 37;
    const Up = 38;
    const Right = 39;
    const Down = 40;
    //keynumber for the arrow directions

    const goingUp = (yVelocity == -unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);

    switch (true) {
        case (keyPressed == Left && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case (keyPressed == Up && !goingDown):
            xVelocity = 0;
            yVelocity = -unitSize;
            break;
        case (keyPressed == Right && !goingLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break;
        case (keyPressed == Down && !goingUp):
            xVelocity = 0;
            yVelocity = unitSize;
            break;
        //This code gives you the way to move and change directions without moving into your self by moving in the opposite direction
    }
};
function checkGameOver() { };
function displayGameOver() { };
function resetGame() { };