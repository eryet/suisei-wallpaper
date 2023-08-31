/* eslint-disable no-undef */
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
  document.addEventListener("resize", resizeHandler);
  resize();

  mouseX = centerX;
  mouseY = centerY;

  for (var i = 0, p; i < PARTICLE_NUM; i++) {
    particles[i] = randomizeParticle(new Particle());
    particles[i].z -= 500 * Math.random();
  }

  mouseMoveHandler = function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  };

  document.addEventListener("mousemove", mouseMoveHandler);

  // document.addEventListener(
  //   "mousedown",
  //   function (e) {
  //     targetSpeed = BOOST_SPEED;
  //   },
  //   false
  // );

  // document.addEventListener(
  //   "mouseup",
  //   function (d) {
  //     targetSpeed = DEFAULT_SPEED;
  //   },
  //   false
  // );
  function loop() {
    context.save();
    context.fillStyle = "rgb(12, 15, 15)";
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    context.restore();

    speed += (targetSpeed - speed) * 0.01;

    var p;
    var cx, cy;
    var rx, ry;
    var f, x, y, r;
    var pf, px, py, pr;
    var a, a1, a2;

    var halfPi = Math.PI * 0.5;
    var atan2 = Math.atan2;
    var cos = Math.cos;
    var sin = Math.sin;

    context.beginPath();
    for (var i = 0; i < PARTICLE_NUM; i++) {
      p = particles[i];

      p.pastZ = p.z;
      p.z -= speed;

      if (p.z <= 0) {
        randomizeParticle(p);
        continue;
      }

      cx = centerX - (mouseX - centerX) * 1.25;
      cy = centerY - (mouseY - centerY) * 1.25;

      rx = p.x - cx;
      ry = p.y - cy;

      f = FL / p.z;
      x = cx + rx * f;
      y = cy + ry * f;
      r = PARTICLE_BASE_RADIUS * f;

      pf = FL / p.pastZ;
      px = cx + rx * pf;
      py = cy + ry * pf;
      pr = PARTICLE_BASE_RADIUS * pf;

      a = atan2(py - y, px - x);
      a1 = a + halfPi;
      a2 = a - halfPi;

      context.moveTo(px + pr * cos(a1), py + pr * sin(a1));
      context.arc(px, py, pr, a1, a2, true);
      context.lineTo(x + r * cos(a2), y + r * sin(a2));
      context.arc(x, y, r, a2, a1, true);
      context.closePath();
    }
    context.fill();
    animationFrameId = requestAnimationFrame(loop);
  }

  loop();
}

function stopCoolStar() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }

  document.removeEventListener("resize", resizeHandler);
  resizeHandler = null;

  document.removeEventListener("mousemove", mouseMoveHandler);
  mouseMoveHandler = null;

  particles = []; // clear particles
}

function randomizeParticle(p) {
  p.x = Math.random() * canvasWidth;
  p.y = Math.random() * canvasHeight;
  p.z = Math.random() * 1500 + 500;
  return p;
}

/**
 * Particle
 */
function Particle(x, y, z) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
  this.pastZ = 0;
}

/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
// wallpaper properties
// https://docs.wallpaperengine.io/en/web/customization/properties.html

var planetElement = document.getElementById("planet");

function startAnimation(animationType) {
  // If the previous animation was 'animateCoolStar', stop it.
  if (currentAnimationType === 2) {
    stopCoolStar();
  }

  // Start the new animation
  switch (animationType) {
    case 1:
      animate();
      break;
    case 2:
      animateCoolStar();
      break;
    case 3:
      drawTwinkle();
      break;
    default:
      // Invalid animationType, do nothing
      break;
  }

  // Update the currentAnimationType
  currentAnimationType = animationType;
}

function stopAnimation() {
  // Cancel the current animation frame if it exists
  if (animationFrameId !== undefined) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = undefined; // Reset to undefined after cancelling
  }

  // Clear the interval if it exists
  if (intervalId !== undefined) {
    clearInterval(intervalId);
    intervalId = undefined; // Reset to undefined after clearing
  }
}

function rgbToCSS(colorArray) {
  var customColor = colorArray.split(" ").map(function (c) {
    return Math.ceil(c * 255);
  });
  return "rgb(" + customColor + ")";
}

function togglerRGBImage(rgbimage) {
  const imageContainer = document.getElementById("rgbContainer");
  const existingImage = document.getElementById("chromaImage");

  if (rgbimage) {
    // Check if the image is not already present in the container
    if (!existingImage) {
      const newImage = document.createElement("img");
      newImage.classList.add("suisei", "zi300");
      newImage.setAttribute("id", "chromaImage");
      newImage.setAttribute("src", "images/suisei_line_red.png");
      imageContainer.appendChild(newImage);
    }
  } else {
    // If the image exists, remove it
    if (existingImage) {
      imageContainer.removeChild(existingImage);
    }
  }
}

function starUpdate() {
  entities = [];
  entitiesUpdate();
}

window.wallpaperPropertyListener = {
  applyUserProperties: function (properties) {
    if (properties.shootingstarnumber) {
      shootingstarnumber = properties.shootingstarnumber.value;
      starUpdate();
    }
    if (properties.starsize) {
      starsize = properties.starsize.value;
      starUpdate();
    }
    if (properties.shootingstarsize) {
      shootingstarsize = properties.shootingstarsize.value;
      starUpdate();
    }
    if (properties.shootingstarlength) {
      shootingstarlength = properties.shootingstarlength.value;
      starUpdate();
    }
    if (properties.starnumber) {
      starnumber = properties.starnumber.value;
      starUpdate();
    }
    if (properties.animationtype) {
      startAnimation(properties.animationtype.value);
    }
    if (properties.waifurgbmode) {
      togglerRGBImage(properties.waifurgbmode.value);
    }
    if (properties.starrgbmode) {
      rgbmode = properties.starrgbmode.value;
      startAnimation(properties.animationtype.value);
    }
    if (properties.planetvisibility) {
      properties.planetvisibility.value
        ? planetElement.classList.add("visibility")
        : planetElement.classList.remove("visibility");
    }
    if (properties.particlenum) {
      PARTICLE_NUM = properties.particlenum.value;
    }
  },
};
