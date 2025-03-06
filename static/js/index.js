
// Initialize the Camera viewer
bulmaCarousel.attach('#camera-carousel', {
  slidesToScroll: 1,
  slidesToShow: 1,
  infinite: true,
});

// Initialize the Lidar viewer with Potree
console.log("Initializing Lidar viewer with Potree");

// Create a Potree viewer
const potreeContainer = document.getElementById('lidar-container');
window.viewer = new Potree.Viewer(potreeContainer);

// Configure the Potree viewer
viewer.setEDLEnabled(true);
viewer.setFOV(60);
viewer.setPointBudget(200_000);
viewer.loadSettingsFromURL();
viewer.setDescription("");

// Load the GUI and set language
viewer.loadGUI(() => {
  viewer.setLanguage('en');
  $("#menu_scene").next().show();
  $("#menu_clipping").next().show();
});

// Function to load a point cloud using Potree
function loadPointCloud(metadataPath) {
  Potree.loadPointCloud(metadataPath, "", e => {
      const scene = viewer.scene;
      const pointcloud = e.pointcloud;

      // Configure the point cloud material
      const material = pointcloud.material;
      material.size = 1;
      material.pointSizeType = Potree.PointSizeType.FIXED;
      material.shape = Potree.PointShape.SPHERE;
      material.activeAttributeName = "elevation";

      // Add the point cloud to the scene
      scene.addPointCloud(pointcloud);

      // Set the camera position and look-at point
      // scene.view.position.set(...position);
      // scene.view.lookAt(...lookAt);
      scene.view.position.set(
          -48.31212244074629,
          12.32598831504586,
          23.524822008503996,
      );
      scene.view.lookAt(
          -2.490216351027989,
          4.162392766183796,
          9.939063109279841,
      );

      // Add an axes helper to the scene
      const axesHelper = new THREE.AxesHelper(1);
      axesHelper.position.set(0, 0, 0);
      scene.scene.add(axesHelper);
  });
}


// Function to handle track selection
let CURRENT_RUN = 'grun33';
const set_run = (grun) => {
CURRENT_RUN = grun;

// Remove active class from all track buttons
for (let run of ['grun33', 'grun16', 'grun20', 'grun37', 'grun44', 'grun48']) {
  const node = document.getElementById(`track-select-button-${run}`);
  if (node) node.classList.remove('active-track');
}

// Clear the current scene
//   viewer.scene.scene.remove.apply(viewer.scene.scene, viewer.scene.scene.children);
viewer.scene = new Potree.Scene(); // Reset the scene
viewer.setScene(viewer.scene); // Update the viewer with the new scene


// Load the appropriate point cloud, images, and time series data
if (grun === 'grun33') {
  loadPointCloud('./static/data/grun33/potree_output/metadata.json');
  Plotly.newPlot('myDiv', grun33_traces, grun33_layout);
  document.getElementById('camera-image-1').src = 'static/data/grun33/00006400.png';
  document.getElementById('camera-image-2').src = 'static/data/grun33/00018501.png';
  document.getElementById('current-track').textContent = 'Las Vegas Motor Speedway';
} else if (grun === 'grun16') {
  loadPointCloud('./static/data/grun33/potree_output/metadata.json');
  Plotly.newPlot('myDiv', grun16_traces, grun16_layout);
  document.getElementById('camera-image-1').src = 'static/data/grun33/00018501.png';
  document.getElementById('camera-image-2').src = 'static/data/grun33/00006400.png';
  document.getElementById('current-track').textContent = 'Lucas Oil Raceway';
} else if (grun === 'grun20') {
  loadPointCloud('./static/data/grun33/potree_output/metadata.json');
  Plotly.newPlot('myDiv', grun20_traces, grun20_layout);
  document.getElementById('camera-image-1').src = 'static/data/grun33/00006400.png';
  document.getElementById('camera-image-2').src = 'static/data/grun33/00018501.png';
  document.getElementById('current-track').textContent = 'Texas Motor Speedway';
} else if (grun === 'grun48') {
  loadPointCloud('./static/data/grun48/potree_output/metadata.json');
  Plotly.newPlot('myDiv', grun48_traces, grun48_layout);
  document.getElementById('camera-image-1').src = 'static/data/grun33/00018501.png';
  document.getElementById('camera-image-2').src = 'static/data/grun33/00006400.png';
  document.getElementById('current-track').textContent = 'Autodromo Nazionale Monza';
} else if (grun === 'grun50') {
  loadPointCloud('./static/data/grun33/potree_output/metadata.json');
  Plotly.newPlot('myDiv', grun50_traces, grun50_layout);
  document.getElementById('camera-image-1').src = 'static/data/grun33/00006400.png';
  document.getElementById('camera-image-2').src = 'static/data/grun33/00018501.png';
  document.getElementById('current-track').textContent = 'Indianapolis Motor Speedway';
} else if (grun === 'grun38') {
  loadPointCloud('./static/data/grun33/potree_output/metadata.json');
  Plotly.newPlot('myDiv', grun38_traces, grun38_layout);
  document.getElementById('camera-image-1').src = 'static/data/grun33/00018501.png';
  document.getElementById('camera-image-2').src = 'static/data/grun33/00006400.png';
  document.getElementById('current-track').textContent = 'Goodwood Festival of Speed';
}

// Add active class to the selected track button
document.getElementById(`track-select-button-${grun}`).classList.add('active-track');
};

set_run(CURRENT_RUN);
