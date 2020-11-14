/*
  Code modified from:
  http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
  using graphics purchased from vectorstock.com
*/

/* Initialization.
Here, we create and add our "canvas" to the page.
We also load all of our images. 
*/

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1244;
canvas.height = 700;
document.body.appendChild(canvas);

let bgReady, aimPointReady, monsterReady, fireReady, shootReady;
let bgImage, aimPointImage, monsterImage, fireImage, shootImage;

let startTime = Date.now();
const SECONDS_PER_ROUND = 30;
let elapsedTime = 0;

function loadImages() {
  bgImage = new Image();
  bgImage.onload = function () {
    // show the background image
    bgReady = true;
  };
  bgImage.src = "images/maxresdefault.jpg";
  shootImage = new Image();
  shootImage.onload = function () {
    // show the background image
    shootReady = false;
  };
  shootImage.src = "images/img3.png";
  fireImage = new Image();
  fireImage.onload = function () {
    // show the background image
    fireReady = false;
  };
  fireImage.src = "images/fire3.png";
  aimPointImage = new Image();
  aimPointImage.onload = function () {
    // show the aimPoint image
    aimPointReady = true;
  };
  aimPointImage.src = "images/Picture1-removebg-preview.png";

  monsterImage = new Image();
  monsterImage.onload = function () {
    // show the monster image
    monsterReady = true;
  };
  monsterImage.src = "images/halo-removebg-preview.png";
}

/**
 * Setting up our characters.
 *
 * Note that heroX represents the X position of our hero.
 * heroY represents the Y position.
 * We'll need these values to know where to "draw" the hero.
 *
 * The same applies to the monster.
 */

let aimPointX = canvas.width / 2;
let aimPointY = canvas.height / 2;

let monsterX = Math.floor(Math.random() * canvas.width) - 600;
let monsterY = 175 + Math.floor(Math.random() * canvas.height) / 2;

var shootSound;
var d = aimPointX - monsterX;
var f = aimPointY - monsterY;

let keysPressed = {};
function setupKeyboardListeners() {
  // Check for keys pressed where key represents the keycode captured
  // For now, do not worry too much about what's happening here.
  document.addEventListener("mousedown", shoot);
  document.addEventListener("mouseup", stopShoot);
  document.addEventListener("mousemove", mouseMoveHandler, false);
}

function shoot() {
  fireReady = true;
  shootReady = true;
  playAudio();
  if (d < 25 || f < 40) {
    monsterReady = false;
  }
}
function stopShoot() {
  fireReady = false;
  shootReady = false;
  if ((monsterReady = false)) {
    monsterReady = true;
  }
}
function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    aimPointX = relativeX - 17;
  }
  var relativeY = e.clientY - canvas.offsetLeft;
  if (relativeY > 0 && relativeY < canvas.height) {
    aimPointY = relativeY - 15;
  }
}
var audioType;
var audio = new Audio();
if (audio.canPlayType("audio/mp3")) {
  audioType = ".mp3";
} else {
  audioType = ".wav";
}

//Function to play the exact file format
function playAudio() {
  var audio = new Audio("sound/shoot" + audioType);
  audio.play();
}
function update() {
  if ((dead = true)) {
    monsterReady = true;
  }
}

function render() {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }
  if (monsterReady) {
    ctx.drawImage(monsterImage, monsterX, monsterY);
    {
      if (monsterX < 0) {
        monsterX = 49;
      }
    }
  }
  if (aimPointReady) {
    ctx.drawImage(aimPointImage, aimPointX, aimPointY);
  }
  if (shootReady) {
    ctx.drawImage(shootImage, aimPointX - 10, aimPointY - 5);
  }
  if (fireReady) {
    ctx.drawImage(fireImage, 625, 350);
  }
}

function main() {
  update();
  render();
  requestAnimationFrame(main);
}

var w = window;
requestAnimationFrame =
  w.requestAnimationFrame ||
  w.webkitRequestAnimationFrame ||
  w.msRequestAnimationFrame ||
  w.mozRequestAnimationFrame;

// Let's play this game!
loadImages();
setupKeyboardListeners();
main();
