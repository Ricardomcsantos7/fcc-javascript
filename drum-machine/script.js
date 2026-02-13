/* Sounds Bank */
const soundBanks = {
  heater: {
    Q: {
      name: "Heater 1",
      src: "https://cdn.freecodecamp.org/curriculum/drum/Heater-1.mp3",
    },
    W: {
      name: "Heater 2",
      src: "https://cdn.freecodecamp.org/curriculum/drum/Heater-2.mp3",
    },
    E: {
      name: "Heater 3",
      src: "https://cdn.freecodecamp.org/curriculum/drum/Heater-3.mp3",
    },
    A: {
      name: "Heater 4",
      src: "https://cdn.freecodecamp.org/curriculum/drum/Heater-4_1.mp3",
    },
    S: {
      name: "Clap",
      src: "https://cdn.freecodecamp.org/curriculum/drum/Heater-6.mp3",
    },
    D: {
      name: "Open HH",
      src: "https://cdn.freecodecamp.org/curriculum/drum/Dsc_Oh.mp3",
    },
    Z: {
      name: "Kick n Hat",
      src: "https://cdn.freecodecamp.org/curriculum/drum/Kick_n_Hat.mp3",
    },
    X: {
      name: "Kick",
      src: "https://cdn.freecodecamp.org/curriculum/drum/RP4_KICK_1.mp3",
    },
    C: {
      name: "Closed HH",
      src: "https://cdn.freecodecamp.org/curriculum/drum/Cev_H2.mp3",
    },
  },

  percussion: {
    Q: {
      name: "Shaker",
      src: "https://cdn.freecodecamp.org/curriculum/drum/Give_us_a_light.mp3",
    },
    W: {
      name: "Snare Soft",
      src: "https://cdn.freecodecamp.org/curriculum/drum/Dry_Ohh.mp3",
    },
    E: {
      name: "Hi Hat Alt",
      src: "https://cdn.freecodecamp.org/curriculum/drum/Bld_H1.mp3",
    },
    A: {
      name: "Tom Low",
      src: "https://cdn.freecodecamp.org/curriculum/drum/side_stick_1.mp3",
    },
    S: {
      name: "Tom Mid",
      src: "https://cdn.freecodecamp.org/curriculum/drum/punchy_kick_1.mp3",
    },
    D: {
      name: "Ride",
      src: "https://cdn.freecodecamp.org/curriculum/drum/Chord_1.mp3",
    },
    Z: {
      name: "808 Kick",
      src: "https://cdn.freecodecamp.org/curriculum/drum/Brk_Snr.mp3",
    },
    X: {
      name: "Snare Alt",
      src: "https://cdn.freecodecamp.org/curriculum/drum/Heater-3.mp3",
    },
    C: {
      name: "Clap Alt",
      src: "https://cdn.freecodecamp.org/curriculum/drum/Heater-6.mp3",
    },
  },
};

/* Global variables */
let currentBank = "heater";
let powerOn = false;
let booting = false;
let darkMode = true;

/* DOM Selectors */
const display = document.getElementById("display");
const drumPads = document.querySelectorAll(".drum-pad");

const powerBtn = document.getElementById("power-btn");
const powerLed = document.getElementById("power-led");
const themeBtn = document.getElementById("theme-btn");
const bankToggle = document.getElementById("bank-toggle");

/* Main functionality */
function playSound(key) {
  const audio = document.getElementById(key);
  if (!powerOn || booting) return;

  const pad = audio.parentElement;

  // 🎛️ Update source from current bank BEFORE playing
  audio.src = soundBanks[currentBank][key].src;

  audio.currentTime = 0; // allows rapid re-trigger
  audio.play();

  // 🎛️ Update display from bank data
  display.textContent = soundBanks[currentBank][key].name;

  /* Visual feedback */
  pad.classList.add("active");

  setTimeout(() => {
    pad.classList.remove("active");
  }, 100);
}

/* Click */
drumPads.forEach((pad) => {
  pad.addEventListener("click", () => {
    playSound(pad.textContent.trim());
  });
});

/* Keybord */
document.addEventListener("keydown", (event) => {
  playSound(event.key.toUpperCase());
});

/* Power Toggle */
powerBtn.addEventListener("click", () => {
  if (powerOn || booting) {
    // Turn OFF immediately
    powerOn = false;
    booting = false;

    powerBtn.classList.remove("active");
    powerLed.classList.remove("on", "booting");
    document.getElementById("drum-machine").classList.remove("on", "booting");

    // Reset bank to default
    currentBank = "heater";
    bankToggle.classList.remove("active");

    display.textContent = "Power Off";
    return;
  }

  // Boot Sequence
  booting = true;

  powerBtn.classList.add("active");
  powerLed.classList.add("booting");
  document.getElementById("drum-machine").classList.add("booting");

  display.textContent = "Booting...";

  setTimeout(() => {
    booting = false;
    powerOn = true;

    powerLed.classList.remove("booting");
    powerLed.classList.add("on");

    document.getElementById("drum-machine").classList.remove("booting");
    document.getElementById("drum-machine").classList.add("on");

    display.textContent = "Power On";
  }, 1500); // boot duration
});

/* Theme switch */
themeBtn.addEventListener("click", () => {
  darkMode = !darkMode;

  themeBtn.classList.toggle("active");
  document.body.classList.toggle("light-mode");

  display.textContent = darkMode ? "Dark Mode" : "Light Mode";
});

/* Switch Bank */
bankToggle.addEventListener("click", () => {
  if (!powerOn || booting) return;

  currentBank = currentBank === "heater" ? "percussion" : "heater";

  bankToggle.classList.toggle("active");

  display.textContent =
    currentBank === "heater" ? "Heater Bank" : "Percussion Bank";
});
