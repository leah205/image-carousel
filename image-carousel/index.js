const imagePanel = document.querySelector(".image-panel");
const panelImages = Array.from(document.querySelectorAll(".image-panel img"));
const previousArrow = document.querySelector(".left-arrow");
const nextArrow = document.querySelector(".right-arrow");
const progressCircles = Array.from(
  document.querySelectorAll(".progress-circle")
);
let displayedImageNum = 0;
let translatedNum = 0;
let intervalId;

updateCarousel();

function moveToNext() {
  if (displayedImageNum === panelImages.length - 1) {
    displayedImageNum = 0;
    translatedNum = 0;
    movePanel(translatedNum);
  } else {
    displayedImageNum += 1;
    translatedNum -= 1000;
    movePanel(translatedNum);
  }
  updateCarousel();
}

function moveToPrevious() {
  if (displayedImageNum === 0) {
    displayedImageNum = panelImages.length - 1;
    translatedNum = -(1000 * displayedImageNum);
    movePanel(translatedNum);
  } else {
    displayedImageNum -= 1;
    translatedNum += 1000;
    movePanel(translatedNum);
  }
  updateCarousel();
}

previousArrow.addEventListener("click", () => {
  moveToPrevious();
});

nextArrow.addEventListener("click", () => {
  moveToNext();
});

function movePanel(num) {
  imagePanel.style.transform = `translate(${num}px, 0)`;
}
function updateCarousel() {
  if (intervalId) clearInterval(intervalId);
  startMoveTimer();
  updatePanelVisibility();
  updateProgressIndicator();
}

function startMoveTimer() {
  intervalId = setInterval(moveToNext, 5000);
}

function updatePanelVisibility() {
  const displayedImage = panelImages[displayedImageNum];
  panelImages.forEach((img) => {
    if (displayedImage === img) {
      displayElement(img);
    } else {
      hideElement(img);
    }
  });
}

function updateProgressIndicator() {
  progressCircles.forEach((circle) => {
    if (circle.classList.contains("selected")) {
      circle.classList.remove("selected");
    }
  });
  for (let index in progressCircles) {
    if (index == displayedImageNum) {
      progressCircles[index].classList.add("selected");
    }
  }
}

progressCircles.forEach((circle) => {
  circle.addEventListener("click", () => {
    const index = progressCircles.indexOf(circle);
    displayedImageNum = index;
    translatedNum = -(1000 * index);
    movePanel(translatedNum);
    updateCarousel();
  });
});

function displayElement(element) {
  element.classList.remove("hidden");
}

function hideElement(element) {
  element.classList.add("hidden");
}
