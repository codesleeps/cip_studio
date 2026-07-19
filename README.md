# C.I.P Drink Label Designer & 3D Previewer

An interactive, premium web application built to design, preview, and export tropical-themed drink labels for **C.I.P Syrup Flavour Concentrate Mix**.

It features a live 2D print-ready layout scaled to physical dimensions, and a real-time **Three.js** 3D bottle mockup simulation mapping the generated design onto a rotating bottle.

## Features

- **Interactive 3D Mockup**: Rotating glass/PET bottle showing fluid color changes based on selected flavor and dilution.
- **Physical Sizing & Aspect Ratios**: Real-time canvas scaling matching label sizes (9x16cm, 7x15cm, 12x20cm).
- **8 Flavor Modes**: Custom dynamic styling and tailored directions for Strawberry, Grape, Cherry, Pineapple, Mango, Fruit Punch, Kola Champagne, and Sorrel & Ginger.
- **Customizable Fields**: Real-time editing of brand logo text, subtitle, batch number, and expiry date.
- **Print Export**: Download button rendering high-DPI (300 DPI equivalent) PNG print-ready files using `html2canvas`.
- **Responsive Layout**: Glassmorphic dashboard UI optimized for all screen sizes.

## Project Structure

```text
├── index.html       # Application Entry Point & Sidebar Layout
├── index.css        # Glassmorphic Theme, Animations & Visual Layout
├── app.js           # Three.js 3D Rendering & State Controller
├── .gitignore       # Git ignore rules
└── assets/          # Generated tropical background graphics
```

## Running Locally

1. Clone this repository to your local system.
2. Launch a local web server in the project directory (required for Three.js texture loading due to browser CORS policies).
   
   **Using Python:**
   ```bash
   python3 -m http.server 8080
   ```
   
   **Using Node/NPX:**
   ```bash
   npx http-server -p 8080
   ```
3. Open your browser and navigate to `http://localhost:8080`.

## Technologies Used

- **HTML5 & Vanilla CSS3** (Custom property theme tokens & glassmorphism)
- **Vanilla JavaScript (ES6)**
- **Three.js** (WebGL 3D Graphic Library)
- **html2canvas** (DOM Screenshot renderer)
- **Lucide Icons**
- **Google Fonts** (Fredoka, Outfit, Inter)
