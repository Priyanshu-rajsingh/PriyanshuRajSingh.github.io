/**
 * app.js — Certificate Showcase (Dark Mode, 10+ cards)
 * ──────────────────────────────────────────────────────
 * Sections:
 *   1. Config  — category accent colours
 *   2. DOM     — element references
 *   3. Init    — boot sequence
 *   4. Filter  — category pills
 *   5. Search  — live keyword search
 *   6. Render  — show / hide cards + update counts
 *   7. Lightbox — image viewer (opens for data-filetype="image")
 *   8. PDF     — opens PDF cards in a new tab
 *   9. Utils   — helpers
 */

(function () {
  'use strict';

  /* ──────────────────────────────────────────────────────────
     1. CONFIG
     ────────────────────────────────────────────────────────── */

  /**
   * Category → [pill background, pill text-colour, card top-accent]
   * Edit these to change how each category looks.
   */
  const CAT = {
    development: ['rgba(129,140,248,.15)', '#818cf8', '#818cf8'],
    data:        ['rgba(34,211,238,.12)',  '#22d3ee', '#22d3ee'],
    cloud:       ['rgba(251,191,36,.13)',  '#fbbf24', '#fbbf24'],
    design:      ['rgba(52,211,153,.12)',  '#34d399', '#34d399'],
    management:  ['rgba(248,113,113,.12)', '#f87171', '#f87171'],
    security:    ['rgba(45,212,191,.12)',  '#2dd4bf', '#2dd4bf'],
  };

  /* ──────────────────────────────────────────────────────────
     2. DOM REFERENCES
     ────────────────────────────────────────────────────────── */
  const grid        = document.getElementById('js-grid');
  const cards       = Array.from(grid.querySelectorAll('.card'));
  const pills       = Array.from(document.querySelectorAll('.pill'));
  const searchEl    = document.getElementById('js-search');
  const clearBtn    = document.getElementById('js-clear');
  const emptyState  = document.getElementById('js-empty');
  const resetBtn    = document.getElementById('js-reset');
  const totalEl     = document.getElementById('js-total');
  const visibleEl   = document.getElementById('js-visible');
  const lb          = document.getElementById('js-lb');
  const lbOverlay   = document.getElementById('js-lb-overlay');
  const lbClose     = document.getElementById('js-lb-close');
  const lbImg       = document.getElementById('js-lb-img');
  const lbTitle     = document.getElementById('js-lb-title');
  const lbDl        = document.getElementById('js-lb-dl');
  const yearEl      = document.getElementById('js-year');

  /* ──────────────────────────────────────────────────────────
     3. INIT
     ────────────────────────────────────────────────────────── */
  function init () {
    // Footer year
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Set total count
    if (totalEl) totalEl.textContent = cards.length;

    // Apply category styles (pill colours + card accent colour)
    cards.forEach(card => {
      const cat  = card.dataset.category || 'other';
      const pill = card.querySelector('.card__cat');
      const cfg  = CAT[cat];

      if (pill && cfg) {
        pill.style.setProperty('--pill-bg', cfg[0]);
        pill.style.setProperty('--pill-fg', cfg[1]);
      }
      if (cfg) card.style.setProperty('--card-accent', cfg[2]);

      // Wire "View" / "Open PDF" button
      const btn = card.querySelector('.btn-view');
      if (btn) {
        if (card.dataset.filetype === 'pdf') {
          btn.addEventListener('click', () => openPDF(card));
        } else {
          btn.addEventListener('click', () => openLightbox(card));
        }
      }
    });

    // Filter pills
    pills.forEach(pill => {
      pill.addEventListener('click', () => setFilter(pill.dataset.filter));
    });

    // Search
    searchEl.addEventListener('input', handleSearch);
    searchEl.addEventListener('keydown', e => {
      if (e.key === 'Escape') clearSearch();
    });
    clearBtn.addEventListener('click', clearSearch);

    // Empty-state reset
    resetBtn.addEventListener('click', () => {
      clearSearch();
      setFilter('all');
    });

    // Lightbox close triggers
    lbClose.addEventListener('click', closeLightbox);
    lbOverlay.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && lb.open) closeLightbox();
    });

    // Initial render
    render();
  }

  /* ──────────────────────────────────────────────────────────
     4. FILTER
     ────────────────────────────────────────────────────────── */
  let activeFilter = 'all';

  function setFilter (value) {
    activeFilter = value;

    // Update pill states
    pills.forEach(pill => {
      const isActive = pill.dataset.filter === value;
      pill.classList.toggle('pill--active', isActive);
      pill.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    render();
  }

  /* ──────────────────────────────────────────────────────────
     5. SEARCH
     ────────────────────────────────────────────────────────── */
  let searchQuery = '';
  let searchTimer;

  function handleSearch () {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      searchQuery = searchEl.value.trim().toLowerCase();
      clearBtn.hidden = !searchQuery;
      render();
    }, 180);
  }

  function clearSearch () {
    searchEl.value  = '';
    searchQuery     = '';
    clearBtn.hidden = true;
    searchEl.focus();
    render();
  }

  /* ──────────────────────────────────────────────────────────
     6. RENDER (show / hide cards)
     ────────────────────────────────────────────────────────── */
  function render () {
    let shown = 0;

    cards.forEach(card => {
      const catMatch = activeFilter === 'all' || card.dataset.category === activeFilter;

      const haystack = [
        card.dataset.title || '',
        card.dataset.desc  || '',
      ].join(' ').toLowerCase();

      const searchMatch = !searchQuery || haystack.includes(searchQuery);

      if (catMatch && searchMatch) {
        card.removeAttribute('hidden');
        shown++;
      } else {
        card.setAttribute('hidden', '');
      }
    });

    // Update "Showing" count with animated tick
    animateCount(visibleEl, shown);

    // Toggle empty state
    emptyState.hidden = shown > 0;
  }

  /* ──────────────────────────────────────────────────────────
     7. LIGHTBOX (image certificates)
     ────────────────────────────────────────────────────────── */
  /**
   * Open the lightbox for a given card.
   * @param {HTMLElement} card
   */
  function openLightbox (card) {
    const src   = card.dataset.file  || '';
    const title = card.dataset.title || 'Certificate';

    if (!src) {
      // No file attached yet — show a placeholder message
      lbImg.src = '';
      lbImg.alt = 'No image attached';
      lbImg.style.display = 'none';

      // Insert placeholder text if it doesn't exist yet
      let ph = lb.querySelector('.lb__placeholder');
      if (!ph) {
        ph = document.createElement('p');
        ph.className = 'lb__placeholder';
        ph.style.cssText = 'color:#4a5268;font-size:.9rem;text-align:center;padding:3rem 1rem;';
        lbImg.parentNode.appendChild(ph);
      }
      ph.textContent = `No image file attached yet. Add your certificate to assets/certs/ and set data-file on this card.`;
      ph.hidden = false;
    } else {
      lbImg.src = src;
      lbImg.alt = title;
      lbImg.style.display = '';
      const ph = lb.querySelector('.lb__placeholder');
      if (ph) ph.hidden = true;
    }

    lbTitle.textContent = title;
    lbDl.href           = src || '#';
    lbDl.download       = src ? src.split('/').pop() : '';

    // Open dialog
    lb.showModal ? lb.showModal() : (lb.open = true);
    lbOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }

  function closeLightbox () {
    lb.close ? lb.close() : (lb.open = false);
    lbOverlay.classList.remove('open');
    lbImg.src = '';
    document.body.style.overflow = '';
  }

  /* ──────────────────────────────────────────────────────────
     8. PDF HANDLER
     ────────────────────────────────────────────────────────── */
  /**
   * Open a PDF certificate in a new browser tab.
   * @param {HTMLElement} card
   */
  function openPDF (card) {
    const src = card.dataset.file;
    if (src) {
      window.open(src, '_blank', 'noopener,noreferrer');
    } else {
      alert(`No PDF attached yet.\nAdd your file to assets/certs/ and set data-file="assets/certs/filename.pdf" on this card.`);
    }
  }

  /* ──────────────────────────────────────────────────────────
     9. UTILS
     ────────────────────────────────────────────────────────── */
  /**
   * Animate an element's text content from its current integer
   * value to a new target value.
   * @param {HTMLElement} el
   * @param {number}      target
   */
  function animateCount (el, target) {
    if (!el) return;
    const start    = parseInt(el.textContent, 10) || 0;
    const duration = 350;
    const t0       = performance.now();

    (function tick (now) {
      const p = Math.min((now - t0) / duration, 1);
      el.textContent = Math.round(start + (target - start) * (1 - (1 - p) ** 2));
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  }

  /* ── Boot ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
