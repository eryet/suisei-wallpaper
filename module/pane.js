import { Pane } from "https://cdn.jsdelivr.net/npm/tweakpane@4.0.3/dist/tweakpane.min.js";

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}

window.addEventListener("DOMContentLoaded", () => {
  if (
    typeof window.wallpaperPropertyListener !== "undefined" &&
    typeof window.wallpaperPropertyListener.applyUserProperties ===
      "function" &&
    window.wallpaperPropertyListener.applyUserProperties.length > 0
  ) {
    startAnimation(fixedAnimationValue);
  } else {
    document.querySelector("tp-dfwv").classList.add("hidden");
  }

  const PARAMS = {
    animation: 3,
    star_color: STARCOLOR,
    waifu_rgb: false,
    star_rgb: false,
    star_size: STARSIZE,
    star_number: STARNUMBER,
    shootingstar_number: SHOOTINGSTARNUMBER,
    space_particle_num: PARTICLE_NUM,
    space_base_radius: PARTICLE_BASE_RADIUS,
    space_fl: FL,
    space_color: SPACECOLOR,
    space_rgb: false,
    star_count: STAR_COUNT,
    star3_size: STAR_SIZE,
  };

  const pane = new Pane({
    title: "Suisei Wallpaper Settings",
  });

  pane
    .addBinding(PARAMS, "animation", { step: 1, min: 1, max: 3 })
    .on("change", (ev) => {
      startAnimation(ev.value);
      animation3.disabled = PARAMS.animation !== 3;
      animation2.disabled = PARAMS.animation !== 2;
      animation1.disabled = PARAMS.animation !== 1;
    });

  const animation1 = pane.addFolder({
    title: "Animation 1",
    expanded: true,
    disabled: PARAMS.animation !== 1,
  });

  animation1
    .addBinding(PARAMS, "star_color", {
      view: "color",
      picker: "inline",
      expanded: true,
    })
    .on("change", (ev) => {
      STARCOLOR = ev.value;
      starUpdate();
    });
  animation1
    .addBinding(PARAMS, "star_size", { step: 1, min: 2, max: 7 })
    .on("change", (ev) => {
      STARSIZE = ev.value;
      starUpdate();
    });
  animation1
    .addBinding(PARAMS, "star_number", {
      step: 10,
      min: 100,
      max: 3000,
    })
    .on("change", (ev) => {
      STARNUMBER = ev.value;
      starUpdate();
    });
  animation1
    .addBinding(PARAMS, "shootingstar_number", {
      step: 1,
      min: 3,
      max: 33,
    })
    .on("change", (ev) => {
      SHOOTINGSTARNUMBER = ev.value;
      starUpdate();
    });
  animation1.addBinding(PARAMS, "waifu_rgb").on("change", (ev) => {
    togglerRGBImage(ev.value);
  });
  animation1.addBinding(PARAMS, "star_rgb").on("change", (ev) => {
    STARRPGMODE = ev.value;
  });

  const animation2 = pane.addFolder({
    title: "Animation 2",
    expanded: true,
    disabled: PARAMS.animation !== 2,
  });

  animation2
    .addBinding(PARAMS, "space_color", {
      view: "color",
      picker: "inline",
      expanded: true,
    })
    .on("change", (ev) => {
      SPACECOLOR = ev.value;
      starUpdate();
    });
  animation2
    .addBinding(PARAMS, "space_particle_num", {
      step: 10,
      min: 100,
      max: 3000,
    })
    .on("change", (ev) => {
      PARTICLE_NUM = ev.value;
      starUpdate();
    });
  animation2
    .addBinding(PARAMS, "space_base_radius", {
      step: 0.05,
      min: 0.1,
      max: 5,
    })
    .on("change", (ev) => {
      PARTICLE_BASE_RADIUS = ev.value;
      starUpdate();
    });
  animation2
    .addBinding(PARAMS, "space_fl", {
      step: 10,
      min: 100,
      max: 1000,
    })
    .on("change", (ev) => {
      FL = ev.value;
      starUpdate();
    });
  animation2.addBinding(PARAMS, "space_rgb").on("change", (ev) => {
    SPACERPGMODE = ev.value;
  });

  const animation3 = pane.addFolder({
    title: "Animation 3",
    expanded: true,
    disabled: PARAMS.animation !== 3,
  });

  animation3
    .addBinding(PARAMS, "star_count", {
      step: 10,
      min: 100,
      max: 3000,
    })
    .on("change", (ev) => {
      STAR_COUNT = ev.value;
      generate();
    });

  animation3
    .addBinding(PARAMS, "star3_size", {
      step: 1,
      min: 1,
      max: 30,
    })
    .on("change", (ev) => {
      STAR_SIZE = ev.value;
    });

  const folder2 = pane.addFolder({
    title: "DID YOU FULLSCREEN?",
    expanded: false,
  });

  folder2
    .addButton({
      title: `BUTTON TO FULLSCREEN`,
    })
    .on("click", () => {
      toggleFullscreen();
    });
});
