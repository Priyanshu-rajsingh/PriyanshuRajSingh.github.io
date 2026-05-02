# 🌙 Certificate Showcase — Dark Mode

A production-ready, zero-dependency certificate portfolio page.
Designed for **10+ certificates** with image viewer and PDF support.

---

## 📦 Files

```
cert-v2/
├── index.html        ← All 12 certificate cards (edit here)
├── style.css         ← Complete dark-mode styles
├── app.js            ← Filtering, search, lightbox logic
├── README.md         ← This file
└── assets/
    └── certs/        ← ⬅ Drop YOUR certificate files here
```

---

## 🚀 Deploy to GitHub Pages (3 steps)

```bash
# 1. Push to GitHub
git init && git add . && git commit -m "cert showcase"
git remote add origin https://github.com/YOU/certificates.git
git push -u origin main

# 2. In GitHub → Settings → Pages
#    Source: main branch, / (root)

# 3. Live at: https://YOU.github.io/certificates/
```

---

## ✏️ Personalise

### Your name & GitHub link
Open `index.html` and find these two spots:

```html
<span class="hdr__logo-name">Your Name</span>          <!-- header -->
Built with care ✦ ... <a href="https://github.com/yourusername">  <!-- footer -->
```

---

## ➕ Adding Your Own Certificates

### Step 1 — Add your file
Copy your certificate image or PDF into `assets/certs/`:
```
assets/certs/aws-solutions-architect.jpg
assets/certs/pmp-certificate.pdf
```

Supported formats: **JPG, PNG, WebP** (image viewer) · **PDF** (opens in new tab)

---

### Step 2 — Edit the card in `index.html`

Each `<article class="card">` has these data attributes at the top:

| Attribute        | What to put                                      |
|-----------------|--------------------------------------------------|
| `data-category`  | `development` `data` `cloud` `design` `management` `security` |
| `data-title`     | Certificate name (used by search)               |
| `data-desc`      | Keywords / skills (used by search, not shown)   |
| `data-file`      | Path to file: `assets/certs/your-file.jpg`      |
| `data-filetype`  | `image` or `pdf`                                |

**Image certificate:**
```html
<article class="card"
  data-category="cloud"
  data-title="AWS Solutions Architect"
  data-desc="AWS cloud EC2 S3 VPC IAM"
  data-file="assets/certs/aws-cert.jpg"
  data-filetype="image">
```

**PDF certificate:**
```html
<article class="card"
  data-category="management"
  data-title="PMP Certificate"
  data-desc="project management agile scrum"
  data-file="assets/certs/pmp.pdf"
  data-filetype="pdf">
```

---

### Step 3 — Replace the thumbnail placeholder

Inside each card, find `<div class="card__thumb">`.
Replace the `<svg>` placeholder with a real thumbnail:

```html
<div class="card__thumb" aria-hidden="true">
  <img src="assets/certs/aws-thumb.jpg" alt="" loading="lazy" />
</div>
```

> **Tip:** For PDFs, take a screenshot of the first page and use that as the thumbnail.

---

## 🏷️ Categories & Colours

| Category      | Colour   | data-category value |
|---------------|----------|---------------------|
| Development   | Indigo   | `development`       |
| Data & AI     | Cyan     | `data`              |
| Cloud         | Amber    | `cloud`             |
| Design        | Emerald  | `design`            |
| Management    | Rose     | `management`        |
| Security      | Teal     | `security`          |

### Add a new category

1. Add a filter pill in `index.html`:
```html
<button class="pill" data-filter="blockchain" role="listitem" aria-pressed="false">Blockchain</button>
```

2. Add colours in `app.js` inside the `CAT` object:
```js
blockchain: ['rgba(251,146,60,.12)', '#fb923c', '#fb923c'],
```

3. Use `data-category="blockchain"` on your cards.

---

## 🔍 Search

The search bar looks through `data-title` and `data-desc` on each card.
Pack `data-desc` with relevant keywords (skills, technologies, issuer name)
so users can find certificates by skill:

```html
data-desc="Python pandas NumPy scikit-learn Jupyter matplotlib seaborn"
```

---

## ♿ Accessibility

- Skip-to-content link (first Tab stop)
- All buttons have `aria-label` attributes
- Filter pills expose `aria-pressed` state
- Lightbox uses native `<dialog>` with `aria-modal`
- Live region announces count changes to screen readers
- Fully keyboard navigable (Tab, Enter, Esc)

---

## 🖨️ Print

`Ctrl/Cmd + P` produces a clean black-on-white version with all
decorative elements hidden automatically.

---

## 📜 Licence

Free for personal portfolio use.
