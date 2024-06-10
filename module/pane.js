// wallpaper engine
// import { Pane } from "./tweakpane.min.js";
// vercal host
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
    animation: currentAnimationType,
    waifu_rgb: false,
    a1_star_color: A1_STARCOLOR,
    a1_star_size: A1_STARSIZE,
    a1_star_number: A1_STAR_NUM,
    a1_star_rgb: false,
    a1_shootingstar_number: A1_SHOOTING_NUM,
    a1_shootingstar_length: A1_SHOOTINGSTARLENGTH,
    a2_space_particle_num: A2_PARTICLE_NUM,
    a2_space_base_radius: A2_PARTICLE_BASE_RADIUS,
    a2_space_fl: A2_FL,
    a2_space_color: A2_SPACECOLOR,
    a2_space_rgb: false,
    a3_timeout_label: "5 seconds timeout",
    a3_timeout_label: "5 seconds timeout",
    a3_linecap: A3_LINECAP,
    a3_star_count: A3_STAR_COUNT,
    a3_star_size: A3_STAR_SIZE,
    a3_velocity: A3_VELOCITY.z,
  };

  const pane = new Pane({
    title: "Suisei Wallpaper Settings",
  });

  console.log(pane);

  const updatePaneUi = () => {
    animation3.disabled = PARAMS.animation !== 3;
    animation2.disabled = PARAMS.animation !== 2;
    animation1.disabled = PARAMS.animation !== 1;
    animation3.expanded = PARAMS.animation == 3;
    animation2.expanded = PARAMS.animation == 2;
    animation1.expanded = PARAMS.animation == 1;
  };

  pane
    .addBinding(PARAMS, "animation", { step: 1, min: 1, max: 3 })
    .on("change", (ev) => {
      startAnimation(ev.value);
      updatePaneUi();
    });

  const animation1 = pane.addFolder({
    title: "Animation 1",
    expanded: true,
    disabled: PARAMS.animation !== 1,
  });

  animation1
    .addBinding(PARAMS, "a1_star_color", {
      label: "star_color",
      view: "color",
      picker: "inline",
      expanded: true,
    })
    .on("change", (ev) => {
      console.log(pane);
      A1_STARCOLOR = ev.value;
      starUpdate();
    });
  animation1
    .addBinding(PARAMS, "a1_star_rgb", {
      label: "star_rgb",
    })
    .on("change", (ev) => {
      // animation1.a1_star_color.disabled = ev.value;
      A1_STARRPGMODE = ev.value;
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
      max: 2000,
    })
    .on("change", (ev) => {
      A1_STAR_NUM = ev.value;
      starUpdate();
    });
  animation1
    .addBinding(PARAMS, "a1_shootingstar_number", {
      label: "ss_number",
      step: 1,
      min: 5,
      max: 50,
    })
    .on("change", (ev) => {
      A1_SHOOTINGSTARLENGTH = ev.value;
      starUpdate();
    });
  animation1
    .addBinding(PARAMS, "a1_shootingstar_length", {
      label: "ss_length",
      step: 1,
      min: 50,
      max: 150,
    })
    .on("change", (ev) => {
      A1_SHOOTING_NUM = ev.value;
      starUpdate();
    });

  pane.addBlade({
    view: "separator",
  });

  const animation2 = pane.addFolder({
    title: "Animation_2",
    expanded: false,
    disabled: PARAMS.animation !== 2,
  });

  animation2
    .addBinding(PARAMS, "a2_space_color", {
      view: "color",
      picker: "inline",
      expanded: true,
    })
    .on("change", (ev) => {
      A2_SPACECOLOR = ev.value;
    });
  animation2
    .addBinding(PARAMS, "a2_space_rgb", {
      label: "space_rgb",
    })
    .on("change", (ev) => {
      A2_SPACERPGMODE = ev.value;
    });
  animation2
    .addBinding(PARAMS, "a2_space_particle_num", {
      label: "particle_num",
      step: 10,
      min: 100,
      max: 2000,
    })
    .on("change", (ev) => {
      A2_PARTICLE_NUM = ev.value;
      startAnimation(PARAMS.animation);
    });
  animation2
    .addBinding(PARAMS, "a2_space_base_radius", {
      label: "base_radius",
      step: 0.05,
      min: 0.1,
      max: 5,
    })
    .on("change", (ev) => {
      A2_PARTICLE_BASE_RADIUS = ev.value;
    });
  animation2
    .addBinding(PARAMS, "a2_space_fl", {
      step: 10,
      min: 100,
      max: 1000,
    })
    .on("change", (ev) => {
      A2_FL = ev.value;
    });

  pane.addBlade({
    view: "separator",
  });

  const animation3 = pane.addFolder({
    title: "Animation_3",
    expanded: false,
    disabled: PARAMS.animation !== 3,
  });

  animation3.addBinding(PARAMS, "a3_timeout_label", {
    label: "mouse_event",
    readonly: true,
  });

  animation3
    .addBinding(PARAMS, "a3_linecap", {
      label: "linecap",
      options: {
        square: "square",
        round: "round",
        // butt: "butt",
      },
    })
    .on("change", (ev) => {
      A3_LINECAP = ev.value;
    });

  animation3
    .addBinding(PARAMS, "a3_star_count", {
      label: "star_count",
      step: 10,
      min: 100,
      max: 2000,
    })
    .on("change", (ev) => {
      A3_STAR_COUNT = ev.value;
      generate();
    });

  animation3
    .addBinding(PARAMS, "a3_star_size", {
      label: "star_size",
      step: 1,
      min: 1,
      max: 30,
    })
    .on("change", (ev) => {
      A3_STAR_SIZE = ev.value;
    });

  animation3
    .addBinding(PARAMS, "a3_velocity", {
      label: "zoom_vel",
      step: 0.0001,
      min: 0.0005,
      max: 0.00322,
    })
    .on("change", (ev) => {
      A3_VELOCITY.z = ev.value;
    });

  pane.addBlade({
    view: "separator",
  });

  pane.addBinding(PARAMS, "waifu_rgb").on("change", (ev) => {
    togglerRGBImage(ev.value);
  });

  const folder2 = pane.addFolder({
    title: "DID YOU FULLSCREEN?",
    expanded: true,
  });

  folder2
    .addButton({
      title: `BUTTON TO FULLSCREEN`,
    })
    .on("click", () => {
      toggleFullscreen();
    });
});
