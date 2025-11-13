document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navigation = document.querySelector(".site-nav");

  if (navToggle && navigation) {
    const navLinks = navigation.querySelectorAll("a");

    navToggle.addEventListener("click", () => {
      const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!isExpanded));
      navigation.classList.toggle("is-open");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (navToggle.getAttribute("aria-expanded") === "true") {
          navToggle.setAttribute("aria-expanded", "false");
          navigation.classList.remove("is-open");
        }
      });
    });
  }

  const listenerButton = document.getElementById("listenerButton");
  const listenerImage = document.getElementById("listenerImage");

  if (listenerButton && listenerImage) {
    listenerButton.addEventListener("click", () => {
      const currentSrc = listenerImage.getAttribute("src");
      const altSrc = listenerImage.getAttribute("data-alt-src");

      if (altSrc) {
        listenerImage.setAttribute("src", altSrc);
        listenerImage.setAttribute("data-alt-src", currentSrc);
      }
    });
  }

  // Inicjalizacja lightboxa dla galerii
  initLightbox();
});

// Definicje galerii dla każdego budynku
const galleries = {
  "burj-khalifa": [
    "images/Burj Khalifa/pexels-alexazabache-3243025.jpg",
    "images/Burj Khalifa/pexels-maxavans-5087047.jpg",
    "images/Burj Khalifa/pexels-nadiia-3130737-31472698.jpg"
  ],
  "shanghai-tower": [
    "images/Shanghai Tower/siyuan-hu-Jea4t6pte-k-unsplash.jpg",
    "images/Shanghai Tower/wenhao-ruan-rqq8DaCuDIU-unsplash.jpg",
    "images/Shanghai Tower/yiran-ding-A3olY-ks1k4-unsplash.jpg"
  ],
  "abraj-al-bait": [
    "images/Abraj Al-Bait Towers/pexels-khalid-walid-69422316-31490302.jpg",
    "images/Abraj Al-Bait Towers/pexels-kufarooq-8521788.jpg",
    "images/Abraj Al-Bait Towers/pexels-yasirgurbuz-12808986.jpg"
  ],
  "ping-an-finance": [
    "images/Ping An Finance Center/pexels-tangjingao-4449212.jpg",
    "images/Ping An Finance Center/pexels-tangjingao-4449214.jpg",
    "images/Ping An Finance Center/pexels-tian-jin-505460776-31529263.jpg"
  ]
};

let lightbox = null;
let currentIndex = 0;
let currentGallery = [];

function initLightbox() {
  if (lightbox) return; // Lightbox już zainicjalizowany
  
  lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Zamknij galerię" onclick="closeLightbox()">&times;</button>
    <button class="lightbox-prev" aria-label="Poprzednie zdjęcie" onclick="prevImage()">&#8249;</button>
    <button class="lightbox-next" aria-label="Następne zdjęcie" onclick="nextImage()">&#8250;</button>
    <img class="lightbox-image" src="" alt="">
    <div class="lightbox-counter"></div>
  `;
  document.body.appendChild(lightbox);

  const lightboxImage = lightbox.querySelector(".lightbox-image");
  const lightboxCounter = lightbox.querySelector(".lightbox-counter");

  // Zamknij po kliknięciu w tło
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Nawigacja klawiaturą
  document.addEventListener("keydown", (e) => {
    if (!lightbox || !lightbox.classList.contains("is-open")) return;
    
    if (e.key === "Escape") {
      closeLightbox();
    } else if (e.key === "ArrowRight") {
      nextImage();
    } else if (e.key === "ArrowLeft") {
      prevImage();
    }
  });
}

function openGalleryImage(imageSrc, galleryGroup, index) {
  if (!lightbox) {
    initLightbox();
  }
  
  currentGallery = galleries[galleryGroup] || [];
  currentIndex = index;
  
  updateLightbox(imageSrc);
  lightbox.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function updateLightbox(imageSrc) {
  if (!lightbox) return;
  
  const lightboxImage = lightbox.querySelector(".lightbox-image");
  const lightboxCounter = lightbox.querySelector(".lightbox-counter");
  
  if (imageSrc) {
    lightboxImage.src = imageSrc;
  } else if (currentGallery.length > 0) {
    lightboxImage.src = currentGallery[currentIndex];
  }
  
  if (currentGallery.length > 0) {
    lightboxCounter.textContent = `${currentIndex + 1} / ${currentGallery.length}`;
  }
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("is-open");
  document.body.style.overflow = "";
}

function nextImage() {
  if (currentGallery.length === 0) return;
  currentIndex = (currentIndex + 1) % currentGallery.length;
  updateLightbox();
}

function prevImage() {
  if (currentGallery.length === 0) return;
  currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
  updateLightbox();
}