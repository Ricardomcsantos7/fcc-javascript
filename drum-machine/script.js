const display = document.getElementById("display");
const drumPads = document.querySelectorAll(".drum-pad");

function playSound(key) {
  const audio = document.getElementById(key);
  if (!audio) return;

  const pad = audio.parentElement;

  audio.currentTime = 0; // allows rapid re-trigger
  audio.play();

  display.textContent = pad.id;
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
