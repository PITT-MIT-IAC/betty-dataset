
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

// Plotly resizing
const plotElement = document.getElementById('timeseries-div');
new ResizeObserver(() => {
  Plotly.Plots.resize(plotElement);
}).observe(plotElement);

// Load the appropriate point cloud, images, and time series data
if (grun === 'grun33') {
  loadPointCloud('./static/data/grun33/potree_output/metadata.json', position, lookAt);
  Plotly.newPlot(plotElement, grun33_traces, grun33_layout);
  updateVideoSource('camera-video', 'static/data/grun33/grun33_mosaic_trimmed.mp4');
  document.getElementById('current-track').textContent = 'Las Vegas Motor Speedway';
  document.getElementById('timeseries-description').innerHTML = '🔎<em><span class="text-emphasize">Timeseries Deep Dive</span>: Wheel speed reaching up to 230 kmph (143mph)</em>';
} else if (grun === 'grun16') {
  loadPointCloud('./static/data/grun16/potree_output/metadata.json', position, lookAt);
  Plotly.newPlot(plotElement, grun58_traces, grun58_layout);
  updateVideoSource('camera-video', 'static/data/grun33/grun33_mosaic_trimmed.mp4');
  document.getElementById('current-track').textContent = 'Lucas Oil Raceway';
  document.getElementById('timeseries-description').innerHTML = '🔎<em><span class="text-emphasize">Timeseries Deep Dive</span>: Check out this spinout! Huge spike in slip angle and lateral velocity, demonstrating instability</em>';
} else if (grun === 'grun20') {
  loadPointCloud('./static/data/grun20/potree_output/metadata.json', position, lookAt);
  Plotly.newPlot(plotElement, grun20_traces, grun20_layout);
  updateVideoSource('camera-video', 'static/data/grun20/grun20_mosaic_trimmed.mp4');
  document.getElementById('current-track').textContent = 'Texas Motor Speedway';
  document.getElementById('timeseries-description').innerHTML = '🔎<em><span class="text-emphasize">Timeseries Deep Dive</span>: We see more displacement in the rear dampers than front</em>';
} else if (grun === 'grun48') {
  loadPointCloud('./static/data/grun48/potree_output/metadata.json', position, lookAt);
  Plotly.newPlot(plotElement, grun48_traces, grun48_layout);
  updateVideoSource('camera-video', 'static/data/grun48/grun48_mosaic_trimmed.mp4');
  document.getElementById('current-track').textContent = 'Autodromo Nazionale Monza';
  document.getElementById('timeseries-description').innerHTML = '🔎<em><span class="text-emphasize">Timeseries Deep Dive</span>: Look at how the tire temperature warms up as we keep driving. The front is warming up faster than the rear too!</em>';
} else if (grun === 'grun50') {
  loadPointCloud('./static/data/grun50/potree_output/metadata.json', position, lookAt);
  Plotly.newPlot(plotElement, grun50_traces, grun50_layout);
  updateVideoSource('camera-video', 'static/data/grun33/grun33_mosaic_trimmed.mp4');
  document.getElementById('current-track').textContent = 'Indianapolis Motor Speedway';
  document.getElementById('timeseries-description').innerHTML = '🔎<em><span class="text-emphasize">Timeseries Deep Dive</span>: Watch the engine RPM rise</em>';
} else if (grun === 'grun40') {
  loadPointCloud('./static/data/grun40/potree_output/metadata.json', position, lookAt);
  Plotly.newPlot(plotElement, grun33_traces, grun33_layout);
  updateVideoSource('camera-video', 'static/data/grun33/grun33_mosaic_trimmed.mp4');
  document.getElementById('current-track').textContent = 'Goodwood Festival of Speed';
  document.getElementById('timeseries-description').innerHTML = '🔎<em><span class="text-emphasize">Timeseries Deep Dive</span>: Wheel speed reaching up to 230 kmph (143mph)</em>';
}

// Add active class to the selected track button
document.getElementById(`track-select-button-${grun}`).classList.add('active-track');
};

set_run(CURRENT_RUN);

////////////////////////////////////////
// Sensor Selector
////////////////////////////////////////
// const sensorTableData = {
//   camera: [
//     ["camera", "/camera/front_left/camera_info", 20, "Front left camera camera info", "sensor_msgs/msg/CameraInfo"],
//     ["camera", "/camera/front_left/image", 20, "Front left camera image", "sensor_msgs/msg/Image"],
//     ["camera", "/camera/front_left_center/camera_info", 20, "Front left center camera camera info", "sensor_msgs/msg/CameraInfo"],
//     ["camera", "/camera/front_left_center/image", 20, "Front left center camera image", "sensor_msgs/msg/Image"],
//     ["camera", "/camera/front_right/camera_info", 20, "Front right camera camera info", "sensor_msgs/msg/CameraInfo"],
//     ["camera", "/camera/front_right/image", 20, "Front right camera image", "sensor_msgs/msg/Image"],
//     ["camera", "/camera/front_right_center/camera_info", 20, "Front right center camera camera info", "sensor_msgs/msg/CameraInfo"],
//     ["camera", "/camera/front_right_center/image", 20, "Front right center camera image", "sensor_msgs/msg/Image"],
//     ["camera", "/camera/rear_left/camera_info", 20, "Rear left camera camera info", "sensor_msgs/msg/CameraInfo"],
//     ["camera", "/camera/rear_left/image", 20, "Rear left camera image", "sensor_msgs/msg/Image"],
//     ["camera", "/camera/rear_right/camera_info", 20, "Rear right camera camera info", "sensor_msgs/msg/CameraInfo"],
//     ["camera", "/camera/rear_right/image", 20, "Rear right camera image", "sensor_msgs/msg/Image"]
//   ],
//   lidar: [
//     ["lidar", "/lidar/full", 20, "All 3 uncropped lidar pointclouds stitched together", "sensor_msgs/msg/PointCloud2"],
//     ["lidar", "/lidar_front/full", 20, "Front lidar uncropped pointcloud", "sensor_msgs/msg/PointCloud2"],
//     ["lidar", "/lidar_left/full", 20, "Left lidar uncropped pointcloud", "sensor_msgs/msg/PointCloud2"],
//     ["lidar", "/lidar_right/full", 20, "Right lidar uncropped pointcloud", "sensor_msgs/msg/PointCloud2"]
//   ],
//   radar: [
//     ["radar", "/radar_front/esr_status1", "INC", "ESR Status 1", "delphi_esr_msgs/msg/EsrStatus1"],
//     ["radar", "/radar_front/esr_status2", "INC", "ESR Status 2", "delphi_esr_msgs/msg/EsrStatus2"],
//     ["radar", "/radar_front/esr_status3", "INC", "ESR Status 3", "delphi_esr_msgs/msg/EsrStatus3"],
//     ["radar", "/radar_front/esr_status4", "INC", "ESR Status 4", "delphi_esr_msgs/msg/EsrStatus4"],
//     ["radar", "/radar_front/esr_status5", "INC", "ESR Status 5", "delphi_esr_msgs/msg/EsrStatus5"],
//     ["radar", "/radar_front/esr_status6", "NAN", "ESR Status 6", "delphi_esr_msgs/msg/EsrStatus6"],
//     ["radar", "/radar_front/esr_status7", "INC", "ESR Status 7", "delphi_esr_msgs/msg/EsrStatus7"],
//     ["radar", "/radar_front/esr_status8", "INC", "ESR Status 8", "delphi_esr_msgs/msg/EsrStatus8"],
//     ["radar", "/radar_front/esr_status9", "INC", "ESR Status 9", "delphi_esr_msgs/msg/EsrStatus9"],
//     ["radar", "/radar_front/esr_track", "INC", "RADAR detection", "delphi_esr_msgs/msg/EsrTrack"],
//     ["radar", "/radar_front/esr_valid1", "INC", "", "delphi_esr_msgs/msg/EsrValid1"],
//     ["radar", "/radar_front/esr_valid2", "INC", "", "delphi_esr_msgs/msg/EsrValid2"],
//     ["radar", "/radar_front/esr_vehicle1", 50, "", "delphi_esr_msgs/msg/EsrVehicle1"],
//     ["radar", "/radar_front/esr_vehicle2", 50, "", "delphi_esr_msgs/msg/EsrVehicle2"],
//     ["radar", "/radar_front/esr_vehicle3", "NAN", "", "delphi_esr_msgs/msg/EsrVehicle3"],
//     ["radar", "/radar_front/esr_vehicle4", "NAN", "", "delphi_esr_msgs/msg/EsrVehicle4"],
//     ["radar", "/radar_front/esr_vehicle5", "NAN", "", "delphi_esr_msgs/msg/EsrVehicle5"],
//     ["radar", "/radar_front/radar_visz_moving", "INC", "Visualization of radar detection", "visualization_msgs/msg/Marker"],
//     ["radar", "/radar_front/radar_visz_static", "INC", "Visualization of radar detection", "visualization_msgs/msg/Marker"],
//     ["radar", "/radar_left/detection", "INC", "Detection from radar", "delphi_mrr_msgs/msg/Detection"],
//     ["radar", "/radar_left/header_information_detections", "INC", "radar header information detections", "delphi_mrr_msgs/msg/MrrHeaderInformationDetections"],
//     ["radar", "/radar_left/marker", "INC", "Visualization of radar detection", "visualization_msgs/msg/Marker"],
//     ["radar", "/radar_left/vehicle_state", "NAN", "", "delphi_mrr_msgs/msg/VehicleStateMsg2"],
//     ["radar", "/radar_right/detection", "INC", "Detection from radar", "delphi_mrr_msgs/msg/Detection"],
//     ["radar", "/radar_right/header_information_detections", "INC", "radar header information detections", "delphi_mrr_msgs/msg/MrrHeaderInformationDetections"],
//     ["radar", "/radar_right/marker", "INC", "Visualization of radar detection", "visualization_msgs/msg/Marker"],
//     ["radar", "/radar_right/vehicle_state", "NAN", "", "delphi_mrr_msgs/msg/VehicleStateMsg2"]
//   ],
//   novatel: [
//     ["novatel", "/novatel_*/bestgnsspos", 20, "Best position directly from GNSS (without INS)", "novatel_oem7_msgs/msg/BESTPOS"],
//     ["novatel", "/novatel_*/bestpos", 20, "Best position from INS", "novatel_oem7_msgs/msg/BESTPOS"],
//     ["novatel", "/novatel_*/bestutm", "NAN", "Best available UTM data", "novatel_oem7_msgs/msg/BESTUTM"],
//     ["novatel", "/novatel_*/bestvel", 20, "Best available velocity data", "novatel_oem7_msgs/msg/BESTVEL"],
//     ["novatel", "/novatel_*/bestxyz", "NAN", "Best available cartesian position and velocity", ""],
//     ["novatel", "/novatel_*/corrimu", "NAN", "Corrected IMU measurements", "novatel_oem7_msgs/msg/CORRIMU"],
//     ["novatel", "/novatel_*/fix", 60, "Navigation Satellite fix for any GNSS", "sensor_msgs/msg/NavSatFix"],
//     ["novatel", "/novatel_*/gloephem", "NAN", "Decoded GLONASS L1 C/A ephemeris", ""],
//     ["novatel", "/novatel_*/gps", 60, "More complete Navigation Satellite fix for any GNSS", "gps_msgs/msg/GPSFix"],
//     ["novatel", "/novatel_*/heading2", 1, "Heading information with multiple rovers", "novatel_oem7_msgs/msg/HEADING2"],
//     ["novatel", "/novatel_*/imu/data", "NAN", "Not used", "sensor_msgs/msg/Imu"],
//     ["novatel", "/novatel_*/insconfig", "SING", "Settings for post-processing", "novatel_oem7_msgs/msg/INSCONFIG"],
//     ["novatel", "/novatel_*/inspva", "NAN", "INS Position, Velocity and Attitude (PVA)", "novatel_oem7_msgs/msg/INSPVA"],
//     ["novatel", "/novatel_*/inspvax", "NAN", "INS Position, Velocity, Attitude (PVA) Extended", "novatel_oem7_msgs/msg/INSPVAX"],
//     ["novatel", "/novatel_*/insstdev", "NAN", "INS PVA Standard deviations", "novatel_oem7_msgs/msg/INSSTDEV"],
//     ["novatel", "/novatel_*/odom", 60, "Odometry from INS using RTK GNSS", "nav_msgs/msg/Odometry"],
//     ["novatel", "/novatel_*/oem7raw", "NAN", "Raw Oem7 bytes", "novatel_oem7_msgs/msg/Oem7RawMsg"],
//     ["novatel", "/novatel_*/range", 1, "Tracked satellite range information", ""],
//     ["novatel", "/novatel_*/rawephem", "NAN", "Raw GPS L1 C/A ephemeris", ""],
//     ["novatel", "/novatel_*/rawimux", 125, "Raw IMU Data extended", "novatel_oem7_msgs/msg/RAWIMU"],
//     ["novatel", "/novatel_*/rawimu", 125, "Raw IMU Data", "sensor_msgs/msg/Imu"],
//     ["novatel", "/novatel_*/rxstatus", "INC", "GNSS Receiver system status", "novatel_oem7_msgs/msg/RXSTATUS"],
//     ["novatel", "/novatel_*/time", 1, "UTC time, time offset, clock status", "novatel_oem7_msgs/msg/TIME"],
//     ["novatel", "/novatel_*/trackstat", "NAN", "Satellite tracking status", "novatel_oem7_msgs/msg/TrackStat"]
//   ],
//   vectornav: [
//     ["vectornav", "/vectornav/imu", 200, "Simplified IMU data", "sensor_msgs/msg/Imu"],
//     ["vectornav", "/vectornav/imu/compensated", 200, "Simplified compensated IMU data", "sensor_msgs/msg/Imu"],
//     ["vectornav", "/vectornav/raw/attitude", 200, "Attitude, acceleration, compass", "vectornav_msgs/msg/AttitudeGroup"],
//     ["vectornav", "/vectornav/raw/common", 200, "Acceleration, compass, attitude, position etc.", "vectornav_msgs/msg/CommonGroup"],
//     ["vectornav", "/vectornav/raw/gps2", 5, "", "vectornav_msgs/msg/GpsGroup"],
//     ["vectornav", "/vectornav/raw/gps", 5, "", "vectornav_msgs/msg/GpsGroup"],
//     ["vectornav", "/vectornav/raw/imu", "NAN", "Raw vectornav IMU data", "vectornav_msgs/msg/ImuGroup"],
//     ["vectornav", "/vectornav/raw/ins", 200, "INS tracking", "vectornav_msgs/msg/InsGroup"],
//     ["vectornav", "/vectornav/raw/time", "INC", "", "vectornav_msgs/msg/TimeGroup"]
//   ],
//   autonomy: [
//     ["autonomy", "/joystick/command", 20, "Manual command and deadman", "deep_orange_msgs/msg/JoystickCommand"],
//     ["autonomy", "/odometry/filtered", 100, "State estimate", "nav_msgs/msg/Odometry"],
//     ["autonomy", "/path_publisher/raceline", "INC", "High-level path (pit in, out, remain out)", "nav_msgs/msg/Path"],
//     ["autonomy", "/path_publisher/state", 25, "Track state", "std_msgs/msg/Int32"],
//     ["autonomy", "/bvs_planner/path", 20, "Planner path", "nav_msgs/msg/Path"],
//     ["autonomy", "/raptor_dbw_interface/accelerator_pedal_cmd", 100, "Accelerator pedal percent command", "raptor_dbw_msgs/msg/AcceleratorPedalCmd"],
//     ["autonomy", "/raptor_dbw_interface/accelerator_pedal_report", 100, "Reported actual accelerator pedal output percent", "raptor_dbw_msgs/msg/AcceleratorPedalReport"],
//     ["autonomy", "/raptor_dbw_interface/brake_2_report", 100, "Rear and front brake pressures [kPa]", "raptor_dbw_msgs/msg/Brake2Report"],
//     ["autonomy", "/raptor_dbw_interface/brake_cmd", 100, "Commanded brake pedal percent", "raptor_dbw_msgs/msg/BrakeCmd"],
//     ["autonomy", "/raptor_dbw_interface/ct_report", 100, "Compute control state and signal acknowledgements", "deep_orange_msgs/msg/CtReport"],
//     ["autonomy", "/raptor_dbw_interface/marelli_report", 10, "Control Control flags and stats", "deep_orange_msgs/msg/MarelliReport"],
//     ["autonomy", "/raptor_dbw_interface/pt_report", 100, "Powertrain diagnostics", "deep_orange_msgs/msg/PtReport"],
//     ["autonomy", "/raptor_dbw_interface/race_control_report", 100, "Control Control flags and stats", "deep_orange_msgs/msg/RaceControlReport"],
//     ["autonomy", "/raptor_dbw_interface/steering_cmd", 100, "Steering angle [deg]", "raptor_dbw_msgs/msg/SteeringCmd"],
//     ["autonomy", "/raptor_dbw_interface/steering_report", 100, "Steering feedback [deg]", "raptor_dbw_msgs/msg/SteeringReport"],
//     ["autonomy", "/raptor_dbw_interface/tire_report", 100, "16 strip Tire temperature [C], pressure [mbar], and potentiometer readings [cm]", "deep_orange_msgs/msg/TireReport"],
//     ["autonomy", "/raptor_dbw_interface/tire_temp_report", 100, "Summary of 16 strip tire temperature [C]", "deep_orange_msgs/msg/TireTempReport"],
//     ["autonomy", "/raptor_dbw_interface/wheel_speed_report", 100, "Wheel speed [kmph]", "raptor_dbw_msgs/msg/WheelSpeedReport"],
//     ["autonomy", "/system_executive/race_control/state", 100, "Internal autonomy state", "std_msgs/msg/Int16"]
//   ],
//   kistler: [
//     ["kistler", "/kistler/acc_body", 500, "Body acceleration [m/s^2]", "kistler_msgs/msg/AccBody"],
//     ["kistler", "/kistler/acc_hor_acc_cbody", 500, "Acceleration w.r.t. horizontal [m/s^2]", "kistler_msgs/msg/AccHorAccCBody"],
//     ["kistler", "/kistler/ang_vel_body", 500, "Body angular velocity [deg/s]", "kistler_msgs/msg/AngVelBody"],
//     ["kistler", "/kistler/ang_vel_hor", 500, "Angular velocitry w.r.t. Horizontal [deg/s]", "kistler_msgs/msg/AngVelHor"],
//     ["kistler", "/kistler/correvit", 500, "Velocity from corrected value [km/h]", "kistler_msgs/msg/Correvit"],
//     ["kistler", "/kistler/distance", 500, "Travel distance [m]", "kistler_msgs/msg/Distance"],
//     ["kistler", "/kistler/pitch_roll", 500, "Pitch and roll [deg]", "kistler_msgs/msg/PitchRoll"],
//     ["kistler", "/kistler/status", 1, "Sensor status", "kistler_msgs/msg/Status"],
//     ["kistler", "/kistler/vel_angle", 500, "Velocity [km/h] and slip angle [deg]", "kistler_msgs/msg/VelAngle"]
//   ]
// };

const sensorTableData = {
  camera: [
    ["camera", "/camera/front_left/camera_info", 20, "Front left camera camera info", "sensor_msgs/msg/CameraInfo"],
    ["camera", "/camera/front_left/image", 20, "Front left camera image", "sensor_msgs/msg/Image"],
    ["camera", "/camera/front_left_center/camera_info", 20, "Front left center camera camera info", "sensor_msgs/msg/CameraInfo"],
    ["camera", "/camera/front_left_center/image", 20, "Front left center camera image", "sensor_msgs/msg/Image"],
    ["camera", "/camera/front_right/camera_info", 20, "Front right camera camera info", "sensor_msgs/msg/CameraInfo"],
    ["camera", "/camera/front_right/image", 20, "Front right camera image", "sensor_msgs/msg/Image"],
    ["camera", "/camera/front_right_center/camera_info", 20, "Front right center camera camera info", "sensor_msgs/msg/CameraInfo"],
    ["camera", "/camera/front_right_center/image", 20, "Front right center camera image", "sensor_msgs/msg/Image"],
    ["camera", "/camera/rear_left/camera_info", 20, "Rear left camera camera info", "sensor_msgs/msg/CameraInfo"],
    ["camera", "/camera/rear_left/image", 20, "Rear left camera image", "sensor_msgs/msg/Image"],
    ["camera", "/camera/rear_right/camera_info", 20, "Rear right camera camera info", "sensor_msgs/msg/CameraInfo"],
    ["camera", "/camera/rear_right/image", 20, "Rear right camera image", "sensor_msgs/msg/Image"]
  ],
  lidar: [
    ["lidar", "/lidar/full", 20, "All 3 uncropped lidar pointclouds stitched together", "sensor_msgs/msg/PointCloud2"],
    ["lidar", "/lidar_front/full", 20, "Front lidar uncropped pointcloud", "sensor_msgs/msg/PointCloud2"],
    ["lidar", "/lidar_left/full", 20, "Left lidar uncropped pointcloud", "sensor_msgs/msg/PointCloud2"],
    ["lidar", "/lidar_right/full", 20, "Right lidar uncropped pointcloud", "sensor_msgs/msg/PointCloud2"]
  ],
  radar: [
    ["radar", "/radar_front/esr_status1", "--", "ESR Status 1", "delphi_esr_msgs/msg/EsrStatus1"],
    ["radar", "/radar_front/esr_status2", "--", "ESR Status 2", "delphi_esr_msgs/msg/EsrStatus2"],
    ["radar", "/radar_front/esr_status3", "--", "ESR Status 3", "delphi_esr_msgs/msg/EsrStatus3"],
    ["radar", "/radar_front/esr_status4", "--", "ESR Status 4", "delphi_esr_msgs/msg/EsrStatus4"],
    ["radar", "/radar_front/esr_status5", "--", "ESR Status 5", "delphi_esr_msgs/msg/EsrStatus5"],
    ["radar", "/radar_front/esr_status7", "--", "ESR Status 7", "delphi_esr_msgs/msg/EsrStatus7"],
    ["radar", "/radar_front/esr_status8", "--", "ESR Status 8", "delphi_esr_msgs/msg/EsrStatus8"],
    ["radar", "/radar_front/esr_status9", "--", "ESR Status 9", "delphi_esr_msgs/msg/EsrStatus9"],
    ["radar", "/radar_front/esr_track", "--", "RADAR detection", "delphi_esr_msgs/msg/EsrTrack"],
    ["radar", "/radar_front/esr_valid1", "--", "", "delphi_esr_msgs/msg/EsrValid1"],
    ["radar", "/radar_front/esr_valid2", "--", "", "delphi_esr_msgs/msg/EsrValid2"],
    ["radar", "/radar_front/esr_vehicle1", 50, "", "delphi_esr_msgs/msg/EsrVehicle1"],
    ["radar", "/radar_front/esr_vehicle2", 50, "", "delphi_esr_msgs/msg/EsrVehicle2"],
    ["radar", "/radar_front/radar_visz_moving", "--", "Visualization of radar detection", "visualization_msgs/msg/Marker"],
    ["radar", "/radar_front/radar_visz_static", "--", "Visualization of radar detection", "visualization_msgs/msg/Marker"],
    ["radar", "/radar_left/detection", "--", "Detection from radar", "delphi_mrr_msgs/msg/Detection"],
    ["radar", "/radar_left/header_information_detections", "--", "radar header information detections", "delphi_mrr_msgs/msg/MrrHeaderInformationDetections"],
    ["radar", "/radar_left/marker", "--", "Visualization of radar detection", "visualization_msgs/msg/Marker"],
    ["radar", "/radar_right/detection", "--", "Detection from radar", "delphi_mrr_msgs/msg/Detection"],
    ["radar", "/radar_right/header_information_detections", "--", "radar header information detections", "delphi_mrr_msgs/msg/MrrHeaderInformationDetections"],
    ["radar", "/radar_right/marker", "--", "Visualization of radar detection", "visualization_msgs/msg/Marker"]
  ],
  novatel: [
    ["novatel", "/novatel_*/bestgnsspos", 20, "Best position directly from GNSS (without INS)", "novatel_oem7_msgs/msg/BESTPOS"],
    ["novatel", "/novatel_*/bestpos", 20, "Best position from INS", "novatel_oem7_msgs/msg/BESTPOS"],
    ["novatel", "/novatel_*/bestvel", 20, "Best available velocity data", "novatel_oem7_msgs/msg/BESTVEL"],
    ["novatel", "/novatel_*/fix", 60, "Navigation Satellite fix for any GNSS", "sensor_msgs/msg/NavSatFix"],
    ["novatel", "/novatel_*/gps", 60, "More complete Navigation Satellite fix for any GNSS", "gps_msgs/msg/GPSFix"],
    ["novatel", "/novatel_*/heading2", 1, "Heading information with multiple rovers", "novatel_oem7_msgs/msg/HEADING2"],
    ["novatel", "/novatel_*/insconfig", "SING", "Settings for post-processing", "novatel_oem7_msgs/msg/INSCONFIG"],
    ["novatel", "/novatel_*/odom", 60, "Odometry from INS using RTK GNSS", "nav_msgs/msg/Odometry"],
    ["novatel", "/novatel_*/range", 1, "Tracked satellite range information", ""],
    ["novatel", "/novatel_*/rawimux", 125, "Raw IMU Data extended", "novatel_oem7_msgs/msg/RAWIMU"],
    ["novatel", "/novatel_*/rawimu", 125, "Raw IMU Data", "sensor_msgs/msg/Imu"],
    ["novatel", "/novatel_*/rxstatus", "--", "GNSS Receiver system status", "novatel_oem7_msgs/msg/RXSTATUS"],
    ["novatel", "/novatel_*/time", 1, "UTC time, time offset, clock status", "novatel_oem7_msgs/msg/TIME"]
  ],
  vectornav: [
    ["vectornav", "/vectornav/imu", 200, "Simplified IMU data", "sensor_msgs/msg/Imu"],
    ["vectornav", "/vectornav/imu/compensated", 200, "Simplified compensated IMU data", "sensor_msgs/msg/Imu"],
    ["vectornav", "/vectornav/raw/attitude", 200, "Attitude, acceleration, compass", "vectornav_msgs/msg/AttitudeGroup"],
    ["vectornav", "/vectornav/raw/common", 200, "Acceleration, compass, attitude, position etc.", "vectornav_msgs/msg/CommonGroup"],
    ["vectornav", "/vectornav/raw/gps2", 5, "", "vectornav_msgs/msg/GpsGroup"],
    ["vectornav", "/vectornav/raw/gps", 5, "", "vectornav_msgs/msg/GpsGroup"],
    ["vectornav", "/vectornav/raw/ins", 200, "INS tracking", "vectornav_msgs/msg/InsGroup"],
    ["vectornav", "/vectornav/raw/time", "--", "", "vectornav_msgs/msg/TimeGroup"]
  ],
  autonomy: [
    ["autonomy", "/joystick/command", 20, "Manual command and deadman", "deep_orange_msgs/msg/JoystickCommand"],
    ["autonomy", "/odometry/filtered", 100, "State estimate", "nav_msgs/msg/Odometry"],
    ["autonomy", "/path_publisher/raceline", "--", "High-level path (pit in, out, remain out)", "nav_msgs/msg/Path"],
    ["autonomy", "/path_publisher/state", 25, "Track state", "std_msgs/msg/Int32"],
    ["autonomy", "/bvs_planner/path", 20, "Planner path", "nav_msgs/msg/Path"],
    ["autonomy", "/raptor_dbw_interface/accelerator_pedal_cmd", 100, "Accelerator pedal percent command", "raptor_dbw_msgs/msg/AcceleratorPedalCmd"],
    ["autonomy", "/raptor_dbw_interface/accelerator_pedal_report", 100, "Reported actual accelerator pedal output percent", "raptor_dbw_msgs/msg/AcceleratorPedalReport"],
    ["autonomy", "/raptor_dbw_interface/brake_2_report", 100, "Rear and front brake pressures [kPa]", "raptor_dbw_msgs/msg/Brake2Report"],
    ["autonomy", "/raptor_dbw_interface/brake_cmd", 100, "Commanded brake pedal percent", "raptor_dbw_msgs/msg/BrakeCmd"],
    ["autonomy", "/raptor_dbw_interface/ct_report", 100, "Compute control state and signal acknowledgements", "deep_orange_msgs/msg/CtReport"],
    ["autonomy", "/raptor_dbw_interface/marelli_report", 10, "Control Control flags and stats", "deep_orange_msgs/msg/MarelliReport"],
    ["autonomy", "/raptor_dbw_interface/pt_report", 100, "Powertrain diagnostics", "deep_orange_msgs/msg/PtReport"],
    ["autonomy", "/raptor_dbw_interface/race_control_report", 100, "Control Control flags and stats", "deep_orange_msgs/msg/RaceControlReport"],
    ["autonomy", "/raptor_dbw_interface/steering_cmd", 100, "Steering angle [deg]", "raptor_dbw_msgs/msg/SteeringCmd"],
    ["autonomy", "/raptor_dbw_interface/steering_report", 100, "Steering feedback [deg]", "raptor_dbw_msgs/msg/SteeringReport"],
    ["autonomy", "/raptor_dbw_interface/tire_report", 100, "16 strip Tire temperature [C], pressure [mbar], and potentiometer readings [cm]", "deep_orange_msgs/msg/TireReport"],
    ["autonomy", "/raptor_dbw_interface/tire_temp_report", 100, "Summary of 16 strip tire temperature [C]", "deep_orange_msgs/msg/TireTempReport"],
    ["autonomy", "/raptor_dbw_interface/wheel_speed_report", 100, "Wheel speed [kmph]", "raptor_dbw_msgs/msg/WheelSpeedReport"],
    ["autonomy", "/system_executive/race_control/state", 100, "Internal autonomy state", "std_msgs/msg/Int16"]
  ],
  kistler: [
    ["kistler", "/kistler/acc_body", 500, "Body acceleration [m/s^2]", "kistler_msgs/msg/AccBody"],
    ["kistler", "/kistler/acc_hor_acc_cbody", 500, "Acceleration w.r.t. horizontal [m/s^2]", "kistler_msgs/msg/AccHorAccCBody"],
    ["kistler", "/kistler/ang_vel_body", 500, "Body angular velocity [deg/s]", "kistler_msgs/msg/AngVelBody"],
    ["kistler", "/kistler/ang_vel_hor", 500, "Angular velocitry w.r.t. Horizontal [deg/s]", "kistler_msgs/msg/AngVelHor"],
    ["kistler", "/kistler/correvit", 500, "Velocity from corrected value [km/h]", "kistler_msgs/msg/Correvit"],
    ["kistler", "/kistler/distance", 500, "Travel distance [m]", "kistler_msgs/msg/Distance"],
    ["kistler", "/kistler/pitch_roll", 500, "Pitch and roll [deg]", "kistler_msgs/msg/PitchRoll"],
    ["kistler", "/kistler/status", 1, "Sensor status", "kistler_msgs/msg/Status"],
    ["kistler", "/kistler/vel_angle", 500, "Velocity [km/h] and slip angle [deg]", "kistler_msgs/msg/VelAngle"]
  ]
};


// Function to handle track selection
let CURRENT_SENSOR = 'lidar';

const set_sensor = (sensor) => {
// Remove active class from all track buttons
for (let sensor of ['lidar', 'camera', 'radar', 'novatel', 'vectornav', 'kistler', 'autonomy']) {
  const node = document.getElementById(`sensor-select-button-${sensor}`);
  if (node) node.classList.remove('active-sensor');
}

const tbody = document.getElementById("sensor-table-body");
  tbody.innerHTML = "";
CURRENT_SENSOR = sensor;

const rows = sensorTableData[sensor];
  if (!rows || rows.length === 0) {
    tbody.innerHTML = "<tr><td colspan='5'>No data available for this sensor type.</td></tr>";
    return;
  }

  for (const row of rows) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row[1]}</td>
      <td>${row[2]}</td>
      <td>${row[3]}</td>
      <td>${row[4]}</td>
    `;
    tbody.appendChild(tr);
  }
  
document.getElementById(`sensor-select-button-${sensor}`).classList.add('active-sensor');
};

document.addEventListener("DOMContentLoaded", () => {
  set_sensor(CURRENT_SENSOR);
});

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