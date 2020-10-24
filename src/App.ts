import * as THREE from "three";
import { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import Light from "./light/Light";

class App {
  constructor() {
    this.createScene();
    this.createCamera();
    this.createRenderer();
    this.appendToContainer();
    this.createLight();

    this.addObjectsToScene();
    this.setupListeners();
  }

  camera!: PerspectiveCamera;
  light!: Light;
  renderer!: WebGLRenderer;
  scene!: Scene;

  addObjectsToScene(): void {
    this.scene.add(this.light.hemisphereLight);
    this.scene.add(this.light.shadowLight);
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

  createLight(): void {
    this.light = new Light();
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

  createScene(): void {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);
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
}

export default App;
