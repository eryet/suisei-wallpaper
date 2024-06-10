/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
// wallpaper properties
// https://docs.wallpaperengine.io/en/web/customization/properties.html

var planetElement = document.getElementById("planet");

function startAnimation(animationType) {
  if (currentAnimationType === 1) {
    stopCoolStar();
  }

  if (currentAnimationType === 2) {
    stopSpaceStar();
  }

  if (currentAnimationType === 3) {
    stopMotionStar();
  }

  // Start the new animation
  switch (animationType) {
    case 1:
      starUpdate();
      animate();
      break;
    case 2:
      animateCoolStar();
      break;
    case 3:
      generate();
      step();
      break;
    default:
      break;
  }

  currentAnimationType = animationType;
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
    for (const [key, prop] of Object.entries(properties)) {
      switch (key) {
        case "animationtype":
          startAnimation(prop.value);
          break;

        case "shootingstarnumber":
          A1_SHOOTING_NUM = prop.value;
          starUpdate();
          break;

        case "starsize":
          A1_STARSIZE = prop.value;
          starUpdate();
          break;

        case "shootingstarsize":
          A1_SHOOTINGSTARSIZE = prop.value;
          starUpdate();
          break;

        case "shootingstarlength":
          A1_SHOOTINGSTARLENGTH = prop.value;
          starUpdate();
          break;

        case "starnumber":
          A1_STAR_NUM = prop.value;
          starUpdate();
          break;

        case "waifurgbmode":
          togglerRGBImage(prop.value);
          break;

        case "starrgbmode":
          A1_STARRPGMODE = prop.value;
          startAnimation(properties.animationtype.value);
          break;

        case "planetvisibility":
          if (prop.value) {
            planetElement.classList.remove("hidden");
          } else {
            planetElement.classList.add("hidden");
          }
          break;

        case "a2_space_particle_num":
          A2_PARTICLE_NUM = prop.value;
          startAnimation(2);
          break;

        case "a2_space_rgb":
          A2_SPACERPGMODE = prop.value;
          break;

        case "a2_space_base_radius":
          A2_PARTICLE_BASE_RADIUS = prop.value;
          break;

        case "a2_space_fl":
          A2_PARTICLE_FL = prop.value;
          break;

        case "a2_speed":
          A2_DEFAULT_SPEED = prop.value;
          break;

        case "a2_xy_scale":
          A2_XY_SCALE = prop.value;
          break;

        case "a3_linecap":
          A3_LINECAP = prop.value;
          break;

        case "a3_star_count":
          A3_STAR_COUNT = prop.value;
          generate();
          break;

        case "a3_star_size":
          A3_STAR_SIZE = prop.value;
          break;

        case "a3_velocity":
          A3_VELOCITY.z = prop.value;
          break;

        case "a3_movement_scale":
          A3_MOVEMENT_SCALE.z = prop.value;
          break;

        default:
          break;
      }
    }
  },
};
