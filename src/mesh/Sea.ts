import * as THREE from "three";
import { CylinderGeometry, Mesh, MeshPhongMaterial } from "three";
import { colors } from "../constants";

import { WaveInformation } from "../types";

class Sea {
  constructor() {
    this.geometry = new THREE.CylinderGeometry(600, 600, 800, 40, 10);
    this.geometry.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
    this.geometry.mergeVertices();

    // * Vertices
    this.waves = [];

    for (let i = 0; i < this.geometry.vertices.length; i++) {
      const vertex = this.geometry.vertices[i];

      // * Store data associated with vertex
      this.waves.push({
        // * a random angle
        angle: Math.random() * Math.PI * 2,
        // * a random distance
        amplitude: 5 + Math.random() * 15,
        // * a random speed between 0.016 and 0.048 radians / frame
        speed: 0.016 + Math.random() * 0.032,
        y: vertex.y,
        x: vertex.x,
        z: vertex.z,
      });
    }

    this.material = new THREE.MeshPhongMaterial({
      color: colors.blue,
      transparent: true,
      opacity: 0.6,
      flatShading: true,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.receiveShadow = true;
    this.mesh.position.y = -600;
  }

  geometry!: CylinderGeometry;
  material!: MeshPhongMaterial;
  mesh: Mesh;
  waves!: WaveInformation[];

  moveWaves(): void {
    for (let i = 0; i < this.geometry.vertices.length; i++) {
      const vertex = this.geometry.vertices[i];
      const vertexInformation = this.waves[i];

      // * Update position of vertex
      vertex.setX(
        vertexInformation.x +
          Math.cos(vertexInformation.angle) * vertexInformation.amplitude
      );
      vertex.setY(
        vertexInformation.y +
          Math.sin(vertexInformation.angle) * vertexInformation.amplitude
      );

      // * Increase angle for next frame
      vertexInformation.angle += vertexInformation.speed;
    }

    this.geometry.verticesNeedUpdate = true;
  }
}

export default Sea;
