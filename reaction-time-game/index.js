const reactionScreen = document.getElementById("reaction-screen");
const state = document.getElementById("state");
const message = document.getElementById("message");
const text = document.getElementById("text");

let timeoutId;

let statusMessage = "idle";
let startAt = 0;
let endAt = 0;

const ReactionTimeGame = () => {
  if (statusMessage === "ready") {
    resultScreen();

  } else if (statusMessage === "waiting") {

    tooSoonScreen();

  } else {
    waitingScreen();
  }
};

const waitingScreen = () => {
    statusMessage = "waiting";
    reactionScreen.style.backgroundColor = "#4d0218";
    state.textContent = "•••";
    state.style.fontSize = "30px";
    message.textContent = "Wait for green...";
    text.textContent = "Not yet. Stay ready.";
    timeoutId = setTimeout(
      () => {
        clickScreen();
      },
      Math.floor(Math.random() * 3000) + 2000,
    );
}

const tooSoonScreen = () => {
  reactionScreen.style.backgroundColor = "#27272A";
  state.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rotate-ccw preview-icon"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>';
  message.textContent = "Too soon!";
  text.textContent = "Click to try again";
  clearTimeout(timeoutId);
  reactionScreen.addEventListener("click", () => {
    statusMessage = "idle";
  });
};

const clickScreen = () => {
  statusMessage = "ready";
  startAt = performance.now();

  reactionScreen.style.backgroundColor = "#d9f999";
  state.textContent = "!";
  state.style.fontSize = "48px";
  state.style.color = "#000000";
  message.textContent = "Click now!";
  message.style.color = "#000000";
  text.textContent = "Go, go, go!";
  text.style.color = "#000000";

  reactionScreen.addEventListener("click", resultScreen);
};

const resultScreen = () => {
  endAt = performance.now();
  const reactionTime = endAt - startAt;
  statusMessage = "idle";
  reactionScreen.style.backgroundColor = "#27272A";
  state.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check preview-icon"><path d="M20 6 9 17l-5-5"/></svg>';
  state.style.fontSize = "48px";
  state.style.color = "#ffffff";
  message.textContent = `${reactionTime.toFixed(0)} ms`;
  message.style.color = "#ffffff";
  text.textContent = "Click to play again";
  text.style.color = "#ffffff";
  }

reactionScreen.addEventListener("click", ReactionTimeGame);
