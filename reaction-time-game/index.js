const mainScreen = document.getElementById("reaction-screen");
const statusIcon = document.getElementById("state");
const message = document.getElementById("message");
const text = document.getElementById("text");
const lastAttempt = document.getElementById("last-attempt");
const best = document.getElementById("best");
const correctIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check preview-icon"><path d="M20 6 9 17l-5-5"/></svg>';
const retryIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rotate-ccw preview-icon"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>';

let timeoutId;

let state = "ready";
let startAt = 0;
let endAt = 0;

const reactionProcess = () => {
  if (state === "ready") {
    waitingScreen();
  } else if (state === "waiting") {
    tooSoonScreen();
  } else if (state === "result") {
    resultScreen();
  }
};

const waitingScreen = () => {
  mainScreen.style.backgroundColor = "#4d0218";
  statusIcon.textContent = "•••";
  statusIcon.style.fontSize = "30px";
  message.textContent = "Wait for green...";
  text.textContent = "Not yet. Stay ready.";

  state = "waiting";
  timeoutId = setTimeout(
    () => {
      clickScreen();
    },
    Math.floor(Math.random() * 3000) + 2000,
  );
  mainScreen.addEventListener("click", reactionProcess);
};

const clickScreen = () => {
  mainScreen.style.backgroundColor = "#d9f999";
  statusIcon.style.color = "#000000";
  message.style.color = "#000000";
  text.style.color = "#000000";
  statusIcon.textContent = "!";
  statusIcon.style.fontSize = "48px";
  message.textContent = "Click now!";
  text.textContent = "Go, go, go!";

  state = "result";
  startAt = performance.now();
  mainScreen.addEventListener("click", reactionProcess);
};

let bestRecord = null;

const resultScreen = () => {
  clearTimeout(timeoutId);
  endAt = performance.now();
  const reactionTime = endAt - startAt;

  bestRecord = !bestRecord ? reactionTime : Math.min(bestRecord, reactionTime);

  state = "ready";
  mainScreen.addEventListener("click", reactionProcess);

  mainScreen.style.backgroundColor = "#27272A";
  statusIcon.innerHTML = correctIcon;
  statusIcon.style.fontSize = "48px";
  statusIcon.style.color = "#ffffff";
  message.textContent = `${reactionTime.toFixed(0)} ms`;
  message.style.color = "#ffffff";
  text.textContent = "Click to play again";
  text.style.color = "#ffffff";

  lastAttempt.textContent = `${reactionTime.toFixed(0)} ms`;
  best.textContent = `${bestRecord.toFixed(0)} ms`;
  reactionValue = reactionTime;
};

const tooSoonScreen = () => {
  mainScreen.style.backgroundColor = "#27272A";
  statusIcon.innerHTML = retryIcon;
  statusIcon.style.fontSize = "48px";
  statusIcon.style.color = "#ffffff";
  message.textContent = "Too soon!";
  message.style.color = "#ffffff";
  text.textContent = "Click to try again";
  text.style.color = "#ffffff";

  clearTimeout(timeoutId);
  state = "ready";
  mainScreen.addEventListener("click", reactionProcess);
};

mainScreen.addEventListener("click", reactionProcess);
