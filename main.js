const openInvitation = document.getElementById("openInvitation");
const mainContent = document.getElementById("mainContent");
const cover = document.getElementById("cover");

const musicButton = document.getElementById("musicButton");
const birthdayMusic = document.getElementById("birthdayMusic");

const messageForm = document.getElementById("messageForm");
const messageResult = document.getElementById("messageResult");

const revealElements = document.querySelectorAll(".reveal");

openInvitation.addEventListener("click", () => {
  cover.classList.add("opened");

  setTimeout(() => {
    mainContent.scrollIntoView({
      behavior: "smooth",
    });
  }, 300);

  createConfetti();

  playMusic();
});

let musicPlaying = false;

function playMusic() {
  if (!birthdayMusic.src) {
    return;
  }

  birthdayMusic
    .play()
    .then(() => {
      musicPlaying = true;

      musicButton.classList.add("playing");

      musicButton.textContent = "♫";
    })
    .catch(() => {
      console.log("Musik belum dapat diputar.");
    });
}

musicButton.addEventListener("click", () => {
  if (!birthdayMusic.src) {
    messageResult.textContent =
      "🎵 Tambahkan file musik terlebih dahulu di folder assets.";

    setTimeout(() => {
      messageResult.textContent = "";
    }, 3500);

    return;
  }

  if (musicPlaying) {
    birthdayMusic.pause();

    musicPlaying = false;

    musicButton.classList.remove("playing");

    musicButton.textContent = "♪";

    return;
  }

  playMusic();
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  {
    threshold: 0.12,
  },
);

const galleryItems = document.querySelectorAll(".gallery-item");

galleryItems.forEach((item, index) => {
  item.style.transitionDelay = index * 0.08 + "s";

  revealObserver.observe(item);
});

revealElements.forEach((element) => {
  if (element.classList.contains("gallery-item")) {
    return;
  }

  revealObserver.observe(element);
});

const birthdayDate = new Date("2026-11-24T18:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();

  const difference = birthdayDate - now;

  if (difference <= 0) {
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";

    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));

  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);

  const minutes = Math.floor((difference / (1000 * 60)) % 60);

  const seconds = Math.floor((difference / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(2, "0");

  document.getElementById("hours").textContent = String(hours).padStart(2, "0");

  document.getElementById("minutes").textContent = String(minutes).padStart(
    2,
    "0",
  );

  document.getElementById("seconds").textContent = String(seconds).padStart(
    2,
    "0",
  );
}

updateCountdown();

setInterval(updateCountdown, 1000);

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const guestName = document.getElementById("guestName").value.trim();

  const guestMessage = document.getElementById("guestMessage").value.trim();

  if (!guestName || !guestMessage) {
    messageResult.textContent = "Mohon isi nama dan ucapan terlebih dahulu. ♡";

    return;
  }

  messageResult.innerHTML = `
      Terima kasih, <strong>${escapeHTML(guestName)}</strong>! ♡
      <br>
      <span style="font-size:16px;">
        "${escapeHTML(guestMessage)}"
      </span>
    `;

  messageForm.reset();

  createConfetti();

  setTimeout(() => {
    messageResult.innerHTML = "";
  }, 7000);
});

function escapeHTML(text) {
  const div = document.createElement("div");

  div.textContent = text;

  return div.innerHTML;
}

function createConfetti() {
  const confettiCount = 35;

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("span");

    const symbols = ["✦", "✧", "♡", "·", "✿"];

    confetti.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    confetti.style.position = "fixed";

    confetti.style.left = Math.random() * 100 + "vw";

    confetti.style.top = "-20px";

    confetti.style.zIndex = "9999";

    confetti.style.pointerEvents = "none";

    confetti.style.fontSize = 10 + Math.random() * 15 + "px";

    confetti.style.color = getRandomColor();

    confetti.style.opacity = "0.85";

    const duration = 2500 + Math.random() * 2500;

    const rotate = 360 + Math.random() * 720;

    const horizontal = -100 + Math.random() * 200;

    confetti.animate(
      [
        {
          transform: "translateY(0) rotate(0deg)",
          opacity: 0,
        },

        {
          transform: `translate(${horizontal / 2}px, 45vh)
             rotate(${rotate / 2}deg)`,
          opacity: 1,
        },

        {
          transform: `translate(${horizontal}px, 110vh)
             rotate(${rotate}deg)`,
          opacity: 0,
        },
      ],
      {
        duration: duration,

        easing: "cubic-bezier(.2,.7,.2,1)",
      },
    );

    document.body.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, duration + 100);
  }
}

function getRandomColor() {
  const colors = ["#b5966d", "#ffffff", "#d8bfa1", "#ede1d5", "#8e7561"];

  return colors[Math.floor(Math.random() * colors.length)];
}

const coverBackground = document.querySelector(".cover");

let ticking = false;

window.addEventListener(
  "scroll",
  () => {
    if (ticking) {
      return;
    }

    window.requestAnimationFrame(() => {
      const scrollY = window.scrollY;

      if (coverBackground) {
        coverBackground.style.backgroundPosition = `center calc(50% + ${scrollY * 0.12}px)`;
      }

      ticking = false;
    });

    ticking = true;
  },
  {
    passive: true,
  },
);

const images = document.querySelectorAll("img");

images.forEach((image) => {
  image.addEventListener("load", () => {
    image.classList.add("loaded");
  });
});

window.addEventListener("resize", () => {
  document.body.style.overflowX = "hidden";
});

/* =========================================================
   13. PAGE READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  console.log("Birthday Invitation siap digunakan ✨");
});
