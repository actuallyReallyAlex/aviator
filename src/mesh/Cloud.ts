import * as THREE from "three";
import { BoxGeometry, MeshPhongMaterial, Object3D } from "three";

import { colors } from "../constants";

class Cloud {
  constructor() {
    this.mesh = new THREE.Object3D();
    this.geometry = new THREE.BoxGeometry(20, 20, 20);
    this.material = new THREE.MeshPhongMaterial({ color: colors.white });

    const nBlocs = 3 + Math.floor(Math.random() * 3);

    // * Create the "randomness" of the cloud shape
    for (let i = 0; i < nBlocs; i++) {
      const mesh = new THREE.Mesh(this.geometry, this.material);

      // * Rrandom position and rotation
      mesh.position.x = i * 15;
      mesh.position.y = Math.random() * 10;
      mesh.position.z = Math.random() * 10;
      mesh.rotation.z = Math.random() * Math.PI * 2;
      mesh.rotation.y = Math.random() * Math.PI * 2;

      const size = 0.1 + Math.random() * 0.9;
      mesh.scale.set(size, size, size);

      mesh.castShadow = true;
      mesh.receiveShadow = true;

      // * Add smallerr mesh to larger mesh
      this.mesh.add(mesh);
    }
  }

  geometry!: BoxGeometry;
  material!: MeshPhongMaterial;
  mesh!: Object3D;
}

export default Cloud;
