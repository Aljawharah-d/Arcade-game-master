// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 40;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed = 1;
    this.speed = (Math.random() + 1) * this.speed * 200;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 400) {
        this.x += this.speed * (dt);
    } else {
        this.x = -205;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 40;
    this.sprite = 'images/char-princess-girl.png';
    this.speed = 1;
};

// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function(dt) {
    if (this.y <= 0) {
        this.reset(200, 400);
    }
};

Player.prototype.handleInput = function(allowedKeys) {
    if( allowedKeys === 'left' && this.x > 0 )
        this.x -= 101; //this.x - 20;
    else if( allowedKeys === 'right' && this.x < 400)
        this.x += 101; //this.x + 20;
    else if( allowedKeys === 'up' && this.y > 0)
        this.y -= 83;//this.y - 20;
    else if( allowedKeys === 'down' && this.y < 400)
        this.y += 83; //this.y + 20;

};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [
    new Enemy(-205, 60, 1),
    new Enemy(-205, 145, 1),
    new Enemy(-205, 230, 1)
  //  new Enemy(-205, 60, 1),
  //  new Enemy(-205, 145, 1),
  //  new Enemy(-205, 230, 1)
];

// Place the player object in a variable called player
var player = new Player(200, 400);

Player.prototype.reset = function(x, y) {
    if (this.y> 0) {
        this.score -= 50;
    }
    this.x = x;
    this.y = y;
};

function checkCollisions(Enemy, player) {
  for (var i = 0; i < Enemy.length; i++) {
      if (Enemy[i].x < player.x + player.width &&
          Enemy[i].x + Enemy[i].width > player.x &&
          Enemy[i].y < player.y + player.height &&
          Enemy[i].height + Enemy[i].y > player.y)
            {
            player.reset(200, 400);
        }
      }
};


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
