/**
 * C.I.P Drink Label Generator & 3D Previewer
 * Core JavaScript Logic
 */

// Initial State
const state = {
  flavor: 'strawberry',
  widthCm: 9,
  heightCm: 16,
  volumeState: 'undiluted',
  volumeVal: '50ML',
  brandName: 'C.I.P',
  subType: 'SYRUP FLAVOUR CONCENTRATE MIX',
  ingredients: 'Cane sugar, Water, Flavourings, Aciditity Regulator: Citric Acid, Colour: E122, Preservative: E211.',
  batchNo: 'B-EXP772',
  expiryDate: '12 / 2028',
  activeTab: 'preview-2d'
};

// Flavor Database
const flavorsConfig = {
  strawberry: {
    name: 'STRAWBERRY',
    emoji: '🍓',
    color: '#ff4757',
    rgb: '255, 71, 87',
    liquidColor: 0x9c0c16, // Rich dark red for syrup concentrate
    liquidColorDiluted: 0xff3b30, // Bright translucent red
    primaryImg: 'assets/strawberry_flavor_bg_1784850151796.png',
    fallbackImg: 'assets/strawberry_flavor_bg_1784850151796.png',
    directionsUndiluted: 'Mix 1 part C.I.P Strawberry Concentrate with 5 parts chilled carbonated water. Stir well. Serve over ice with fresh strawberries.',
    directionsDiluted: 'Ready to drink. Serve chilled. Shake well before opening. Keep refrigerated after opening.'
  },
  grape: {
    name: 'GRAPE',
    emoji: '🍇',
    color: '#8c7ae6',
    rgb: '140, 122, 230',
    liquidColor: 0x481f5c, // Deep grape purple
    liquidColorDiluted: 0x7030a0, // Royal purple translucent
    primaryImg: 'assets/grape_flavor_bg_1784850183216.png',
    fallbackImg: 'assets/grape_flavor_bg_1784850183216.png',
    directionsUndiluted: 'Mix 1 part C.I.P Grape Concentrate with 5 parts water. Serve cold over crushed ice.',
    directionsDiluted: 'Ready to drink. Delicious grape flavor mix. Serve ice-cold.'
  },
  cherry: {
    name: 'CHERRY',
    emoji: '🍒',

    color: '#d63031',
    rgb: '214, 48, 49',
    liquidColor: 0x6e0000, // Crimson red
    liquidColorDiluted: 0xbd0000, // Cherry red
    primaryImg: 'assets/cherry_flavor_bg_1784850295519.png',
    fallbackImg: 'assets/cherry_flavor_bg_1784850295519.png',
    directionsUndiluted: 'Mix 1 part C.I.P Cherry Concentrate with 5 parts cold water. Perfect for punch bowls and mocktails.',
    directionsDiluted: 'Ready to drink. Crisp and sweet cherry flavor. Best served chilled.'
  },
  pineapple: {
    name: 'PINEAPPLE',
    emoji: '🍍',
    color: '#eccc68',
    rgb: '236, 204, 104',
    liquidColor: 0xb58900, // Golden yellow-brown syrup
    liquidColorDiluted: 0xffd13b, // Translucent bright yellow
    primaryImg: 'assets/pineapple_flavor_bg_1784850172270.png',
    fallbackImg: 'assets/pineapple_flavor_bg_1784850172270.png',
    directionsUndiluted: 'Mix 1 part C.I.P Pineapple Concentrate with 5 parts chilled water. Serve with a slice of fresh pineapple.',
    directionsDiluted: 'Ready to drink. Tropical pineapple refresh. Best served chilled over ice.'
  },
  mango: {
    name: 'MANGO',
    emoji: '🥭',
    color: '#ffa502',
    rgb: '255, 165, 2',
    liquidColor: 0xb56b00, // Rich amber mango pulp syrup
    liquidColorDiluted: 0xffa500, // Translucent mango orange
    primaryImg: 'assets/mango_flavor_bg_1784850162081.png',
    fallbackImg: 'assets/mango_flavor_bg_1784850162081.png',
    directionsUndiluted: 'Mix 1 part C.I.P Mango Concentrate with 5 parts cold water. Blend with ice for a tropical mango slushy.',
    directionsDiluted: 'Ready to drink. Indulgent mango nectar flavor. Shake well, serve cold.'
  },
  fruit_punch: {
    name: 'FRUIT PUNCH',
    emoji: '🍹',
    color: '#ff6b81',
    rgb: '255, 107, 129',
    liquidColor: 0x9e1233, // Deep tropical ruby red
    liquidColorDiluted: 0xe11d48, // Vibrant punch red
    primaryImg: 'assets/fruit_punch_flavor_bg_1784850306863.png',
    fallbackImg: 'assets/fruit_punch_flavor_bg_1784850306863.png',
    directionsUndiluted: 'Mix 1 part C.I.P Fruit Punch with 5 parts cold ginger ale or water. Garnish with lime slices.',
    directionsDiluted: 'Ready to drink. The ultimate tropical fruit punch. Serve chilled.'
  },
  kola_champagne: {
    name: 'KOLA CHAMPAGNE',
    emoji: '🍾',
    color: '#ff7f50',
    rgb: '255, 127, 80',
    liquidColor: 0xa8470a, // Rich amber kola syrup
    liquidColorDiluted: 0xff8c00, // Golden champagne amber
    primaryImg: 'assets/kola_champagne_flavor_bg_1784850318567.png',
    fallbackImg: 'assets/kola_champagne_flavor_bg_1784850318567.png',
    directionsUndiluted: 'Mix 1 part C.I.P Kola Champagne Concentrate with 5 parts sparkling club soda for that classic Caribbean taste.',
    directionsDiluted: 'Ready to drink. Sweet, sparkling-style kola champagne mix. Serve ice-cold.'
  },
  sorrel_ginger: {
    name: 'SORREL & GINGER',
    emoji: '🌺',
    color: '#b33939',
    rgb: '179, 57, 57',
    liquidColor: 0x4a0e17, // Very dark burgundy hibiscus syrup
    liquidColorDiluted: 0x8a1529, // Deep sorrel red
    primaryImg: 'assets/sorrel_ginger_flavor_bg_1784850332056.png',
    fallbackImg: 'assets/sorrel_ginger_flavor_bg_1784850332056.png',
    directionsUndiluted: 'Mix 1 part C.I.P Sorrel & Ginger Concentrate with 5 parts water. Spice up with rum if desired. Serve cold.',
    directionsDiluted: 'Ready to drink. Spiced hibiscus sorrel and hot ginger blend. Serve chilled.'
  }
};

// DOM Elements
const brandInput = document.getElementById('brand-name');
const subTypeInput = document.getElementById('sub-type');
const batchInput = document.getElementById('batch-no');
const expiryInput = document.getElementById('expiry-date');
const ingredientsInput = document.getElementById('ingredients');
const downloadBtn = document.getElementById('download-btn');
const loadingScreen = document.getElementById('loading-screen');
const ambientGlow = document.getElementById('ambient-glow');

// Label elements
const labelCardContent = document.getElementById('label-card-content');
const labelBgLayer = document.getElementById('label-bg-layer');
const labelBrandName = document.getElementById('label-brand-name');
const labelSubType = document.getElementById('label-sub-type');
const labelFlavorTitle = document.getElementById('label-flavor-title');
const labelDirections = document.getElementById('label-directions');
const labelIngredients = document.getElementById('label-ingredients');
const labelVolume = document.getElementById('label-volume');
const labelBatchVal = document.getElementById('label-batch-val');
const labelExpVal = document.getElementById('label-exp-val');
const labelCanvasContainer = document.getElementById('label-canvas-container');

// Three.js Global Variables
// Three.js globals removed



// Initialize Application
window.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  lucide.createIcons();

  // Setup Event Listeners
  initEventListeners();

  // Set Initial Flavor & Dimensions UI
  updateUI();

  // Initialize 3D Engine
  // initThree removed

  // Hide loading screen with a small delay
  setTimeout(() => {
    loadingScreen.classList.add('hide');
  }, 1000);
});

// Setup Listeners
function initEventListeners() {
  // Flavor buttons
  document.querySelectorAll('.flavor-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.flavor-btn').forEach(b => b.classList.remove('active'));
      const activeBtn = e.target.closest('.flavor-btn');
      activeBtn.classList.add('active');
      state.flavor = activeBtn.dataset.flavor;
      updateUI();
    });
  });

  // Dimensions buttons
  document.querySelectorAll('.dim-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.dim-btn').forEach(b => b.classList.remove('active'));
      const activeBtn = e.target.closest('.dim-btn');
      activeBtn.classList.add('active');
      state.widthCm = parseFloat(activeBtn.dataset.w);
      state.heightCm = parseFloat(activeBtn.dataset.h);
      updateUI();
    });
  });

  // Bottle state/volume buttons
  document.querySelectorAll('.state-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.state-btn').forEach(b => b.classList.remove('active'));
      const activeBtn = e.target.closest('.state-btn');
      activeBtn.classList.add('active');
      state.volumeState = activeBtn.dataset.state;
      state.volumeVal = activeBtn.dataset.volume.toUpperCase();
      updateUI();
    });
  });

  // Custom text inputs
  brandInput.addEventListener('input', (e) => {
    state.brandName = e.target.value || ' ';
    labelBrandName.textContent = state.brandName;
    triggerLabelTextureUpdate();
  });

  subTypeInput.addEventListener('input', (e) => {
    state.subType = e.target.value || ' ';
    labelSubType.textContent = state.subType;
    triggerLabelTextureUpdate();
  });

  batchInput.addEventListener('input', (e) => {
    state.batchNo = e.target.value || ' ';
    labelBatchVal.textContent = state.batchNo;
    triggerLabelTextureUpdate();
  });

  expiryInput.addEventListener('input', (e) => {
    state.expiryDate = e.target.value || ' ';
    labelExpVal.textContent = state.expiryDate;
    triggerLabelTextureUpdate();
  });

  ingredientsInput.addEventListener('input', (e) => {
    state.ingredients = e.target.value || ' ';
    labelIngredients.textContent = state.ingredients;
    triggerLabelTextureUpdate();
  });

  // Typography controls
  const fontFamilySelect = document.getElementById('font-family');
  const brandFontSizeInput = document.getElementById('brand-font-size');
  const brandSizeVal = document.getElementById('brand-size-val');
  const flavorFontSizeInput = document.getElementById('flavor-font-size');
  const flavorSizeVal = document.getElementById('flavor-size-val');
  const brandColorInput = document.getElementById('brand-color');

  if (fontFamilySelect) {
    fontFamilySelect.addEventListener('change', (e) => {
      labelBrandName.style.fontFamily = e.target.value;
      labelFlavorTitle.style.fontFamily = e.target.value;
      triggerLabelTextureUpdate();
    });
  }

  if (brandFontSizeInput) {
    brandFontSizeInput.addEventListener('input', (e) => {
      const val = `${e.target.value}rem`;
      if (brandSizeVal) brandSizeVal.textContent = val;
      labelBrandName.style.fontSize = val;
      triggerLabelTextureUpdate();
    });
  }

  if (flavorFontSizeInput) {
    flavorFontSizeInput.addEventListener('input', (e) => {
      const val = `${e.target.value}rem`;
      if (flavorSizeVal) flavorSizeVal.textContent = val;
      labelFlavorTitle.style.fontSize = val;
      triggerLabelTextureUpdate();
    });
  }

  if (brandColorInput) {
    brandColorInput.addEventListener('input', (e) => {
      labelBrandName.style.color = e.target.value;
      triggerLabelTextureUpdate();
    });
  }

  // Tabs switching
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      const activeBtn = e.target.closest('.tab-btn');
      activeBtn.classList.add('active');
      state.activeTab = activeBtn.dataset.tab;

      document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));
      document.getElementById('panel-2d').classList.add('active');
    });
  });

  // Download printable PNG button
  downloadBtn.addEventListener('click', exportLabelAsPNG);

  // Resize handler
  // window.addEventListener('resize', onWindowResize); // removed 3D resize
}

// Update the Label design and colors based on Current State
function updateUI() {
  const cfg = flavorsConfig[state.flavor];

  // 1. Update CSS Dynamic Theme Variables
  document.documentElement.style.setProperty('--theme-color', cfg.color);
  document.documentElement.style.setProperty('--theme-color-rgb', cfg.rgb);
  document.documentElement.style.setProperty('--theme-color-glow', `rgba(${cfg.rgb}, 0.25)`);

  // 2. Set Background image with robust loading error fallback
  const imgObj = new Image();
  // Debug: show which image path we are trying to load
  console.log('Loading label background image:', cfg.primaryImg);
  imgObj.onload = () => {
    labelBgLayer.style.backgroundImage = `url('${imgObj.src}')`;
    triggerLabelTextureUpdate();
  };
  imgObj.onerror = () => {
  console.warn('Primary image failed, falling back to', cfg.fallbackImg);
  labelBgLayer.style.backgroundImage = `url('${cfg.fallbackImg}')`;
  triggerLabelTextureUpdate();
};
  // When the page is opened via file://, relative URLs may resolve incorrectly.
  // Build an absolute file URL based on the current location.
  const basePath = location.protocol === 'file:' ? location.pathname.replace(/index\.html$/, '') : '';
  imgObj.src = basePath + cfg.primaryImg;

  // 3. Update Text Content inside the 2D label DOM
  labelBrandName.textContent = state.brandName;
  labelSubType.textContent = state.subType;
  labelFlavorTitle.textContent = cfg.name;

  // Instructions based on Diluted / Undiluted state
  if (state.volumeState === 'undiluted') {
    labelDirections.textContent = cfg.directionsUndiluted;
    labelVolume.textContent = `${state.volumeVal} (UNDILUTED)`;
  } else {
    labelDirections.textContent = cfg.directionsDiluted;
    labelVolume.textContent = `${state.volumeVal} (DILUTED)`;
  }

  labelBatchVal.textContent = state.batchNo;
  labelExpVal.textContent = state.expiryDate;
  labelIngredients.textContent = state.ingredients;

  // 4. Update the Label aspect ratio container dimensions (scaled to fit screen beautifully)
  // Base scale: 1cm physical = 25px flat rendering
  const scale = 25;
  // Multi-panel labels are folded, so full flat width includes left, center, right parts.
  // Standard 9x16 means the visual label is 16cm height and (left panel + center panel + right panel) wide.
  // Let's model a realistic total width wrapper:
  // Flat width is physically proportional to label size.
  // Let's set dimensions of the 2D layout based on cm:
  const targetWidthPx = state.widthCm * 2.5 * scale;
  const targetHeightPx = state.heightCm * scale;

  labelCanvasContainer.style.width = `${targetWidthPx}px`;
  labelCanvasContainer.style.height = `${targetHeightPx}px`;

  // Adjust font sizes depending on size of the label to keep scaling perfect
  if (state.widthCm < 9) {
    labelCanvasContainer.style.fontSize = '85%';
    labelBrandName.style.fontSize = '30px';
  } else if (state.widthCm > 10) {
    labelCanvasContainer.style.fontSize = '115%';
    labelBrandName.style.fontSize = '46px';
  } else {
    labelCanvasContainer.style.fontSize = '100%';
    labelBrandName.style.fontSize = '38px';
  }

  // 5. Update 3D Liquid and Cap Colors if initialized
}

// Trigger html2canvas capture to update Three.js Cylinder Texture
let textureUpdateTimeout = null;
// triggerLabelTextureUpdate and updateThreeLabelTexture removed
function triggerLabelTextureUpdate() {
  // No 3D texture updates needed
}


// -------------------------------------------------------------
// Three.js 3D Engine Setup
// -------------------------------------------------------------
// initThree and all Three.js setup removed

// Build parametric bottle model
// buildBottleModel removed

// Update Three.js liquid color and cap styling dynamically based on state
// updateThreeMaterials removed
// Render loop
// animate loop removed
// Window resizing
// onWindowResize removed
// -------------------------------------------------------------
// Export and Print Labels Functionality (using html2canvas)
// -------------------------------------------------------------
function exportLabelAsPNG() {
  // Show spinner during export
  loadingScreen.classList.remove('hide');
  document.querySelector('.loading-screen p').textContent = "Rendering Print Label...";

  // Simplified exportLabelAsPNG without 3D tab handling
  const prevTab = state.activeTab;
  // Ensure 2D panel is active
  document.getElementById('panel-2d').classList.add('active');

  setTimeout(() => {
    const target = document.getElementById('label-card-content');
    // Hide dotted lines
    document.querySelectorAll('.label-grid > :not(:last-child)').forEach(el => {
      el.style.borderRight = 'none';
    });

    html2canvas(target, {
      scale: 3,
      useCORS: true,
      allowTaint: true,
      backgroundColor: null
    }).then(canvas => {
      // Restore dotted lines
      document.querySelectorAll('.label-grid > :not(:last-child)').forEach(el => {
        el.style.borderRight = '1px dashed rgba(255, 255, 255, 0.2)';
      });
      const filename = `CIP_Label_${state.flavor.toUpperCase()}_${state.widthCm}x${state.heightCm}cm.png`;
      const link = document.createElement('a');
      link.download = filename;
      link.href = canvas.toDataURL('image/png');
      link.click();
      loadingScreen.classList.add('hide');
      document.querySelector('.loading-screen p').textContent = "Loading Summer Vibes...";
    }).catch(err => {
      console.error("Download render failed:", err);
      alert("Oops! There was an issue generating your printable download file.");
      loadingScreen.classList.add('hide');
      document.querySelector('.loading-screen p').textContent = "Loading Summer Vibes...";
    });
  }, 600);
}
