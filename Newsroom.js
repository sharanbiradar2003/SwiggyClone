/* ----------------------------
   PRESS DATA ARRAY
----------------------------- */
const pressData = [
  {
    title: "Swiggy Expands High Protein Category to 160+ cities",
    desc: "Swiggy Expands High Protein Category to 160+ cities; Launches new Subcategories and ‘Protein Minis’. High Protein category is live...",
    img: "https://www.swiggy.com/corporate/wp-content/uploads/2024/09/News-Detail-1024x196.png",
    link: "Newsroom.html",
  },
  {
    title: "Swiggy Announces New EV Delivery Fleet",
    desc: "Swiggy introduces 5,000 new electric vehicles in major cities to support sustainable delivery.",
    img: "https://www.swiggy.com/corporate/wp-content/uploads/2024/09/News-Detail-1024x196.png",
    link: "Newsroom.html",
  },
  {
    title: "New Restaurant Partners Onboard",
    desc: "Over 10,000 restaurants joined Swiggy this quarter across India...",
    img: "https://www.swiggy.com/corporate/wp-content/uploads/2024/09/News-Detail-1024x196.png",
    link: "Newsroom.html",
  },
  {
    title: "Swiggy Expands High Protein Category to 160+ cities",
    desc: "Swiggy Expands High Protein Category to 160+ cities; Launches new Subcategories and ‘Protein Minis’. High Protein category is live...",
    img: "https://www.swiggy.com/corporate/wp-content/uploads/2024/09/News-Detail-1024x196.png",
    link: "Newsroom.html",
  },
  {
    title: "Swiggy Expands High Protein Category to 160+ cities",
    desc: "Swiggy Expands High Protein Category to 160+ cities; Launches new Subcategories and ‘Protein Minis’. High Protein category is live...",
    img: "https://www.swiggy.com/corporate/wp-content/uploads/2024/09/News-Detail-1024x196.png",
    link: "Newsroom.html",
  },
  {
    title: "Swiggy Expands High Protein Category to 160+ cities",
    desc: "Swiggy Expands High Protein Category to 160+ cities; Launches new Subcategories and ‘Protein Minis’. High Protein category is live...",
    img: "https://www.swiggy.com/corporate/wp-content/uploads/2024/09/News-Detail-1024x196.png",
    link: "Newsroom.html",
  },
];

/* ----------------------------
   BUILD SLIDES DYNAMICALLY
----------------------------- */
const track = document.getElementById("pcTrack");
const dotsContainer = document.getElementById("pcDots");

pressData.forEach((item, index) => {
  const slide = document.createElement("div");
  slide.className = "pc-slide";
  slide.setAttribute("data-index", index);

  slide.innerHTML = `
      <a class="press-card" href="${item.link}" data-target="${item.link}">
        <div class="press-left">
          <h3>${item.title}</h3>
          <p>${item.desc}</p>
          <span class="press-cta">Read more</span>
        </div>
        <div class="press-right" aria-hidden="true">
          <img src="${item.img}" alt="Press image" />
        </div>
      </a>
    `;

  track.appendChild(slide);

  // Create navigation dots
  const dot = document.createElement("button");
  dot.className = "pc-dot";
  dot.type = "button";
  dot.ariaLabel = `Slide ${index + 1}`;
  dot.addEventListener("click", () => {
    goTo(index);
    resetAuto();
  });
  dotsContainer.appendChild(dot);
});

/* ----------------------------
   CAROUSEL LOGIC
----------------------------- */
const slides = Array.from(track.querySelectorAll(".pc-slide"));
const prevBtn = document.querySelector(".pc-prev");
const nextBtn = document.querySelector(".pc-next");

let current = 0;
let autoTimer = null;

function goTo(index) {
  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;
  current = index;

  const offset = slides[index].offsetLeft;
  track.scrollTo({ left: offset, behavior: "smooth" });

  updateDots();
}

function updateDots() {
  Array.from(dotsContainer.children).forEach((dot, i) => {
    dot.classList.toggle("active", i === current);
  });
}

prevBtn.addEventListener("click", () => {
  goTo(current - 1);
  resetAuto();
});

nextBtn.addEventListener("click", () => {
  goTo(current + 1);
  resetAuto();
});

/* ----------------------------
   AUTOPLAY
----------------------------- */
function startAuto() {
  autoTimer = setInterval(() => goTo(current + 1), 4000);
}
function resetAuto() {
  clearInterval(autoTimer);
  startAuto();
}
startAuto();

/* ----------------------------
   CLICK CARD TO OPEN
----------------------------- */
track.addEventListener("click", (e) => {
  const card = e.target.closest(".press-card");
  if (!card) return;
  const target = card.getAttribute("data-target");
  if (target) window.location.href = target;
});

/* ----------------------------
   KEYBOARD SUPPORT
----------------------------- */
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") { goTo(current - 1); resetAuto(); }
  if (e.key === "ArrowRight") { goTo(current + 1); resetAuto(); }
});

/* ----------------------------
   RESIZE FIX
----------------------------- */
window.addEventListener("resize", () => goTo(current));

// Initial dot highlighting
updateDots();



/* filepath: c:\Users\shara\OneDrive\Desktop\SwiggyClone\newsroom.js */
(function(){
  const grid = document.getElementById('newsroomGrid');
  const search = document.getElementById('newsSearch');
  const filterBtns = Array.from(document.querySelectorAll('.filter-btn'));

  // simple filter by data-type (cards marked data-type="all" or "media")
  function applyFilter(type) {
    const cards = Array.from(grid.querySelectorAll('.news-card'));
    cards.forEach(card => {
      const t = card.getAttribute('data-type') || 'all';
      card.style.display = (type === 'all' || type === t) ? '' : 'none';
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.getAttribute('data-filter') === 'media' ? 'media' : 'all';
      applyFilter(f);
    });
  });

  // search by title
  search.addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    const cards = Array.from(grid.querySelectorAll('.news-card'));
    cards.forEach(card => {
      const title = card.querySelector('.news-title').textContent.toLowerCase();
      const excerpt = card.querySelector('.news-excerpt').textContent.toLowerCase();
      const visible = title.includes(q) || excerpt.includes(q);
      card.style.display = q ? (visible ? '' : 'none') : '';
    });
  });

  // optional: make Read more open newsroom article in same tab (already an anchor)
})();