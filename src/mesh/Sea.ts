import * as THREE from "three";
import { CylinderGeometry, Mesh, MeshPhongMaterial } from "three";
import { colors } from "../constants";

class Sea {
  constructor() {
    this.geometry = new THREE.CylinderGeometry(600, 600, 800, 40, 10);
    this.geometry.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
    this.material = new THREE.MeshPhongMaterial({
      color: colors.blue,
      transparent: true,
      opacity: 0.6,
      flatShading: true,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.receiveShadow = true;
  }

  geometry!: CylinderGeometry;
  material!: MeshPhongMaterial;
  mesh: Mesh;
}

export default Sea;
