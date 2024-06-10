let scale = 1;

let stars = [];

let pointerX, pointerY;

function generate() {
  cleanUp();
  for (let i = 0; i < A3_STAR_COUNT; i++) {
    stars.push({
      x: 0,
      y: 0,
      z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE),
      opacity: 0.5 + 0.5 * Math.random(),
    });
  }
}

function placeStar(star) {
  star.x = Math.random() * width;
  star.y = Math.random() * height;
}

function recycleStar(star) {
  let direction = "z";

  let vx = Math.abs(A3_VELOCITY.x),
    vy = Math.abs(A3_VELOCITY.y);

  if (vx > 1 || vy > 1) {
    let axis;

    if (vx > vy) {
      axis = Math.random() < vx / (vx + vy) ? "h" : "v";
    } else {
      axis = Math.random() < vy / (vx + vy) ? "v" : "h";
    }

    if (axis === "h") {
      direction = A3_VELOCITY.x > 0 ? "l" : "r";
    } else {
      direction = A3_VELOCITY.y > 0 ? "t" : "b";
    }
  }

  star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);

  if (direction === "z") {
    star.z = 0.1;
    star.x = Math.random() * width;
    star.y = Math.random() * height;
  } else if (direction === "l") {
    star.x = -OVERFLOW_THRESHOLD;
    star.y = height * Math.random();
  } else if (direction === "r") {
    star.x = width + OVERFLOW_THRESHOLD;
    star.y = height * Math.random();
  } else if (direction === "t") {
    star.x = width * Math.random();
    star.y = -OVERFLOW_THRESHOLD;
  } else if (direction === "b") {
    star.x = width * Math.random();
    star.y = height + OVERFLOW_THRESHOLD;
  }
}

function resize() {
  scale = window.devicePixelRatio || 1;

  width = window.innerWidth * scale;
  height = window.innerHeight * scale;

  canvas.width = width;
  canvas.height = height;

  stars.forEach(placeStar);
}

function step() {
  window.addEventListener("resize", resize);
  document.addEventListener("mouseleave", onMouseLeave);
  setTimeout(() => {
    document.addEventListener("mousemove", onMouseMove);
  }, 5000);
  context.clearRect(0, 0, width, height);

  update();
  render();

  animationFrameId = requestAnimationFrame(step);
}

function update() {
  A3_VELOCITY.tx *= 0.96;
  A3_VELOCITY.ty *= 0.96;

  A3_VELOCITY.x += (A3_VELOCITY.tx - A3_VELOCITY.x) * 0.8;
  A3_VELOCITY.y += (A3_VELOCITY.ty - A3_VELOCITY.y) * 0.8;

  stars.forEach((star) => {
    star.x += A3_VELOCITY.x * star.z;
    star.y += A3_VELOCITY.y * star.z;

    star.x += (star.x - width / 2) * A3_VELOCITY.z * star.z;
    star.y += (star.y - height / 2) * A3_VELOCITY.z * star.z;
    star.z += A3_VELOCITY.z;

    // recycle when out of bounds
    if (
      star.x < -OVERFLOW_THRESHOLD ||
      star.x > width + OVERFLOW_THRESHOLD ||
      star.y < -OVERFLOW_THRESHOLD ||
      star.y > height + OVERFLOW_THRESHOLD
    ) {
      recycleStar(star);
    }
  });
}

// function render() {
//   stars.forEach((star) => {
//     context.beginPath();
//     context.lineCap = "round";
//     context.lineWidth = A3_STAR_SIZE * star.z * scale;
//     context.strokeStyle =
//       "rgba(255,255,255," + (0.5 + 0.5 * Math.random()) + ")";

//     context.beginPath();
//     context.moveTo(star.x, star.y);

//     var tailX = A3_VELOCITY.x * 2,
//       tailY = A3_VELOCITY.y * 2;

//     // stroke() wont work on an invisible line
//     if (Math.abs(tailX) < 0.1) tailX = 0.5;
//     if (Math.abs(tailY) < 0.1) tailY = 0.5;

//     context.lineTo(star.x + tailX, star.y + tailY);

//     context.stroke();
//   });
// }

function render() {
  stars.forEach((star) => {
    context.beginPath();
    context.lineCap = A3_LINECAP;
    context.lineWidth = A3_STAR_SIZE * star.z * scale;
    context.strokeStyle = `rgba(177,266,253,${star.opacity})`;

    context.moveTo(star.x, star.y);

    var tailX = A3_VELOCITY.x * 2,
      tailY = A3_VELOCITY.y * 2;

    // stroke() wont work on an invisible line
    if (Math.abs(tailX) < 0.1) tailX = 0.5;
    if (Math.abs(tailY) < 0.1) tailY = 0.5;

    context.lineTo(star.x + tailX, star.y + tailY);

    context.stroke();
  });
}

// function render() {
//   stars.forEach((star) => {
//     const gradient = context.createRadialGradient(
//       star.x,
//       star.y,
//       0,
//       star.x,
//       star.y,
//       A3_STAR_SIZE * star.z * scale
//     );

//     gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
//     gradient.addColorStop(0.5, `rgba(255, 255, 255, ${star.opacity * 0.5})`);
//     gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

//     context.beginPath();
//     context.arc(star.x, star.y, A3_STAR_SIZE * star.z * scale, 0, 2 * Math.PI);
//     context.fillStyle = gradient;
//     context.fill();
//   });
// }

function movePointer(x, y) {
  if (typeof pointerX === "number" && typeof pointerY === "number") {
    let ox = x - pointerX,
      oy = y - pointerY;

    A3_VELOCITY.tx = A3_VELOCITY.tx + (ox / 8) * scale * -1;
    A3_VELOCITY.ty = A3_VELOCITY.ty + (oy / 8) * scale * -1;
  }

  pointerX = x;
  pointerY = y;
}

function onMouseMove(event) {
  movePointer(event.clientX, event.clientY);
}

function onMouseLeave() {
  pointerX = null;
  pointerY = null;
}

function stopMotionStar() {
  cancelAnimationFrame(animationFrameId);
  animationFrameId = null;
  A3_VELOCITY = A3_DEFAULT_VELOCITY;
  cleanUp();
}

function cleanUp() {
  stars = [];
  window.removeEventListener("resize", resize);
  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseleave", onMouseLeave);
}
