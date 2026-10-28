const LOADING_DURATION_MS = 5000;
const messages = ["Preparing your space", "Bringing everything together", "Adding the finishing touches", "All set. Welcome in!"];

const counter = document.getElementById("percentage");
const message = document.getElementById("message");
const loadingBar = document.getElementById("loading-bar");

let startTime = null;

const renderProcess = (percent) => {
    const roundedPercentage = Math.floor(percent);
    const currentMessage = roundedPercentage >= 100 ? 3 : roundedPercentage > 80 ? 2 : roundedPercentage > 35 ? 1 : 0;

    counter.textContent = roundedPercentage;
    message.textContent = messages[currentMessage];
    loadingBar.style.width = `${roundedPercentage}%`;
};



const updateProcess = (timestamp) => {
    if (startTime === null) startTime = timestamp;
    const percent = Math.min((timestamp - startTime)/LOADING_DURATION_MS * 100 , 100);
    
    renderProcess(percent);

    if (percent < 100) {
        requestAnimationFrame(updateProcess);
    }
};

requestAnimationFrame(updateProcess);