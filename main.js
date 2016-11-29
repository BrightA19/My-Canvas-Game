// By Bright A.

// Declare all variables
// the {} are used for neatness in coding workspaces
{
var canvas = window.onload = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = canvas.width,
  height = canvas.height;
var saveColor = [lnColor(), lnColor()];
var player = new Sprite();
var box = [];
var speed = 6;
var score = 0;
var touch = [1, false];
var startIt = [false, undefined];
var init = document.getElementById("start");
}

// Create two 'enemy box'
for (var i = 0; i < 2; i++) {
  box.push(new Sprite());
  box[i].x = 0;
  box[i].y = -130;
  box[i].width = 128;
  box[i].height = 130;
}

// Create two lines
function lines() {
  ctx.moveTo(130, 0);
  ctx.lineTo(130, height);
  ctx.moveTo(260, 0);
  ctx.lineTo(260, height);
  ctx.lineWidth = 1;
  ctx.strokeStyle = "darkblue";
  ctx.stroke();
}

// Find the key the user is pressing and modify player.x
addEventListener("keydown", function(e) {
  switch (e.keyCode) {
    case 37:
      if (player.x > 15) {
        player.x -= 130;
      }
      break;
    case 39:
      if (player.x < 275) {
        player.x += 130;
      }
      break;
    default:
      player.x = player.x;
      break;
  }
});

// Create random hex color (returns value when called)
function lnColor() {
  
  // Create variable hex and push random numbers and letters
  var hex = [];
  for (var i = 0; i < 6; i++) {
    var color = Math.floor(Math.random() * 13);
    switch (color) {
      case 7:
        hex.push("a");
        break;
      case 8:
        hex.push("b");
        break;
      case 9:
        hex.push("c");
        break;
      case 10:
        hex.push("d");
        break;
      case 11:
        hex.push("e");
        break;
      case 12:
        hex.push("f");
        break;
      default:
        hex.push(color);
        break;
    }
  }
  
  // Return all values in hex in HEX color form
  return "#" + hex[0] + hex[1] +
    hex[2] + hex[3] + hex[4] + hex[5]; 
}

// Create randon x Coords onto the three slots (returns value when called)
function xPos() {
  var x = Math.ceil(Math.random() * 3);
  switch (x) {
    case 1:
      return 0 + 1;
    case 2:
      return 131;
    case 3:
      return 261;
  }
}

// Clear lanes (DOES NOT clear two lines)
function clear() {
  ctx.clearRect(0, 0, 129, height);
  ctx.clearRect(131, 0, 128, height);
  ctx.clearRect(261, 0, 129, height);
}

// Basic properties of box and player
function Sprite() {
  this.x = (width / 2) - 50;
  this.y = height - 130;
  this.width = 100;
  this.height = 100;
}

// Reset the game when executed (Alse start up game)
function reset() {

  //Reset variables
  player = new Sprite();
  speed = 6;
  score = 0;
  touch[1] = false;
  box[0].y = -130;
  box[1].y = -130;
  lines();
  clearInterval(startIt[1]);
  startIt[0] = false;

  //Start the game
  startIt[1] = setInterval(update, 10);
  startIt[0] = true;
}

// The game mechanics
function update() {
  // To prevent leftover shapes
  clear();

  // Create player
  ctx.fillStyle = "darkblue";
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Create box
  for (var i in box) {
    if (box[i].y > height) {
      box[i].x = xPos();
      saveColor[i] = lnColor();
      ctx.fillStyle = saveColor[i];
      box[i].y = -130;
      ctx.fillRect(box[i].x, box[i].y, box[i].width, box[i].height);
    } else {
      ctx.fillStyle = saveColor[i];
      ctx.fillRect(box[i].x, box[i].y, box[i].width, box[i].height);
      box[i].y += speed;
    }
  }

  // Check if player and box are touching
  if (
    (
      player.x < box[0].x + box[0].width &&
      player.y < box[0].y + box[0].height &&
      box[0].x < player.x + player.width &&
      box[0].y < player.y + player.height
    ) ||
    (
      player.x < box[1].x + box[1].width &&
      player.y < box[1].y + box[1].height &&
      box[1].x < player.x + player.width &&
      box[1].y < player.y + player.height
    )
  ) {
    touch[1] = true;
    console.log("Touched: " + touch[0]++);
    clearInterval(startIt[1]);
    startIt[0] = false;
  }

  // Score
  if (!touch[1] && box[0].y > height && box[1].y > height) {
    score++;
    console.log(score);
    console.log("Speed: " + speed);
  }
  ctx.font = "40px Comic Sans MS";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText(score, player.x + (player.width / 2) - 2, player.y + (player.height / 2) + 15);

  // Increase the speed
  switch (score) {
    case 5:
      speed = 6.5;
      break;
    case 10:
      speed = 7.0;
      break;
    case 15:
      speed = 7.5;
      break;
    case 20:
      speed = 8.0;
      break;
    case 25:
      speed = 8.5;
      break;
    case 30:
      speed = 9.0;
      break;
    case 35:
      speed = 9.5;
      break;
    case 40:
      speed = 10.0;
      break;
    case 45:
      speed = 10.5;
      break;
    case 50:
      speed = 11.0;
      break;
    case 55:
      speed = 11.5;
      break;
    case 60:
      speed = 12.0;
      break;
  }
  
  // To change the button that was clicked
  init.innerHTML = "Restart Game";
}

// When button is clicked, then 'reset' executes
init.onclick = reset;