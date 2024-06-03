/* eslint-disable no-undef */
// ANIMATION 1

// these variable were in wallpaperengine.js
// A1_STAR_NUM
// A1_SHOOTING_NUM
// STARSIZE
// SHOOTINGSTARSIZE

var width = window.screen.width;
var height = window.screen.height;

canvas.width = width;
canvas.height = height;

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

// stars
function Star(options) {
  this.size = randomInRange(1, STARSIZE);
  this.speed = randomInRange(0.05, 0.1);
  this.x = options.x;
  this.y = options.y;
}

Star.prototype.reset = function () {
  this.size = randomInRange(1, STARSIZE);
  this.speed = randomInRange(0.05, 0.1);
  this.x = width;
  this.y = randomInRange(0, height);
};

Star.prototype.update = function () {
  this.x -= this.speed;
  if (this.x < 0) {
    this.reset();
  } else {
    context.fillRect(this.x, this.y, this.size, this.size);
  }
};

function ShootingStar() {
  this.reset();
}

// shooting star properties
ShootingStar.prototype.reset = function () {
  this.x = randomInRange(0, width * 1.5);
  this.y = 0;
  this.len = randomInRange(10, SHOOTINGSTARLENGTH);
  this.speed = randomInRange(6, 16);
  this.size = randomInRange(0.5, SHOOTINGSTARSIZE);
  // this is used so the shooting stars arent constant
  this.waitTime = Date.now() + randomInRange(500, 3500);
  this.active = false;
};

// shooting star update animation
ShootingStar.prototype.update = function () {
  if (this.active) {
    this.x -= this.speed;
    this.y += this.speed;
    if (this.x < 0 || this.y >= height) {
      this.reset();
    } else {
      context.lineWidth = this.size;
      context.beginPath();
      context.moveTo(this.x, this.y);
      context.lineTo(this.x + this.len, this.y - this.len);
      context.stroke();
    }
  } else {
    if (this.waitTime < new Date().getTime()) {
      this.active = true;
    }
  }
};

var entities = [];

function entitiesUpdate() {
  for (let i = 0; i < A1_STAR_NUM; i++) {
    entities.push(
      new Star({
        x: Math.random() * width,
        y: Math.random() * height,
      })
    );
  }

  // Add 5 shooting stars that just cycle.
  for (let i = 0; i < A1_SHOOTING_NUM; i++) {
    entities.push(new ShootingStar());
  }
}

function changeColor() {
  let hue = 0;
  hue = (hue + 1) % 360;

  return "hsl(" + hue + ", 100%, 50%)";
}

function stopCoolStar() {
  cancelAnimationFrame(animationFrameId);
  animationFrameId = null;
}

function animate() {
  animationFrameId = requestAnimationFrame(animate);

  let color = STARCOLOR;

  if (STARRPGMODE) {
    color = changeColor();
  }

  context.fillStyle = color;
  context.strokeStyle = color;
  context.clearRect(0, 0, width, height);

  var entLen = entities.length;

  for (let i = 0; i < entLen; i++) {
    entities[i].update();
  }
}
