(() => {
  const imageSelectors = [
    ".decision-card .artifact-image img",
    ".decision-card .comparison-media img",
    ".decision-card .tabbed-panel img",
    ".feature-card .feature-media img"
  ];

  const images = Array.from(document.querySelectorAll(imageSelectors.join(",")));
  if (!images.length) return;

  const modal = document.createElement("div");
  modal.className = "image-lightbox";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-label", "Expanded project image");
  modal.hidden = true;
  modal.innerHTML = `
    <button class="image-lightbox-close" type="button" aria-label="Close image">×</button>
    <figure class="image-lightbox-frame">
      <img alt="" />
      <figcaption></figcaption>
    </figure>
  `;
  document.body.appendChild(modal);

  const modalImage = modal.querySelector("img");
  const caption = modal.querySelector("figcaption");
  const closeButton = modal.querySelector("button");
  let lastFocused = null;

  const openImage = (image) => {
    lastFocused = document.activeElement;
    modalImage.src = image.currentSrc || image.src;
    modalImage.alt = image.alt || "";
    caption.textContent = image.alt || "";
    caption.hidden = !image.alt;
    modal.hidden = false;
    document.body.classList.add("lightbox-open");
    closeButton.focus();
  };

  const closeImage = () => {
    modal.hidden = true;
    modalImage.removeAttribute("src");
    document.body.classList.remove("lightbox-open");
    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    }
  };

  const isVisibleImage = (image) => {
    const imageStyle = window.getComputedStyle(image);
    if (imageStyle.display === "none" || imageStyle.visibility === "hidden") {
      return false;
    }

    if (image.closest("[hidden]")) {
      return false;
    }

    const tabbedPanel = image.closest(".tabbed-panel");
    if (tabbedPanel) {
      return window.getComputedStyle(tabbedPanel).display !== "none";
    }

    return true;
  };

  const getVisibleImage = (target, fallbackImage) => {
    const targetImages = Array.from(target.querySelectorAll("img"));
    return targetImages.find(isVisibleImage) || fallbackImage;
  };

  const enhancedTargets = new Map();

  const enhanceTarget = (target, image) => {
    if (enhancedTargets.has(target)) {
      return;
    }

    enhancedTargets.set(target, image);
    target.classList.add("is-lightbox-trigger");
    target.setAttribute("role", "button");
    target.setAttribute("tabindex", "0");
    target.setAttribute("aria-label", `View larger image: ${image.alt || "project visual"}`);
    target.addEventListener("click", () => openImage(getVisibleImage(target, image)));
    target.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openImage(getVisibleImage(target, image));
      }
    });
  };

  images.forEach((image) => {
    const target = image.closest(".platform-collage-item, .tabbed-panel, .artifact-image, .comparison-state, .feature-media") || image;
    enhanceTarget(target, image);
  });

  closeButton.addEventListener("click", closeImage);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeImage();
  });
  document.addEventListener("keydown", (event) => {
    if (!modal.hidden && event.key === "Escape") closeImage();
  });
})();
