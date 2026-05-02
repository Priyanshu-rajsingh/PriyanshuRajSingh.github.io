/**
 * main.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Handles rendering, filtering, searching, and modal interactions.
 * No external dependencies — vanilla JS only.
 * ─────────────────────────────────────────────────────────────────────────────
 */

(function () {
  "use strict";

  /* ── DOM REFERENCES ─────────────────────────────────────────────────────── */
  const grid        = document.getElementById("certGrid");
  const filterBar   = document.querySelector(".filter-bar__inner");
  const searchInput = document.getElementById("searchInput");
  const noResults   = document.getElementById("noResults");
  const overlay     = document.getElementById("modalOverlay");
  const modalClose  = document.getElementById("modalClose");
  const totalCount  = document.getElementById("totalCount");
  const catCount    = document.getElementById("categoryCount");

  /* ── STATE ──────────────────────────────────────────────────────────────── */
  let activeFilter = "all";
  let searchQuery  = "";

  /* ── HELPERS ────────────────────────────────────────────────────────────── */

  /** Format YYYY-MM-DD to "Mon YYYY" */
  function formatDate(iso) {
    if (!iso) return "—";
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
  }

  /** Get all unique categories in insertion order */
  function getCategories() {
    return [...new Set(CERTIFICATES.map(c => c.category))];
  }

  /** Return colour for a category */
  function colorFor(cat) {
    return CATEGORY_COLORS[cat] || "#aaa";
  }

  /* ── BUILD FILTER BUTTONS ───────────────────────────────────────────────── */
  function buildFilters() {
    const cats = getCategories();
    catCount.textContent = cats.length;
    totalCount.textContent = CERTIFICATES.length;

    cats.forEach(cat => {
      const btn = document.createElement("button");
      btn.className = "filter-btn";
      btn.dataset.filter = cat;
      btn.setAttribute("aria-pressed", "false");
      btn.textContent = cat;
      btn.style.setProperty("--cat-color", colorFor(cat));
      filterBar.appendChild(btn);
    });

    filterBar.addEventListener("click", e => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      filterBar.querySelectorAll(".filter-btn").forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");
      activeFilter = btn.dataset.filter;
      renderGrid();
    });
  }

  /* ── FILTER + SEARCH LOGIC ──────────────────────────────────────────────── */
  function getVisible() {
    return CERTIFICATES.filter(c => {
      const matchCat    = activeFilter === "all" || c.category === activeFilter;
      const q           = searchQuery.toLowerCase();
      const matchSearch = !q ||
        c.title.toLowerCase().includes(q) ||
        c.issuer.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        (c.description && c.description.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }

  /* ── RENDER GRID ────────────────────────────────────────────────────────── */
  function renderGrid() {
    const visible = getVisible();
    grid.innerHTML = "";

    if (visible.length === 0) {
      noResults.hidden = false;
      return;
    }
    noResults.hidden = true;

    visible.forEach((cert, idx) => {
      const card = buildCard(cert, idx);
      grid.appendChild(card);
    });
  }

  /** Build a single certificate card element */
  function buildCard(cert, idx) {
    const color = colorFor(cert.category);

    const article = document.createElement("article");
    article.className = "cert-card" + (cert.highlight ? " cert-card--highlight" : "");
    article.setAttribute("role", "listitem");
    article.setAttribute("tabindex", "0");
    article.setAttribute("aria-label", cert.title);
    article.style.setProperty("--accent", color);
    article.style.animationDelay = `${idx * 60}ms`;

    article.innerHTML = `
      <div class="cert-card__top">
        <span class="cert-card__category" style="color:${color};border-color:${color}20;background:${color}12;">
          ${cert.category}
        </span>
        ${cert.highlight ? '<span class="cert-card__star" aria-label="Highlighted">★</span>' : ""}
      </div>
      <h3 class="cert-card__title">${cert.title}</h3>
      <p class="cert-card__issuer">${cert.issuer}</p>
      <div class="cert-card__footer">
        <span class="cert-card__date">${formatDate(cert.date)}</span>
        ${cert.expiry ? `<span class="cert-card__expiry">Valid to ${formatDate(cert.expiry)}</span>` : ""}
        <button class="cert-card__details-btn" aria-label="View details for ${cert.title}">Details →</button>
      </div>
      <div class="cert-card__bar" style="background:${color}"></div>
    `;

    /* Open modal on click or Enter/Space */
    const open = () => openModal(cert);
    article.addEventListener("click", open);
    article.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
    });

    return article;
  }

  /* ── MODAL ──────────────────────────────────────────────────────────────── */
  function openModal(cert) {
    const color = colorFor(cert.category);
    document.getElementById("modalCategory").textContent  = cert.category;
    document.getElementById("modalCategory").style.color  = color;
    document.getElementById("modalTitle").textContent     = cert.title;
    document.getElementById("modalIssuer").textContent    = cert.issuer;
    document.getElementById("modalDate").textContent      = formatDate(cert.date);
    document.getElementById("modalDesc").textContent      = cert.description || "";

    const expiryRow = document.getElementById("modalExpiryRow");
    const idRow     = document.getElementById("modalIdRow");

    if (cert.expiry) {
      document.getElementById("modalExpiry").textContent = formatDate(cert.expiry);
      expiryRow.hidden = false;
    } else {
      expiryRow.hidden = true;
    }

    if (cert.certId) {
      document.getElementById("modalCertId").textContent = cert.certId;
      idRow.hidden = false;
    } else {
      idRow.hidden = true;
    }

    overlay.hidden = false;
    overlay.classList.add("modal-overlay--visible");
    document.body.style.overflow = "hidden";

    // Return focus to overlay for accessibility
    modalClose.focus();
  }

  function closeModal() {
    overlay.classList.remove("modal-overlay--visible");
    overlay.hidden = true;
    document.body.style.overflow = "";
  }

  /* ── EVENT LISTENERS ────────────────────────────────────────────────────── */

  // Close modal
  modalClose.addEventListener("click", closeModal);
  overlay.addEventListener("click", e => { if (e.target === overlay) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

  // Search
  searchInput.addEventListener("input", () => {
    searchQuery = searchInput.value.trim();
    renderGrid();
  });

  // Smooth-scroll hero stat numbers
  function animateCount(el, target) {
    let current = 0;
    const step = Math.ceil(target / 30);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current;
      if (current >= target) clearInterval(timer);
    }, 40);
  }

  /* ── INIT ───────────────────────────────────────────────────────────────── */
  function init() {
    buildFilters();
    renderGrid();

    // Animate counters after short delay
    setTimeout(() => {
      animateCount(totalCount, CERTIFICATES.length);
      animateCount(catCount, getCategories().length);
    }, 400);
  }

  // Wait for DOM
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
