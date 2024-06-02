// star
var STARNUMBER = 1000;
var SHOOTINGSTARNUMBER = 5;
var STARSIZE = 4;
var SHOOTINGSTARSIZE = 3.5;
var SHOOTINGSTARLENGTH = 120;
var STARCOLOR = "#b1e2fdff";
var SPACECOLOR = "#b1e2fdff";
var STARRPGMODE = false;
var SPACERPGMODE = false;

// Space
// OVER 4000 IS OVERHEAD
var PARTICLE_NUM = 2000;
var PARTICLE_BASE_RADIUS = 0.5;
var FL = 500;
var DEFAULT_SPEED = 2;
var BOOST_SPEED = 300;

var canvas = document.getElementById("particleCanvas");
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
var fixedAnimationValue = 3;
var animationFrameId;
var intervalId;
var currentAnimationType;
