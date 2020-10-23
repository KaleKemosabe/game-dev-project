document.addEventListener('DOMContentLoaded', () => {
const dude = document.querySelector('.dude');
const grid = document.querySelector('.grid');
const alert = document.getElementById('alert');
let isJumping = false;
let gravity = 0.9;
let isGameOver = false;

function control(e) {
    if (e.keyCode === 32) {
        if (!isJumping) {
            isJumping === true;
            jump()
        }
// check out keycodes -- e.g. 32 is spacebar
    }
}
document.addEventListener('keyup', control);

let position = 0;
function jump() {
    let count = 0;
    let timerId = setInterval(function () {
        // move down
        if (count === 15) {
            clearInterval(timerId);
            console.log('down');
            let downTimerId = setInterval(function () {
                if (count === 0) {
                    clearInterval(downTimerId);
                    isJumping === false;
                }
                position -= 5;
                count--;
                position = position * gravity;
                dude.style.bottom = position + 'px';
            },20)
        }
        //move up
        console.log('up');
        position +=30;
        count++;
        position = position * gravity;
        dude.style.bottom = position + 'px';
        console.log(dude.style.bottom);
    },20)
}

function generateObstacles() {
    let randomTime = Math.random() * 4000;
    let obstaclePosition = 1000;
    const obstacle = document.createElement('div');
    if (!isGameOver) obstacle.classList.add('obstacle');
    grid.appendChild(obstacle);
    obstacle.style.left = obstaclePosition + 'px'

    let timerId = setInterval(function() {
        if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60) {
            clearInterval(timerId);
            alert.innerHTML = 'Game over'
            isGameOver = true;
            // remove all children
            while (grid.firstChild) {
                grid.removeChild(grid.lastChild);
            }
        }

        obstaclePosition -= 10;
        obstacle.style.left = obstaclePosition + 'px';
    },15)
    if (!isGameOver) setTimeout(generateObstacles, randomTime);
}
generateObstacles();

})