import * as THREE from "three";
import { DirectionalLight, HemisphereLight } from "three";

class Light {
  constructor() {
    this.createHemisphereLight();
    this.createShadowLight();
  }

  hemisphereLight!: HemisphereLight;
  shadowLight!: DirectionalLight;

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
