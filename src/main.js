import "./styles/main.css";
import "flyonui/flyonui";

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    if (
      window.HSStaticMethods &&
      typeof window.HSStaticMethods.autoInit === "function"
    ) {
      window.HSStaticMethods.autoInit();
    }
  }, 100);
});
const videos = document.querySelectorAll("video");

videos.forEach((video) => {
  // يخلي الفيديو واقف في البداية
  video.pause();

  video.addEventListener("mouseenter", () => {
    video.play();
  });

  video.addEventListener("mouseleave", () => {
    video.pause();
    video.currentTime = 0; // اختياري
  });
});
