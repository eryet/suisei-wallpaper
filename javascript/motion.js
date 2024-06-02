var STAR_COUNT = (window.innerWidth + window.innerHeight) / 8,
  STAR_SIZE = 10,
  STAR_MIN_SCALE = 0.2,
  OVERFLOW_THRESHOLD = 50;

context = canvas.getContext("2d");

let scale = 1;

let stars = [];

let pointerX, pointerY;

let velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.0005 };

let touchInput = false;

window.onresize = resize;
document.addEventListener("mousemove", onMouseMove);
// document.addEventListener("mouseleave", onMouseLeave);

function generate() {
  stars = [];
  for (let i = 0; i < STAR_COUNT; i++) {
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

  let vx = Math.abs(velocity.x),
    vy = Math.abs(velocity.y);

  if (vx > 1 || vy > 1) {
    let axis;

    if (vx > vy) {
      axis = Math.random() < vx / (vx + vy) ? "h" : "v";
    } else {
      axis = Math.random() < vy / (vx + vy) ? "v" : "h";
    }

    if (axis === "h") {
      direction = velocity.x > 0 ? "l" : "r";
    } else {
      direction = velocity.y > 0 ? "t" : "b";
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
  context.clearRect(0, 0, width, height);

  update();
  render();

  requestAnimationFrame(step);
}

function update() {
  velocity.tx *= 0.96;
  velocity.ty *= 0.96;

  velocity.x += (velocity.tx - velocity.x) * 0.8;
  velocity.y += (velocity.ty - velocity.y) * 0.8;

  stars.forEach((star) => {
    star.x += velocity.x * star.z;
    star.y += velocity.y * star.z;

    star.x += (star.x - width / 2) * velocity.z * star.z;
    star.y += (star.y - height / 2) * velocity.z * star.z;
    star.z += velocity.z;

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
//     context.lineWidth = STAR_SIZE * star.z * scale;
//     context.strokeStyle =
//       "rgba(255,255,255," + (0.5 + 0.5 * Math.random()) + ")";

//     context.beginPath();
//     context.moveTo(star.x, star.y);

//     var tailX = velocity.x * 2,
//       tailY = velocity.y * 2;

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
    context.lineCap = "round";
    context.lineWidth = STAR_SIZE * star.z * scale;
    context.strokeStyle = `rgba(177,266,253,${star.opacity})`;

    context.moveTo(star.x, star.y);

    var tailX = velocity.x * 2,
      tailY = velocity.y * 2;

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
//       STAR_SIZE * star.z * scale
//     );

//     gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
//     gradient.addColorStop(0.5, `rgba(255, 255, 255, ${star.opacity * 0.5})`);
//     gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

//     context.beginPath();
//     context.arc(star.x, star.y, STAR_SIZE * star.z * scale, 0, 2 * Math.PI);
//     context.fillStyle = gradient;
//     context.fill();
//   });
// }

// phone

// function onTouchMove(event) {
//   touchInput = true;

//   movePointer(event.touches[0].clientX, event.touches[0].clientY, true);

//   event.preventDefault();
// }

function movePointer(x, y) {
  if (typeof pointerX === "number" && typeof pointerY === "number") {
    let ox = x - pointerX,
      oy = y - pointerY;

    velocity.tx = velocity.tx + (ox / 8) * scale * (touchInput ? 1 : -1);
    velocity.ty = velocity.ty + (oy / 8) * scale * (touchInput ? 1 : -1);
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
  stars = [];
  window.removeEventListener("resize", resize);
  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseleave", onMouseLeave);
}
