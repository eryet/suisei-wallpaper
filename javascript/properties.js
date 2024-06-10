// CANVAS RELATED
var canvas = document.getElementById("particleCanvas");
var context = canvas.getContext("2d");
var width = window.screen.width;
var height = window.screen.height;
var canvasWidth, canvasHeight;

// RPG
var HUE = 0;

// ANIMATION 1
var A1_STAR_NUM = 1000;
var A1_STARSIZE = 4;
var A1_SHOOTING_NUM = 10;
var A1_SHOOTINGSTARSIZE = 3.5;
var A1_SHOOTINGSTARLENGTH = 120;
var A1_STARCOLOR = "#b1e2fdff";
var A1_STARRPGMODE = false;

// ANIMATION 2
var A2_SPACERPGMODE = false;
var A2_SPACECOLOR = "#b1e2fdff";
var A2_PARTICLE_NUM = 1000;
var A2_PARTICLE_BASE_RADIUS = 0.5;
var A2_FL = 500;
var A2_DEFAULT_SPEED = 2;
var speed = A2_DEFAULT_SPEED;
var targetSpeed = A2_DEFAULT_SPEED;
var A2_BOOST_SPEED = 300;

// ANIMATION 3
var A3_STAR_COUNT = (window.innerWidth + window.innerHeight) / 8,
  A3_STAR_SIZE = 10,
  STAR_MIN_SCALE = 0.2,
  OVERFLOW_THRESHOLD = 50;
var A3_DEFAULT_VELOCITY = { x: 0, y: 0, tx: 0, ty: 0, z: 0.0005 };
var A3_VELOCITY = { x: 0, y: 0, tx: 0, ty: 0, z: 0.0005 };
var A3_LINECAP = "round";

var centerX, centerY;
var mouseX, mouseY;
var particles = [];

// animation tracker
var STARTING_ANIMATION = 1;
var animationFrameId;
var currentAnimationType = STARTING_ANIMATION;
