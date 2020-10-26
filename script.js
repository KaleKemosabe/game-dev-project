document.addEventListener('DOMContentLoaded', () => {
const dude = document.querySelector('.dude');
const grid = document.querySelector('.grid');
const alert = document.getElementById('alert');
let isJumping = false;
let gravity = 0.9;
let isGameOver = false;

function control(e) {
// character jump on spacebar
    if (e.keyCode === 32) {
        if (!isJumping) {
            isJumping === true;
            jump()
        }
    }
}
document.addEventListener('keyup', control);

let position = 0;
function jump() {
    let count = 0;
    let timerId = setInterval(function () {
// dude moving down after jump
        if (count === 20) {
            clearInterval(timerId);
            let downTimerId = setInterval(function () {
                if (count === 0) {
                    clearInterval(downTimerId);
                    isJumping === false;
                }
// character not falling underground or floating when position approx -= 2
                position -= 2;
                count--;
                position = position * gravity;
                dude.style.bottom = position + 'px';
            },25)
        }
// dude moving up on jump
        position +=20;
        count++;
        position = position * gravity;
        dude.style.bottom = position + 'px';
        console.log(dude.style.bottom);
    },20)
}
// create obstacles, define speed, position etc
function generateObstacles() {
    let randomTime = Math.random() * 3000;
    let obstaclePosition = 1500;
    const obstacle = document.createElement('div');
    if (!isGameOver) obstacle.classList.add('obstacle');
    grid.appendChild(obstacle);
    obstacle.style.left = obstaclePosition + 'px'

    let timerId = setInterval(function() {
// when crashing to character
        if (obstaclePosition > 0 && obstaclePosition < 100 && position < 100) {
            clearInterval(timerId);
// game over message
            alert.innerHTML = 'Dude, you suck!';
            isGameOver = true;
// remove all children when crashing on character
            while (grid.firstChild) {
                grid.removeChild(grid.lastChild);
            }
        }
// change obstaclePosition to 10 for slower version
        obstaclePosition -= 15;
        obstacle.style.left = obstaclePosition + 'px';
    },20)
    if (!isGameOver) setTimeout(generateObstacles, randomTime);
}
generateObstacles();

})