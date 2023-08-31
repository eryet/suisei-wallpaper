/* eslint-disable no-undef */

var Twinkle = (function () {
  var STAR_VERTEX_NUMS = [4, 6, 8, 10, 12],
    MAX_STAR_NUM = 2500;

  /**
   * @constructor
   */
  function Twinkle(starColor, starRadius, starBlur) {
    this.initSymbols(starColor, starRadius, starBlur);

    this.particles = [];
    this._pool = [];
    this.mouse = new Mouse();
  }

  Twinkle.prototype = {
    mouse: null,
    gravity: 0.035,

    initSymbols: function (color, radius, blur) {
      this._symbols = new Symbols(color, radius, blur);
    },

    render: function (ctx) {
      var particles = this.particles,
        mouse = this.mouse,
        gravity = this.gravity,
        speedRatio,
        magMax,
        magMin,
        scaleMax,
        symbols = this._symbols,
        symbolNum = this._symbols.length,
        symbol,
        size = this._symbols.size,
        radius = this._symbols.size * 0.5,
        drawSize,
        drawSizeHalf,
        drawScale,
        canvasWidth = ctx.canvas.width,
        canvasHeight = ctx.canvas.height,
        fieldLeft,
        fieldRight,
        fieldTop,
        fieldBottom,
        i,
        len,
        p;

      speedRatio = Math.min(
        (mouse.speedX * mouse.speedX + mouse.speedY * mouse.speedY) * 0.005,
        1
      );

      if (particles.length < MAX_STAR_NUM) {
        magMax = 0.5 + 4.5 * speedRatio;
        magMin = 0.1 + 0.5 * speedRatio;
        scaleMax = 0.5 + 0.5 * speedRatio;
        len = ((3 * Math.random()) | 0) + ((20 * speedRatio) | 0);
        for (i = 0; i < len; i++)
          this._createParticle(magMin, magMax, scaleMax);
      }

      fieldLeft = -canvasWidth * 0.5;
      fieldRight = canvasWidth * 1.5;
      fieldTop = -canvasHeight * 0.5;
      fieldBottom = canvasHeight * 1.5;

      for (i = 0, len = particles.length; i < len; i++) {
        p = particles[i];

        p.vx += mouse.speedX * 0.03 * speedRatio;
        p.vy += mouse.speedY * 0.03 * speedRatio + gravity;
        p.x += p.vx + mouse.speedX;
        p.y += p.vy + mouse.speedY;
        p.scale -= 0.005;
        p.angle += Math.random();

        if (
          p.x + radius < fieldLeft ||
          p.x - radius > fieldRight ||
          p.y + radius < fieldTop ||
          p.y - radius > fieldBottom ||
          p.scale <= 0
        ) {
          this._pool.push(p);
          particles.splice(i, 1);
          len--;
          i--;
          continue;
        }

        drawScale = p.scale;

        symbol = symbols[(symbolNum * Math.random()) | 0];
        if (Math.random() < 0.7) drawScale *= 0.2;
        drawSize = size * drawScale;
        drawSizeHalf = drawSize * 0.5;

        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.drawImage(
          symbol,
          0,
          0,
          size,
          size,
          -drawSizeHalf,
          -drawSizeHalf,
          drawSize,
          drawSize
        );
        ctx.restore();
      }

      ctx.fill();

      mouse.speedX = mouse.speedY = 0;
    },

    _createParticle: function (magMin, magMax, scaleMax) {
      var mag = magMin + (magMax - magMin) * Math.random(),
        angle = Math.PI * 2 * Math.random(),
        p = this._pool.length ? this._pool.shift() : new Particle();

      p.init(
        this.mouse.x,
        this.mouse.y,
        mag * Math.cos(angle),
        mag * Math.sin(angle),
        scaleMax * Math.random(),
        Math.PI * 2 * Math.random()
      );

      this.particles.push(p);
    },
  };

  /**
   * Mouse
   * @private
   */
  function Mouse(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  Mouse.prototype = {
    x: 0,
    y: 0,
    speedX: 0,
    speedY: 0,

    update: function (x, y) {
      this.speedX = (this.x - x) * 0.7;
      this.speedY = (this.y - y) * 0.7;
      this.x = x;
      this.y = y;
    },
  };

  /**
   * Symbols
   * @see STAR_VERTEX_NUMS
   * @private
   */
  function Symbols(color, radius, blur) {
    this.color = parseColor(color);
    this.size = (radius + blur) * 2;

    for (var i = 0, len = STAR_VERTEX_NUMS.length; i < len; i++) {
      this.push(this._createSymbol(STAR_VERTEX_NUMS[i], radius, blur));
    }
  }

  Symbols.prototype = [];

  Symbols.prototype._createSymbol = function (vertexNum, radius, blur) {
    var canvas,
      context,
      size = this.size,
      center = this.size / 2,
      color = this.color;

    canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;

    context = canvas.getContext("2d");
    context.fillStyle = colorToString(
      color[0],
      color[1],
      color[2],
      color[3],
      color[4]
    );
    context.shadowBlur = blur;
    context.shadowColor = colorToString(
      color[0],
      color[1],
      color[2],
      color[3],
      color[4] * 0.75
    );

    var i, len, r, a;

    context.beginPath();
    for (i = 1, len = vertexNum * 2; i <= len; i++) {
      r = i % 2 ? radius * 0.1 : radius;
      a = (Math.PI * 2 * i) / len;
      context[i === 1 ? "moveTo" : "lineTo"](
        center + r * Math.cos(a),
        center + r * Math.sin(a)
      );
    }
    context.fill();

    return canvas;
  };

  /**
   * Particle
   * @private
   */
  function Particle(x, y, vx, vy, scale, angle) {
    this.init(x, y, vx, vy, scale, angle);
  }

  Particle.prototype.init = function (x, y, vx, vy, scale, angle) {
    this.x = x || 0;
    this.y = y || 0;
    this.vx = vx || 0;
    this.vy = vy || 0;
    this.scale = scale || 0;
    this.angle = angle || 0;
  };

  // Helpers

  var parseColor = (function () {
    var RE_RGB = /^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/,
      RE_RGBA = /^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d\.]+)\s*\)$/,
      RE_HSL = /^hsl\(\s*([\d\.]+)\s*,\s*([\d\.]+)%\s*,\s*([\d\.]+)%\s*\)$/,
      RE_HSLA =
        /^hsla\(\s*([\d\.]+)\s*,\s*([\d\.]+)%\s*,\s*([\d\.]+)%\s*,\s*([\d\.]+)\s*\)$/,
      RE_HEX = /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/; // 6 digit

    return function (str) {
      str = str.replace(/^\s*#|\s*$/g, "");
      str = str.toLowerCase();

      var match;

      // RGB(A)
      if ((match = str.match(RE_RGB) || str.match(RE_RGBA))) {
        return [
          "rgba",
          parseInt(match[1], 10),
          parseInt(match[2], 10),
          parseInt(match[3], 10),
          parseFloat(match.length === 4 ? 1 : match[4]),
        ];
      }

      // HSL(A)
      if ((match = str.match(RE_HSL) || str.match(RE_HSLA))) {
        return [
          "hsla",
          parseFloat(match[1]),
          parseFloat(match[2]),
          parseFloat(match[3]),
          parseFloat(match.length === 4 ? 1 : match[4]),
        ];
      }

      // Hex
      if (str.length === 3) {
        // Hex 3 digit -> 6 digit
        str = str.replace(/(.)/g, "$1$1");
      }
      if ((match = str.match(RE_HEX))) {
        return [
          "rgba",
          parseInt(match[1], 16),
          parseInt(match[2], 16),
          parseInt(match[3], 16),
          1,
        ];
      }

      return null;
    };
  })();

  function colorToString(type, v0, v1, v2, a) {
    if (type === "rgba")
      return "rgba(" + v0 + "," + v1 + "," + v2 + "," + a + ")";
    if (type === "hsla")
      return "hsla(" + v0 + "," + v1 + "%," + v2 + "%," + a + ")";
    else return "";
  }

  return Twinkle;
})();

// Vars
// var canvas = document.getElementById("particleCanvas");
// var context = canvas.getContext("2d");

function drawTwinkle() {
  onWindowResize(null);

  twinkle = new Twinkle(
    Configs.starColor,
    Configs.starRadius,
    Configs.starBlur
  );
  twinkle.mouse.x = canvas.width / 2;
  twinkle.mouse.y = canvas.height / 2;

  window.addEventListener("resize", onWindowResize, false);
  canvas.addEventListener("mousemove", onCanvasMouseMove, false);
  canvas.addEventListener("mouseout", onCanvasMouseOut, false);

  update();
}

// Event listeners

function onWindowResize(e) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvasBound = canvas.getBoundingClientRect();

  var cx = canvas.width * 0.5,
    cy = canvas.height * 0.5;
  grad = context.createRadialGradient(
    cx,
    cy,
    0,
    cx,
    cy,
    Math.sqrt(cx * cx + cy * cy)
  );
  grad.addColorStop(0, "rgba(0, 0, 0, 0)");
  grad.addColorStop(1, "rgba(0, 0, 0, 0.35)");
}

// Event listeners
document.addEventListener("mousemove", onCanvasMouseMove, false);
document.addEventListener("mouseout", onCanvasMouseOut, false);

// Mouse coordinates relative to canvas
var mouseCanvasX = null;
var mouseCanvasY = null;

// Event listeners for mousemove and mouseout
function onCanvasMouseMove(e) {
  // Get the position of the canvas on the page
  var canvasBound = canvas.getBoundingClientRect();

  // Calculate the mouse coordinates relative to the canvas
  mouseCanvasX = e.clientX - canvasBound.left;
  mouseCanvasY = e.clientY - canvasBound.top;
  // twinkle.mouse.update(
  //   e.clientX - canvasBound.left,
  //   e.clientY - canvasBound.top
  // );
}

function onCanvasMouseOut(e) {
  // Reset the mouse coordinates when the mouse leaves the canvas
  mouseCanvasX = null;
  mouseCanvasY = null;
}

// Update

function update() {
  // context.fillStyle = Configs.backgroundColor;
  // context.fillRect(0, 0, canvas.width, canvas.height);
  // context.fillStyle = grad;
  // context.fillRect(0, 0, canvas.width, canvas.height);
  // context.fillStyle = "#ffffff";
  // context.strokeStyle = "#ffffff";
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Update the twinkle effect based on the mouse coordinates
  if (mouseCanvasX !== null && mouseCanvasY !== null) {
    twinkle.mouse.update(mouseCanvasX, mouseCanvasY);
  }

  twinkle.render(context);

  requestAnimationFrame(update);
}
