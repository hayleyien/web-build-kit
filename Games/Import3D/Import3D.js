import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import { FBXLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';

class Website3DDemo {
  constructor() {
    this._Initialize();
  }

  _Initialize() {
    this._threejs = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    this._threejs.shadowMap.enabled = true;
    this._threejs.shadowMap.type = THREE.PCFSoftShadowMap;
    this._threejs.physicallyCorrectLights = true;
    this._threejs.toneMapping = THREE.ACESFilmicToneMapping;
    this._threejs.outputEncoding = THREE.sRGBEncoding;

    const modelDiv = document.getElementById('model');
    modelDiv.appendChild(this._threejs.domElement);
    this._threejs.setSize(modelDiv.offsetWidth, modelDiv.offsetHeight);

    window.addEventListener('resize', () => {
      this._OnWindowResize();
    }, false);

    const fov = 60;
    const aspect = modelDiv.offsetWidth / modelDiv.offsetHeight;
    const near = 1.0;
    const far = 1000.0;
    this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this._camera.position.set(15, 15, 20);

    this._scene = new THREE.Scene();

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(20, 100, 10);
    dirLight.castShadow = true;
    dirLight.shadow.bias = -0.001;
    dirLight.shadow.mapSize.set(2048, 2048);
    this._scene.add(dirLight);

    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    this._scene.add(ambient);

    this._controls = new OrbitControls(this._camera, this._threejs.domElement);
    this._controls.target.set(0, 10, 0);
    this._controls.update();

    this._LoadModel('', 'roomtest.fbx', new THREE.Vector3(0, 0, 0));

    this._RAF();
  }

  _LoadModel(path, modelFile, offset) {
  const loader = new FBXLoader();
  loader.setPath(path);
  loader.load(modelFile, (fbx) => {
    fbx.scale.setScalar(0.1);
    fbx.traverse(c => {
      if (c.isMesh) {
        c.castShadow = true;
        c.receiveShadow = true;
        if (c.material) {
          c.material.side = THREE.DoubleSide;
        }
      }
    });
    fbx.position.copy(offset);
    this._scene.add(fbx);
  });
}


  _OnWindowResize() {
    const modelDiv = document.getElementById('model');
    this._camera.aspect = modelDiv.offsetWidth / modelDiv.offsetHeight;
    this._camera.updateProjectionMatrix();
    this._threejs.setSize(modelDiv.offsetWidth, modelDiv.offsetHeight);
  }

  _RAF() {
    requestAnimationFrame(() => this._RAF());
    this._controls.update();
    this._threejs.render(this._scene, this._camera);
  }
}

let _APP = null;
window.addEventListener('DOMContentLoaded', () => {
  _APP = new Website3DDemo();
});


