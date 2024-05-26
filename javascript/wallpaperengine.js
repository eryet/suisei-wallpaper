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
    // case 3:
    //   drawTwinkle();
    //   break;
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
      STARSIZE = properties.starsize.value;
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
        ? planetElement.classList.remove("hidden")
        : planetElement.classList.add("hidden");
    }
    // if (properties.particlenum) {
    //   PARTICLE_NUM = properties.particlenum.value;
    //   startAnimation(properties.animationtype.value);
    // }
  },
};
