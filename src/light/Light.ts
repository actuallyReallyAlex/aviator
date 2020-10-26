import * as THREE from "three";
import { AmbientLight, DirectionalLight, HemisphereLight } from "three";

class Light {
  constructor() {
    this.createHemisphereLight();
    this.createShadowLight();
    this.createAmbientLight();
  }

  ambientLight!: AmbientLight;
  hemisphereLight!: HemisphereLight;
  shadowLight!: DirectionalLight;

  createAmbientLight(): void {
    // * An ambient light modifies the global color of a scene and makes the shadows softer
    this.ambientLight = new THREE.AmbientLight(0xe0199a, 0.25);
  }

  createHemisphereLight(): void {
    this.hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9);
  }

  createShadowLight(): void {
    this.shadowLight = new THREE.DirectionalLight(0xffffff, 0.9);
    this.shadowLight.position.set(150, 350, 350);
    this.shadowLight.castShadow = true;
    this.shadowLight.shadow.camera.left = -400;
    this.shadowLight.shadow.camera.right = 400;
    this.shadowLight.shadow.camera.top = 400;
    this.shadowLight.shadow.camera.bottom = -400;
    this.shadowLight.shadow.camera.near = 1;
    this.shadowLight.shadow.camera.far = 1000;
    this.shadowLight.shadow.mapSize.width = 2048;
    this.shadowLight.shadow.mapSize.height = 2048;
  }
}

export default Light;
