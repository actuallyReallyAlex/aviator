import * as THREE from "three";
import { PerspectiveCamera, Scene, WebGLRenderer } from "three";

class App {
  constructor() {
    this.createScene();
    this.createCamera();
    this.createRenderer();
    this.appendToContainer();
    this.setupListeners();
  }

  camera!: PerspectiveCamera;
  renderer!: WebGLRenderer;
  scene!: Scene;

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

  handleWindowResize(): void {
    const height = window.innerHeight;
    const width = window.innerWidth;
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  setupListeners(): void {
    window.addEventListener("resize", this.handleWindowResize, false);
  }

  render(): void {
    console.log("RENDER");
  }
}

export default App;
