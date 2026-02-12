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
};

let currentBank = "heater";

/* Main functionality */
const display = document.getElementById("display");
const drumPads = document.querySelectorAll(".drum-pad");

function playSound(key) {
  const audio = document.getElementById(key);
  if (!audio) return;

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

/* Toggle switch */
const bankToggle = document.getElementById("bank-toggle");

bankToggle.addEventListener("click", () => {
  currentBank = currentBank === "heater" ? "heater" : "heater";
  display.textContent = "Heater Bank";
});
