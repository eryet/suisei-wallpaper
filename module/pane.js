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
    startAnimation(STARTING_ANIMATION);
  } else {
    document.querySelector("tp-dfwv").classList.add("hidden");
  }

  const PARAMS = {
    animation: STARTING_ANIMATION,
    waifu_rgb: false,
    a1_star_color: A1_STARCOLOR,
    a1_star_size: A1_STARSIZE,
    a1_star_number: A1_STAR_NUM,
    a1_star_rgb: false,
    a1_shootingstar_number: A1_SHOOTING_NUM,
    space_particle_num: A2_PARTICLE_NUM,
    space_base_radius: A2_PARTICLE_BASE_RADIUS,
    space_fl: A2_FL,
    space_color: A2_SPACECOLOR,
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
    .addBinding(PARAMS, "a1_star_color", {
      view: "color",
      label: "star_color",
      picker: "inline",
      expanded: true,
    })
    .on("change", (ev) => {
      A1_STARCOLOR = ev.value;
      starUpdate();
    });
  animation1
    .addBinding(PARAMS, "a1_star_size", {
      label: "star_size",
      step: 1,
      min: 2,
      max: 7,
    })
    .on("change", (ev) => {
      A1_STARSIZE = ev.value;
      starUpdate();
    });
  animation1
    .addBinding(PARAMS, "a1_star_number", {
      label: "star_number",
      step: 10,
      min: 100,
      max: 3000,
    })
    .on("change", (ev) => {
      A1_STAR_NUM = ev.value;
      starUpdate();
    });
  animation1
    .addBinding(PARAMS, "a1_shootingstar_number", {
      step: 1,
      min: 3,
      max: 33,
    })
    .on("change", (ev) => {
      A1_SHOOTING_NUM = ev.value;
      starUpdate();
    });
  animation1.addBinding(PARAMS, "waifu_rgb").on("change", (ev) => {
    togglerRGBImage(ev.value);
  });
  animation1
    .addBinding(PARAMS, "a1_star_rgb", {
      label: "star_rgb",
    })
    .on("change", (ev) => {
      A1_STARRPGMODE = ev.value;
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
      A2_SPACECOLOR = ev.value;
      starUpdate();
    });
  animation2
    .addBinding(PARAMS, "space_particle_num", {
      step: 10,
      min: 100,
      max: 3000,
    })
    .on("change", (ev) => {
      A2_PARTICLE_NUM = ev.value;
      starUpdate();
    });
  animation2
    .addBinding(PARAMS, "space_base_radius", {
      step: 0.05,
      min: 0.1,
      max: 5,
    })
    .on("change", (ev) => {
      A2_PARTICLE_BASE_RADIUS = ev.value;
      starUpdate();
    });
  animation2
    .addBinding(PARAMS, "space_fl", {
      step: 10,
      min: 100,
      max: 1000,
    })
    .on("change", (ev) => {
      A2_FL = ev.value;
      starUpdate();
    });
  animation2.addBinding(PARAMS, "space_rgb").on("change", (ev) => {
    A2_SPACERPGMODE = ev.value;
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
