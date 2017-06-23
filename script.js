// By Bright A.

// Declare all variables
var canvas = document.getElementById("canvas");
var nightMode = false;
var ctx = canvas.getContext("2d");
var interval, speed, score;
var color = "#008";
var started = false;
var paused = false;
var prev = Date.now();
var frame = 0;

// Create player box
var player = {
    x: 145,
    y: 520,
    size: 100,
    color: "darkblue"
};

// Create array for enemy boxes
var enemies = [];


// When the user presses a key ...
window.addEventListener("keydown", function(e) {
    
    // Find the key the user is pressing and modify player.x
    if (started && !paused) {
        if (e.keyCode == 65 || e.keyCode == 37) { // Left Arrow or A key
            if (player.x > 15) player.x -= 130;
        }  
        if (e.keyCode == 68 || e.keyCode == 39) { // Right Arrow or D key
            if (player.x < 275) player.x += 130;
        }
    }
    
    // Calls 'space' function, which handles starting and pausing the game
    if (e.keyCode == 32) {
        space();
        e.preventDefault();
    }
    
    // Turn night mode on or off and adjust display accordingly (HTML5)
    if (e.keyCode == 66) { // B key
        nightMode = !nightMode;
        color = (nightMode) ? "#88F" : "#008";
        
        if (nightMode) {
            document.body.style.background = "#000";
            canvas.style.background = "#222";
        }
        else {
            document.body.style.background = "#FFF";
            canvas.style.background = "#DDD";
        }
        
        canvas.style.borderColor = color;
        canvas.style.boxShadow = "0 0 20px" + color;
        document.getElementsByTagName("h1")[0].style.color = color;
        document.getElementsByTagName("p")[0].style.color = color;
    }
    
});

// Pause if user switches tabs, windows, etc
window.addEventListener("blur", function () {
    if (started && !paused) space();
});

// Randomly returns an 'x' position for enemy boxes
function xPos() {
    switch (Math.ceil(Math.random() * 3)) {
        case 1:
            return 1;
        case 2:
            return 131;
        case 3:
            return 261;
    }
}

// Basic properties of enemy
function Enemy() {
    this.size = 128;
    this.x = xPos();
    this.y = -this.size;
    this.color = "hsl(" + Math.floor(Math.random() * 359) + ", 100%, 50%)";
}

// Update both enemy boxes
Enemy.update = function () {
    for (var i in enemies) {
        // Create a new box
        if (enemies[i].y > canvas.height) {
            enemies[i] = new Enemy();
            score += 0.5;
        }
        // Or just move the box
        else {
            enemies[i].y += speed;
        }
    }
};

// Handles starting and pausing the game
function space() {
    
    if (started) {
        if (paused) {
            paused = false;
            interval = setInterval(update, 1000 / 60);
            frame = 0;
            prev = Date.now();
        }
        else {
            // Draws a pause screen
            ctx.save();
            ctx.globalAlpha = 0.5;
            ctx.fillStyle = (nightMode) ? "#000" : "#FFF";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.textAlign = "center";
            ctx.font = "20px Arial";
            ctx.fillStyle = (nightMode) ? "#FFF" : "#000";
            ctx.fillText("Paused", canvas.width / 2, canvas.height / 2);
            ctx.restore();
            
            paused = true;
            clearInterval(interval);
        }
    }
    else {
        // Reset variables
        player.x = 145;
        speed = 4;
        score = 0;
        frame = 0;
        prev = Date.now();
        
        // Reset enemy boxes
        for (var i = 0; i < 2; i++)
            enemies[i] = new Enemy();
        
        started = true;
        interval = setInterval(update, 1000 / 60);
    }
    
}

// The game mechanics
function update() {
    
    // FPS calculation
    if (Date.now() - prev >= 1000) {
        console.log(frame + " FPS");
        prev = Date.now();
        frame = 0;
    }
    else frame++;
    
    
    // Update enemy boxes
    Enemy.update();
    
    // Check positions
    for (var i in enemies) {
        
        // Stop game if player touches enemy
        if (player.x < enemies[i].x + enemies[i].size &&
            player.y < enemies[i].y + enemies[i].size &&
            enemies[i].x < player.x + player.size &&
            enemies[i].y < player.y + player.size)
        {
            // Stops the game
            started = false;
            clearInterval(interval);
        }
        
    }
    
    // Change speed based on score
    if (score <= 120)
        speed = (score / 10) + 5;
    
    
    // Clear the screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;
    
    // Draw two lines
    ctx.beginPath();
    ctx.moveTo(130, 0);
    ctx.lineTo(130, canvas.height);
    ctx.moveTo(260, 0);
    ctx.lineTo(260, canvas.height);
    ctx.closePath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = color;
    ctx.stroke();

    // Draw player box
    ctx.fillStyle = color;
    ctx.fillRect(player.x, player.y, player.size, player.size);
    
    // Draw enemy boxes
    for (i in enemies) {
        ctx.fillStyle = enemies[i].color;
        ctx.fillRect(enemies[i].x, enemies[i].y, enemies[i].size, enemies[i].size);
    }
    
    // Draw score
    ctx.font = "40px Comic Sans MS";
    ctx.fillStyle = (nightMode) ? "#000" : "#FFF";
    ctx.textAlign = "center";
    ctx.fillText(
        score, player.x + (player.size / 2),
        player.y + (player.size / 2) + 15
    );
    
}
