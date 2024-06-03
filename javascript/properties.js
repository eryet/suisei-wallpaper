// ANIMATION 1
var A1_STAR_NUM = 1000;
var A1_SHOOTING_NUM = 5;
var STARSIZE = 4;
var SHOOTINGSTARSIZE = 3.5;
var SHOOTINGSTARLENGTH = 120;
var STARCOLOR = "#b1e2fdff";
var SPACECOLOR = "#b1e2fdff";
var STARRPGMODE = false;
var SPACERPGMODE = false;

// ANIMATION 2
var PARTICLE_NUM = 2000;
var PARTICLE_BASE_RADIUS = 0.5;
var FL = 500;
var DEFAULT_SPEED = 2;
var BOOST_SPEED = 300;

// Pointer
var canvas = document.getElementById("particleCanvas");
var context = canvas.getContext("2d");
var width = window.screen.width;
var height = window.screen.height;
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
var STARTING_ANIMATION = 3;
var animationFrameId;
var currentAnimationType;

// var SHOOT_STAR_NUM = 1000;
// var SHOOT_SHOOTING_NUM = 5;
// var SHOOT_STAR_SIZE = 4;
// var SHOOT_SHOOTING_SIZE = 3.5;
// var SHOOT_SHOOTING_LENGTH = 120;
// var SHOOT_STAR_COLOR = "#b1e2fdff";
// var SHOOT_SPACE_COLOR = "#b1e2fdff";
// var SHOOT_STAR_RPG = false;
// var SHOOT_SPACE_RPG = false;
// Animation 2: ParticleBurst
// javascript
// Copy code
// var BURST_PARTICLE_NUM = 2000;
// var BURST_PARTICLE_RADIUS = 0.5;
// var BURST_FL = 500;
// var BURST_SPEED = 2;
// var BURST_BOOST = 300;
// Animation 3: DynamicStar
// javascript
// Copy code
// var DYN_STAR_COUNT = (window.innerWidth + window.innerHeight) / 8;
// var DYN_STAR_SIZE = 10;
// var DYN_STAR_MIN_SCALE = 0.2;
// var DYN_OVERFLOW = 50;
