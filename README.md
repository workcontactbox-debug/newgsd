# Grid Detailing — separated website structure

## Folder structure

```text
Grid-Detailing-Website/
├── index.html
├── components/
│   ├── navbar.html
│   ├── footer.html
│   └── floating.html
├── css/
│   └── style.css
├── js/
│   ├── components.js
│   └── main.js
└── assets/
    └── images/
        └── Grid Detailing.png   <-- put your exact logo here
```

## Important

The original design/CSS/HTML content has been kept as-is as far as possible.
Only these structural/linking changes were made:

1. Navbar + top bar moved to `components/navbar.html`.
2. Footer moved to `components/footer.html`.
3. Floating AI/scroll/WhatsApp UI moved to `components/floating.html`.
4. Original page content remains in `index.html`.
5. Original CSS moved to `css/style.css`.
6. Original JavaScript moved to `js/main.js`.
7. `js/components.js` was added only to load the separated HTML components before the original JavaScript runs.
8. The logo path is now `assets/images/Grid Detailing.png`.

## VS Code setup

1. Create/open a folder named `Grid-Detailing-Website`.
2. Copy the folders/files exactly as shown above.
3. Put your exact logo file named `Grid Detailing.png` inside:
   `assets/images/`
4. Open `index.html` with VS Code Live Server.
5. Do NOT rename the folders/files unless you also update the paths.

## Why Live Server is required

Because the navbar, footer and floating UI are loaded with `fetch()`, opening `index.html` directly with `file://` can be blocked by the browser's local-file security rules.

Use VS Code → **Live Server → Open with Live Server**.

The resulting local address will normally look like:
`http://127.0.0.1:5500/`

For deployment, upload the complete folder structure to your hosting/server.
