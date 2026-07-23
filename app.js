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
  activeTab: 'preview-3d'
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
    primaryImg: 'assets/strawberry_splash.png',
    fallbackImg: 'assets/berries_grapes_splash.jpg',
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
    primaryImg: 'assets/grape_splash.png',
    fallbackImg: 'assets/berries_grapes_splash.jpg',
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
    primaryImg: 'assets/cherry_splash.png',
    fallbackImg: 'assets/berries_grapes_splash.jpg',
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
    primaryImg: 'assets/pineapple_splash.png',
    fallbackImg: 'assets/tropical_fruits_splash.jpg',
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
    primaryImg: 'assets/mango_splash.png',
    fallbackImg: 'assets/tropical_fruits_splash.jpg',
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
    primaryImg: 'assets/fruit_punch_splash.png',
    fallbackImg: 'assets/tropical_fruits_splash.jpg',
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
    primaryImg: 'assets/kola_champagne_splash.png',
    fallbackImg: 'assets/tropical_fruits_splash.jpg',
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
    primaryImg: 'assets/sorrel_ginger_splash.png',
    fallbackImg: 'assets/sorrel_ginger_splash.jpg',
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
let scene, camera, renderer, bottleMesh, liquidMesh, labelMesh, capMesh, orbitControls;
let threeInitialized = false;
let labelTexture = null;

// Initialize Application
window.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  lucide.createIcons();

  // Setup Event Listeners
  initEventListeners();

  // Set Initial Flavor & Dimensions UI
  updateUI();

  // Initialize 3D Engine
  initThree();

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

  // Tabs switching
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      const activeBtn = e.target.closest('.tab-btn');
      activeBtn.classList.add('active');
      state.activeTab = activeBtn.dataset.tab;

      document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));
      if (state.activeTab === 'preview-3d') {
        document.getElementById('panel-3d').classList.add('active');
        // Redraw 3D scene because container width might have changed
        onWindowResize();
        triggerLabelTextureUpdate();
      } else {
        document.getElementById('panel-2d').classList.add('active');
      }
    });
  });

  // Download printable PNG button
  downloadBtn.addEventListener('click', exportLabelAsPNG);

  // Resize handler
  window.addEventListener('resize', onWindowResize);
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
  imgObj.onload = () => {
    labelBgLayer.style.backgroundImage = `url('${imgObj.src}')`;
    triggerLabelTextureUpdate();
  };
  imgObj.onerror = () => {
    // If primary local assets/ path fails, fall back to relative brain path
    labelBgLayer.style.backgroundImage = `url('${cfg.fallbackImg}')`;
    triggerLabelTextureUpdate();
  };
  imgObj.src = cfg.primaryImg;

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
  if (threeInitialized) {
    updateThreeMaterials();
  }
}

// Trigger html2canvas capture to update Three.js Cylinder Texture
let textureUpdateTimeout = null;
function triggerLabelTextureUpdate() {
  if (!threeInitialized) return;

  // Throttle texture updates to avoid lag on input keypresses
  clearTimeout(textureUpdateTimeout);
  textureUpdateTimeout = setTimeout(() => {
    updateThreeLabelTexture();
  }, 350);
}

// HTML2Canvas helper to map DOM element to Three.js texture
function updateThreeLabelTexture() {
  const target = document.getElementById('label-card-content');

  // Temporary style updates to render html2canvas nicely (no drop-shadow offsets)
  const originalShadow = target.style.boxShadow;
  target.style.boxShadow = 'none';

  html2canvas(target, {
    scale: 2, // High resolution capture
    backgroundColor: null,
    useCORS: true,
    allowTaint: true,
    logging: false
  }).then(canvas => {
    target.style.boxShadow = originalShadow;

    if (labelTexture) {
      labelTexture.dispose();
    }

    // Create new texture from the canvas
    labelTexture = new THREE.CanvasTexture(canvas);
    labelTexture.wrapS = THREE.ClampToEdgeWrapping;
    labelTexture.wrapT = THREE.ClampToEdgeWrapping;
    labelTexture.minFilter = THREE.LinearFilter;

    if (labelMesh) {
      labelMesh.material.map = labelTexture;
      labelMesh.material.needsUpdate = true;
    }
  }).catch(err => {
    console.error("Error creating 3D label texture: ", err);
  });
}

// -------------------------------------------------------------
// Three.js 3D Engine Setup
// -------------------------------------------------------------
function initThree() {
  const container = document.getElementById('three-container');
  if (!container) return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  // Scene
  scene = new THREE.Scene();
  // Ambient Fog to give depth
  scene.fog = new THREE.FogExp2(0x0a0e17, 0.04);

  // Camera
  camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
  camera.position.set(0, 1.175, 9.5);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  container.appendChild(renderer.domElement);

  // Controls
  orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
  orbitControls.target.set(0, 1.175, 0);
  orbitControls.enableDamping = true;
  orbitControls.dampingFactor = 0.05;
  orbitControls.maxPolarAngle = Math.PI / 2 + 0.15; // Don't look too far under the table
  orbitControls.minDistance = 4;
  orbitControls.maxDistance = 15;
  // Slow auto-rotation for premium product display
  orbitControls.autoRotate = true;
  orbitControls.autoRotateSpeed = 1.0;
  orbitControls.update();

  // Lights
  // 1. Warm tropical sunshine keylight
  const sunLight = new THREE.DirectionalLight(0xfff5e6, 1.4);
  sunLight.position.set(5, 6, 4);
  scene.add(sunLight);

  // 2. Soft sky fill light
  const skyLight = new THREE.AmbientLight(0xcedeff, 0.6);
  scene.add(skyLight);

  // 3. Colored backlighting for liquid refraction glow
  const rimLight = new THREE.PointLight(0xffffff, 1.2, 15);
  rimLight.position.set(-4, 2, -4);
  scene.add(rimLight);

  const softFrontLight = new THREE.DirectionalLight(0xffffff, 0.3);
  softFrontLight.position.set(-2, 0, 5);
  scene.add(softFrontLight);

  // Create Bottle Mockup Geometries
  buildBottleModel();

  threeInitialized = true;

  // Set initial colors
  updateThreeMaterials();

  // Perform first label texture capture
  setTimeout(updateThreeLabelTexture, 500);

  // Start Animation Loop
  animate();
}

// Build parametric bottle model
function buildBottleModel() {
  const bottleGroup = new THREE.Group();
  bottleGroup.position.y = -2.0; // Center model in view frame
  scene.add(bottleGroup);

  // Materials Definitions
  // Glass: physical refractive transparent material
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.25,
    roughness: 0.05,
    metalness: 0.1,
    transmission: 0.9, // Allow light to pass through glass
    ior: 1.52, // Index of refraction of glass
    thickness: 0.15,
    specularIntensity: 1.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02
  });

  // Cap material (sleek gold metallic)
  const capMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37, // gold
    metalness: 0.9,
    roughness: 0.2,
    name: 'capMat'
  });

  // Liquid inside
  const liquidMat = new THREE.MeshPhysicalMaterial({
    color: 0x9c0c16,
    transparent: true,
    opacity: 0.85,
    transmission: 0.4,
    roughness: 0.1,
    ior: 1.33, // Index of refraction of water/syrup
    name: 'liquidMat'
  });

  // Label backing material
  const labelMat = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    transparent: true,
    alphaTest: 0.1,
    name: 'labelMat'
  });

  // 1. Glass Bottle Body Parts
  // Cylindrical body
  const bodyGeo = new THREE.CylinderGeometry(1.6, 1.6, 3.8, 48, 1);
  const bodyMesh = new THREE.Mesh(bodyGeo, glassMat);
  bodyMesh.position.y = 1.9;
  bottleGroup.add(bodyMesh);

  // Shoulder (tapering cone)
  const shoulderGeo = new THREE.CylinderGeometry(0.8, 1.6, 0.9, 48, 1);
  const shoulderMesh = new THREE.Mesh(shoulderGeo, glassMat);
  shoulderMesh.position.y = 3.8 + 0.45;
  bottleGroup.add(shoulderMesh);

  // Neck (narrow tube)
  const neckGeo = new THREE.CylinderGeometry(0.7, 0.8, 1.0, 48, 1);
  const neckMesh = new THREE.Mesh(neckGeo, glassMat);
  neckMesh.position.y = 3.8 + 0.9 + 0.5;
  bottleGroup.add(neckMesh);

  // Collar ring
  const collarGeo = new THREE.CylinderGeometry(0.75, 0.75, 0.15, 48, 1);
  const collarMesh = new THREE.Mesh(collarGeo, glassMat);
  collarMesh.position.y = 3.8 + 0.9 + 1.0 + 0.075;
  bottleGroup.add(collarMesh);

  // 2. Bottle Cap
  const capGeo = new THREE.CylinderGeometry(0.78, 0.78, 0.5, 32, 1);
  capMesh = new THREE.Mesh(capGeo, capMat);
  capMesh.position.y = 3.8 + 0.9 + 1.0 + 0.15 + 0.25;
  bottleGroup.add(capMesh);

  // 3. Liquid Interior (slightly smaller than glass body)
  // Fill the main cylinder body
  const liquidBodyGeo = new THREE.CylinderGeometry(1.48, 1.48, 3.7, 32, 1);
  liquidMesh = new THREE.Mesh(liquidBodyGeo, liquidMat);
  liquidMesh.position.y = 1.85;
  bottleGroup.add(liquidMesh);

  // Fill shoulder
  const liquidShoulderGeo = new THREE.CylinderGeometry(0.74, 1.48, 0.85, 32, 1);
  const liquidShoulderMesh = new THREE.Mesh(liquidShoulderGeo, liquidMat);
  liquidShoulderMesh.position.y = 3.7 + 0.425;
  bottleGroup.add(liquidShoulderMesh);

  // 4. Cylindrical Label Mesh (positioned just outside glass body)
  // Standard wrapping leaves a small gap at the back (circumference angle Math.PI * 1.7)
  const labelGeo = new THREE.CylinderGeometry(1.61, 1.61, 3.2, 48, 1, true, 0, Math.PI * 1.65);
  labelMesh = new THREE.Mesh(labelGeo, labelMat);
  // Orient the label so it faces the camera by default
  labelMesh.rotation.y = -Math.PI * 1.65 / 2;
  labelMesh.position.y = 1.9;
  bottleGroup.add(labelMesh);
}

// Update Three.js liquid color and cap styling dynamically based on state
function updateThreeMaterials() {
  const cfg = flavorsConfig[state.flavor];

  if (scene) {
    scene.traverse(node => {
      if (node.isMesh && node.material) {
        // Update liquid color (syrup color vs diluted mix color)
        if (node.material.name === 'liquidMat') {
          const hexCol = (state.volumeState === 'undiluted') ? cfg.liquidColor : cfg.liquidColorDiluted;
          node.material.color.setHex(hexCol);
          node.material.needsUpdate = true;
        }

        // Match cap style (e.g. golden/black or matching color code)
        if (node.material.name === 'capMat') {
          // Let's use a gorgeous gold metal for undiluted premium syrup, 
          // and a fun matching flavor-color cap for ready-to-drink diluted bottles!
          if (state.volumeState === 'undiluted') {
            node.material.color.setHex(0xd4af37); // Premium Gold
            node.material.roughness = 0.15;
          } else {
            node.material.color.setHex(parseInt(cfg.color.replace('#', '0x'))); // Matching flavor code
            node.material.roughness = 0.4;
          }
          node.material.needsUpdate = true;
        }
      }
    });
  }

  // Adjust Label mesh size on bottle depending on dimension selections
  if (labelMesh) {
    // 9x16cm -> height scale 1.0 (standard height)
    // 7x15cm -> height scale 0.9 (slimmer layout)
    // 12x20cm -> height scale 1.15 (taller coverage)
    let heightScale = 1.0;
    let radiusScale = 1.0;

    if (state.widthCm === 7 && state.heightCm === 15) {
      heightScale = 0.88;
      // Slim label wraps slightly less circumference
      radiusScale = 0.95;
    } else if (state.widthCm === 12 && state.heightCm === 20) {
      heightScale = 1.15;
      radiusScale = 1.05;
    }

    labelMesh.scale.set(1, heightScale, 1);
    labelMesh.position.y = 1.9; // keep centered on cylinder body
  }
}

// Render loop
function animate() {
  requestAnimationFrame(animate);

  if (orbitControls) {
    orbitControls.update();
  }

  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
}

// Window resizing
function onWindowResize() {
  const container = document.getElementById('three-container');
  if (!container) return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  if (camera && renderer) {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }
}

// -------------------------------------------------------------
// Export and Print Labels Functionality (using html2canvas)
// -------------------------------------------------------------
function exportLabelAsPNG() {
  // Show spinner during export
  loadingScreen.classList.remove('hide');
  document.querySelector('.loading-screen p').textContent = "Rendering Print Label...";

  // Temporarily switch tabs to 2D view to ensure it renders correctly
  const prevTab = state.activeTab;

  // Force 2D flat panel render active
  document.getElementById('panel-3d').classList.remove('active');
  document.getElementById('panel-2d').classList.add('active');

  setTimeout(() => {
    const target = document.getElementById('label-card-content');

    // Temporarily hide dotted fold lines for download
    document.querySelectorAll('.label-grid > :not(:last-child)').forEach(el => {
      el.style.borderRight = 'none';
    });

    html2canvas(target, {
      scale: 3, // High print quality scale (approx 300 DPI)
      useCORS: true,
      allowTaint: true,
      backgroundColor: null
    }).then(canvas => {
      // Restore dotted lines
      document.querySelectorAll('.label-grid > :not(:last-child)').forEach(el => {
        el.style.borderRight = '1px dashed rgba(255, 255, 255, 0.2)';
      });

      // Restore tabs
      if (prevTab === 'preview-3d') {
        document.getElementById('panel-2d').classList.remove('active');
        document.getElementById('panel-3d').classList.add('active');
      }

      // Trigger download
      const filename = `CIP_Label_${state.flavor.toUpperCase()}_${state.widthCm}x${state.heightCm}cm.png`;
      const link = document.createElement('a');
      link.download = filename;
      link.href = canvas.toDataURL('image/png');
      link.click();

      // Hide loading spinner
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
