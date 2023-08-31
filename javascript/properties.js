// star
var starnumber = 1000;
var shootingstarnumber = 5;
var starsize = 4;
var shootingstarsize = 3.5;
var shootingstarlength = 120;
var allparticlecolor = "#FFFFFF";
// particle rgb
var rgbmode = false;

// Space
var PARTICLE_NUM = 4000;
var PARTICLE_BASE_RADIUS = 0.5;
var FL = 500;
var DEFAULT_SPEED = 2;
var BOOST_SPEED = 300;

var canvas;
var canvasWidth, canvasHeight;
var context;
var centerX, centerY;
var mouseX, mouseY;
var speed = DEFAULT_SPEED;
var targetSpeed = DEFAULT_SPEED;
var particles = [];

// Twinkle
var Configs = {
  backgroundColor: "#0d2234",
  starColor: "#FFFFFF",
  starRadius: 40,
  starBlur: 4,
};
var canvasBound, grad, twinkle;

// animation tracker
var animationFrameId;
var intervalId;
var currentAnimationType;
