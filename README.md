# Clement Asare — Personal Academic Portfolio

A clean, responsive academic portfolio website built with React, Tailwind CSS, and Vite. Designed for sharing with university professors, research groups, and graduate admissions committees.

## Quick start

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or later)

### Build the website

```bash
npm install
npm run build
```

The complete website is generated as a single `dist/index.html` file with all CSS and JavaScript inlined.

## Publishing to GitHub Pages

### Option 1: Deploy the built file (simplest)

1. Create a new GitHub repository (e.g., `clementasare.github.io` for a user site, or any name for a project site).
2. Run `npm run build` to generate `dist/index.html`.
3. Copy the contents of the `dist/` folder to the root of your repository.
4. Go to **Settings → Pages** in your repository.
5. Under **Source**, select "Deploy from a branch" and choose `main` (or `master`), root `/`.
6. Click **Save**. Your site will be live at `https://your-username.github.io/` (user site) or `https://your-username.github.io/repo-name/` (project site).

### Option 2: Upload entire project

1. Push the entire project to GitHub.
2. In **Settings → Pages**, set the source to GitHub Actions.
3. Add a GitHub Actions workflow for Vite, or use Option 1 above.

## What you need to add or replace

### 1. Portrait photo (required)
Add your portrait photo to the `public/` directory:
```
public/portrait.jpg
```
- Use a professional, well-lit headshot.
- The image will be displayed at 160×160 px (rounded corners).
- JPEG or PNG format, recommended 400×400 px minimum.
- If the file is missing, an elegant "CA" placeholder will be shown automatically.

### 2. CV PDF (required)
Add your CV as a PDF to the `public/` directory:
```
public/Clement_Asare_CV.pdf
```
This is linked from the "Download CV" button in the hero section and the footer.

### 3. GitHub profile (optional)
If you have a GitHub profile you want to showcase, you can add a GitHub link. Search for `linkedin.com/in/c-asare` in `src/App.tsx` and add a similar link entry for GitHub.

### 4. Project repositories (optional)
If you have GitHub repositories for your projects (e.g., the motion detection system or the AI assistant), add links to the project cards in the Projects section of `src/App.tsx`.

### 5. Project images or screenshots (optional)
If you have screenshots, diagrams, or photos from your projects, add them to `public/` and reference them in the project sections.

## File structure

```
├── index.html              # HTML template with fonts and meta tags
├── src/
│   ├── main.tsx            # React entry point
│   ├── index.css           # Tailwind imports and custom theme
│   └── App.tsx             # Complete website (all sections)
├── public/
│   ├── portrait.jpg        # ← Add your portrait photo here
│   └── Clement_Asare_CV.pdf # ← Add your CV PDF here
├── dist/
│   └── index.html          # Built single-file website (after npm run build)
└── README.md
```

## Design details

- **Colour palette:** Warm cream background (#FAF9F6), sage green accent (#4A7B62), dark text (#1C1917)
- **Typography:** Source Serif 4 (serif, headings), Inter (sans-serif, body)
- **Responsive:** Works on mobile, tablet, and desktop
- **Accessible:** ARIA labels, keyboard-navigable, reduced-motion support, good colour contrast
- **Lightweight:** Single HTML file output (~76 KB gzipped)

## Customisation

All content is in `src/App.tsx`. To update information:
- Edit text directly in the component functions.
- Each section is clearly labelled with comments.
- Rebuild with `npm run build` after making changes.

## Remaining items

- [ ] Add portrait photo (`public/portrait.jpg`)
- [ ] Add CV PDF (`public/Clement_Asare_CV.pdf`)
- [ ] Add GitHub repository links to projects (if available)
- [ ] Add project screenshots or diagrams (if available)
- [ ] Consider adding a GitHub profile link (if you have one to share)
- [ ] Review all content for accuracy before publishing

## License

This is a personal portfolio website. The code structure may be reused, but all personal content, text, and professional details belong to Clement Asare.
