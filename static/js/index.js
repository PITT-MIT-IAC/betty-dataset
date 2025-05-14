
////////////////////////////////////////
// Camera Carousel
////////////////////////////////////////
// Initialize the Camera viewer
bulmaCarousel.attach('#camera-carousel', {
  slidesToScroll: 1,
  slidesToShow: 1,
  infinite: true,
});

////////////////////////////////////////
// Potree Visualization
////////////////////////////////////////

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
function loadPointCloud(metadataPath, position, lookAt) {
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
    scene.view.position.set(...position);
    scene.view.lookAt(...lookAt);

    // Add an axes helper to the scene
    const axesHelper = new THREE.AxesHelper(1);
    axesHelper.position.set(0, 0, 0);
    scene.scene.add(axesHelper);
  });
}


////////////////////////////////////////
// Track selector
////////////////////////////////////////
function updateVideoSource(videoElementId, newSource) {
  const videoElement = document.getElementById(videoElementId);
  const sourceElement = videoElement.querySelector('source'); // Get the <source> tag
  sourceElement.src = newSource; // Update the source
  videoElement.load(); // Reload the video to apply the new source
  // videoElement.play(); // Optionally, start playing the video
}

// Function to handle track selection
let CURRENT_RUN = 'grun48';
// const metadataPath = "./static/data/grun33/potree_output/metadata.json";
const position = [-48.31212244074629, 12.32598831504586, 23.524822008503996];
const lookAt = [-2.490216351027989, 4.162392766183796, 9.939063109279841];

const set_run = (grun) => {
CURRENT_RUN = grun;

// Remove active class from all track buttons
for (let run of ['grun33', 'grun16', 'grun20', 'grun48', 'grun50', 'grun40']) {
  const node = document.getElementById(`track-select-button-${run}`);
  if (node) node.classList.remove('active-track');
}

// Clear the current scene
//   viewer.scene.scene.remove.apply(viewer.scene.scene, viewer.scene.scene.children);
viewer.scene = new Potree.Scene(); // Reset the scene
viewer.setScene(viewer.scene); // Update the viewer with the new scene

// Load the appropriate point cloud, images, and time series data
if (grun === 'grun33') {
  loadPointCloud('./static/data/grun33/potree_output/metadata.json', position, lookAt);
  Plotly.newPlot('timeseries-div', grun33_traces, grun33_layout);
  updateVideoSource('camera-video', 'static/data/grun33/grun33_mosaic_trimmed.mp4');
  document.getElementById('current-track').textContent = 'Las Vegas Motor Speedway';
  document.getElementById('timeseries-description').innerHTML = '🔎<em><span class="text-emphasize">Timeseries Deep Dive</span>: Wheel speed reaching up to 230 kmph (143mph)</em>';
} else if (grun === 'grun16') {
  loadPointCloud('./static/data/grun16/potree_output/metadata.json', position, lookAt);
  Plotly.newPlot('timeseries-div', grun58_traces, grun58_layout);
  updateVideoSource('camera-video', 'static/data/grun33/grun33_mosaic_trimmed.mp4');
  document.getElementById('current-track').textContent = 'Lucas Oil Raceway';
  document.getElementById('timeseries-description').innerHTML = '🔎<em><span class="text-emphasize">Timeseries Deep Dive</span>: Check out this spinout! Huge spike in slip angle and lateral velocity, demonstrating instability</em>';
} else if (grun === 'grun20') {
  loadPointCloud('./static/data/grun20/potree_output/metadata.json', position, lookAt);
  Plotly.newPlot('timeseries-div', grun20_traces, grun20_layout);
  updateVideoSource('camera-video', 'static/data/grun20/grun20_mosaic_trimmed.mp4');
  document.getElementById('current-track').textContent = 'Texas Motor Speedway';
  document.getElementById('timeseries-description').innerHTML = '🔎<em><span class="text-emphasize">Timeseries Deep Dive</span>: We see more displacement in the rear dampers than front</em>';
} else if (grun === 'grun48') {
  loadPointCloud('./static/data/grun48/potree_output/metadata.json', position, lookAt);
  Plotly.newPlot('timeseries-div', grun48_traces, grun48_layout);
  updateVideoSource('camera-video', 'static/data/grun48/grun48_mosaic_trimmed.mp4');
  document.getElementById('current-track').textContent = 'Autodromo Nazionale Monza';
  document.getElementById('timeseries-description').innerHTML = '🔎<em><span class="text-emphasize">Timeseries Deep Dive</span>: Look at how the tire temperature warms up as we keep driving. The front is warming up faster than the rear too!</em>';
} else if (grun === 'grun50') {
  loadPointCloud('./static/data/grun50/potree_output/metadata.json', position, lookAt);
  Plotly.newPlot('timeseries-div', grun50_traces, grun50_layout);
  updateVideoSource('camera-video', 'static/data/grun33/grun33_mosaic_trimmed.mp4');
  document.getElementById('current-track').textContent = 'Indianapolis Motor Speedway';
  document.getElementById('timeseries-description').innerHTML = '🔎<em><span class="text-emphasize">Timeseries Deep Dive</span>: Watch the engine RPM rise</em>';
} else if (grun === 'grun40') {
  loadPointCloud('./static/data/grun40/potree_output/metadata.json', position, lookAt);
  Plotly.newPlot('timeseries-div', grun33_traces, grun33_layout);
  updateVideoSource('camera-video', 'static/data/grun33/grun33_mosaic_trimmed.mp4');
  document.getElementById('current-track').textContent = 'Goodwood Festival of Speed';
  document.getElementById('timeseries-description').innerHTML = '🔎<em><span class="text-emphasize">Timeseries Deep Dive</span>: Wheel speed reaching up to 230 kmph (143mph)</em>';
}

// Add active class to the selected track button
document.getElementById(`track-select-button-${grun}`).classList.add('active-track');
};

set_run(CURRENT_RUN);

////////////////////////////////////////
// Hand animation
////////////////////////////////////////
// Get the hand icon
const hand = document.getElementById('animated-hand');
const lidarViewer = document.getElementById('lidar-viewer');

function hideHandGracefully() {
  if (!hand.classList.contains('hidden')) {
    hand.classList.add('hidden'); // Trigger fade-out
  }
}

// Hide the hand on interaction
lidarViewer.addEventListener('mousedown', hideHandGracefully);
lidarViewer.addEventListener('touchstart', hideHandGracefully);