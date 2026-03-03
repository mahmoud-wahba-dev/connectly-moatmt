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
    setupMarqueeInteractions();
    setupMarqueeVideos();
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

// Setup marquee hover pause interactions
function setupMarqueeInteractions() {
  const marqueeColumns = document.querySelectorAll(".marquee-column");

  if (marqueeColumns.length === 0) {
    console.log("No marquee columns found");
    return;
  }

  marqueeColumns.forEach((column) => {
    // Mouse enter - pause animation
    column.addEventListener("mouseenter", () => {
      column.classList.add("marquee-paused");
    });

    // Mouse leave - resume animation
    column.addEventListener("mouseleave", () => {
      column.classList.remove("marquee-paused");
    });
  });

  console.log(`Marquee hover setup completed for ${marqueeColumns.length} columns`);
}

// Setup marquee video playback with Intersection Observer
function setupMarqueeVideos() {
  const marqueeVideos = document.querySelectorAll(".marquee-video");

  if (marqueeVideos.length === 0) {
    console.log("No marquee videos found");
    return;
  }

  // Create intersection observer to play/pause videos based on visibility
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5, // Video must be 50% visible
  };

  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const video = entry.target;

      if (entry.isIntersecting) {
        // Video is visible, play it
        video.play().catch((error) => {
          console.log("Marquee video play error:", error);
        });
      } else {
        // Video is not visible, pause it
        video.pause();
      }
    });
  }, observerOptions);

  // Observe all marquee videos
  marqueeVideos.forEach((video) => {
    videoObserver.observe(video);
  });

  console.log(`Marquee video observer setup completed for ${marqueeVideos.length} videos`);
}
