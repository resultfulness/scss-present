import "./style.scss";

let startSlide = parseInt(localStorage.getItem("lastSlide") as string) || 0;

const slidesCount = document.querySelectorAll(".slide").length;
const slideStates: boolean[] = Array(slidesCount);

const slideCounter = document.querySelector(".slide-counter") as HTMLDivElement;
slideCounter.innerHTML = `${startSlide}/${slidesCount - 1}`;

window.onload = () => displaySlide(startSlide);

document
  .querySelector<HTMLButtonElement>(".next")
  ?.addEventListener("click", nextSlide);

document
  .querySelector<HTMLButtonElement>(".back")
  ?.addEventListener("click", prevSlide);

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowRight":
      nextSlide();
      break;
    case "ArrowLeft":
      prevSlide();
      break;
    default:
      break;
  }
});

function nextSlide() {
  let newSlideIndex = slideStates.indexOf(true) + 1;
  if (newSlideIndex > slidesCount - 1) return;
  displaySlide(newSlideIndex);
}

function prevSlide() {
  let newSlideIndex = slideStates.indexOf(true) - 1;
  if (newSlideIndex < 0) return;
  displaySlide(newSlideIndex);
}

function displaySlide(newSlideIndex: number) {
  localStorage.setItem("lastSlide", `${newSlideIndex}`);
  slideCounter.innerHTML = `${newSlideIndex}/${slidesCount - 1}`;
  slideStates.fill(false);
  slideStates[newSlideIndex] = true;
  document.querySelectorAll<HTMLElement>(".slide").forEach((slide, index) => {
    if (slideStates[index] === false) {
      slide.style.display = "none";
    } else if (slide.classList.contains("title")) {
      slide.style.display = "grid";
    } else {
      slide.style.display = "block";
    }
  });
}
