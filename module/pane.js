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
    animation: 1,
    star_color: STARCOLOR,
    waifu_rgb: false,
    star_rgb: false,
    star_size: STARSIZE,
    star_number: STARNUMBER,
    shootingstar_number: SHOOTINGSTARNUMBER,
    particle_num: PARTICLE_NUM,
    space_color: SPACECOLOR,
    space_rgb: false,
  };

  const pane = new Pane({
    title: "Suisei Wallpaper Settings",
  });

  pane
    .addBinding(PARAMS, "animation", { step: 1, min: 1, max: 2 })
    .on("change", (ev) => {
      startAnimation(ev.value);
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
    .addBinding(PARAMS, "particle_num", {
      step: 10,
      min: 100,
      max: 3000,
    })
    .on("change", (ev) => {
      PARTICLE_NUM = ev.value;
      starUpdate();
    });
  animation2.addBinding(PARAMS, "space_rgb").on("change", (ev) => {
    SPACERPGMODE = ev.value;
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
