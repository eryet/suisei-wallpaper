/* eslint-disable no-undef */

var resizeHandler, mouseMoveHandler;
var debounceTimeout;
var mouseX, mouseY;

function animateCoolStar() {
  canvas = document.getElementById("particleCanvas");

  var resize = function () {
    canvasWidth = canvas.width = window.innerWidth;
    canvasHeight = canvas.height = window.innerHeight;
    centerX = canvasWidth * 0.5;
    centerY = canvasHeight * 0.5;
    context = canvas.getContext("2d");
    context.fillStyle = "rgb(255, 255, 255)";
  };

  resizeHandler = resize;
  window.addEventListener("resize", resizeHandler);
  resize();

  mouseX = centerX;
  mouseY = centerY;

  for (var i = 0; i < PARTICLE_NUM; i++) {
    particles[i] = randomizeParticle(new Particle());
    particles[i].z -= 500 * Math.random();
  }

  mouseMoveHandler = function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  };

  document.addEventListener("mousemove", mouseMoveHandler);

  function loop() {
    context.save();
    context.fillStyle = "rgb(12, 15, 15)";
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    context.restore();

    speed += (targetSpeed - speed) * 0.01;

    var halfPi = Math.PI * 0.5;
    var atan2 = Math.atan2;
    var cos = Math.cos;
    var sin = Math.sin;

    context.beginPath();
    for (var i = 0; i < PARTICLE_NUM; i++) {
      var p = particles[i];

      p.pastZ = p.z;
      p.z -= speed;

      if (p.z <= 0) {
        randomizeParticle(p);
        continue;
      }

      var cx = centerX - (mouseX - centerX) * 1.25;
      var cy = centerY - (mouseY - centerY) * 1.25;

      var rx = p.x - cx;
      var ry = p.y - cy;

      var f = FL / p.z;
      var x = cx + rx * f;
      var y = cy + ry * f;
      var r = PARTICLE_BASE_RADIUS * f;

      var pf = FL / p.pastZ;
      var px = cx + rx * pf;
      var py = cy + ry * pf;
      var pr = PARTICLE_BASE_RADIUS * pf;

      var a = atan2(py - y, px - x);
      var a1 = a + halfPi;
      var a2 = a - halfPi;

      context.moveTo(px + pr * cos(a1), py + pr * sin(a1));
      context.arc(px, py, pr, a1, a2, true);
      context.lineTo(x + r * cos(a2), y + r * sin(a2));
      context.arc(x, y, r, a2, a1, true);
      context.closePath();
    }
    let color = SPACECOLOR;

    if (SPACERPGMODE) {
      SPACECOLOR = changeColor();
    }
    context.fillStyle = color;
    context.fill();
    animationFrameId = requestAnimationFrame(loop);
  }

  loop();
}

function stopCoolStar() {
  cancelAnimationFrame(animationFrameId);
  animationFrameId = null;

  document.removeEventListener("resize", resizeHandler);
  resizeHandler = null;

  document.removeEventListener("mousemove", mouseMoveHandler);
  mouseMoveHandler = null;

  particles = [];
}

function Particle() {
  this.x = Math.random() * canvasWidth;
  this.y = Math.random() * canvasHeight;
  this.z = Math.random() * 1000;
  this.pastZ = this.z;
}

function randomizeParticle(p) {
  p.x = Math.random() * canvasWidth;
  p.y = Math.random() * canvasHeight;
  p.z = Math.random() * 1000 + 500;
  return p;
}
