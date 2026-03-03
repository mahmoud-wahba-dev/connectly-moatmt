import "./styles/main.css";
import "flyonui/flyonui";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Configure ScrollTrigger defaults for better performance
ScrollTrigger.config({
  limitCallbacks: true, // Limit callbacks for better performance
  syncInterval: 150, // Sync interval for smoother animations
});

// Set defaults for GSAP animations
gsap.defaults({
  ease: "power2.out",
  duration: 1,
});

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
    
    // Initialize GSAP animations
    initGSAPAnimations();
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
    // Skip autoplay videos (hero section)
    if (video.hasAttribute('autoplay')) {
      return;
    }
    
    // Skip marquee videos (handled by Intersection Observer)
    if (video.classList.contains('marquee-video')) {
      return;
    }

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

// Initialize all GSAP animations
function initGSAPAnimations() {
  // Setup responsive breakpoints matching Tailwind
  const mm = gsap.matchMedia();
  
  // Add animations for different screen sizes
  mm.add({
    // Mobile
    isMobile: "(max-width: 767px)",
    // Tablet
    isTablet: "(min-width: 768px) and (max-width: 1023px)",
    // Desktop
    isDesktop: "(min-width: 1024px)",
  }, (context) => {
    const { isMobile, isTablet, isDesktop } = context.conditions;
    
    // Navbar animation
    animateNavbar(isMobile);
    
    // Hero section
    animateHeroSection(isMobile);
    
    // Why Choose Us section
    animateWhyChooseUs(isMobile);
    
    // Pricing section
    animatePricingSection(isMobile);
    
    // Carousel section
    animateCarouselSection(isMobile);
    
    // How to Order section
    animateHowToOrder(isMobile);
    
    // Guarantee section
    animateGuaranteeSection(isMobile);
    
    // Footer
    animateFooter(isMobile);
    
  });
  
  console.log("GSAP animations initialized");
}

// Navbar scroll animation
function animateNavbar(isMobile) {
  const navbar = document.querySelector('.navbar');
  
  if (!navbar) return;
  
  gsap.to(navbar, {
    backgroundColor: "rgba(0, 0, 0, 0.95)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    scrollTrigger: {
      trigger: "body",
      start: "100px top",
      end: "200px top",
      scrub: 0.5,
      toggleActions: "play none none reverse",
    }
  });
}

// Hero section animations
function animateHeroSection(isMobile) {
  const heroSection = document.querySelector('#showcase');
  
  if (!heroSection) return;
  
  // Parallax videos (only on desktop for performance)
  if (!isMobile) {
    const videos = heroSection.querySelectorAll('video');
    videos.forEach((video, index) => {
      gsap.to(video.parentElement, {
        y: 100,
        scrollTrigger: {
          trigger: heroSection,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        }
      });
    });
  }
  
  // Center content staggered entrance
  const headline = heroSection.querySelector('h1');
  const description = heroSection.querySelector('p');
  const buttons = heroSection.querySelectorAll('.btn');
  
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: heroSection,
      start: "top 80%",
      toggleActions: "play none none none",
    }
  });
  
  timeline
    .from(headline, {
      y: 50,
      opacity: 0,
      duration: 0.8,
    })
    .from(description, {
      y: 30,
      opacity: 0,
      duration: 0.6,
    }, "-=0.4")
    .from(buttons, {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.2,
    }, "-=0.3");
  
  // Social icons drift-in animation
  const socialIcons = heroSection.querySelectorAll('img[class*="absolute"]');
  socialIcons.forEach((icon, index) => {
    gsap.from(icon, {
      scale: 0,
      rotation: 360,
      opacity: 0,
      duration: 1,
      delay: 0.5 + (index * 0.2),
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: heroSection,
        start: "top 80%",
        toggleActions: "play none none none",
      }
    });
  });
}

// Why Choose Us section animations
function animateWhyChooseUs(isMobile) {
  const section = document.querySelector('#why-choose-us');
  
  if (!section) return;
  
  // Section title animation
  const title = section.querySelector('h2');
  if (title) {
    gsap.from(title, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none none",
      }
    });
  }
  
  // Feature cards staggered animation
  const cards = section.querySelectorAll('.grid > div');
  
  gsap.from(cards, {
    y: 80,
    opacity: 0,
    scale: 0.9,
    duration: 0.6,
    stagger: isMobile ? 0.15 : 0.1,
    ease: "back.out(1.2)",
    scrollTrigger: {
      trigger: section,
      start: "top 70%",
      toggleActions: "play none none none",
    }
  });
  
  // Parallax on decorative background images (desktop only)
  if (!isMobile) {
    const decorativeImages = section.querySelectorAll('img[class*="absolute"]');
    decorativeImages.forEach(img => {
      gsap.to(img, {
        y: -30,
        scrollTrigger: {
          trigger: img.closest('div'),
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });
    });
  }
}

// Pricing section animations
function animatePricingSection(isMobile) {
  const section = document.querySelector('#pricing');
  
  if (!section) return;
  
  // Section title
  const title = section.querySelector('h2');
  if (title) {
    gsap.from(title, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none none",
      }
    });
  }
  
  // Get the two pricing cards
  const cards = section.querySelectorAll('.grid > div');
  
  if (cards.length >= 2) {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        toggleActions: "play none none none",
      }
    });
    
    // Slide in from opposite directions
    timeline
      .from(cards[0], {
        x: isMobile ? 0 : -100,
        y: isMobile ? 50 : 0,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
      .from(cards[1], {
        x: isMobile ? 0 : 100,
        y: isMobile ? 50 : 0,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.6");
  }
  
  // Pulse animation on featured badge
  const badge = section.querySelector('[class*="الأكثر"]');
  if (badge) {
    gsap.to(badge, {
      scale: 1.05,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: badge,
        start: "top 80%",
        toggleActions: "play pause resume pause",
      }
    });
  }
}

// Carousel section animations
function animateCarouselSection(isMobile) {
  const section = document.querySelector('#carousel');
  
  if (!section) return;
  
  // Section title
  const title = section.querySelector('h2');
  if (title) {
    gsap.from(title, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none none",
      }
    });
  }
  
  // Carousel items staggered reveal
  const carouselItems = section.querySelectorAll('.carousel-item');
  
  gsap.from(carouselItems, {
    y: 100,
    opacity: 0,
    scale: 0.95,
    duration: 0.7,
    stagger: 0.1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: section.querySelector('.carousel'),
      start: "top 75%",
      toggleActions: "play none none none",
    }
  });
  
  // Add hover scale animation to video cards
  const videoCards = section.querySelectorAll('.group');
  videoCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        scale: 1.03,
        duration: 0.3,
        ease: "power2.out",
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });
  
  // Subtle float animation for idle cards (desktop only)
  if (!isMobile) {
    videoCards.forEach((card, index) => {
      gsap.to(card, {
        y: -10,
        duration: 2 + (index * 0.2),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.3,
      });
    });
  }
}

// How to Order section animations
function animateHowToOrder(isMobile) {
  const section = document.querySelector('#how-to-order');
  
  if (!section) return;
  
  // Section title
  const title = section.querySelector('h2');
  if (title) {
    gsap.from(title, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none none",
      }
    });
  }
  
  // Sequential animation for steps and arrows
  const steps = section.querySelectorAll('.grid > div');
  
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 70%",
      toggleActions: "play none none none",
    }
  });
  
  steps.forEach((step, index) => {
    // Animate each step
    timeline.from(step, {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      ease: "back.out(1.7)",
    }, index * 0.2);
  });
  
  // Parallax arrows (desktop only)
  if (!isMobile) {
    const arrows = section.querySelectorAll('img[src*="arrow"]');
    arrows.forEach(arrow => {
      gsap.to(arrow, {
        x: 20,
        scrollTrigger: {
          trigger: arrow,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        }
      });
    });
  }
}

// Guarantee section animations
function animateGuaranteeSection(isMobile) {
  const section = document.querySelector('#guarantee');
  
  if (!section) return;
  
  // Section background and title fade-in
  gsap.from(section, {
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      toggleActions: "play none none none",
    }
  });
  
  const title = section.querySelector('h2');
  if (title) {
    gsap.from(title, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        toggleActions: "play none none none",
      }
    });
  }
  
  // Marquee speed variation on scroll (desktop only for performance)
  if (!isMobile) {
    const marqueeColumns = section.querySelectorAll('.marquee-column');
    marqueeColumns.forEach((column, index) => {
      gsap.to(column, {
        animationDuration: index === 0 ? "40s" : "40s",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const speed = 50 - (progress * 10);
            column.style.animationDuration = `${speed}s`;
          }
        }
      });
    });
  }
  
  // Add glow effect to video containers on hover
  const videoContainers = section.querySelectorAll('.marquee-video');
  videoContainers.forEach(container => {
    container.addEventListener('mouseenter', () => {
      gsap.to(container, {
        boxShadow: "0 0 30px rgba(237, 45, 72, 0.5)",
        duration: 0.3,
      });
    });
    
    container.addEventListener('mouseleave', () => {
      gsap.to(container, {
        boxShadow: "none",
        duration: 0.3,
      });
    });
  });
}

// Footer animations
function animateFooter(isMobile) {
  const footer = document.querySelector('footer');
  
  if (!footer) return;
  
  // Fade-up footer content
  gsap.from(footer, {
    y: 50,
    opacity: 0,
    duration: 0.8,
    scrollTrigger: {
      trigger: footer,
      start: "top 90%",
      toggleActions: "play none none none",
    }
  });
  
  // Stagger social icons
  const socialIcons = footer.querySelectorAll('a[href*="instagram"], a[href*="linkedin"], a[href*="twitter"], a[href*="facebook"]');
  
  gsap.from(socialIcons, {
    scale: 0,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: footer,
      start: "top 90%",
      toggleActions: "play none none none",
    }
  });
}
