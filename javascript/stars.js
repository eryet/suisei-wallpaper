/* eslint-disable no-undef */
// shooting start code

// these variable were in wallpaperengine.js
// STARNUMBER
// SHOOTINGSTARNUMBER
// STARSIZE
// SHOOTINGSTARSIZE

(function () {
  var requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
  window.requestAnimationFrame = requestAnimationFrame;
})();

var background = document.getElementById("particleCanvas"),
  bgCtx = background.getContext("2d"),
  width = window.screen.width,
  height = window.screen.height;

background.width = width;
background.height = height;

// bgCtx.fillStyle = "#05004c";
// bgCtx.fillRect(0, 0, width, height);

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
    bgCtx.fillRect(this.x, this.y, this.size, this.size);
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
      bgCtx.lineWidth = this.size;
      bgCtx.beginPath();
      bgCtx.moveTo(this.x, this.y);
      bgCtx.lineTo(this.x + this.len, this.y - this.len);
      bgCtx.stroke();
    }
  } else {
    if (this.waitTime < new Date().getTime()) {
      this.active = true;
    }
  }
};

var entities = [];

function entitiesUpdate() {
  for (let i = 0; i < STARNUMBER; i++) {
    entities.push(
      new Star({
        x: Math.random() * width,
        y: Math.random() * height,
      })
    );
  }

  // Add 5 shooting stars that just cycle.
  for (let i = 0; i < SHOOTINGSTARNUMBER; i++) {
    entities.push(new ShootingStar());
  }
}

entitiesUpdate();

var hue = 0;
function changeColor() {
  hue = (hue + 1) % 360;

  return "hsl(" + hue + ", 100%, 50%)";
}

function animate() {
  // init the stars
  // var img = new Image();
  // img.src = "../images/background.jpg";
  // bgCtx.createPattern(img, "no-repeat");
  // bgCtx.fillStyle = "#ffffff";
  // bgCtx.strokeStyle = "#ffffff";
  // bgCtx.fillStyle = "#ff0000";
  // bgCtx.strokeStyle = "#ff0000";
  // bgCtx.clearRect(0, 0, width, height);
  animationFrameId = requestAnimationFrame(animate);

  let color = STARCOLOR;

  if (STARRPGMODE) {
    color = changeColor();
  }

  bgCtx.fillStyle = color;
  bgCtx.strokeStyle = color;
  bgCtx.clearRect(0, 0, width, height);

  var entLen = entities.length;

  for (let i = 0; i < entLen; i++) {
    entities[i].update();
  }
}
