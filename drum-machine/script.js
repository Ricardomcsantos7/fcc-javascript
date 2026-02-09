const display = document.getElementById("display");
const drumPads = document.querySelectorAll(".drum-pad");

drumPads.forEach((pad) => {
  pad.addEventListener("click", () => {
    const audio = pad.querySelector("audio");

    audio.currentTime = 0; // allows rapid re-trigger
    audio.play();

    display.textContent = pad.id;
  });
});
