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
    if (properties.shootingstarnumber) {
      A1_SHOOTING_NUM = properties.shootingstarnumber.value;
      starUpdate();
    }
    if (properties.starsize) {
      A1_STARSIZE = properties.starsize.value;
      starUpdate();
    }
    if (properties.shootingstarsize) {
      A1_SHOOTINGSTARSIZE = properties.shootingstarsize.value;
      starUpdate();
    }
    if (properties.shootingstarlength) {
      A1_SHOOTINGSTARLENGTH = properties.shootingstarlength.value;
      starUpdate();
    }
    if (properties.starnumber) {
      A1_STAR_NUM = properties.starnumber.value;
      starUpdate();
    }
    if (properties.animationtype) {
      startAnimation(properties.animationtype.value);
    }
    if (properties.waifurgbmode) {
      togglerRGBImage(properties.waifurgbmode.value);
    }
    if (properties.starrgbmode) {
      A1_STARRPGMODE = properties.starrgbmode.value;
      startAnimation(properties.animationtype.value);
    }
    if (properties.planetvisibility) {
      properties.planetvisibility.value
        ? planetElement.classList.remove("hidden")
        : planetElement.classList.add("hidden");
    }
    // if (properties.particlenum) {
    //   A2_PARTICLE_NUM = properties.particlenum.value;
    //   startAnimation(properties.animationtype.value);
    // }
  },
};
