// Toggle mobile menu
function toggleMenu() {
  const nav = document.getElementById('navLinks');
  nav.classList.toggle('open');
}

// Close nav on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
  });
});

// Tab system
function showTab(id) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
  document.getElementById('tab-' + id).classList.add('active');
  event.target.classList.add('active');
}

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => observer.observe(el));

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    if (scrollY >= top && scrollY < top + height) {
      document.querySelectorAll('.nav-links a').forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === '#' + section.id) {
          a.style.color = 'var(--rosa-light)';
        }
      });
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {

  const audio = document.getElementById("player");
  const toggleBtn = document.getElementById("music-toggle");
  const player = document.getElementById("music-player");
  const closeBtn = document.getElementById("close-player");
  const canciones = document.querySelectorAll("#music-player li");

  let playlist = [
    "audio/cancion1.mp3",
    "audio/cancion2.mp3",
    "audio/cancion3.mp3"
  ];

  let index = 0;

  /* =========================
     DEBUG (IMPORTANTE)
  ========================= */
  audio.addEventListener("error", () => {
    console.error("❌ Error cargando audio:", audio.src);
    alert("Error cargando audio: " + audio.src);
  });

  /* =========================
     ABRIR / CERRAR
  ========================= */

  toggleBtn.addEventListener("click", () => {
    player.classList.toggle("open");
  });

  closeBtn.addEventListener("click", () => {
    player.classList.remove("open");
  });

  document.addEventListener("click", (e) => {
    if (!player.contains(e.target) && !toggleBtn.contains(e.target)) {
      player.classList.remove("open");
    }
  });

    /* =========================
     CARGA INICIAL
  ========================= */
audio.addEventListener("play", () => {
  /* si no hay canción cargada */
  if (!audio.src || audio.src === window.location.href) {

    /* cargar primera canción */
    audio.src = "audio/cancion1.mp3";
    audio.load();
    audio.play();
  }
});


  /* =========================
     FUNCIÓN GLOBAL
  ========================= */

  window.playSong = function(src) {

    index = playlist.indexOf(src);

    audio.src = src;

    /* IMPORTANTE: forzar carga */
    audio.load();

    let playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log("⚠️ Autoplay bloqueado:", error);
      });
    }

    /* resaltar */
    canciones.forEach(c => c.style.background = "transparent");
    if (index !== -1) {
      canciones[index].style.background = "rgba(255,255,255,0.25)";
    }
  };

  /* =========================
     AUTO SIGUIENTE
  ========================= */

  audio.addEventListener("ended", () => {
    index++;

    if (index >= playlist.length) {
      index = 0;
    }

    audio.src = playlist[index];
    audio.load();
    audio.play();

    canciones.forEach(c => c.style.background = "transparent");
    canciones[index].style.background = "rgba(255,255,255,0.25)";
  });

});
