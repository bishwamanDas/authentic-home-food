const playBtn = document.getElementById("playBtn");
const thumbnail = document.getElementById("videoThumbnail");
const myVideo = document.getElementById("myVideo");
const videoContainer = document.querySelector(".video-image-container");
const requestBtn = document.querySelector(".request-btn");
const modal = document.getElementById("requestModal");
const cancelBtn = document.getElementById("cancelBtn");
const submitBtn = document.getElementById("submitBtn");

// --- helpers ---
function showOverlayButton() {
  playBtn.style.display = "flex";                 // show green button
  videoContainer.classList.add("video-playing");  // gradient stays hidden
}
function hideOverlayButton() {
  playBtn.style.display = "none";                 // hide green button
  videoContainer.classList.add("video-playing");  // gradient stays hidden
}

// --- start/resume playback from overlay button ---
playBtn.addEventListener("click", () => {
  thumbnail.style.display = "none";     // hide thumbnail
  myVideo.style.display = "block";      // show video
  videoContainer.classList.add("video-playing"); // hide gradient
  myVideo.play();
});

// --- pause video when user clicks directly on it ---
myVideo.addEventListener("click", (e) => {
  e.preventDefault(); // stop default toggle behavior
  if (!myVideo.paused) {
    myVideo.pause();
  }
});

// --- keep UI in sync with actual media state ---
myVideo.addEventListener("play", () => {
  hideOverlayButton();
});

myVideo.addEventListener("pause", () => {
  // Only show overlay if paused before ending
  if (myVideo.currentTime < myVideo.duration) {
    setTimeout(showOverlayButton, 0);
  }
});

myVideo.addEventListener("ended", () => {
  // Full reset to initial state
  thumbnail.style.display = "block";
  myVideo.style.display = "none";
  playBtn.style.display = "flex";
  videoContainer.classList.remove("video-playing"); // gradient returns only at end
  // Optional rewind
  // myVideo.currentTime = 0;
});

// -------------- MODAL CODE --------------
requestBtn.addEventListener("click", () => {
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
});

cancelBtn.addEventListener("click", closeModal);
submitBtn.addEventListener("click", closeModal);

function closeModal() {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

window.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});



// === SLIDER CODE FOR POPULAR ITEMS ===
const cards = [
  document.querySelector(".popular-card-1"),
  document.querySelector(".popular-card-2"),
  document.querySelector(".popular-card-3")
];

const rightArrow = document.querySelector(".arrow-btn.left,.hollow-circle-left");
const leftArrow = document.querySelector(".arrow-btn.right, .hollow-circle-right");

let positions = ["left", "middle", "right"];

function updatePositions() {
  cards.forEach((card, index) => {
    card.classList.remove("left", "middle", "right");
    card.classList.add(positions[index]);
  });
}

rightArrow.addEventListener("click", () => {
  positions.unshift(positions.pop());
  updatePositions();
});

leftArrow.addEventListener("click", () => {
  positions.push(positions.shift());
  updatePositions();
});

updatePositions();
