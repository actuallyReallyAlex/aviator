import * as THREE from "three";
import { Object3D } from "three";

import Cloud from "./Cloud";

class Sky {
  constructor() {
    this.mesh = new THREE.Object3D();
    this.numberOfClouds = 20;
    this.stepAngle = (Math.PI * 2) / this.numberOfClouds;

    this.createClouds();
  }

  mesh!: Object3D;
  numberOfClouds!: number;
  stepAngle: number;

  createClouds(): void {
    for (let i = 0; i < this.numberOfClouds; i++) {
      const cloud = new Cloud();

      // * Angle of Cloud
      const angle = this.stepAngle * i;
      // * Distance between the center of the axios and the cloud itself
      const h = 750 + Math.random() * 200;

      // * Convert polar coordinates (angle, distance) into Cartesian coordinates (x, y)
      cloud.mesh.position.y = Math.sin(angle) * h;
      cloud.mesh.position.x = Math.cos(angle) * h;

      // * Rotate cloud
      cloud.mesh.rotateZ((angle * Math.PI) / 2);

      // * Position clouds at random depths
      cloud.mesh.position.z = -400 - Math.random() * 400;

      // * Random scale
      const scale = 1 + Math.random() * 2;
      cloud.mesh.scale.set(scale, scale, scale);

      // * Add cloud mesh to sky mesh
      this.mesh.add(cloud.mesh);
    }

    this.mesh.position.y = -600;
  }
}

export default Sky;
