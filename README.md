# Priyanshu Raj Singh — Certifications Website

A clean, editorial-dark portfolio website to showcase all your certifications.

## 📁 File Structure

```
certificates-site/
├── index.html        ← Main HTML page
├── style.css         ← All styles (dark editorial theme)
├── main.js           ← Rendering, filtering, search, modal logic
├── certificates.js   ← ⭐ YOUR DATA FILE — edit this to add/remove certs
└── README.md         ← This file
```

## 🚀 Deploy to GitHub Pages

1. Create a new GitHub repository (e.g. `my-certificates`)
2. Upload all four files (`index.html`, `style.css`, `main.js`, `certificates.js`) to the repo root
3. Go to **Settings → Pages**
4. Under "Source", select **Deploy from a branch** → `main` → `/ (root)`
5. Click Save — your site will be live at `https://<your-username>.github.io/<repo-name>/`

## ➕ Adding More Certificates

Open `certificates.js` and append a new object to the `CERTIFICATES` array:

```js
{
  id: "unique-id-no-spaces",          // required, must be unique
  title: "My New Certificate",        // required
  issuer: "Issuing Organisation",     // required
  date: "2026-06-01",                 // required, YYYY-MM-DD
  expiry: "2028-06-01",              // optional, YYYY-MM-DD or null
  category: "Cloud",                  // one of the categories below
  description: "What this cert is about.",  // shown in modal
  certId: "ABC123",                   // optional credential number
  highlight: false,                   // true = golden accent ring
},
```

### Available Categories
`Cloud` | `AI/ML` | `Security` | `Blockchain` | `Development` | `Professional` | `Finance`

To add a **new category**, also add a colour for it in the `CATEGORY_COLORS` map at the bottom of `certificates.js`:
```js
"MyNewCategory": "#FF6B6B",
```

## ✨ Features
- Sticky filter bar by category
- Live search across title, issuer, category, description
- Modal with full details (issuer, date, expiry, cert ID)
- Highlighted cards for standout achievements (★)
- Responsive — works on mobile & desktop
- Accessible (keyboard navigation, ARIA labels, reduced-motion support)
- No external JS libraries
