const moreWork = document.querySelector(".more-work");
const showLessButton = document.querySelector(".show-less-button");

if (moreWork && showLessButton) {
  showLessButton.addEventListener("click", () => {
    moreWork.open = false;
    moreWork.querySelector("summary")?.focus();
  });
}
