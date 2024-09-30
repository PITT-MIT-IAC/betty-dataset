
// Initialize the Camera viewer
bulmaCarousel.attach('#camera-carousel', {
  slidesToScroll: 1,
  slidesToShow: 1,
  infinite: true,
});

// Initialize the Lidar viewer
console.log("Initializing Lidar viewer");
const scene = new THREE.Scene();
const parent = document.getElementById('vizblock');
const camera = new THREE.PerspectiveCamera(75, 1 / 0.5, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(parent.offsetWidth*0.465, parent.offsetWidth*0.465*0.5);
document.getElementById('lidar-container').appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
const loader = new THREE.PCDLoader();

const point_func = function(points) {
  points.geometry.computeBoundingBox();
  points.material = new THREE.ShaderMaterial({
    uniforms: {
      bboxMin: {
        value: points.geometry.boundingBox.min
      },
      bboxMax: {
        value: points.geometry.boundingBox.max
      },
    },
    vertexShader: `
      uniform vec3 bboxMin;
      uniform vec3 bboxMax;
      varying vec3 vUv;
      void main() {
        vUv.z = (position.z - bboxMin.z) / (bboxMax.z - bboxMin.z);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = 1.0;
      }
    `,
    fragmentShader: `
      varying vec3 vUv;
      void main() {
        gl_FragColor = vec4(sqrt(sqrt(vUv.z)), 1.0 - sqrt(vUv.z), 1.0, 1.0);
      }
    `,
  });


  scene.add(points);
  camera.position.set(0, -30, 30);
  controls.update();

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
}

window.addEventListener('resize', function() {
  const parent = document.getElementById('vizblock');
  camera.aspect = parent.offsetWidth / parent.offsetHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(parent.offsetWidth*0.465, parent.offsetWidth*0.465*0.5);
});


let CURRENT_RUN = 'grun33';
const set_run = (grun) => {
  CURRENT_RUN = grun;
  for (let run of ['grun33', 'grun16', 'grun20', 'grun37', 'grun44', 'grun48']) {
    const node = document.getElementById(`track-select-button-${run}`);
    if (node) node.classList.remove('active-track');
  }
  if (grun == 'grun33') {
    scene.remove.apply(scene, scene.children);
    loader.load('./assets/grun33/00008467.pcd', point_func);
    Plotly.newPlot('myDiv', grun33_traces, grun33_layout);
    document.getElementById('camera-image-1').src = 'static/data/grun33/00006400.png';
    document.getElementById('camera-image-2').src = 'static/data/grun33/00018501.png';
    document.getElementById(`track-select-button-${grun}`).classList.add('active-track');
    document.getElementById('current-track').textContent = 'Las Vegas Motor Speedway';
  } else if (grun == 'grun16') {
    scene.remove.apply(scene, scene.children);
    loader.load('./assets/grun16/00019329.pcd', point_func);
    Plotly.newPlot('myDiv', grun16_traces, grun16_layout);
    document.getElementById('camera-image-1').src = 'static/data/grun16/00018501.png';
    document.getElementById('camera-image-2').src = 'static/data/grun16/00006400.png';
    document.getElementById(`track-select-button-${grun}`).classList.add('active-track');
    document.getElementById('current-track').textContent = 'Lucas Oil Raceway';
  } else if (grun == 'grun20') {
    // TODO: Add Lidar and Camera content
    scene.remove.apply(scene, scene.children);
    loader.load('./assets/grun16/00019329.pcd', point_func);
    Plotly.newPlot('myDiv', grun20_traces, grun20_layout);
    document.getElementById('camera-image-1').src = 'static/data/grun16/00018501.png';
    document.getElementById('camera-image-2').src = 'static/data/grun16/00006400.png';
    document.getElementById(`track-select-button-${grun}`).classList.add('active-track');
    document.getElementById('current-track').textContent = 'Texas Motor Speedway';
  } else if (grun == 'grun48') {
    // TODO: Add Lidar and Camera content
    scene.remove.apply(scene, scene.children);
    loader.load('./assets/grun16/00019329.pcd', point_func);
    Plotly.newPlot('myDiv', grun48_traces, grun48_layout);
    document.getElementById('camera-image-1').src = 'static/data/grun16/00018501.png';
    document.getElementById('camera-image-2').src = 'static/data/grun16/00006400.png';
    document.getElementById(`track-select-button-${grun}`).classList.add('active-track');
    document.getElementById('current-track').textContent = 'Autodromo Nazionale Monza';

  } else if (grun == 'grun50') {
    // TODO: Add Lidar and Camera content
    scene.remove.apply(scene, scene.children);
    loader.load('./assets/grun16/00019329.pcd', point_func);
    Plotly.newPlot('myDiv', grun50_traces, grun50_layout);
    document.getElementById('camera-image-1').src = 'static/data/grun16/00018501.png';
    document.getElementById('camera-image-2').src = 'static/data/grun16/00006400.png';
    document.getElementById(`track-select-button-${grun}`).classList.add('active-track');
    document.getElementById('current-track').textContent = 'Indianapolis Motor Speedway';

  } else if (grun == 'grun38') {
    // TODO: Add Lidar and Camera content
    scene.remove.apply(scene, scene.children);
    loader.load('./assets/grun16/00019329.pcd', point_func);
    Plotly.newPlot('myDiv', grun38_traces, grun38_layout);
    document.getElementById('camera-image-1').src = 'static/data/grun16/00018501.png';
    document.getElementById('camera-image-2').src = 'static/data/grun16/00006400.png';
    document.getElementById(`track-select-button-${grun}`).classList.add('active-track');
    document.getElementById('current-track').textContent = 'Goodwood Festival of Speed';

  } else { // assume grun48

  }
}

set_run(CURRENT_RUN);
