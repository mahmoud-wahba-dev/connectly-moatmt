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

    // Setup video interactions after FlyonUI initialization
    setupVideoHoverInteractions();
  }, 100);
});

// Setup video hover interactions
function setupVideoHoverInteractions() {
  const videos = document.querySelectorAll("video");

  if (videos.length === 0) {
    console.log("No videos found");
    return;
  }

  videos.forEach((video) => {
    // Ensure video is paused initially
    video.pause();

    // Get the parent container for hover
    const container = video.closest(".group") || video.parentElement;

    if (container) {
      // Mouse enter - play video
      container.addEventListener("mouseenter", () => {
        if (video.paused) {
          video.play().catch((error) => {
            console.log("Video play error:", error);
          });
        }
      });

      // Mouse leave - pause video
      container.addEventListener("mouseleave", () => {
        if (!video.paused) {
          video.pause();
          video.currentTime = 0;
        }
      });

      // Touch events for mobile
      container.addEventListener("touchstart", () => {
        if (video.paused) {
          video.play().catch((error) => {
            console.log("Video play error:", error);
          });
        }
      });

      container.addEventListener("touchend", () => {
        if (!video.paused) {
          video.pause();
          video.currentTime = 0;
        }
      });
    }
  });

  console.log(`Video hover setup completed for ${videos.length} videos`);
}
