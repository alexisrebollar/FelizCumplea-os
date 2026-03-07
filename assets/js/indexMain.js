$(document).ready(function () {
  startRomanticBeat();

    const swiper = new Swiper('.mySwiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    centeredSlides: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
});

function abrirCarta() {
  const card = document.getElementById("modalCarta");
  $("#modalCarta").removeClass("hide");

  card.style.display = "flex";

  if (!card.classList.contains("open")) {
    card.classList.add("open");
    lanzarConfetiEsposa();
  } else {
    card.classList.remove("open");
  }
}

function cerrarCarta() {
  const modal = document.getElementById("modalCarta");
  modal.style.display = "none";
}

function lanzarConfetiEsposa() {
  const isMobile = window.innerWidth <= 768;

  const coloresRomanticos = [
    "#ff2e6e",
    "#d4af37",
    "#ff1493",
    "#ff6b9c",
    "#ffffff",
    "#e6c3c3",
    "#ffb6c1",
    "#c0a0c0",
    "#ff4500",
  ];

  confetti({
    particleCount: isMobile ? 120 : 250,
    spread: isMobile ? 80 : 120,
    origin: { y: 0.5, x: 0.5 },
    startVelocity: 35,
    colors: coloresRomanticos,
    shapes: ["circle", "square"],
    ticks: 300,
    zIndex: 20000,
  });

  setTimeout(() => {
    confetti({
      particleCount: isMobile ? 80 : 180,
      spread: isMobile ? 60 : 100,
      origin: { y: 0, x: 0.5 },
      startVelocity: 25,
      colors: coloresRomanticos.slice(0, 5),
      shapes: ["circle"],
    });
  }, 200);

  setTimeout(() => {
    confetti({
      particleCount: isMobile ? 80 : 180,
      spread: isMobile ? 60 : 100,
      origin: { y: 0, x: 0.5 },
      startVelocity: 25,
      colors: coloresRomanticos.slice(0, 5),
      shapes: ["circle"],
      zIndex: 20000,
    });
  }, 200);

  setTimeout(() => {
    confetti({
      particleCount: isMobile ? 40 : 80,
      angle: 60,
      spread: 50,
      origin: { x: 0, y: 0.6 },
      colors: coloresRomanticos.slice(2, 7),
      zIndex: 20000,
    });
    confetti({
      particleCount: isMobile ? 40 : 80,
      angle: 120,
      spread: 50,
      origin: { x: 1, y: 0.6 },
      colors: coloresRomanticos.slice(0, 5),
      zIndex: 20000,
    });
  }, 400);
}

let currentVideo = 0;
const videoSlides = document.querySelectorAll(".video-slide");

function mostrarVideo() {
  const carta = document.getElementById("modalCarta");
  const overlay = document.getElementById("videoOverlay");

  carta.classList.add("hide");
  overlay.classList.remove("hide");
  overlay.style.display = "flex";
  overlay.style.zIndex = 20000;

  showVideo(currentVideo);
  lanzarConfetiEsposa();
}

function cerrarVideo() {
  const overlay = document.getElementById("videoOverlay");
  overlay.style.display = "none";
  overlay.classList.add("hide");

  videoSlides.forEach((slide) => {
    const video = slide.querySelector("video");
    video.pause();
    video.currentTime = 0;
  });
}

function showVideo(index) {
  videoSlides.forEach((slide, i) => {
    if (i === index) {
      slide.classList.remove("hide");
      slide.querySelector("video").play();
    } else {
      slide.classList.add("hide");
      const video = slide.querySelector("video");
      video.pause();
      video.currentTime = 0;
    }
  });
}

function nextVideo() {
  currentVideo = (currentVideo + 1) % videoSlides.length;
  showVideo(currentVideo);
}

function prevVideo() {
  currentVideo = (currentVideo - 1 + videoSlides.length) % videoSlides.length;
  showVideo(currentVideo);
}
function startRomanticBeat() {
  const footer = document.querySelector("#footer");
  const hearts = document.querySelectorAll("#footer .fa-heart");

  footer.style.position = "relative";

  setInterval(() => {
    hearts.forEach((heart) => {
      heart.classList.remove("beat");
      void heart.offsetWidth;
      heart.classList.add("beat");
    });

    for (let i = 0; i < 8; i++) {
      const clone = hearts[0].cloneNode(true);
      clone.classList.remove("beat");
      clone.classList.add("heart-clone");

      clone.style.position = "absolute";
      clone.style.left = Math.random() * (footer.offsetWidth - 20) + "px";
      clone.style.top = footer.offsetHeight - 20 - Math.random() * 20 + "px";

      const randomScale = 0.7 + Math.random() * 0.8;
      clone.style.setProperty("--scale", randomScale);

      const randomDuration = 2.5 + Math.random() * 1.5;
      clone.style.setProperty("--duration", randomDuration + "s");

      footer.appendChild(clone);

      setTimeout(() => {
        clone.remove();
      }, randomDuration * 1000);
    }
  }, 2000);
}
