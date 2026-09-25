# Nourished by Tanvi — Website

A premium, static one-page website for Nourished by Tanvi (Dr. Tanvi, Nutritionist). No backend, no build step — just HTML, CSS and JavaScript, ready for GitHub Pages.

## 1. Upload the project to GitHub

1. Create a new repository on GitHub (e.g. `nourished-by-tanvi`).
2. Upload all the files in this folder, keeping the structure exactly as-is:
   ```
   index.html
   style.css
   script.js
   README.md
   assets/
     NBT Logo.png
     Tanvi Photo.jpg
   ```
   You can drag-and-drop the files on the GitHub repo page ("Add file" → "Upload files"), or use git:
   ```bash
   git init
   git add .
   git commit -m "Launch Nourished by Tanvi website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```

## 2. Enable GitHub Pages

1. In your repository, go to **Settings → Pages**.
2. Under "Build and deployment", set **Source** to "Deploy from a branch".
3. Choose branch **main** and folder **/(root)**, then **Save**.
4. GitHub will give you a live URL (usually `https://YOUR-USERNAME.github.io/YOUR-REPO/`) within a minute or two.

## 3. Replace the logo

Swap the file at `assets/NBT Logo.png` with a new logo file, keeping the **exact same filename** (`NBT Logo.png`). If you use a different filename, update the two references in `index.html`:
- `<link rel="icon" href="assets/NBT Logo.png" ...>`
- the two `<img src="assets/NBT Logo.png" ...>` tags (navbar + footer)

## 4. Replace Tanvi's photo

Swap the file at `assets/Tanvi Photo.jpg`, keeping the same filename. It's used in two places in `index.html`:
- the hero portrait (`portrait-img` class)
- the About section image

## 5. Change the WhatsApp number

Open `script.js` and edit this line near the top:
```js
const WA_NUMBER = '919667221287';
```
Replace with the new number in international format, digits only (no `+`, spaces or dashes).

## 6. Edit the ₹99 consultation CTA text or message

- **Button text**: search `index.html` for "Book ₹99 Consultation" and edit the wording anywhere it appears.
- **Pre-filled WhatsApp message**: open `script.js` and edit the `WA_MESSAGES` object:
  ```js
  const WA_MESSAGES = {
    consult: "Hi Tanvi! I'd like to book the ₹99 nutrition consultation...",
    general: "Hi Tanvi! I came across Nourished by Tanvi...",
    contact: "Hi Tanvi! I'd like to know more about your nutrition services..."
  };
  ```

## 7. Replace testimonials

In `index.html`, find the `<div class="testimonial-track" id="testimonialTrack">` block. Each review is one `<article class="t-card">`. Replace the placeholder text and the "Verified Client" / "Client Review" label with real content once available:
```html
<article class="t-card">
  <p class="t-card__quote">"Real client review goes here."</p>
  <p class="t-card__name">Verified Client</p>
</article>
```
Add or remove `<article>` blocks as needed — the carousel adjusts automatically.

## 8. Edit the Instagram URL

The Instagram link appears in a few places in `index.html`. Search for:
```
https://www.instagram.com/nourishbytanviii/
```
and replace every occurrence if the handle changes.

## 9. Add a payment link later

There is currently no payment gateway connected — all "Book ₹99 Consultation" buttons open WhatsApp with a pre-filled message instead. When a payment link is ready:

1. Open `script.js`.
2. In `buildWhatsAppUrl()`, you can either:
   - Keep the WhatsApp flow but update the `consult` message in `WA_MESSAGES` to include the payment link, **or**
   - Point the consultation buttons directly to the payment URL instead of WhatsApp. To do this, find every element with `data-wa-msg="consult"` in `index.html` and change its `href="#"` to your payment URL, then remove the `wa-cta` class from those specific elements so the script doesn't override the link.

## 10. CDN dependencies

- **Google Fonts (Poppins)** — loaded via `<link>` tags in `index.html`. Requires an internet connection to load; there is no local fallback bundled, but the site falls back to system fonts if it can't reach Google Fonts.
- No other external libraries are used — all animations and interactivity are hand-written CSS/JavaScript, so there's nothing else to install or configure.

## 11. Update the placeholder domain

A few SEO tags use `https://example.com/` as a placeholder (the canonical link and Open Graph/Twitter tags in `index.html`, plus `robots.txt` and `sitemap.xml`). Once your site has a live URL (e.g. your GitHub Pages address or a custom domain), search each file for `example.com` and replace it with your real URL.

## Notes

- The site respects `prefers-reduced-motion` — visitors with that setting enabled get a calmer version with animations disabled.
- All content that requires real information not yet provided (testimonials, exact credentials, clinic details) is left as clearly-marked placeholder copy — search `index.html` for `[Client testimonial goes here` to find it.
- The floating WhatsApp button, all CTA buttons and the FAQ accordion are fully functional out of the box.
