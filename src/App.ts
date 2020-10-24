import * as THREE from "three";
import { GridHelper, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import Light from "./light/Light";
import Sea from "./mesh/Sea";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";

class App {
  constructor() {
    // * Base
    this.createScene();
    this.createCamera();
    this.createRenderer();
    this.appendToContainer();

    // * Objects
    this.createLight();
    this.createSea();

    // * Helpers
    this.createOrbitControls();
    this.createStats();
    this.createHelper();

    // * Other
    this.addObjectsToScene();
    this.setupListeners();

    this.tick = this.tick.bind(this);
    this.tick();
  }

  camera!: PerspectiveCamera;
  helper!: GridHelper;
  light!: Light;
  orbitControls!: OrbitControls;
  renderer!: WebGLRenderer;
  sea!: Sea;
  scene!: Scene;
  stats!: Stats;

  addObjectsToScene(): void {
    this.scene.add(this.light.hemisphereLight);
    this.scene.add(this.light.shadowLight);
    this.scene.add(this.sea.mesh);
    this.scene.add(this.helper);
  }

  appendToContainer(): void {
    const container = document.getElementById("world");
    container?.appendChild(this.renderer.domElement);
  }

  createCamera(): void {
    const height = window.innerHeight;
    const width = window.innerWidth;
    const aspectRatio = width / height;
    const fieldOfView = 60;
    const nearPlane = 1;
    const farPlane = 10000;
    this.camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    );
    this.camera.position.set(0, 200, 100);
  }

  createHelper(): void {
    this.helper = new THREE.GridHelper(2000, 100);
    this.helper.position.y = -199;
  }

  createLight(): void {
    this.light = new Light();
  }

  createOrbitControls(): void {
    this.orbitControls = new OrbitControls(
      this.camera,
      this.renderer.domElement
    );
  }

  createRenderer(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    this.renderer.setSize(width, height);
    this.renderer.shadowMap.enabled = true;
  }

  createSea(): void {
    this.sea = new Sea();
  }

  createScene(): void {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);
  }

  createStats(): void {
    const container = document.getElementById("world");
    this.stats = Stats();
    container?.appendChild(this.stats.dom);
  }

  setupListeners(): void {
    window.addEventListener(
      "resize",
      () => {
        const height = window.innerHeight;
        const width = window.innerWidth;
        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
      },
      false
    );
  }

  render(): void {
    this.renderer.render(this.scene, this.camera);
  }

  tick(): void {
    this.stats.update();

    this.render();
    this.update();

    requestAnimationFrame(this.tick);
  }

  update(): void {
    // console.log("UPDATE");
  }
}

export default App;
